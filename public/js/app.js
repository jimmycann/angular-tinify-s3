'use strict';

angular.module('angular-tinify-s3', [
    'ui.router', 'ngFileUpload', 'ngSanitize'
]).config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider.state('base', {
        url: '/',
        templateUrl: 'view/upload.html',
        controller: 'uploadCtrl'
    });
    $locationProvider.html5Mode(true);
});