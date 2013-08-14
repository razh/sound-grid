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

    $scope.notes = [];
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
      $scope.grid.forEach( function( row, rowIndex ) {
        if ( row[ $scope.noteIndex ].on ) {
          $scope.notes[ rowIndex ].play();
        }
      });
    };

    $scope.createNotes = function() {
      $scope.notes.forEach(function( note ) {
        note.disconnect();
      });

      $scope.notes = [];
      var audioContext = audio.audioContext,
          scale = audio.scale,
          degree, octave,
          freq, note, noteIndex;

      // Create a note for each row.
      for ( var i = 0; i < $scope.dimensions.y; i++ ) {
        noteIndex = $scope.dimensions.y - i - 1;
        degree = noteIndex % degreeCount;
        octave = Math.floor( noteIndex / degreeCount );

        freq = scale.getFrequency( degree, 110, octave );
        note = new audio.Note( freq );
        note.connect( audioContext.destination );

        $scope.notes.push( note );
      }
    };

    $timeout( function playNextNote() {
      // Increment column.
      $scope.noteIndex = ( $scope.noteIndex + 1 ) % $scope.dimensions.x;
      $scope.play();

      $timeout( playNextNote, $scope.noteInterval );
    }, $scope.noteInterval );
  }]);
