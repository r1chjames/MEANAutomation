var http = require('http');

angular.module('wemoController', [])

wemoController.factory('wemoController', function($scope,addr) {
    var setStatus = function(addr) {
    	var status;
    	var state = 1;
    	
    	var body = body = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
                    "<s:Envelope xmlns:s=\"http://schemas.xmlsoap.org/soap/envelope/\" s:encodingStyle=\"http://schemas.xmlsoap.org/soap/encoding/\">\n" +
                    "  <s:Body>\n" +
                    "    <u:SetBinaryState xmlns:u=\"urn:Belkin:service:basicevent:1\">\n" +
                    "      <BinaryState>" + state + "</BinaryState>\n" +
                    "    </u:SetBinaryState>\n" +
                    "  </s:Body>\n" +
                    "</s:Envelope>";
        var soapaction = "\"urn:Belkin:service:basicevent:1#SetBinaryState\"";
    
    var postRequest = {
        host: addr,
        path: "/a.asmx",
        port: 80,
        method: "POST",
        headers: {
            'Accept': "",
            'Content-Type': 'text/xml; charset=\"UTF-8""',
            'SOAPAction': soapaction
        }
    };
    
    var req = http.request( postRequest, function( res )    {
    
       console.log( res.statusCode );
       var buffer = "";
       res.on( "data", function( data ) { buffer = buffer + data; } );
       res.on( "end", function( data ) { console.log( buffer ); } );
    
    });
    
    req.on('error', function(e) {
        console.log('problem with request: ' + e.message);
    });
    
    req.write( body );
    req.end();
    	
    }

});