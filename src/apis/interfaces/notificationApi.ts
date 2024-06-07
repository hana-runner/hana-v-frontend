interface notificationApi {
  updateNotiReceive: (status: boolean) => Promise<BaseResponseType>;
  updateDeviceToken: (token: string) => Promise<BaseResponseType>;
}
export default notificationApi;
