let InstanceNewCtrl = ($scope, DialogService, SndsService, $rootScope, $q, AlertService, $state, CtrlInit, CtrlRefresh, SndsUser) => {
    let vm = $scope

    CtrlInit(function () {
        SndsService.newInstanceMySystem().then(d => {
            vm.modelSelect.mySystem = d;
        });
        SndsService.newInstanceTemplates().then(d => {
            vm.modelSelect.cpuCores = d;
        });
        SndsUser.then(() => {
            vm.inputData = {
                system: '',
                systemCode: '',
                systemAlias: '',
                env: '',
                envId: '',
                proposer: '',
                proposerCode: '',
                leader: vm.user.userName,
                leaderCode: vm.user.userId,
                dbName: '',
                haType: '1',
                cpuCores: '',
                memory: '',
                diskSize: '200',
                quantity: '1',
                remark: ''
            }
        })
    }, vm)

    vm.changeSystem = () => {
        if (!vm.systemObj) return
        vm.inputData.system = vm.systemObj.name
        vm.inputData.systemCode = vm.systemObj.code
        vm.inputData.systemAlias = vm.systemObj.nameEn

        // vm.inputData.systemCode = 'SMC160803000002'
        SndsService.newInstanceEnvs(vm.inputData.systemCode).then(d => {
            vm.modelSelect.envs = d;
        });
    }

    vm.newInstance = () => {
        AlertService.confirm({
            title: '申请创建数据库机器',
            content: '确定要申请创建数据库服务吗？'
        }).then(() => {
            vm.inputData.env = vm.envObj.name
            vm.inputData.envId = vm.envObj.id
            vm.inputData.envType = vm.envObj.type
            vm.inputData.proposer = vm.user.userName
            vm.inputData.proposerCode = vm.user.userId
            vm.inputData.cpuCores = vm.cpuCoresObj.cpuCore
            vm.inputData.memory = vm.cpuCoresObj.memorySize

            SndsService.newInstance(vm.inputData).then(d => {
                $state.go('Portal.MyServices');
            });
        }, () => {
            console.info('confirm CANCEL');
        })
    };

    $scope.cancel = () => {
        $state.go('Portal.Instances', {}, {
            reload: true
        })
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
        { href: "", title: "新增实例", pre: '<span class="fa fa-plus-square-o"></span>' }
    ];
    //加载数据实例（升级完毕）
    function getSystemExDatas() {
        SndsService.getSystemExDatas({ "userId": $scope.user.userId })
            .then(datas => {
                $scope.systemExDatas = datas.list;
                $scope.total = $scope.systemExDatas.length;
            });
    }
    //切换实例选中
    $scope.setToggleEx = function (exData) {
        $scope.exData = exData;
    }
    //切换
    $scope.doToggle = function () {

        if (!$scope.exData) {
            alert('请选择一个实例再进行切换！');
            return;
        }

        DialogService.modal({
            key: 'toggle',
            url: 'business/components/template/manager/toggle/toggleModal.html',
            accept: function () {

            },
            refuse: function () {

            }
        }, {
                key: 'toggle',
                data: { 'msg': '切换', 'exData': $scope.exData }
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
    //modify
    $scope.doModify = function (index) {
        $scope.systemExDatas[index].modify = false;
    }
    $scope.doConfirm = function (index) {
        $scope.systemExDatas[index].modify = true;
    }
}

InstanceNewCtrl.$inject = ['$scope', 'DialogService', 'SndsService', '$rootScope', '$q', 'AlertService', '$state', 'CtrlInit', 'CtrlRefresh', 'SndsUser'];
export default app => app.controller('InstanceNewCtrl', InstanceNewCtrl);