let SndsService = function(HttpService) {
    
    return {
        //获取用户的用户信息
        getUserInfo: function(params){
            return HttpService.get('/usermsg.do', params);
        },
        //获取系统状态统计数据
        getSystemStateNum: function(params){
            return HttpService.get('/system/stateNum.do',params);
        },
        //获取系统操作记录一览
        getSystemRecords: function(params){
            return HttpService.get('/system/record.do',params);
        },
        //获取系统实例（升级完毕）
        getSystemExDatas: function(params){
            return HttpService.get('/system/exDatas.do',params);
        },
        //获取系统实例（可升级）
        getSystemExDatasUpdate: function(params){
            return HttpService.get('/system/exDatasUp.do',params);
        },
        //获取系统实例（已升级）
        getSystemExDatasUpdated: function(params){
            return HttpService.get('/system/exDatasUped.do',params);
        },
        //获取实例对应详细日志
        getSystemExLog: function(params){
            return HttpService.get('/system/exLog.do',params);
        },
        //单个实例选中升级
        exUpdate: function(params){
            return HttpService.get('/system/update.do',params);
        },
        //选中实例转换
        exToggle: function(params){
            return HttpService.get('/system/toggle.do',params);
        },
        //选中实例转换
        getInstancesList: function(params){
            return HttpService.get('/system/instanceslist',params);
        },
        getMyServicesList: function(params){
            return HttpService.get('/system/myserviceslist',params);
        },
    };
}

export default app => {
    app.service('SndsService',SndsService);
}