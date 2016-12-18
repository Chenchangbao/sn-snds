let InstancesCtrl = ($scope, DialogService, SndsService, $rootScope, $q, $state) => {
    let vm = $scope
    $scope.user = $rootScope.user;
    $scope.systemExDatas = [];
    $scope.page = 1;
    $scope.pageSize = 10;
    $scope.total = 0;
    $scope.exData = null;


    getSystemExDatas();

    $scope.newInstance = function () {
        $state.go('Portal.InstanceNew', {}, {
            reload: true
        })
    }
    $scope.delInstance = function () {
        getSystemExDatas();
    }

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
        let param = {
            pageNumber: vm.pageNumber,
            pageSize: vm.pageSize,
            keyword: vm.keyword
        }
        SndsService.getInstancesList(param).then(d => {
            $scope.systemExDatas = d.list;
            vm.pageNumber = d.pageNumber
            vm.pageSize = d.pageSize
            vm.pageTotal = d.pageTotal
        });
    }

    vm.search = () => {
        getSystemExDatas()
    }

    vm.changePage = (pageNumber) => {
        vm.pageNumber = pageNumber
        getSystemExDatas()
    }

}

InstancesCtrl.$inject = ['$scope', 'DialogService', 'SndsService', '$rootScope', '$q', '$state'];
export default app => app.controller('InstancesCtrl', InstancesCtrl);