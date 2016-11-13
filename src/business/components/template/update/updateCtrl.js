let UpdateCtrl = ($scope,SndsService,DialogService,$rootScope,$q,$http) => {

    $scope.user = $rootScope.user;
    $scope.systemExList = [];
    $scope.page = 1;
    $scope.pageSize = 5;
    $scope.total = 0;
    $scope.getSystemExDatasUp = getSystemExDatasUp; //可升级
    $scope.getSystemExDatasUped = getSystemExDatasUped; //已升级
    $scope.switchFlag = false;

    var deferred = $q.defer();
    var promise = deferred.promise;
    promise.then(function(){
        getSystemExDatasUp();
    });
    // SndsService.getUserInfo()
    //     .then( datas => {
    //         $scope.user.userName = datas.userName; 
    //         $scope.user.userId = datas.userId;   
    //         getSystemExDatasUp();
    //     });
    
    //面包屑
    $scope.crumbIconData = [
        {href:'#/overview',title:'控制台',disable:'true',pre:'<span class="fa fa-home"></span>'},
        {href:'',title:'升级',pre:'<span class="fa fa-arrow-up"></span>'}
    ];
    
    //加载数据（可升级）实例
    function getSystemExDatasUp(){
        SndsService.getSystemExDatasUpdate({"userId":$scope.user.userId})
            .then( datas => {
                $scope.systemExList = datas.list;
                $scope.total = $scope.systemExList.length;
                $scope.switchFlag = false;
            });
    }
    //加载数据（已升级）实例
    function getSystemExDatasUped(){
        SndsService.getSystemExDatasUpdated({"userId":$scope.user.userId})
            .then( datas => {
                $scope.systemExList = datas.list;
                $scope.total = $scope.systemExList.length;
                $scope.switchFlag = true;
            });
    }
    
    //升级方法
    $scope.doUpdate = function(exData,index){
        
        DialogService.modal({
            key:'update',
            url:'business/components/template/update/update/updateModal.html',
            accept: function(data){
                if(data.loginSuccess){
                    $scope.systemExList.splice(index,1);
                    $scope.timer = setInterval(function(){
                        SndsService.getSystemExLog({"exName":data.exName})
                            .then( datas => {
                                console.debug('轮询结果中。。。');
                                if(datas.result){
                                    alert('升级完毕！');
                                    clearInterval($scope.timer);
                                }
                            }); 
                    },3000);    
                }
            },
            refuse: function(data){
                if(data.loginSuccess){
                    $scope.systemExList.splice(index,1);
                    $scope.timer = setInterval(function(){
                        SndsService.getSystemExLog({"exName":data.exName})
                            .then( datas => {
                                console.debug('轮询结果中。。。');
                                if(datas.result){
                                    alert('升级完毕！');
                                    clearInterval($scope.timer);
                                }
                            }); 
                    },3000);    
                }
            }
        },{
            key:'update',
            data:{"msg":"升级","exData":exData}
        });    
    }
    //显示日志
    $scope.showDate = function(exName){

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

    // $http.get('/system/update.do',{"name":"zqk"})
    //     .then( datas => {
    //         console.debug(datas);
    //     });
    // $http.get('/system/update.do',{"name":"zqk"})
    //     .success( datas => {
    //         console.debug(datas);
    //     });
    // SndsService.exUpdate({"name":"zqk"})
    //     .then( datas => {
    //         console.debug(datas);
    //     });
    deferred.resolve();
}

UpdateCtrl.$inject = ['$scope','SndsService','DialogService','$rootScope','$q','$http'];
export default app => app.controller('UpdateCtrl',UpdateCtrl);