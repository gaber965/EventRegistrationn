import { axoisInstance } from "src/http-common";

class facilitiesServices {
  facilitieslist(orgId, appId, pageNumber, search) {
    return axoisInstance.get(
      `/admin/v1/organization/${orgId}/application/${appId}/appcontenttype/facility/content?pageNumber=${pageNumber}&pageSize=8&search=${search}`
    );
  }
  addFacilitie(orgId, appId, data) {
    return axoisInstance.post(
      `/admin/v1/organization/${orgId}/application/${appId}/appcontenttype/facility/content`,
      data
    );
  }
  uploadImage(data) {
    return axoisInstance.post(`/admin/v1/file/save`, data);
  }
  detailsFacilitie(appId, id) {
    return axoisInstance.get(
      `/admin/v1/organization/${orgId}/application/${appId}/appcontenttype/facility/content/${id}`
    );
  }
  deleteFacilitie(orgId, appId, id) {
    return axoisInstance.delete(
      `/admin/v1/organization/${orgId}/application/${appId}/appcontenttype/facility/content/${id}`
    );
  }
  updateFacilitie(orgId, appId, id, data) {
    return axoisInstance.put(
      `/admin/v1/organization/${orgId}/application/${appId}/appcontenttype/facility/content/${id}`,
      data
    );
  }
  getPlaces(orgId, appId) {
    return axoisInstance.get(
      `/admin/v1/organization/${orgId}/application/${appId}/floor/places`
    );
  }
}
export default new facilitiesServices();
