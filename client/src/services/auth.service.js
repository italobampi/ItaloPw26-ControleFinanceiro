import axios from "axios";

const signup = (user) => {
  return axios.post("/users", user);
};

const login = (user) => {
  return axios
    .post("/login", user)
    .then((response) => {
      if (response.data) {
        localStorage.setItem("token", JSON.stringify(response.data.token));
      }
      return response.data;
    })
    .catch(() => {
      return "Login failed";
    });
};

const logout = () => {
  localStorage.removeItem("token");
};

const getCurrentUser = () => {
  return axios.get("/login/user-info",{headers:getAuthHeader()}).then((response) => {
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
  })
};

const isAuthenticated = () => {
  return localStorage.getItem("token") ? true : false;
};

const AuthService = {
  signup,
  login,
  logout,
  getCurrentUser,
  isAuthenticated,
};
const getAuthHeader = () => {
    const token = JSON.parse(localStorage.getItem('token'));
    if (token) {
        return {Authorization: `Bearer ${token}`}; //'Bearer ' + token
    } else {
        return {}
    }
}

export default AuthService;
