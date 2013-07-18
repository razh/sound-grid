'use strict';

angular.module( 'soundGridApp' )
  .controller( 'MainCtrl', function( $scope ) {
    $scope.dimensions = {
      x: 0,
      y: 0
    };

    $scope.mouse = {
      down: false
    };

    $scope.grid = [];

    $scope.toggle = function( row, column ) {
      var currentRow = $scope.grid[ row ];
      if ( !currentRow ) {
        return;
      }

      var cell = currentRow[ column ];
      if ( cell ) {
        cell.on = !cell.on;
      }
    };

    $scope.dragToggle = function( row, column ) {
      if ( $scope.mouse.down ) {
        $scope.toggle( row, column );
      }
    };

    $scope.onMouseDown = function() {
      $scope.mouse.down = true;
    };

    $scope.onMouseUp = function() {
      $scope.mouse.down = false;
    };
  });
