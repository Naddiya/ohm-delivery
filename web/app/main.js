angular
  .module("ohm-delivery", [])
  // get tracking status
  .controller("tracking", function ($scope, $http) {
    $scope.getTrackingStatus = function () {
      $http
        .get(`/ohms/tracking/${this.trackingId}`)
        .then((response) => {
          const trackingData = response.data;
          this.trackingStatus = trackingData.status;
        })
        .catch((error) => {
          this.errorMessage = error.statusText;
          console.log(this.errorMessage);
        });
    };
  })
  // driver change status
  .controller("changeStatus", function ($scope, $http) {
    $scope.items = ["DELIVERED", "REFUSED"];

  });
