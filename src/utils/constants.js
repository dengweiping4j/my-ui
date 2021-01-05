const debug = true;

module.exports = {
  apiServer: debug ? "http://localhost:8769" : "http://192.168.11.59:9090",

  loginURL: "/session/new",
  logoutURL: "http://localhost:9090/api/logout",
  loginSSO: {
    redirect_uri: '/user/blank/login_sso_redirect',
    getUserInfo: '/api/security/users/current/loginResponse',
  },

  api: {
    userLogin: '/api/login',
  }
}