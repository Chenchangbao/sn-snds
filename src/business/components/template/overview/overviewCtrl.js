let OverviewCtrl = ($scope,$state,SndsService,$q,$rootScope) => {

    $scope.user = $rootScope.user;
    $scope.systemStateArrs = [];
    $scope.systemStateName = [];
    $scope.systemStateNum = [];
    $scope.systemRecords = [];
    $scope.page = 1;
    $scope.pageSize = 5;
    $scope.total = 0;

    var deferred = $q.defer();
    var promise = deferred.promise;
    promise.then(function(){
         getDataForEcharts();
         getSystemRecords();
    });

    // SndsService.getUserInfo()
    //     .then( datas => {
    //         $scope.user.userName = datas.userName; 
    //         $scope.user.userId = datas.userId;   
    //         getDataForEcharts();
    //         getSystemRecords();
    //     });
    
    //面包屑
    $scope.crumbIconData = [
        {href:"#/overview",title:"控制台",disable:"true",pre:'<span class="fa fa-home"></span>'},
        {href:"",title:"概览",pre:'<span class="fa fa-laptop"></span>'}
    ];

    
    //获取echarts数据
    function getDataForEcharts(){
        SndsService.getSystemStateNum({"userId":$scope.user.userId})
            .then( datas => {
                $scope.systemStateArrs = datas.list;
                $scope.systemStateArrs.forEach(function(element) {
                    $scope.systemStateName.push(element.state);
                    $scope.systemStateNum.push(element.num)
                }, this);
                drawByEcharts();
            });      
    }


    // echarts配置及绘制
    function drawByEcharts(){
        var myChart = echarts.init(document.getElementById('_echarts'));
        var myChart2 = echarts.init(document.getElementById('_echarts2'));

        var option = {

                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    x: 'left',
                    data:[$scope.systemStateName[0],$scope.systemStateName[1]]
                },
                series: [
                    {
                        name:'数据统计',
                        type:'pie',
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '30',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data:[
                            {value:$scope.systemStateNum[0], name:$scope.systemStateName[0]},
                            {value:$scope.systemStateNum[1], name:$scope.systemStateName[1]},
                        ]
                    }
                ]
            };

        var option2 = {
            
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            // legend: {
            //     data: ['数据']
            // },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                boundaryGap: [0, 0.01]
            },
            yAxis: {
                type: 'category',
                data: [$scope.systemStateName[0],$scope.systemStateName[1]]
            },
            series: [
                {
                    name: '数据',
                    type: 'bar',
                    data: [$scope.systemStateNum[0],$scope.systemStateNum[1]]
                }
            ]
        };
        
        myChart.setOption(option);
        myChart2.setOption(option2);   
    }

    
    //系统操作记录获取
    function getSystemRecords(){
        SndsService.getSystemRecords({"userId":$scope.user.userId})
            .then( datas => {
                $scope.systemRecords = datas.list;
                $scope.total = $scope.systemRecords.length;
            })
    }

    deferred.resolve();
}

OverviewCtrl.$inject = ['$scope','$state','SndsService','$q','$rootScope'];
export default app => app.controller('OverviewCtrl',OverviewCtrl);