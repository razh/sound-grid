'use strict';

describe( 'Directive: grid', function() {
  beforeEach( module( 'soundGridApp' ) );

  var element;

  it( 'should make hidden element visible', inject( function( $rootScope, $compile ) {
    element = angular.element( '<grid></grid>' );
    element = $compile( element )( $rootScope );
    expect( element.text() ).toBe(' this is the grid directive' );
  }));
});
