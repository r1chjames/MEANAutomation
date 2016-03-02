var http = require('http');

var wemoModule = angular.module('wemoModule', ['logglyLogger'])


.service('wemoService', function() {
	var http = require('http');

    this.toggleStatus = function(addr) {
    	var state = 'notset';
        $log.info('test message');
    
    	var body = '<?xml version="1.0" encoding="utf-8"?>\n' +
                    '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/" s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">\n' +
                    '  <s:Body>\n' +
                    '    <u:GetBinaryState xmlns:u="urn:Belkin:service:basicevent:1"></u:GetBinaryState>\n' +
                    '  </s:Body>\n' +
                    '</s:Envelope>';
        var soapaction = '"urn:Belkin:service:basicevent:1#GetBinaryState"';
    
        var postRequest = {
            host: addr,
            path: '/upnp/control/basicevent1',
            port: 49153,
            method: 'POST',
            headers: {
                'Accept': '',
                'Content-Type': 'text/xml; charset=\"UTF-8"',
                'SOAPAction': soapaction
            }
        };
        
        var req = http.request( postRequest, function( res ) {
        
            console.log('HTTP Return Code: ' + res.statusCode );
            var buffer = "";
            res.on( "data", function( data ) { buffer = buffer + data; } );
            res.on( "end", function( data ) {
                console.log('Return XML:\n' + buffer );
                loggly.info('Return XML: \n' + buffer);
        
                if (buffer.indexOf("<BinaryState>1</BinaryState>") > -1) {
                    this.setState(addr,0);
                    console.log('WeMo switch is: ON');
                    loggly.info('WeMo switch is: ON')
                }
                if (buffer.indexOf("<BinaryState>0</BinaryState>") > -1) {
                    this.setState(addr,1);
                    console.log('WeMo switch is: OFF');
                    loggly.info('WeMo switch is: OFF');
                };
                return state;
            }); 
        });
        
        req.on('error', function(e) {
            console.log('Problem with request: ' + e.message);
            return e;
        });
          
        req.write(body);
        req.end();
    }
    
    this.setState = function(addr,state) {
    
    	var body = '<?xml version="1.0" encoding="utf-8"?>\n' +
                    '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/" s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">\n' +
                    '  <s:Body>\n' +
                    '    <u:SetBinaryState xmlns:u="urn:Belkin:service:basicevent:1">\n' +
                    '      <BinaryState>' + state + '</BinaryState>\n' +
                    '    </u:SetBinaryState>\n' +
                    '  </s:Body>\n' +
                    '</s:Envelope>';
        var soapaction = '"urn:Belkin:service:basicevent:1#SetBinaryState"';
    
        var postRequest = {
            host: addr,
            path: '/upnp/control/basicevent1',
            port: 49153,
            method: 'POST',
            headers: {
                'Accept': '',
                'Content-Type': 'text/xml; charset=\"UTF-8"',
                'SOAPAction': soapaction
            }
        };
        
        var req = http.request( postRequest, function( res ) {
        
            console.log('HTTP Return Code: ' + res.statusCode );
            var buffer = "";
            res.on( "data", function( data ) { buffer = buffer + data; } );
            res.on( "end", function( data ) { console.log('Return XML: \n' + buffer );
            var newState = "";
            if (state === 0){
                newState = "OFF"
            }
            else {
                newState = "ON";
            }
                console.log('Switch state changed to: ' + newState);
                return state;
            });
        
        });
        
        req.on('error', function(e) {
            console.log('problem with request: ' + e.message);
        });
        
        req.write( body );
        req.end();
    };
});