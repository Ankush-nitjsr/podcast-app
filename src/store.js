import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";

export default configureStore({
  reducer: {
    user: userReducer,
  },
});

// configureStore: to configure the entire store
// userReducer: reducer to manage user data
