let ToggleModalCtrl = ($scope,SndsService,DialogService) => {

    $scope.logs = {};
    $scope.exdata = $scope.data.exData;
    $scope.exToggleIP = null;
    $scope.doToggle = doToggle;
    $scope.toggleDone = false;
    $scope.timer = null;

    $scope.setExToggle =function(scIP){
        $scope.exToggleIP = scIP;
        console.debug(scIP);
    }
    // 转换操作
    function doToggle(){
        if(!$scope.exToggleIP){
            alert('请选择一个从IP！');
            return;
        }
        var confirm = window.confirm('确定要转换吗？');
        if(confirm){
            SndsService.exToggle({"exToggleIP":$scope.exToggleIP})
                .then( datas => {
                    $scope.toggleDone = true;

                    $scope.timer = setInterval(function(){
                        SndsService.getSystemExLog({"exToggleIP":$scope.exToggleIP})
                            .then( datas => {
                                console.debug('hi');
                                $scope.logs = datas.logs;
                                if(datas.result){
                                    console.debug('should shut down');
                                    clearInterval($scope.timer);
                                }
                            }); 
                    },1000);     

                });
        }
        
    }




    //对话框关闭&取消
    $scope.close = function(){
        DialogService.dismiss($scope.key);
        DialogService.refuse($scope.key,"1");
    }
    //对话框确定
    $scope.commit = function(){
        DialogService.accept($scope.key,"1");
    }
}



ToggleModalCtrl.$inject = ['$scope','SndsService','DialogService'];
export default app => app.controller('ToggleModalCtrl',ToggleModalCtrl);