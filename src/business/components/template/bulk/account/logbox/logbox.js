import {
    Inject
} from 'business/decorator/decorator'

@Inject
class Logbox {
    constructor($scope, DialogService, bulkHttp) {
        let vm = $scope;
        vm.data = [{
            success: true,
            msg: '2017-02-17-10.37.13 test1@10.37.64.41修改了10.37.64.42服务器上账号：由test1@10.37.64.41修改为test1@10.37.64.42'
        }, {
            success: false,
            msg: '2017-02-17-10.37.13 test1@10.37.64.41修改了10.37.64.42服务器上账号：由test1@10.37.64.41修改为test1@10.37.64.42'
        }, {
            success: true,
            msg: '2017-02-17-10.37.13 test1@10.37.64.41修改了10.37.64.42服务器上账号：由test1@10.37.64.41修改为test1@10.37.64.42'
        }]
        bulkHttp.post('/batch/auth/log' + d.ip, {
            index: 1,
            size: 100
        }).then(e => {
            vm.data = e.logs
        })
        vm.close = () => {
            // way 1:
            DialogService.dismiss(vm.key);

            // or
            DialogService.refuse(vm.key, 'dialog refuse! cancel!');
        };

        vm.commit = () => {
            DialogService.accept(vm.key, vm.user);
        };
    }
}

export default Logbox;