let LogCtrl = function($scope,DialogService,SndsService){
    
    var vm = $scope;
        vm.recieve = vm.data; 
        vm.logs = [];

    SndsService.getSystemExLog({"exName":vm.recieve.exName})
        .then( datas => {
            vm.logs = datas.logs;
        });
    
    //对话框关闭&取消
    $scope.close = function(){
        DialogService.dismiss($scope.key);
        DialogService.refuse($scope.key,'model close');
    }
    //对话框确定
    $scope.commit = function(){
        DialogService.accept($scope.key,'model commit');
    }
    
}

LogCtrl.$inject = ['$scope','DialogService','SndsService'];
export default app => app.controller('LogCtrl',LogCtrl);