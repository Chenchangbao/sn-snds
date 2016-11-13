let InstancesCtrl = ($scope, DialogService, SndsService, $rootScope, $q) => {

    $scope.user = $rootScope.user;
    $scope.systemExDatas = [];
    $scope.page = 1;
    $scope.pageSize = 5;
    $scope.total = 0;
    $scope.exData = null;


    // getSystemExDatas();

    // SndsService.getUserInfo()
    //     .then( datas => {
    //         $scope.user.userName = datas.userName; 
    //         $scope.user.userId = datas.userId;   
    //         getSystemExDatas();
    //     });

    //面包屑
    $scope.crumbIconData = [
        { href: "#/overview", title: "控制台", disable: "true", pre: '<span class="fa fa-home"></span>' },
        { href: "", title: "实例列表", pre: '<span class="fa fa-table"></span>' }
    ];
    //加载数据实例（升级完毕）
    function getSystemExDatas() {
        SndsService.getInstancesList({ "userId": $scope.user.userId })
            .then(datas => {
                $scope.systemExDatas = datas.list;
                $scope.total = $scope.systemExDatas.length;
            });
    }

    //显示日志
    $scope.showData = function (exName) {

        DialogService.modal({
            key: 'data',
            url: 'business/components/template/manager/log/log.html',
            accept: function (result) {
                console.log(result);
            },
            refuse: function (reason) {
                console.log(reason);
            }
        }, {
                key: 'data',
                data: { "msg": "日志", "exName": exName }
            });
    }
}

InstancesCtrl.$inject = ['$scope', 'DialogService', 'SndsService', '$rootScope', '$q'];
export default app => app.controller('InstancesCtrl', InstancesCtrl);