(function () {
    angular.module('qudini.QueueApp.Customer', [])
        .directive('customer', Customer)

    /**
     * The <customer> directive is responsible for:
     * - serving customer
     * - calculating queued time
     * - removing customer from the queue
     */
    function Customer($http){

        return{
            restrict: 'E',
            scope:{
                customer: '=',
                onRemoved: '&',
                onServed: '&'
            },
            templateUrl: '/customer/customer.html',
            link: function(scope){
                
                // calculate how long the customer has queued for
                scope.queuedTime = new Date() - new Date(scope.customer.joinedTime);

                scope.remove = function()
                {
                    $http({
                        method: 'DELETE',
                        url: '/api/customer/remove',
                        params: {id: scope.customer.id}
                    }).then(function(res){
                        var callback = scope.onRemoved();
                        
                        if (callback)
                            callback();
                    })
                };

                scope.serve = function(customerId)
                {
                    $http.post('/api/customer/serve', {id: customerId}).then(function(res) {
                        var callback = scope.onServed()();

                        if (callback)
                            callback();
                    });
                };
            }
        }
    }

})();