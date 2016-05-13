angular.module("MenuApp", ["ngMaterial", "ngMdIcons", "firebase", "angular-img-cropper", "ui.router"])
    .constant("ref", "https://menu-material-todo.firebaseio.com/")
    .run(function ($rootScope, $state) {
        $rootScope.$on('$stateChangeStart',
            function (event, toState, toParams, fromState, fromParams) {


                var userKey = localStorage.getItem("userKey");

                if (toState.name === "dashboard" && !userKey) {
                    event.preventDefault();
                    $state.go("login")
                }
                else if ((toState.name === "login" || toState.name === "signup") && userKey) {
                    event.preventDefault();
                    $state.go("dashboard")
                }
            })
    })
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state("signup", {
                url: "/signup",
                templateUrl: "templates/signup.html",
                controller: "signupCtrl"
            })
            .state("login", {
                url: "/login",
                templateUrl: "templates/login.html",
                controller: "loginCtrl"
            })
            .state("dashboard", {
                url: "/dashboard",
                templateUrl: "templates/dashboard.html",
                controller: "Dashboard"
            });

        $urlRouterProvider.otherwise("login")
    })

    .filter('capitalize', function () {
        return function (input) {
            return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
        }
    });