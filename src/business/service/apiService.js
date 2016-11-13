export default app => {
  app.service('ApiService', ['$http', $http => {
    return dir => $http.get('./api/'+dir)
  }]);
}