import { axoisInstance } from "src/http-common";

class newsServices {
  news(orgId, appId, pageNumber, search) {
    return axoisInstance.get(
      `/admin/v1/organization/${orgId}/application/${appId}/appcontenttype/news/content?pageNumber=${pageNumber}&pageSize=8&search=${search}`
    );
  }
  addNews(orgId, appId, data) {
    return axoisInstance.post(
      `/admin/v1/organization/${orgId}/application/${appId}/appcontenttype/news/content`,
      data
    );
  }
  uploadImage(data) {
    return axoisInstance.post(`/admin/v1/file/save`, data);
  }
  detailsNews(orgId, appId, id) {
    return axoisInstance.get(
      `/admin/v1/organization/${orgId}/application/${appId}/appcontenttype/news/content/${id}`
    );
  }
  deleteNews(orgId, appId, id) {
    return axoisInstance.delete(
      `/admin/v1/organization/${orgId}/application/${appId}/appcontenttype/news/content/${id}`
    );
  }
  updateNews(orgId, appId, id, data) {
    return axoisInstance.put(
      `/admin/v1/organization/${orgId}/application/${appId}/appcontenttype/news/content/${id}`,
      data
    );
  }
  getPlaces(orgId, appId) {
    return axoisInstance.get(
      `/admin/v1/organization/${orgId}/application/${appId}/floor/places`
    );
  }
}

export default new newsServices();
