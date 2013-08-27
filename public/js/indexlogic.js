function DoitCtrl ($scope, $http) {
	$scope.change = function () {
		$http.get('change', {params: {q : $scope.query}}).success(function(data){
			$scope.items = data});
	}
	
    $scope.change();
}

DoitCtrl.$inject = ['$scope', '$http'];