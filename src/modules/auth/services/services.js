import {axiosInstanceUser} from "src/http-common";

class authServices {
  logIn(data) {
    return axiosInstanceUser.post("/admin/v1/user/login", data);
  }
}

export default new authServices();
