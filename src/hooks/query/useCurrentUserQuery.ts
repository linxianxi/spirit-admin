import {
  QueryFunction,
  QueryKey,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { queryClient } from "../../main";

export const currentUserQueryKey = ["currentUser"];

export const useCurrentUserQuery = (
  options?: Omit<
    UseQueryOptions<AxiosResponse<any, any>>,
    "queryKey" | "queryFn"
  >
) => useQuery(currentUserQueryKey, () => axios.get("/api/me"), options);

export const getCurrentUser = () => {
  const data: any = queryClient.getQueryData(currentUserQueryKey);
  return {
    username: data?.data.data.username,
  };
};
