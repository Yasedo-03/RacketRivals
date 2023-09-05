import { useEffect, useState } from "react";
import { useAppDispatch } from "../store/useStore";
import { useRefreshQuery } from "../../services/auth/endpoints";
import { useGetMeQuery } from "../../services/users/endpoints";
import { setCredentials } from "../../store/slice/auth";

export const useAutoRefreshTokenAndFetchUser = () => {
  const [isRefreshed, setIsRefreshed] = useState(false);
  const dispatch = useAppDispatch();

  const { data: userCredentials, status: refreshStatus } = useRefreshQuery();
  useGetMeQuery(undefined, {
    skip: !isRefreshed,
  });

  useEffect(() => {
    if (refreshStatus === "fulfilled" && userCredentials) {
      dispatch(setCredentials(userCredentials));
      setIsRefreshed(true);
    }
  }, [userCredentials, refreshStatus]);
};
