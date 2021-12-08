import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rdv: [],
};

export const rdvSlice = createSlice({
  name: "rdv",
  initialState,
  reducers: {
    setRdv: (state, action) => {
      state.rdv = action.payload;
    },
  },
});

export const { setRdv } = rdvSlice.actions;

// selectors
export const selectRdv = (state) => state.rdv.rdv;

//*  createSlice will return an object that looks like:
// {
//     name : string,
//     reducer : ReducerFunction,
//     actions : Record<string, ActionCreator>,
//     caseReducers: Record<string, CaseReducer>
// }
//
// *//
export default rdvSlice.reducer;
