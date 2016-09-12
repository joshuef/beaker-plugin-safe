// import safeProtocol from './protocols/safe-protocol'
const { protocol }  = require('electron')
const url           = require('url')
const safeProtocol  = require('./protocols/safe')
const log           = require('loglevel')
const safejs        = require('safe-js')


console.log( 'safejsutils', safejs.utils.manifest );

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
        manifest: safejs.utils.manifest,
        methods: safejs.utils
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
    }
]
}
