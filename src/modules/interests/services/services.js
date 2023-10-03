import { axiosInstanceUser } from "src/http-common";

class interestsServices {
  getAllInterests(orgId, appId) {
    return axiosInstanceUser.get(
      `/admin/v1/organization/${orgId}/application/${appId}/interests?pageNumber=1&pageSize=0`
    );
  }
  addData(data, orgId, appId) {
    return axiosInstanceUser.post(
      `/admin/v1/organization/${orgId}/application/${appId}/interests`, data
    );
  }
  updateData(data, orgId, appId, id) {
    return axiosInstanceUser.put(
      `/admin/v1/organization/${orgId}/application/${appId}/interests/${id}`, data
    );
  }
  deleteData(orgId, appId, id) {
    return axiosInstanceUser.delete(
      `/admin/v1/organization/${orgId}/application/${appId}/interests/${id}`
    );
  }
  getDetails(orgId, appId, id) {
    return axiosInstanceUser.get(
      `/admin/v1/organization/${orgId}/application/${appId}/interests/${id}`
    );
  }

}

export default new interestsServices();
