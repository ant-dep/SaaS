import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  prospects: [],
};

export const prospectSlice = createSlice({
  name: "prospect",
  initialState,
  reducers: {
    setProspect: (state, action) => {
      state.prospects = action.payload;
    },
  },
});

export const { setProspect } = prospectSlice.actions;

// selectors
export const selectProspect = (state) => state.prospect.prospects;

//*  createSlice will return an object that looks like:
// {
//     name : string,
//     reducer : ReducerFunction,
//     actions : Record<string, ActionCreator>,
//     caseReducers: Record<string, CaseReducer>
// }
//
// *//
export default prospectSlice.reducer;
