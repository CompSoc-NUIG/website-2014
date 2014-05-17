//Declare Angular app
app = angular.module("app", [
    'ngRoute',
    'ngAnimate'
]);

//The config part of the app lets us define routing
app.config( function($routeProvider, $locationProvider) {
    $routeProvider.
        when('/home', {
            templateUrl: '/views/partials/home.html',
            title: "Home"
        }).
        when('/blog', {
            templateUrl: '/views/partials/blog.html',
            title: "Blog"
        }).
        when('/blog/:post',{
          templateUrl: function(rp){
            return '/views/partials/blog/'+rp.post+'.html'
          },
          title: "Blog"
        }).
        when('/wiki', {
            templateUrl: '/views/partials/wiki.html',
            title: "Wiki"
        }).
        when('/wiki/:page',{
          templateUrl: function(rp){
            return '/views/partials/wiki/'+rp.page+'.html'
          },
          title: "Blog"
        }).
        when('/users', {
            templateUrl: '/views/partials/wiki.html',
            title: "Users"
        }).
        when('/users/:user',{
          templateUrl: function(rp){
            return '/views/partials/users/'+rp.user+'.html'
          },
          title: "Users"
        }).        
        when('/hlms', {
            templateUrl: '/views/partials/hlms.html',
            title: "HLMS"
        }).
        when('/', {
            redirectTo: '/home'
        }).
        otherwise({ //aka default route, this will prevent 404s
            redirectTo: '/home'
        });
    
    
    $locationProvider.html5Mode(true); //magical function enabling going back/forward between pages using the browser buttons despite being a SPA 
});

//Here we can define some global ($rootScope) variables shared between all controllers
app.run(function($routeScope){
    
});

//The concept is to have one controller per view/page/logical unit, in this case the navigation bar/header at the top of the page will
//be dealt with by this 'navCtrl'
app.controller('NavCtrl' ,function($scope){ 
    
});