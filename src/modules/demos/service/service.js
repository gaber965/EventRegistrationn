import { axoisInstance, axiosInstanceUser } from "src/http-common";

class Deoms {
  // start apis demo three
  speakerList(pageNumber, appid, pageSize) {
    return axiosInstanceUser.get(
      `/Site/v1/application/${appid}/usertype/speaker/user?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }
  newsList(pageNumber, appid, pageSize) {
    return axoisInstance.get(
      `/site/v1/application/${appid}/appcontenttype/news/content?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }
  ExhibitorsList(pageNumber, appid, pageSize) {
    return axoisInstance.get(
      `/site/v1/application/${appid}/appcontenttype/exhibitor/content?PageNumber=${pageNumber}&PageSize=${pageSize}`
    );
  }
  sponsorList(pageNumber, appid, pageSize) {
    return axoisInstance.get(
      `/site/v1/application/${appid}/appcontenttype/sponsor/content?PageNumber=${pageNumber}&PageSize=${pageSize}`
    );
  }
  sessionList(pageNumber, appid, pageSize, date) {
    return axoisInstance.get(
      `site/v1/application/${appid}/appcontenttype/session/appcontent?pageNumber=${pageNumber}&pageSize=${pageSize}&date=${date}`
    );
  }
  eventDetailes(id) {
    return axoisInstance.get(`site/v1/application/${id}/event`);
  }
  getSessionDate(id) {
    return axoisInstance.get(`site/v1/application/${id}/event`);
  }
  getInterest(appId) {
    return axiosInstanceUser.get(
      `/site/v1/application/${appId}/interests?pageNumber=1&pageSize=0`
    );
  }
  getReferences(appId) {
    return axiosInstanceUser.get(
      `/site/v1/application/${appId}/references?pageNumber=1&pageSize=0`
    );
  }
  reSendEmail(appId, email) {
    return axiosInstanceUser.put(
      `/site/v1/application/${appId}/VerifyUser/ReSendEmail/${email}`
    );
  }
  submitUser(appId, data) {
    return axiosInstanceUser.post(
      `/site/v1/application/${appId}/usertype/attendee/RegisterUser`,
      data
    );
  }
  verifyemail(userId, expire) {
    return axiosInstanceUser.put(`/site/v1/user/${userId}/expire/${expire}/VerifyUser/Email`)
  }
  verifyOtp(userId, otp) {
    return axiosInstanceUser.put(
      `/site/v1/user/${userId}/VerifyUser/Phone/${otp}`
    );
  }
  resendOtp(appId, userId) {
    return axiosInstanceUser.put(
      `/site/v1/application/${appId}/user/${userId}/VerifyUser/ReSendsms`
    );
  }
  // end apis demo thress
}

export default new Deoms();
