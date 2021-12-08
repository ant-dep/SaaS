import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  follows: [],
};

export const followSlice = createSlice({
  name: "follow",
  initialState,
  reducers: {
    setFollow: (state, action) => {
      console.log("setFollow", action.payload);
      state.follows = action.payload;
    },
  },
});

export const { setFollow } = followSlice.actions;

// selectors
export const selectFollow = (state) => state.follow.follows;

//*  createSlice will return an object that looks like:
// {
//     name : string,
//     reducer : ReducerFunction,
//     actions : Record<string, ActionCreator>,
//     caseReducers: Record<string, CaseReducer>
// }
//
// *//
export default followSlice.reducer;
