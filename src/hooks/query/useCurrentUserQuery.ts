import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { queryClient } from "../../main";

export const currentUserQueryKey = ["currentUser"];

export const useCurrentUserQuery = () =>
  useQuery(currentUserQueryKey, () => axios.get("/api/me"), {
    enabled: !!localStorage.getItem("token"),
  });

export const getCurrentUser = () => {
  const data: any = queryClient.getQueryData(currentUserQueryKey);
  return {
    username: data?.data.data.username,
  };
};
