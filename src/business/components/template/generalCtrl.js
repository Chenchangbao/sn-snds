let GeneralTableCtrl = ($scope,HttpService,$state,$location,DialogService,$document,$http,$q) => {
  let vm = $scope.vm = {
		pager: {
			pageNumber: 1,
			pageSize: 5,
			totalCount: 300
		}
  };

  var defer = $q.defer();
  var promise = defer.promise;
  promise.then(function(){
      console.debug("defer echarts start");
      myChart2.setOption(option2);
      alert("myChart2");
      console.debug("defer echarts finish");
  },function(){

  });
  
 
    //列表数据获取
    $scope.arrs = [
    {a:'100013-201505210939',b:'大促1',c:'豆芽',d:'SIT',e:'主',f:'运行中',g:'MySQL5.6'},
    {a:'100013-201505210939',b:'大促1',c:'豆芽',d:'SIT',e:'主',f:'运行中',g:'MySQL5.5'},
    {a:'100013-201505210939',b:'大促1',c:'豆芽',d:'SIT',e:'主',f:'运行中',g:'MySQL5.4'},

    {a:'100013-201505210939',b:'大促2',c:'易付宝',d:'SIT',e:'主',f:'运行中',g:'MySQL5.6'},
    {a:'100013-201505210939',b:'大促2',c:'易付宝',d:'SIT',e:'主',f:'运行中',g:'MySQL5.6'},
    {a:'100013-201505210939',b:'大促2',c:'易付宝',d:'SIT',e:'主',f:'运行中',g:'MySQL5.6'},

    {a:'100013-201505210939',b:'大促3',c:'易购主站',d:'SIT',e:'主',f:'运行中',g:'MySQL5.6'},
    {a:'100013-201505210939',b:'大促3',c:'易购主站',d:'SIT',e:'主',f:'运行中',g:'MySQL5.6'},
    {a:'100013-201505210939',b:'大促3',c:'易购主站',d:'SIT',e:'主',f:'运行中',g:'MySQL5.6'},

    {a:'100013-201505210939',b:'大促4',c:'物流LES',d:'SIT',e:'主',f:'运行中',g:'MySQL5.6'},
    {a:'100013-201505210939',b:'大促4',c:'物流LES',d:'SIT',e:'主',f:'运行中',g:'MySQL5.6'},
    {a:'100013-201505210939',b:'大促4',c:'物流LES',d:'SIT',e:'主',f:'运行中',g:'MySQL5.6'},

    {a:'100013-201505210939',b:'大促5',c:'合约机',d:'SIT',e:'主',f:'运行中',g:'MySQL5.6'},
    {a:'100013-201505210939',b:'大促5',c:'合约机',d:'SIT',e:'主',f:'运行中',g:'MySQL5.6'},
    {a:'100013-201505210939',b:'大促5',c:'合约机',d:'SIT',e:'主',f:'运行中',g:'MySQL5.6'},

    {a:'100013-201505210939',b:'大促6',c:'云商城',d:'SIT',e:'主',f:'运行中',g:'MySQL5.6'},
    {a:'100013-201505210939',b:'大促6',c:'云商城',d:'SIT',e:'主',f:'运行中',g:'MySQL5.6'},
    {a:'100013-201505210939',b:'大促6',c:'豆芽',d:'SIT',e:'主',f:'运行中',g:'MySQL5.6'},
    ];
    //分页模块
    $scope.page = 1;  //当前页
    $scope.pageSize = 3; //单页个数
    $scope.total = 18; //数据总量

    $scope.arrsNow = $scope.arrs.slice(0,12);

    
    // //需求区
    // $scope.doSubRequire = function(){

    //     $state.go('Console.Portal');
    //     // $location.url('/portal');
    // }
    //显示日志
    $scope.showData = function(){

        DialogService.modal({
            key:'data',
            url:'business/components/tables/generalTable/data.html',
            accept: function(result){
                console.log(result);
            },
            refuse: function(reason){
                console.debug(reason);
            }
        },{
            key:'data',
            data:{msg:"日志"}
        });
    }


    // $http.get('business/components/tables/generalTable/test.json') 
       
    //     .success(function(data){
    //         console.debug(data.msg);
    //     })
    //     .success(function(data){
    //         console.debug(data.msg+" again");
    //     })
    //     console.debug('script finish');
    //     alert("complete");
 
  
};

GeneralTableCtrl.$inject = ['$scope','HttpService','$state','$location','DialogService','$document','$http','$q'];

export default app => app.controller('GeneralTableCtrl', GeneralTableCtrl);




