import { createAsyncThunk } from "@reduxjs/toolkit";
import { usersEndpoints } from "../users/endpoints";
import { LoginRequest } from "./interfaces/authInterfaces";
import { authEndpoints } from "./endpoints";
import { setCredentials } from "../../store/slice/auth";

export const authenticateAndFetchUser = createAsyncThunk(
  "auth/authenticateAndFetchUser",
  async (credentials: LoginRequest, { dispatch }) => {
    const authAction = await dispatch(
      authEndpoints.endpoints.login.initiate(credentials)
    );

    if ("error" in authAction && authAction.error) {
      const errorData = (authAction.error as any).data;

      if (errorData && typeof errorData.message === "string") {
        throw new Error(errorData.message);
      } else {
        throw new Error("An unknown error occurred.");
      }
    }

    if ("data" in authAction && authAction.data) {
      const { userID, accessToken } = authAction.data;

      dispatch(setCredentials({ userID, accessToken }));

      if (accessToken) {
        console.log(accessToken);
        
        console.log('trigger getMe');
        await dispatch(usersEndpoints.endpoints.getMe.initiate());
      }
    }
  }
);
