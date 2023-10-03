import { axiosInstanceUser } from "src/http-common";
class adminServices {
  getRegisterMoudrator(orgId, appId, pageNumber) {
    return axiosInstanceUser.get(
      `/admin/v1/organization/${orgId}/application/${appId}/usertype/attendee/user?pageNumber=${pageNumber}&pageSize=10`
    );
  }
  approveRegisterMoudrator(orgId, appId, userId, approve) {
    return axiosInstanceUser.put(
      `/admin/v1/organization/${orgId}/application/${appId}/user/${userId}/RegisterApprove/${approve}`
    );
  }
}
export default new adminServices();
