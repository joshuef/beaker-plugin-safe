// import safeProtocol from './protocols/safe-protocol'
const { protocol }  = require('electron')
const url           = require('url')
const safeProtocol  = require('./protocols/safe')
const log           = require('loglevel')
const safejs        = require('safe-js')



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
            sendAuthorisationRequest: 'promise'
        },
        methods: {
            sendAuthorisationRequest: safejs.utils.sendAuthorisationRequest
        }
    }]
}
