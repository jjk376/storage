/**
 * 
 */
const path = require('path');
const config = {
    '/api/files': {
        data: './json/fileList.json'
    },
	'/api/files/fileId/zipFiles': {
		data: './json/zipFileList.json'
	}
}

for (let item in config) {
    if (config.hasOwnProperty(item)) config[item].path = path.resolve(__dirname, config[item].data);
}
module.exports = config;