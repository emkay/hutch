var fs = require('fs'),
    seaport = require('seaport'),
    httpProxy = require('http-proxy');

module.exports = hutch;

function hutch(config, sport, proxyport) {

    var sites = JSON.parse(fs.readFileSync(config)).sites,
        seaportServer = seaport.createServer(),
        proxyServer;

    seaportServer.listen(sport);

    var ports = seaport.connect(sport),
        lh = 'localhost',
        options = {};

    options.hostnameOnly = true;
    options.router = {};

    sites.forEach(function (site) {
        var k = Object.keys(site).pop(),
            key, host, role, ver, www, semver, hp;

        if (site && site[k]) {

            key  = site[k].key;
            host = site[k].host;
            role = site[k].role;
            ver  = site[k].ver;
            www  = site[k].www || false;

            semver = [key, '-', role, '@', ver].join(''); 
            console.log(semver);
            hp = [lh, ports.register(semver)].join(':');

            options.router[host] = hp;

            if (www) {
                options.router['www.'+host] = hp;
            }
        }
    });

    proxyServer = httpProxy.createServer(options);
    proxyServer.listen(proxyport);
}
