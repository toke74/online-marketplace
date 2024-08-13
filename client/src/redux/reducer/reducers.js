import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice.js";

export const rootReducer = combineReducers({ user: userReducer });
