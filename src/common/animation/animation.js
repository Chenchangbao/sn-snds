import angular from 'angular';
import gsap from 'gsap';
import coreDirective from './directives/core';

let app = angular.module("sn.animation", []);

app.factory('SnAnimation', function () {

    return {
        to: function () {
            gsap.to("span", 6, {
                left: 600
            })
        }
    }
})

coreDirective(app)


export default app;