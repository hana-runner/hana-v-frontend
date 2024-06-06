interface categoryApi {
  getCategories(): Promise<CategoryType>;
}

export default categoryApi;
