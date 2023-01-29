import {
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";

export const currentUserQueryKey = ["currentUser"];

export const useCurrentUserQuery = (
  options?: Omit<
    UseQueryOptions<AxiosResponse<any, any>>,
    "queryKey" | "queryFn"
  >
) => useQuery(currentUserQueryKey, () => axios.get("/api/me"), options);

export const useUserName = () => {
  const queryClient = useQueryClient();
  const data: any = queryClient.getQueryData(currentUserQueryKey);
  return data?.data.data.username;
};
