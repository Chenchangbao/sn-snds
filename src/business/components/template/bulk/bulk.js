import Status from './status/status'
import Account from './account/account'
import Params from './params/params'
import Paramsall from './paramsall/paramsall'
import Userbox from './account/userbox/userbox'
import Passwordbox from './account/passwordbox/passwordbox'
import privilegebox from './account/privilegebox/privilegebox'
import logbox from './account/logbox/logbox'
import searchhost from './paramsall/searchhost/searchhost'
import pslogbox from './paramsall/pslogbox/pslogbox'

let MyServicesCtrl = ($scope, DialogService, SndsService, $rootScope, $q, $state, CtrlInit, CtrlRefresh, CtrlTablePage) => {
    let vm = $scope




    $scope.crumbIconData = [{
            href: "#/overview",
            title: "控制台",
            disable: "true",
            pre: '<span class="fa fa-home"></span>'
        },
        {
            href: "",
            title: "批量管理",
            pre: '<span class="fa fa-tasks"></span>'
        }
    ];
}

MyServicesCtrl.$inject = ['$scope'];
export default app => {
    app.controller('BulkCtrl', MyServicesCtrl)
        .controller(Status.name, Status)
        .controller(Account.name, Account)
        .controller(Params.name, Params)
        .controller(Paramsall.name, Paramsall)
        .controller(Userbox.name, Userbox)
        .controller(Passwordbox.name, Passwordbox)
        .controller(privilegebox.name, privilegebox)
        .controller(logbox.name, logbox)
        .controller(searchhost.name, searchhost)
        .controller(pslogbox.name, pslogbox)
}