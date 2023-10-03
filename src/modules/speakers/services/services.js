import { axiosInstanceUser, axoisInstance } from "src/http-common";

class speakerServices {
  getAllSpeaker(orgId, appId, search, pageNumber) {
    return axiosInstanceUser.get(
      `/admin/v1/organization/${orgId}/application/${appId}/usertype/speaker/user?search=${search}&pageNumber=${pageNumber}&pageSize=0`
    );
  }
  deleteSpeaker(orgId, appId, id) {
    return axiosInstanceUser.delete(
      `/admin/v1/organization/${orgId}/application/${appId}/usertype/speaker/user/${id}`
    );
  }
  uploadImage(data) {
    return axoisInstance.post(`/admin/v1/file/save`, data);
  }
  addSpeaker(orgId, appId, data) {
    return axiosInstanceUser.post(
      `/admin/v1/organization/${orgId}/application/${appId}/usertype/speaker/user`,
      data
    );
  }
  UpdateSpeaker(orgId, appId, id, data) {
    return axiosInstanceUser.put(
      `/admin/v1/organization/${orgId}/application/${appId}/usertype/speaker/user/${id}`,
      data
    );
  }
  detailsSpeaker(orgId, appId, id) {
    return axiosInstanceUser.get(
      `/admin/v1/organization/${orgId}/application/${appId}/usertype/speaker/user/${id}`
    );
  }
}

export default new speakerServices();
