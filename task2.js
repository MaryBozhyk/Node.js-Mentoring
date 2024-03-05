// import {EventEmitter} from './task1.js';
const EventEmitter = require('./task1')

class WithTime extends EventEmitter {
    async execute(asyncFunc, ...args) {
        this.on('data', (data) => console.log('Received data:', data));
        this.on(('error', (error) => console.error('Error:', error)));
        this.emit('begin');

        console.time('Function execution time');

        asyncFunc(...args, (data, error) => {
            if (data) {
                this.emit('data', data)
            }

            if (error) {
                this.emit('error', error)
            }

            console.timeEnd('Function execution time')

            this.emit('end');
        })
    }
}

const fetchFromUrl = (url, cb) => {
    fetch(url)
        .then(response => response.json())
        .then(data => cb(data))
        .catch(error => cb(null, error));
}


const withTime = new WithTime();

withTime.on('begin', () => console.log('About to execute'));
withTime.on('end', () => console.log('Done with execute'));

withTime.execute(fetchFromUrl, 'https://jsonplaceholder.typicode.com/posts/1');

console.log(withTime.rawListeners("end"));