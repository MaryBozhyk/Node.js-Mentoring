const cluster = require('cluster');
const os = require('os');

const cpuCount = os.cpus().length;

cluster.setupPrimary({
    exec: __dirname + "/activityMonitor.js"
})

for (let i = 0; i < cpuCount; i++) {
    cluster.fork();
}

cluster.on('exit', () => {
    cluster.fork();
});
