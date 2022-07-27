import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useLoginMutation = () =>
  useMutation((data) => axios.post("/api/login", data));
