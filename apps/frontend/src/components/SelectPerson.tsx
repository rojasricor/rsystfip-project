import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";
import { useEffect } from "react";
import { useQueries, type UseQueryResult } from "react-query";
import { v4 } from "uuid";
import { actionFormSchedule } from ".";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  setDeans,
  setFormData,
  type FormDataState,
} from "../features/appointments/appointmentsSlice";
import { setCategories } from "../features/resources/resourcesSlice";
import type { ICategory } from "../interfaces";
import { notify } from "../libs/notify";
import { categoryService, deanService } from "../services";

interface IProps {
  action: actionFormSchedule;
  handleChange: (e: SelectChangeEvent) => void;
  facultieSelectRef: React.RefObject<HTMLSelectElement>;
}

function SelectPerson({
  action,
  handleChange,
  facultieSelectRef,
}: IProps): React.ReactNode {
  const categoriesState: Array<ICategory> = useAppSelector(
    ({ resources }) => resources.categories,
  );
  const formDataState: FormDataState | undefined = useAppSelector(
    ({ appointments: { formData } }) => formData[action],
  );

  const dispatch = useAppDispatch();

  const queries = useQueries([
    { queryKey: "deans", queryFn: deanService.getDeans, enabled: false },
    { queryKey: "categories", queryFn: categoryService.getCategories },
  ]);

  useEffect(
    () => {
      for (let i = 0; i < queries.length; i++) {
        const { data, error } = queries[i] as UseQueryResult<any, any>;

        if (data) {
          if (i === 0) {
            dispatch(setDeans(data));
          } else if (i === 1) {
            dispatch(setCategories(data));
          }
        }

        if (error) {
          notify(error.response.data.error, { type: "error" });
        }
      }
    },
    queries.flatMap(({ data, error }) => [data, error]),
  );

  const inputsInteraction = async () => {
    if (!formDataState.category_id) return;

    dispatch(
      setFormData([
        action,
        {
          ...formDataState,
          disabledAll: false,
          disabledAfterAutocomplete: false,
        },
      ]),
    );

    if (formDataState.category_id === "4") {
      await queries[0].refetch();
    }

    if (facultieSelectRef.current) {
      facultieSelectRef.current.className = "form-select border-0 bg-white";
      facultieSelectRef.current.disabled = false;
      if (formDataState.category_id === "5")
        facultieSelectRef.current.disabled = true;
    }
  };

  useEffect(() => {
    inputsInteraction();
  }, [formDataState.category_id]);

  return (
    <FormControl fullWidth sx={{ minWidth: 120, mt: 1 }}>
      <InputLabel>Category</InputLabel>

      <Select
        name="category_id"
        label="Category"
        value={formDataState.category_id}
        onChange={handleChange}
        required
      >
        <MenuItem value="">
          <em>No seleccionado</em>
        </MenuItem>
        {categoriesState.map(({ id, category_name }) => (
          <MenuItem key={v4()} value={id.toString()}>
            {category_name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default SelectPerson;
