import { axiosInstanceUser } from "src/http-common";

class referenceServices {
  getAllReference(orgId, appId) {
    return axiosInstanceUser.get(
      `/admin/v1/organization/${orgId}/application/${appId}/references?pageNumber=1&pageSize=0`
    );
  }
  addData(data, orgId, appId) {
    return axiosInstanceUser.post(
      `/admin/v1/organization/${orgId}/application/${appId}/references`, data
    );
  }
  updateData(data, orgId, appId, id) {
    return axiosInstanceUser.put(
      `/admin/v1/organization/${orgId}/application/${appId}/references/${id}`, data
    );
  }
  deleteData(orgId, appId, id) {
    return axiosInstanceUser.delete(
      `/admin/v1/organization/${orgId}/application/${appId}/references/${id}`
    );
  }
  getDetails(orgId, appId, id) {
    return axiosInstanceUser.get(
      `/admin/v1/organization/${orgId}/application/${appId}/references/${id}`
    );
  }

}

export default new referenceServices();
