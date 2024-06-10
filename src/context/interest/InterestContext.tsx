import { createContext, useContext } from "react";
import useInterestsQuery from "../../hooks/useInterestsQuery";

interface InterestContextType {
  isLoading: boolean;
  userInterests: ApiResponseType<UserInterestType[]>;
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
});

export const InterestContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isLoading, userInterests } = useInterestsQuery();

  return (
    <InterestContext.Provider value={{ isLoading, userInterests }}>
      {children}
    </InterestContext.Provider>
  );
};

export const useInterests = () => {
  return useContext(InterestContext);
};
