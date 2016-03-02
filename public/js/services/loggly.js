angular.module( 'logglyLogger', ['angular-loggly-logger'] )

    .config( function( LogglyLoggerProvider ) {
	    LogglyLoggerProvider.inputToken( '87c1dd30-d309-437e-bcce-0492a94bf316' ).sendConsoleErrors(true);
    })
    .run( function( $log ) {
	    $log.info( 'Test Logs to Loggly' );
    });