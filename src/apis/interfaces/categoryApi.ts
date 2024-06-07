import { categoryType } from "../../types/category";

interface categoryApi {
  getCategories(): Promise<categoryType>;
}

export default categoryApi;
