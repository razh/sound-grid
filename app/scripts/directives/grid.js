'use strict';

angular.module( 'soundGridApp' )
  .directive( 'grid',
    [ '$window',
    function( $window ) {

    return {
      templateUrl: './views/grid.html',
      restrict: 'C',
      link: function postLink( scope, element, attrs ) {
        var size = 60,
            // Takes into account the top + bottom and
            // left + right margins.
            spacing = 2 * 5;

        function resize() {
          var elementWidth  = element.prop( 'offsetWidth'  ),
              elementHeight = element.prop( 'offsetHeight' );

          var columnCount = Math.floor( elementWidth  / ( size + spacing ) ),
              rowCount    = Math.floor( elementHeight / ( size + spacing ) );

          scope.dimensions.y = rowCount;
          scope.dimensions.x = columnCount;

          // Reset grid and populate.
          scope.grid = [];
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

          scope.createNotes();
        }

        angular.element( $window ).bind( 'resize', function() {
          resize();
        });

        resize();
      }
    };
  }]);
