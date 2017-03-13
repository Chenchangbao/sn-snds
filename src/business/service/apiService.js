export default app => {
  app.service('ApiService', ['$http', $http => {
    return dir => $http.get('./api/' + dir)
  }]);
  app.factory('CtrlInit', [() => {
    let _cb
    return (cb, vm) => {
      if (cb && vm) {
        vm.modelSelect = {}
      }
      _cb = cb ? cb : _cb;
      (cb || _cb)()
    }
  }])
  app.factory('CtrlRefresh', ['CtrlInit', CtrlInit => {
    return () => {
      CtrlInit()
    }
  }])
  app.factory('CtrlTablePage', ['CtrlRefresh', CtrlRefresh => {
    return () => {
      let page = {
        pageNumber: 1,
        pageSize: 10,
        pageTotal: 0,
        changePage: function (pageNumber) {
          this.pageNumber = pageNumber
          CtrlRefresh()
        }
      }
      return page
    }
  }])
  app.factory('IpTest', () => ip => {
    r = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ip)
  })
}