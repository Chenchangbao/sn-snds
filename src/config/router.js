let cssList = {}

function addResolve(obj) {
    obj.resolve = {
        css: ['$q', '$state', ($q, $state) => {
            var deferred = $q.defer();

            if (obj.cssUrl) {
                let csslink = document.createElement('link')
                csslink.setAttribute('rel', 'stylesheet')
                csslink.setAttribute('type', 'text/css')
                csslink.setAttribute('href', obj.cssUrl)
                document.head.appendChild(csslink)
                cssList[obj.name] = obj.cssUrl
            }

            deferred.resolve()
            return deferred.promise;
        }]
    }
    return obj
}

function mockFn(obj, name) {
    let old = obj[name]
    obj[name] = function () {
        arguments[1].name = arguments[0]
        return old.call(obj, arguments[0], addResolve(arguments[1]))
    }
}

export default app => {
    app.config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {
        mockFn($stateProvider, 'state')
        // $urlRouterProvider.otherwise('/overview');
        $urlRouterProvider.otherwise(function ($injector) {
            var $state = $injector.get("$state");
            $state.go('Portal.Overview');
        });
        $stateProvider
            .state('Portal', {
                abstract: true,
                templateUrl: 'business/components/portal/portal.html',
                controller: 'PortalCtrl',
            })
            .state('Portal.Overview', {
                url: '/overview',
                templateUrl: 'business/components/template/overview/overview.html',
                cssUrl: 'business/components/template/overview/overview.css',
                controller: 'OverviewCtrl'
            })
            .state('Portal.Instances', {
                url: '/instanceslist',
                templateUrl: 'business/components/template/instances/instances.html',
                controller: 'InstancesCtrl',
                data: {
                    permissions: {
                        only: 'seo-edit'
                    }
                }
            })
            .state('Portal.InstanceNew', {
                url: '/instance-new',
                templateUrl: 'business/components/template/instanceNew/instanceNew.html',
                controller: 'InstanceNewCtrl',
                data: {
                    permissions: {
                        only: 'ADMIN'
                    }
                }
            })
            .state('Portal.Manager', {
                url: '/manager',
                templateUrl: 'business/components/template/manager/manager.html',
                controller: 'ManagerCtrl'
            })
            .state('Portal.Update', {
                url: '/update',
                templateUrl: 'business/components/template/update/update.html',
                controller: 'UpdateCtrl'
            })
            .state('Portal.MyServices', {
                url: '/myservices',
                templateUrl: 'business/components/template/myServices/myServices.html',
                controller: 'MyServicesCtrl'
            })
            .state('Portal.InstanceDetail', {
                url: '/instance-detail/:name',
                templateUrl: 'business/components/template/instanceDetail/instanceDetail.html',
                controller: 'InstanceDetailCtrl'
            })
            .state('Portal.Review', {
                url: '/review/:code',
                templateUrl: 'business/components/template/myServices/review.html',
                controller: 'Review'
            })
            .state('Portal.Bulk', {
                url: '/bulks',
                templateUrl: 'business/components/template/bulk/bulk.html',
                cssUrl: 'business/components/template/bulk/bulk.css',
                controller: 'BulkCtrl'
            })
            .state('Portal.Bulk.Status', {
                url: '/status',
                templateUrl: 'business/components/template/bulk/status/status.html',
                cssUrl: 'business/components/template/bulk/status/status.css',
                controller: 'BulkCtrl'
            })
            .state('Portal.Bulk.Account', {
                url: '/account',
                templateUrl: 'business/components/template/bulk/account/account.html',
                cssUrl: 'business/components/template/bulk/account/account.css',
                controller: 'BulkCtrl'
            })
            .state('Portal.Bulk.Paramsall', {
                url: '/paramsall',
                templateUrl: 'business/components/template/bulk/paramsall/paramsall.html',
                cssUrl: 'business/components/template/bulk/paramsall/paramsall.css',
                controller: 'BulkCtrl'
            })
            .state('Portal.Bulk.Params', {
                url: '/params',
                templateUrl: 'business/components/template/bulk/params/params.html',
                cssUrl: 'business/components/template/bulk/params/params.css',
                controller: 'BulkCtrl'
            })
        // .state('Requirement', {
        //   url: '/requirement',
        //   templateUrl: 'business/components/template/requirement.html',
        //   controller: 'GeneralTableCtrl'
        // })
        ;
    }]);

    //set css file
    app.run(['$rootScope', $rootScope => {
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, options) {
            let sameName = getSameStateName(toState, fromState)

        })

        /**
         * 
         */
        function removeCssList(sameName) {
            if (!sameName.length) return

            let cssKeys = Object.keys(cssList)
            if (!cssKeys.length) return

            let links = document.getElementsByTagName('link')
            for (let i = 0; i < links.length; i++) {
                let link = links[i]
                cssKeys.forEach(e => {
                    if (link.href.match(cssList[e])) {
                        document.head.removeChild(link)
                        delete cssList[fromState.name]
                    }
                })
            }
        }

        /**
         * get the same part between toState.name and fromState.name
         */
        function getSameStateName(toState, fromState) {
            let toStateName = toState.name.split('.'),
                fromStateName = fromState.name.split('.'),
                result = []

            for (let i = 0; i < toStateName.length; i++) {
                if (toStateName[i] === fromStateName[i]) {
                    result.push(toStateName[i])
                } else
                    break
            }
            return result
        }
    }])
}