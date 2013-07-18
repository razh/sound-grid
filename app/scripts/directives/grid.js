'use strict';

angular.module( 'soundGridApp' )
  .directive( 'grid', function() {
    return {
      templateUrl: './views/grid.html',
      restrict: 'C',
      link: function postLink( scope, element, attrs ) {
        var size    = 50,
            spacing = 10;

        var elementWidth  = element.prop( 'offsetWidth'  ) - 2 * spacing,
            elementHeight = element.prop( 'offsetHeight' ) - 2 * spacing;

        var columnCount = Math.floor( elementWidth  / ( size + spacing ) ),
            rowCount    = Math.floor( elementHeight / ( size + spacing ) );

        scope.dimensions.y = rowCount;
        scope.dimensions.x = columnCount;

        var row, i, j;
        for ( i = 0; i < rowCount; i++ ) {
          row = [];
          scope.grid.push( row );

          for ( j = 0; j < columnCount; j++ ) {
            row.push({
              on: false
            });
          }
        }
      }
    };
  });
