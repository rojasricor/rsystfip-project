import LoadingButton from "@mui/lab/LoadingButton";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useCallback, useState } from "react";
import FormCancellPerson from "./FormCancellPerson";

interface IProps {
  stateModalCancell: boolean;
  closeModalCancell: () => void;
}

function ModalCancellPersonConfirmation({
  stateModalCancell,
  closeModalCancell,
}: IProps): React.ReactNode {
  const [isLoadingCancellPerson, setIsLoadingCancellPerson] = useState(false);

  const changeIsLoadingCancellPerson = useCallback(
    (value: boolean) => setIsLoadingCancellPerson(value),
    [],
  );

  return (
    <Dialog open={stateModalCancell} onClose={closeModalCancell}>
      <DialogTitle>Cancel appointment</DialogTitle>

      <DialogContent>
        <DialogContentText>
          Are you sure you want to cancel this appointment?
        </DialogContentText>

        <FormCancellPerson
          closeModalCancell={closeModalCancell}
          changeIsLoadingCancellPerson={changeIsLoadingCancellPerson}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={closeModalCancell}>No</Button>

        <LoadingButton
          type="submit"
          form="formCancellation"
          loading={isLoadingCancellPerson}
        >
          Yes, cancell
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

export default ModalCancellPersonConfirmation;
