let MyServicesCtrl = ($scope, DialogService, SndsService, $rootScope, $q, $state, CtrlInit, CtrlRefresh, CtrlTablePage) => {
    let vm = $scope




    $scope.crumbIconData = [{
            href: "#/overview",
            title: "控制台",
            disable: "true",
            pre: '<span class="fa fa-home"></span>'
        },
        {
            href: "",
            title: "我的服务",
            pre: '<span class="fa fa-tasks"></span>'
        }
    ];
}

MyServicesCtrl.$inject = ['$scope'];
export default app => {
    app.controller('BulkCtrl', MyServicesCtrl);
}