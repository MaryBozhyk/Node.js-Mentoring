const childProcess = require('child_process');
const fs = require('fs');
const os = require('os');

const osPlatform = os.platform();
const command = osPlatform === 'win32'
    ? 'powershell "Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + \' \' + $_.CPU + \' \' + $_.WorkingSet }"'
    : 'ps -A -o %cpu,%mem,comm | sort -nr | head -n 1'

const {EventEmitter} = require('events');

function emitProcess() {
    const emitter = new EventEmitter();

    let count = 1;

    setInterval(() => {
        count++;

        childProcess.exec(command, (error, stdout, stderr) => {
            if (error !== null) {
                emitter.emit(
                    'error',
                    new Error(stderr)
                );

                return;
            }

            const print = (count % 600) === 0;
            emitter.emit('success', stdout, print);
        });
    }, 100);

    return emitter;
}

const process = emitProcess();

process.on('success', (processInfo, print) => {
    console.clear();
    console.log(`\r${processInfo}`)

    if (print) {
        fs.appendFile('activityMonitor.log', `${getUnixTime()}: ${processInfo}`, (err) => {
            if (err) throw err;
        });
    }
});

process.on('error', (err) => {
    console.error(err.message);
});

function getUnixTime() {
    return Math.floor(Date.now() / 1000)
}