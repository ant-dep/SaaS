import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import followReducer from "./followSlice";
import prospectReducer from "./prospectSlice";
import rdvReducer from "./rdvSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    follow: followReducer,
    prospect: prospectReducer,
    rdv: rdvReducer,
  },
});

export default store;
