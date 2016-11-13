let ManagerCtrl = ($scope,DialogService,SndsService,$rootScope,$q) => {

    $scope.user = $rootScope.user;
    $scope.systemExDatas = [];
    $scope.page = 1;  
    $scope.pageSize = 5; 
    $scope.total = 0;
    $scope.exData = null;


    var deferred = $q.defer();
    var promise = deferred.promise;
    promise.then(function(){
        getSystemExDatas();
    })

    // SndsService.getUserInfo()
    //     .then( datas => {
    //         $scope.user.userName = datas.userName; 
    //         $scope.user.userId = datas.userId;   
    //         getSystemExDatas();
    //     });

    //面包屑
    $scope.crumbIconData = [
        {href:"#/overview",title:"控制台",disable:"true",pre:'<span class="fa fa-home"></span>'},
        {href:"",title:"实例管理",pre:'<span class="fa fa-table"></span>'}
    ];
    //加载数据实例（升级完毕）
    function getSystemExDatas(){
        SndsService.getSystemExDatas({"userId":$scope.user.userId})
            .then( datas => {
                $scope.systemExDatas = datas.list;
                $scope.total = $scope.systemExDatas.length;
            });
    }
    //切换实例选中
    $scope.setToggleEx = function(exData){
        $scope.exData = exData;
    }
    //切换
    $scope.doToggle = function(){
        
        if(!$scope.exData){
            alert('请选择一个实例再进行切换！');
            return;
        }

        DialogService.modal({
            key:'toggle',
            url:'business/components/template/manager/toggle/toggleModal.html',
            accept: function(){

            },
            refuse: function(){

            }
        },{
            key:'toggle',
            data:{'msg':'切换','exData': $scope.exData}
        });

    }

    //显示日志
    $scope.showData = function(exName){

        DialogService.modal({
            key:'data',
            url:'business/components/template/manager/log/log.html',
            accept: function(result){
                console.log(result);
            },
            refuse: function(reason){
                console.log(reason);
            }
        },{
            key:'data',
            data:{"msg":"日志","exName":exName}
        });
    }
    //modify
    $scope.doModify = function(index){
        $scope.systemExDatas[index].modify = false;
    }
    $scope.doConfirm = function(index){
        $scope.systemExDatas[index].modify = true;
    }
    
    deferred.resolve();
}

ManagerCtrl.$inject = ['$scope','DialogService','SndsService','$rootScope','$q'];
export default app => app.controller('ManagerCtrl',ManagerCtrl);