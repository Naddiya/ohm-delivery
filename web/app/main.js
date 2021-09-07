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
    // driver change status
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
        });
    };

    // customer refuse message
    $scope.sendMessage = function () {
      let url = `/ohms/tracking/update/${this.trackingId}/comment`;
      $http
        .put(url, { comment: this.message })
        .then((response) => {
          this.newComment = response.data.comment;
          console.log(this.newComment);
        })
        .catch((error) => {
          this.errorMessage = error.statusText;
          console.log(this.errorMessage);
        });
    };
  });
