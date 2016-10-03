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
        name: 'safeAuth',
        isInternal: true,
        manifest: safejs.auth.manifest,
        methods: safejs.auth
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
    }
]
}
