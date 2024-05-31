interface interestApi {
  getUserInterests(): Promise<userInterestType[]>;
}

export default interestApi;
