class State {
    constructor(option) {
        this.url = option.url
        this.templateUrl = option.templateUrl
        this.cssUrl = option.cssUrl
        this.controllerurl = option.controller
        this.resolve = {
            css: ($q) => {
                var deferred = $q.defer();
                let cssList = this.cssList
                if (cssList && cssList.length) {
                    cssList.forEach(e => this.removeCssList(e))
                }
                this.addCssList()
                deferred.resolve()
                return deferred.promise;
            }
        }
    }

    get cssList() {
        if (!State.cssList) return
        return State.cssList
    }

    addCssList() {
        if (!this.cssUrl) return

        if (!State.cssList) State.cssList = []
        // let cssPath = this.templateUrl.replace(/\.html$/, '.css')
        let csslink = document.createElement('link')
        csslink.setAttribute('rel', 'stylesheet')
        csslink.setAttribute('type', 'text/css')
        csslink.setAttribute('href', this.cssUrl)
        document.head.appendChild(csslink)
        State.cssList.push(this.cssUrl)
    }

    removeCssList(name) {
        if (!State.cssList) return

        let links = document.getElementsByTagName('link')
        for (let i = 0; i < links.length; i++) {
            let link = links[i]
            if (link.href.match(name)) {
                document.head.removeChild(link)
                let i = State.cssList.indexOf(name)
                if (i > -1)
                    State.cssList.splice(i, 1)
            }
        }
    }
}

export default app => {
    app.config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {
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
            .state('Portal.Overview', new State({
                url: '/overview',
                templateUrl: 'business/components/template/overview/overview.html',
                cssUrl: 'business/components/template/overview/overview.css',
                controller: 'OverviewCtrl'
            }))
            .state('Portal.Instances', new State({
                url: '/instanceslist',
                templateUrl: 'business/components/template/instances/instances.html',
                controller: 'InstancesCtrl',
                data: {
                    permissions: {
                        only: 'seo-edit'
                    }
                }
            }))
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
                controller: 'BulkCtrl'
            })
        // .state('Requirement', {
        //   url: '/requirement',
        //   templateUrl: 'business/components/template/requirement.html',
        //   controller: 'GeneralTableCtrl'
        // })
        ;
    }]);
}