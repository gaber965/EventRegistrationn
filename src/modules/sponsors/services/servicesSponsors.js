import { axoisInstance } from "src/http-common";
class adminServices {
  getSponsorCategories(orgId, appId, pageNumber) {
    return axoisInstance.get(
      `/admin/v1/organization/${orgId}/application/${appId}/appcontentcatgorytype/sponsor/catgory?pageNumber=${pageNumber}&pageSize=0`
    );
  }
  getCategory(orgId, appId) {
    return axoisInstance.get(
      `admin/v1/organization/${orgId}/application/${appId}/appcontentcatgorytype/sponsor/catgories`
    );
  }
  addSponsorCategory(orgId,appId, data) {
    return axoisInstance.post(
      `/admin/v1/organization/${orgId}/application/${appId}/appcontentcatgorytype/sponsor/catgory`,
      data
    );
  }
  deleteSponsorCategory(orgId,appId, id) {
    return axoisInstance.delete(
      `/admin/v1/organization/${orgId}/application/${appId}/appcontentcatgorytype/sponsor/catgory/${id}`
    );
  }
  detailesSponsorCategory(orgId,appId, id) {
    return axoisInstance.get(
      `/admin/v1/organization/${orgId}/application/${appId}/appcontentcatgorytype/sponsor/catgory/${id}`
    );
  }
  editSponsorCategory(orgId, appId, id, data) {
    return axoisInstance.put(
      `/admin/v1/organization/${orgId}/application/${appId}/appcontentcatgorytype/sponsor/catgory/${id}`,
      data
    );
  }
  getAllSponsor(orgId, appId, pageNumber, filter, search) {
    return axoisInstance.get(
      `/admin/v1/organization/${orgId}/application/${appId}/appcontenttype/sponsor/content?pageNumber=${pageNumber}&pageSize=0&filter=${filter}&search=${search}`
    );
  }
  getImageUrl(data) {
    return axoisInstance.post(`/admin/v1/file/save`, data);
  }
  addSponsor(orgId, appId, data) {
    return axoisInstance.post(
      `/admin/v1/organization/${orgId}/application/${appId}/appcontenttype/sponsor/content`,
      data
    );
  }
  deleteSponsor(orgId, appId, id) {
    return axoisInstance.delete(
      `/admin/v1/organization/${orgId}/application/${appId}/appcontenttype/sponsor/content/${id}`
    );
  }
  detailesSponsor(orgId, appId, id) {
    return axoisInstance.get(
      `/admin/v1/organization/${orgId}/application/${appId}/appcontenttype/sponsor/content/${id}`
    );
  }
  editSponsor(orgId, appId, id, data) {
    return axoisInstance.put(
      `/admin/v1/organization/${orgId}/application/${appId}/appcontenttype/sponsor/content/${id}`,
      data
    );
  }
}
export default new adminServices();
