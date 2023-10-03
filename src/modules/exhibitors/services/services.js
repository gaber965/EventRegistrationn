import { axoisInstance } from "src/http-common";
class adminServices {
  getExhibitorCategories(orgId, appId, pageNumber) {
    return axoisInstance.get(
      `/admin/v1/organization/${orgId}/application/${appId}/appcontentcatgorytype/exhibitor/catgory?pageNumber=${pageNumber}&pageSize=0`
    );
  }
  getCategory(orgId, appId) {
    return axoisInstance.get(
      `admin/v1/organization/${orgId}/application/${appId}/appcontentcatgorytype/exhibitor/catgories`
    );
  }
  addExhibitorCategory(orgId, appId, data) {
    return axoisInstance.post(
      `/admin/v1/organization/${orgId}/application/${appId}/appcontentcatgorytype/exhibitor/catgory`,
      data
    );
  }
  deleteExhibitorCategory(appId, id) {
    return axoisInstance.delete(
      `/admin/v1/organization/${orgId}/application/${appId}/appcontentcatgorytype/exhibitor/catgory/${id}`
    );
  }
  detailesExhibitorCategory(orgId, appId, id) {
    return axoisInstance.get(
      `/admin/v1/organization/${orgId}/application/${appId}/appcontentcatgorytype/exhibitor/catgory/${id}`
    );
  }
  editExhibitorCategory(orgId, appId, id, data) {
    return axoisInstance.put(
      `/admin/v1/organization/${orgId}/application/${appId}/appcontentcatgorytype/exhibitor/catgory/${id}`,
      data
    );
  }
  getAllExibitor(orgId, appId, filter, search) {
    return axoisInstance.get(
      `/admin/v1/organization/${orgId}/application/${appId}/appcontenttype/exhibitor/content?pageNumber=0&pageSize=0&filter=${filter}&search=${search}`
    );
  }
  getImageUrl(data) {
    return axoisInstance.post(`/admin/v1/file/save`, data);
  }
  addExhibitor(orgId, appId, data) {
    return axoisInstance.post(
      `/admin/v1/organization/${orgId}/application/${appId}/appcontenttype/exhibitor/content`,
      data
    );
  }
  detailesExhibitor(orgId, appId, id) {
    return axoisInstance.get(
      `/admin/v1/organization/${orgId}/application/${appId}/appcontenttype/exhibitor/content/${id}`
    );
  }
  editExhibitor(orgId, appId, id, data) {
    return axoisInstance.put(
      `/admin/v1/organization/${orgId}/application/${appId}/appcontenttype/exhibitor/content/${id}`,
      data
    );
  }
  deleteExhibitor(orgId, appId, id) {
    return axoisInstance.delete(
      `/admin/v1/organization/${orgId}/application/${appId}/appcontenttype/exhibitor/content/${id}`
    );
  }
}
export default new adminServices();
