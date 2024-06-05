interface accountApi {
  getAccounts(): Promise<ApiResponseType<AccountType[]>>;
}

export default accountApi;
