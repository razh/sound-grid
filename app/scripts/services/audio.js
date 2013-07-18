'use strict';

angular.module( 'soundGridApp' )
  .service( 'audio', function audio() {

    var audiolet = new Audiolet( 44100, 2 );

    // Scales.
    function MajorPentatonicScale() {
      Scale.call( this, [ 0, 2, 4, 7, 9 ] );
    }

    extend( MajorPentatonicScale, Scale );


    var attack = 0.01,
        release = 0.5;

    var scale = new MajorPentatonicScale();

    function Voice( frequency ) {
      AudioletGroup.call( this, audiolet, 0, 1 );

      this.sine = new Sine( audiolet, frequency );

      this.gain = new Gain( audiolet );
      this.env = new PercussiveEnvelope( audiolet, 1, attack, release,
        function() {
          this.audiolet.scheduler.addRelative( 0, this.remove.bind( this ) );
        }.bind( this ) );

      this.envMulAdd = new MulAdd( audiolet, 0.3, 0 );

      this.sine.connect( this.gain );
      this.gain.connect( this.outputs[0] );

      this.env.connect( this.envMulAdd );
      this.envMulAdd.connect( this.gain, 0, 1 );
    }

    extend( Voice, AudioletGroup );

    return {
      audiolet: audiolet,
      scale: scale,
      Voice: Voice
    };
  });
