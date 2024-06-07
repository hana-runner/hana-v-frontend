import { createContext, useContext } from "react";
import useInterestsQuery from "../../hooks/useInterestsQuery";

interface InterestContextType {
  isLoading: boolean;
  userInterests: ApiResponseType<UserInterestType[]>;
  refetch: () => void;
}

const InterestContext = createContext<InterestContextType>({
  isLoading: false,
  userInterests: {
    code: "",
    message: "",
    data: [],
    status: 0,
    success: false,
    timestamp: "",
  },
  refetch: () => {},
});

export const InterestContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isLoading, userInterests, refetch } = useInterestsQuery();

  return (
    <InterestContext.Provider value={{ isLoading, userInterests, refetch }}>
      {children}
    </InterestContext.Provider>
  );
};

export const useInterests = () => {
  return useContext(InterestContext);
};
