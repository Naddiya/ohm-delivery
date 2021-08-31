angular
  .module("ohm-delivery", [])
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
  });