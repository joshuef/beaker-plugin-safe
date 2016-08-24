// import safeProtocol from './protocols/safe-protocol'
const { protocol }  = require('electron')
const url           = require('url')
const safeProtocol  = require('./protocols/safe')
const log           = require('loglevel')




// content security policies
const CSP = "default-src 'self'; plugin-types 'none';"

const boom = function( thing )
{
    return '' + thing;
}

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
        name: 'safe',
        isInternal: true,
        manifest: {
            safeLog: 'sync'
        },
        methods: {
            safeLog: boom
        }
    }]
}
