import { axoisInstance } from "src/http-common";
class eventServices {
  getImageUrl(data) {
    return axoisInstance.post(`/admin/v1/file/save`, data);
  }
  addEvent(data, orgid) {
    return axoisInstance.post(`/admin/v1/organization/${orgid}/event`, data);
  }
  getDetailsEvent(appid) {
    return axoisInstance.get(`/admin/v1/organization/${appid}/event`);
  }
  getAllEvent(appid) {
    return axoisInstance.get(`admin/v1/organization/${appid}/event`);
  }
  eventDetailes(orgid, appId) {
    return axoisInstance.get(
      `admin/v1/organization/${orgid}/application/${appId}/event`
    );
  }
  activeEvent(orgid, appId, status) {
    return axoisInstance.put(
      `/admin/v1/organization/${orgid}/application/${appId}/event/active/${status}`
    );
  }
  deleteEvent(orgid, id) {
    return axoisInstance.delete(
      `/admin/v1/organization/${orgid}/application/${id}/event`
    );
  }
  EventDropDown(orgid) {
    return axoisInstance.get(`/admin/v1/organization/${orgid}/event`);
  }
  getEventDetails(orgid, id) {
    return axoisInstance.get(`/admin/v1/organization/${orgid}/application/${id}/event`)
  }
  updateEvent(orgid, appid, data) {
    return axoisInstance.put(`/admin/v1/organization/${orgid}/application/${appid}/event`, data)
  }
}
export default new eventServices();
