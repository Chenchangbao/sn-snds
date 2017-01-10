let SndsService = function (HttpService) {

    return {
        //获取用户的用户信息
        presentUser: function (params) {
            return HttpService.get('/mySystem/presentUser', params);
        },
        //获取系统状态统计数据
        getSystemStateNum: function (params) {
            return HttpService.get('/system/stateNum.do', params);
        },
        //获取系统操作记录一览
        getSystemRecords: function (params) {
            return HttpService.get('/system/record.do', params);
        },
        //获取系统实例（升级完毕）
        getSystemExDatas: function (params) {
            return HttpService.get('/system/exDatas.do', params);
        },
        //获取系统实例（可升级）
        getSystemExDatasUpdate: function (params) {
            return HttpService.get('/system/exDatasUp.do', params);
        },
        //获取系统实例（已升级）
        getSystemExDatasUpdated: function (params) {
            return HttpService.get('/system/exDatasUped.do', params);
        },
        //获取实例对应详细日志
        // getSystemExLog: function (id) {
        //     return HttpService.get('/instances/myServices/' + id + '/log');
        // },
        //单个实例选中升级
        exUpdate: function (params) {
            return HttpService.get('/system/update.do', params);
        },
        //选中实例转换
        exToggle: function (params) {
            return HttpService.get('/system/toggle.do', params);
        },
        //选中实例转换
        getInstancesList: function (params) {
            return HttpService.get('/instances', params);
        },
        getInstanceDetail: (id) => {
            return HttpService.get('/instances/' + id);
        },
        getMyServicesList: function (params) {
            return HttpService.get('/instances/myServices', params);
        },
        getTypeStatus: function (params) {
            return HttpService.get('/instances/myServices/status', params);
        },
        myServiceRetry: function (id) {
            return HttpService.get('/instances/myServices/' + id);
        },
        myServiceLog: function (id) {
            return HttpService.get('/instances/myServices/' + id + '/log');
        },
        newInstanceMySystem: function () {
            return HttpService.get('/mySystem');
        },
        newInstanceEnvs: function (code) {
            return HttpService.get('/mySystem/' + code + '/envs');
        },
        newInstanceTemplates: function (code) {
            return HttpService.get('/mySystem/templates');
        },
        newInstance: function (params) {
            return HttpService.post('/instances/instance', params);
        },
        newInstanceDetail: function (code) {
            return HttpService.post('/mySystem/' + code);
        },
    };
}

export default app => {
    app.service('SndsService', SndsService);
}