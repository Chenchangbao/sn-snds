import {
    Inject
} from 'business/decorator/decorator'

@Inject
class Privilegebox {
    constructor($scope, DialogService, bulkHttp) {
        let vm = $scope;
        vm.tabs = {
            global: {

            },
            db: {

            },
            view: 'gb'
        }
        let d = {}

        bulkHttp.get('/batch/auth/' + d.ip + '/privilege').then(e => {
            vm.gbPrivileges = [{
                name: 'CREATE TABLESPACE',
                checked: true
            }, {
                name: 'CREATE USER',
                checked: false
            }, {
                name: 'FILE',
                checked: true
            }]
            vm.gbPrivileges = e
        })

        let getDb = db => {
            bulkHttp.get('/batch/auth/' + d.ip + '/privilege/db' + db).then(e => {
                vm.dbPrivileges = [{
                    name: 'ALL [PRIVILEGES]',
                    checked: true
                }, {
                    name: 'EXECUTE',
                    checked: false
                }, {
                    name: 'FILE',
                    checked: true
                }]
                vm.dbPrivileges = e
            })
        }

        bulkHttp.get('/batch/auth/' + d.ip + '/databases').then(e => {
            vm.dbs = e
        })

        vm.changeSystem = d => {
            getDb(d)
        }

        vm.close = () => {
            // way 1:
            DialogService.dismiss(vm.key);

            // or
            DialogService.refuse(vm.key, 'dialog refuse! cancel!');
        };

        vm.commit = () => {
            let data = {
                view: vm.tabs.view,
                data: vm.tabs.view === 'gb' ? vm.gbPrivileges : vm.dbPrivileges
            }
            DialogService.accept(vm.key, data);
        };
    }
}

export default Privilegebox;