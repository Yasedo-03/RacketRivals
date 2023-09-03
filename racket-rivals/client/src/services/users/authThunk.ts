import { createAsyncThunk } from "@reduxjs/toolkit";
import { usersEndpoints } from "../userss/endpoints";
import { LoginRequest } from "./interfaces/usersInterfaces";
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
      const { userID, token } = authAction.data;
      dispatch(setCredentials({ userID, token }));

      if (token) {
        await dispatch(
          usersEndpoints.endpoints.getMe.initiate(credentials.email)
        );
      }
    }
  }
);
