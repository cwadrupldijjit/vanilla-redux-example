const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function listenToUserInput(cb) {
    rl.on('line', input => {
        cb(input);
    });
    
    return () => rl.close() || process.exit(0);
}

module.exports = {
    listenToUserInput,
};