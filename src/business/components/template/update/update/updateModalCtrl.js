let UpdateModalCtrl = ($scope,SndsService,DialogService) => {

    $scope.flag = false;
    $scope.rootPass = null;
    $scope.replName = null;
    $scope.replPass = null;
    $scope.adminName = null;
    $scope.adminPass = null;
    $scope.successLog = "";
    $scope.errorLog = "";
    $scope.logs = {};
    $scope.loginSuccess = false;
    $scope.continue = function(){
        $scope.flag = true;
    }
    $scope.doUpdate = doUpdate;
    //升级操作
    function doUpdate(exName){
        SndsService.exUpdate({
            "exName":exName,
            "rootPass":$scope.rootPass,
            "replName":$scope.replName,
            "replPass":$scope.replPass,
            "adminName":$scope.adminName,
            "adminPass":$scope.adminPass
            }).then( datas => {
                if(datas.result){
                    console.debug(1);
                    $scope.errorLog = "";
                    $scope.successLog = "密码验证成功，开始升级！";

                    SndsService.getSystemExLog({"exName":exName})
                        .then( datas => {
                            $scope.logs = datas.logs;
                            $scope.loginSuccess = true;
                        });
                }else{
                    console.debug(0);
                    $scope.successLog ="";
                    $scope.errorLog = "密码验证失败，核对后请重新输入！"
                }                
            });
    }
    //对话框关闭&取消
    $scope.close = function(){
        DialogService.dismiss($scope.key);
        DialogService.refuse($scope.key,{
            loginSuccess:$scope.loginSuccess,
            exName:$scope.data.exData.exOddNumber
        });
    }
    //对话框确定
    $scope.commit = function(){
        DialogService.accept($scope.key,{
            loginSuccess:$scope.loginSuccess,
            exName:$scope.data.exData.exOddNumber
        });
    }

}

UpdateModalCtrl.$inject = ['$scope','SndsService','DialogService'];
export default app => app.controller('UpdateModalCtrl',UpdateModalCtrl);