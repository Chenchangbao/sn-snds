export default app => {
  app.service('ComponentService', ['HttpService', HttpService => {
    return {
      'getHttpDemo': params => HttpService.get('getHttpDemo.htm', params)
    }
  }]);
}