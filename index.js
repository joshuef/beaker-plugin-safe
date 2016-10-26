// import safeProtocol from './protocols/safe-protocol'
const { protocol }  = require('electron')
const url           = require('url')
const safeProtocol  = require('./protocols/safe')
const log           = require('loglevel')
const safejs        = require('safe-js')


// add auth wrapper here. and localStorage


var tokenStore = {};
var beakerSafeJS = Object.assign( {}, safejs.auth );
// localStorage shim for node


// const localStorageExists =  ( typeof localStorage === 'undefined' ) ? false : true ;

// var beakerSafeJS = ;

var sendAuthorisationRequest = safejs.auth.authorise;


const getAuthToken = function( tokenKey )
{
    if( !tokenKey )
    {
        return Promise.reject( 'tokenKey is missing.');
    }
    
    return tokenStore[ tokenKey ];
};

// export const getUserLongName = function( longNameKey, localStorage ) {
//     return localStorage.getItem(longNameKey);
// };
const setAuthToken = function( tokenKey, token )
{
    if( !tokenKey )
    {
        return Promise.reject( 'tokenKey is missing.');
    }
    
    if( !token )
    {
        return Promise.reject( 'token is missing.');
    }
    
    tokenStore[ tokenKey ] = token ;
    
    return Promise.resolve( true );
};


// export const setUserLongName = function(longNameKey, longName) {
//     localStorage.setItem(longNameKey, longName);
// };

const authorise = function( packageData )
{   
    // for beaker only.
    // TODO: remove this from safejs as its a beaker only setup
        const wholeUrl = this.sender.getURL()
        const parsedUrl = url.parse( wholeUrl );
        var tokenString = parsedUrl.hostname;
        
        //override vendor with the url?
        if( packageData )
            packageData.vendor = wholeUrl;
        

    let tokenFromStorage = getAuthToken( tokenString );
    
    return safejs.auth.isTokenValid( tokenFromStorage )
        .then( response => 
        {
            if( response )
            {
                return Promise.resolve( {
                    token: tokenFromStorage,
                    checkedOut: true
                });
            }
            
            if ( !response ) 
            {
                setAuthToken( tokenString, null );

                return sendAuthorisationRequest( packageData )
                .then( response =>
                    {
                        let token = response.token;
                        setAuthToken( tokenString, token )
            
                        return Promise.resolve( response );                        
                    });
            }
        });
    
};

beakerSafeJS.authorise = authorise;





module.exports = {
    configure (opts) {
        if (opts.logLevel)
        log.setLevel(opts.logLevel)
    },
    homePages: [{
        label: 'SAFE Network',
        href: 'https://safenetforum.org/t/safe-network-alpha-release/10687/1'
    }],
    protocols: [ safeProtocol ],
    webAPIs: [{
        name: 'safeAuth',
        isInternal: true,
        manifest: safejs.auth.manifest,
        methods: beakerSafeJS
    },
    {
        name: 'safeDNS',
        isInternal: true,
        manifest: safejs.dns.manifest,
        methods: safejs.dns
    },
    {
        name: 'safeNFS',
        isInternal: true,
        manifest: safejs.nfs.manifest,
        methods: safejs.nfs
    },
    {
        name: 'safeStructuredData',
        isInternal: true,
        manifest: safejs.structuredData.manifest,
        methods: safejs.structuredData
    },
    {
        name: 'safeAppendableData',
        isInternal: true,
        manifest: safejs.appendableData.manifest,
        methods: safejs.appendableData
    },
    {
        name: 'safeDataId',
        isInternal: true,
        manifest: safejs.dataId.manifest,
        methods: safejs.dataId
    },
    {
        name: 'safeCipherOpts',
        isInternal: true,
        manifest: safejs.cipherOpts.manifest,
        methods: safejs.cipherOpts
    },
    {
        name: 'safeSignKey',
        isInternal: true,
        manifest: safejs.signKey.manifest,
        methods: safejs.signKey
    },
    {
        name: 'safeImmutableData',
        isInternal: true,
        manifest: safejs.immutableData.manifest,
        methods: safejs.immutableData
    }
]
}
