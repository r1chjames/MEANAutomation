// js/core.js

angular.module('bogoTodo', ['todoController', 'todoService']);

function(loggly) {
    loggly.setApiKey('87c1dd30-d309-437e-bcce-0492a94bf316');
    loggly.log('Starting Log');
    loggly.log({ message: 'awesome stuff' });
}