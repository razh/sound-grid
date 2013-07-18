'use strict';

angular.module( 'soundGridApp' )
  .service( 'audio', function audio() {

    var audioContext = new webkitAudioContext();

    // Scales.
    function MajorPentatonicScale() {
      Scale.call( this, [ 0, 2, 4, 7, 9 ] );
    }

    extend( MajorPentatonicScale, Scale );

    var scale = new MajorPentatonicScale();

    var attack = 0.01,
        release = 0.2;


    /**
     * Each row has a a note object.
     * ONly one output.
     */
    function Note( freq ) {
      this.frequency = freq;

      this.attack = attack;
      this.release = release;

      this.gain = audioContext.createGainNode();
      this.gain.gain.value = 0;

      this.oscillator = audioContext.createOscillator();
      this.oscillator.frequency.value = this.frequency;
      this.oscillator.type = 'sine';

      this.oscillator.connect( this.gain );
      this.oscillator.start(0);
    }

    Note.prototype.play = function() {
      var currentTime = audioContext.currentTime;
      this.gain.gain.setValueAtTime( 0, currentTime );
      this.gain.gain.linearRampToValueAtTime( 1, currentTime + this.attack );
      this.gain.gain.linearRampToValueAtTime( 0, currentTime + this.attack + this.release );
      return this;
    };

    Note.prototype.connect = function( node ) {
      this.gain.connect( node );
      return this;
    };

    Note.prototype.disconnect = function() {
      this.gain.disconnect(0); // Disconnect the only output.
      return this;
    };

    return {
      audioContext: audioContext,
      scale: scale,
      Note: Note
    };
  });
