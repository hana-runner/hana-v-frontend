import React from "react";
import { useQuery } from "@tanstack/react-query";
import ApiClient from "../apis/apiClient";

const useInterestsQuery = () => {
  const { isLoading, data: userInterests } = useQuery<
    ApiResponseType<UserInterestType[]>
  >({
    queryKey: ["userInterests"],
    queryFn: () => {
      const response = ApiClient.getInstance().getUserInterests();
      return response;
    },
  });
  return { isLoading, userInterests };
};

export default useInterestsQuery;
