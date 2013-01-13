#!/usr/bin/env node

var argv = require('optimist')
           .usage('Usage: hutch --sp seaport --pp proxyport -c config.json')
           .demand(['sp', 'pp', 'c'])
           .argv;

var config = argv.c,
    sport = parseInt(argv.sp, 10);
    proxyport = parseInt(argv.pp, 10);

var hutch = require('../');

hutch(config, sport, proxyport);
