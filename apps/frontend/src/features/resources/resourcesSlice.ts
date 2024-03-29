import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ICategory, IDocument, IFacultie } from "../../interfaces";

interface ResourcesState {
  categories: Array<ICategory>;
  documents: Array<IDocument>;
  faculties: Array<IFacultie>;
}

const initialState: ResourcesState = {
  categories: [],
  documents: [],
  faculties: [],
};

const resourcesSlice = createSlice({
  name: "resources",
  initialState,
  reducers: {
    setCategories(
      state,
      { payload }: PayloadAction<Array<ICategory>>,
    ): ResourcesState {
      return { ...state, categories: payload };
    },
    setDocuments(
      state,
      { payload }: PayloadAction<Array<IDocument>>,
    ): ResourcesState {
      return { ...state, documents: payload };
    },
    setFaculties(
      state,
      { payload }: PayloadAction<Array<IFacultie>>,
    ): ResourcesState {
      return { ...state, faculties: payload };
    },
  },
});

export const { setCategories, setDocuments, setFaculties } =
  resourcesSlice.actions;

export default resourcesSlice.reducer;
