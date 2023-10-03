import { axoisInstance } from "src/http-common";
class adminServices {
  getSessionCategories(orgId, appId, pageNumber) {
    return axoisInstance.get(
      `/admin/v1/organization/${orgId}/application/${appId}/appcontentcatgorytype/session/catgory?pageNumber=${pageNumber}&pageSize=0`
    );
  }
  getCategory(orgId, appId) {
    return axoisInstance.get(
      `admin/v1/organization/${orgId}/application/${appId}/appcontentcatgorytype/session/catgories`
    );
  }
  addSessionCategory(orgId, appId, data) {
    return axoisInstance.post(
      `/admin/v1/organization/${orgId}/application/${appId}/appcontentcatgorytype/session/catgory`,
      data
    );
  }
  deleteSessionCategory(orgId, appId, id) {
    return axoisInstance.delete(
      `/admin/v1/organization/${orgId}/application/${appId}/appcontentcatgorytype/session/catgory/${id}`
    );
  }
  detailesSessionCategory(orgId, appId, id) {
    return axoisInstance.get(
      `/admin/v1/organization/${orgId}/application/${appId}/appcontentcatgorytype/session/catgory/${id}`
    );
  }
  editSessionCategory(orgId, appId, id, data) {
    return axoisInstance.put(
      `/admin/v1/organization/${orgId}/application/${appId}/appcontentcatgorytype/session/catgory/${id}`,
      data
    );
  }
  getImageUrl(data) {
    return axoisInstance.post(`/admin/v1/file/save`, data);
  }
  getAllSession(orgId, appId, pageNumber, date, search) {
    return axoisInstance.get(
      `/admin/v1/organization/${orgId}/application/${appId}/appcontenttype/session/appcontent?pageNumber=${pageNumber}&pageSize=10&date=${date}&search=${search}`
    );
  }
  addSession(orgId, appId, data) {
    return axoisInstance.post(
      `/admin/v1/organization/${orgId}/application/${appId}/appcontenttype/session/content`,
      data
    );
  }
  detailesSession(orgId, appId, id) {
    return axoisInstance.get(
      `/admin/v1/organization/${orgId}/application/${appId}/appcontenttype/session/appcontent/${id}`
    );
  }
  deleteSession(orgId, appId, id) {
    return axoisInstance.delete(
      `/admin/v1/organization/${orgId}/application/${appId}/appcontenttype/session/content/${id}`
    );
  }
  editSession(orgId, appId, id, data) {
    return axoisInstance.put(
      `/admin/v1/organization/${orgId}/application/${appId}/appcontenttype/session/content/${id}`,
      data
    );
  }

  sessionSpeakers(orgId, appId, id) {
    return axoisInstance.get(
      `/admin/v1/organization/${orgId}/application/${appId}/appcontenttype/session/appcontent/${id}/usertype/speaker/user`
    );
  }
  notAsignSessionSpeaker(orgId, appId, id) {
    return axoisInstance.get(
      `/admin/v1/organization/${orgId}/application/${appId}/appcontenttype/session/appcontent/${id}/usertype/speaker/notassignuser`
    );
  }
  addSessionSpeaker(orgId, appId, id, data) {
    return axoisInstance.post(
      `admin/v1/organization/${orgId}/application/${appId}/appcontent/${id}/usertype/speaker/user`,
      data
    );
  }
  deleteSessionSpeaker(orgId, appId, id, userid) {
    return axoisInstance.delete(
      `/admin/v1/organization/${orgId}/application/${appId}/appcontent/${id}/user/${userid}`
    );
  }
  getDate(orgId, appId) {
    return axoisInstance.get(
      `/admin/v1/organization/${orgId}/application/${appId}/event`
    );
  }
}
export default new adminServices();
