angular
  .module("ohm-delivery", [])
  // get tracking status
  .controller("tracking", function ($scope, $http) {
    $scope.loaded = false;
    $scope.getTrackingStatus = function () {
      $http
        .get(`/ohms/tracking/${this.trackingId}`)
        .then((response) => {
          const trackingData = response.data;
          this.trackingStatus = trackingData.status;
          this.loaded = true;
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
    $scope.sendStatus = function () {
      let url = `/ohms/tracking/update/${this.trackingId}/status`;
      $http
        .put(url, { status: this.selection })
        .then((response) => {
          this.newTrackingStatus = response.data.status;
          console.log(this.newTrackingStatus);
        })
        .catch((error) => {
          this.errorMessage = error.statusText;
          console.log(this.errorMessage);
        });
    };

  });
