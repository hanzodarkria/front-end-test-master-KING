(function () {
    angular.module('qudini.QueueApp.AddCustomer', [])
        .directive('addCustomer', AddCustomer)


    function AddCustomer($http){
        return {
            restrict: 'E',
            scope:{
                onAdded: '&'
            },
            templateUrl:'/add-customer/add-customer.html',
            link: function(scope){

                scope.customer = {};

                scope.products = [
                    {name: 'Grammatical advice'},
                    {name: 'Magnifying glass repair'},
                    {name: 'Cryptography advice'}
                ];

                scope.add = function(){
                    $http.post('/api/customer/add', scope.customer).then(save, error);
                };

                function save(res) {
                    scope.customer = {};

                    var callback = scope.onAdded();
                    if (callback) {
                        callback();
                    }
                }

                function error() {
                    alert('Failed to add customer. Please try again.');
                }
            }
        }
    }

})();