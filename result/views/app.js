var app = angular.module('catsvsdogs', []);
var socket = io.connect();

app.controller('statsCtrl', function ($scope) {
  $scope.distanciaManhattan = 0;
  $scope.distanciaPerson = 0;
  $scope.distanciaEuclidean = 0;
  $scope.distanciaMinkowski = 0;
  $scope.cosineSimilarity = 0;

  var updateDistances = function () {
    socket.on('distances', function (json) {
      var data = JSON.parse(json);
      $scope.$apply(function () {
        $scope.distanciaManhattan = data.distancia_manhattan;
        $scope.distanciaPerson = data.distancia_pearson;
        $scope.distanciaEuclidean = data.distancia_euclidean;
        $scope.distanciaMinkowski = data.distancia_minkowski;
        $scope.cosineSimilarity = data.cosine_similarity;
      });
    });
  };

  var init = function () {
    document.body.style.opacity = 1;
    updateDistances();
  };
  socket.on('message', function (data) {
    init();
  });
});
