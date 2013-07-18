'use strict';

angular.module( 'soundGridApp' )
  .controller( 'MainCtrl',
    [ '$scope',
      '$timeout',
      'audio',
    function( $scope, $timeout, audio ) {

    $scope.dimensions = {
      x: 0,
      y: 0
    };

    $scope.mouse = {
      down: false
    };

    $scope.grid = [];
    $scope.noteIndex = 0;
    $scope.noteInterval = 250;

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

    $scope.isPlaying = function( index ) {
      return index === $scope.noteIndex;
    };


    var degreeCount = audio.scale.degrees.length;

    $scope.play = function() {
      var scale = audio.scale,
          degree, octave,
          freq, voice;

      $scope.grid.forEach( function( row, rowIndex ) {
        if ( row[ $scope.noteIndex ].on ) {
          degree = rowIndex % degreeCount;
          octave = Math.floor( rowIndex / degreeCount );

          freq = scale.getFrequency( degree, 110, octave );
          voice = new audio.Voice( freq );
          voice.connect( audio.audiolet.output );
        }
      });
    };

    $timeout( function playNextNote() {
      $scope.noteIndex = ( $scope.noteIndex + 1 ) % $scope.dimensions.x;
      $scope.play();

      $timeout( playNextNote, $scope.noteInterval );
    }, $scope.noteInterval );
  }]);
