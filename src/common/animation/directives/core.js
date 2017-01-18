import gsap from 'gsap';
// import CONFIG from '../config';

export default app => {
    /**
     * sa-move object/scope 可传入配置对象 必选
     * sa-duration number/scope 动画持续时间 可选
     * sa-delay number/scope 动画延迟时间 可选
     * sa-repeat number/scope 动画次数,-1重复无限次,默认为1 可选
     * sa-left number/scope 结束水平位置,同css left 可选
     * sa-top number/scope 结束垂直位置,同css top 可选
     * 
     * 写法1:
     * <th sa-move sa-duration="0.5" sa-repeat="1" sa-delay="1" sa-left="100" sa-top="100">系统名</th>
     * 写法2:
     * <th sa-move="{duration:0.5,repeat:1,delay:1,left:100,top:100}">系统名</th>
     */
    app.directive('saMove', ['SaAttrs', function (SaAttrs) {
        return {
            restrict: 'A',
            link: function (scope, elem, attrs) {
                let opt = SaAttrs(scope, attrs, this.name)

                gsap.to(elem, opt.duration, opt.vars)
            }
        };
    }])

    /**
     * sa-color object/scope 可传入配置对象 必选
     * sa-duration number/scope 动画持续时间 可选
     * sa-delay number/scope 动画延迟时间 可选
     * sa-repeat number/scope 动画次数,-1重复无限次,默认为1 可选
     * sa-left number/scope 结束水平位置,同css left 可选
     * sa-top number/scope 结束垂直位置,同css top 可选
     * 
     * 写法1:
     * <th sa-move sa-duration="0.5" sa-repeat="1" sa-delay="1" sa-left="100" sa-top="100">系统名</th>
     * 写法2:
     * <th sa-move="{duration:0.5,repeat:1,delay:1,left:100,top:100}">系统名</th>
     */
    app.directive('saColor', ['SaAttrs', function (SaAttrs) {
        return {
            restrict: 'A',
            link: function (scope, elem, attrs) {
                let opt = SaAttrs(scope, attrs, this.name)

                gsap.to(elem, opt.duration, opt.vars)
            }
        };
    }])

    app.factory('SaAttrs', function () {
        return function (scope, attrs, name) {
            let vars = {
                    delay: 0,
                    repeat: 0,
                    left: 0,
                    top: 0,
                    position: 'relative',
                    backgroundColor: ''
                },
                duration = 5

            if (attrs[name]) {
                setVars(scope.$eval(attrs[name] + ''))
            }

            setVars(attrs)
            setDuration(attrs)

            function setDuration(attrs) {
                attrs.saDuration && (duration = scope.$eval(attrs.saDuration + ''))
                attrs.duration && (duration = attrs.duration)
            }

            function setVars(attrs) {
                Object.keys(vars).forEach(e => {
                    let nameAttr

                    if (attrs.$attr) {
                        let name = e.replace(/\b[a-z]/, function (e) {
                            return e.toUpperCase()
                        })
                        nameAttr = attrs['sa' + name]
                        nameAttr && (vars[e] = scope.$eval(nameAttr + ''))
                    } else {
                        vars[e] = nameAttr = attrs[e]
                    }
                    if (nameAttr) {
                        switch (e) {
                            case 'repeat':
                                if (vars[name] == 0) {
                                    vars.paused = true
                                } else if (vars[name] > 0) {
                                    vars[name]--
                                }
                                break;

                            default:
                                break;
                        }
                    }
                })
            }

            function isVariable(str) {
                
            }

            return {
                vars,
                duration
            }
        }
    })
}