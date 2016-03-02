angular.module('wemoController');

function wemoCtrl($scope,wemoService){
    $scope.toggleStatus = function(addr) {
        console.log('hello');
        wemoService.toggleStatus(addr);
    }
}