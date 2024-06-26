interface accountApi {
  getAccounts(): Promise<ApiResponseType<AccountType[]>>;

  checkAccountNumber(
    accountInfo: AccountInfoType,
  ): Promise<ApiResponseType<AccountType>>;

  registerAccount(account: AccountType): Promise<BaseResponseType>;

  deleteAccountInfo(accountId: number): Promise<BaseResponseType>;

  getExpensePerInterests(): Promise<ApiResponseType<InterestExpenseType[]>>;
}

export default accountApi;
