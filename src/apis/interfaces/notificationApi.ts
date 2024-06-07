interface notificationApi {
  updateNotiReceive: (status: boolean) => Promise<BaseResponseType>;
  updateDeviceToken: (token: string) => Promise<BaseResponseType>;
  fetchAlarms: () => Promise<ApiResponseType<NotificationFetchResType[]>>;
}
export default notificationApi;
