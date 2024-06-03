import { AccountType } from "../../components/account/AccountCard";

interface accountApi {
  getAccounts(): Promise<AccountType>;
}

export default accountApi;
