import moment from 'moment'
let InstancesCtrl = ($scope, DialogService, SndsService, $rootScope, $q, $state, CtrlInit, CtrlRefresh, CtrlTablePage) => {
    let vm = $scope

    vm.pageNumber = 1
    vm.pageSize = 10

    vm.pageCtrl = CtrlTablePage()

    CtrlInit(function getSystemExDatas() {
        let param = {
            pageNumber: vm.pageNumber,
            pageSize: vm.pageSize,
            keyword: vm.keyword
        }
        SndsService.getInstancesList(param).then(d => {
            d.results.forEach((el) => {
                el.createTime = moment(el.createTime).format('YYYY-MM-DD HH:mm:ss')
            })
            $scope.systemExDatas = d.results;
            vm.pageCtrl.pageNumber = d.page.index
            vm.pageCtrl.pageSize = d.page.size
            vm.pageCtrl.pageTotal = d.page.records || 1
        });
    })

    $scope.newInstance = function () {
        $state.go('Portal.InstanceNew', {}, {
            reload: true
        })
    }
    $scope.delInstance = function () {
        // getSystemExDatas();
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


    vm.search = () => {
        CtrlRefresh()
    }
}

InstancesCtrl.$inject = ['$scope', 'DialogService', 'SndsService', '$rootScope', '$q', '$state', 'CtrlInit', 'CtrlRefresh', 'CtrlTablePage'];
export default app => app.controller('InstancesCtrl', InstancesCtrl);