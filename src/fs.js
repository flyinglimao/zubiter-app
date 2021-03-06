const fs = require('browserfs');
fs.configure({
    fs: 'IndexedDB',
    options: {
        storeName: 'zubiter'
    }
}, err => { if (err) throw err; })
export default fs.BFSRequire('fs');
export const { Buffer } = fs.BFSRequire('buffer');
window.fs = fs