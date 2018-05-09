const path = require('path');

const config = {  
    port: 3000,
    database: {
        DATABASE: 'my_blog',
        USERNAME: 'root',
        PASSWORD: 'root',
        PORT: '3306',
        HOST: 'localhost'
    },
    staticPath: path.join(__dirname, '../static')
}

module.exports = config