const fs = require('fs');
const path = require('path');
const installtion = () => {
    try {
        const setups = {
            "config": ['development.json', 'mongoose-connection.js'],
            "public": ['images', 'javascripts', 'stylesheets']
        }
        const basic_setups = {
            'config': ['{ \n"MONGODB_URI":"mongodb://127.0.0.1:27017"\n}', 'const mongoose = require("mongoose") \nconst config = require("config") \nmongoose\n .connect(`${config.get("MONGODB_URI")}/PROJECT-NAME`) \n .then(function(){ \n    console.log("connectd")\n}) \n.catch(function(err){ \n console.log(err) \n}); \nmodule.exports = mongoose.connection;'],
            'package': `{ \n"name":"${path.basename(__dirname).toLowerCase().replace(/\s/g, '-')}", \n"version": "1.0.0", \n"description": "", \n"main": "app.js", \n"scripts": { \n"test":"echo \\"Error: no test specified\\" && exit 1"\n}, \n"keywords": [], \n"author": "", \n"license": "ISC", \n"dependencies": { \n "bcrypt": "^5.1.1", \n "config": "^3.3.11", \n "cookie-parser": "^1.4.6", \n "debug": "^4.3.4", \n "dotenv": "^16.4.5", \n "ejs": "^3.1.10", \n "express": "^4.19.2", \n "express-session": "^1.18.0", \n "jsonwebtoken": "^9.0.2", \n "mongoose": "^8.3.5" \n} \n}`
        }
        const pathdir = ['config', 'controllers', 'designs', 'middlewares', 'models', 'public', 'routes', 'utils', 'views']
        const pathfiles = ['.env', '.gitignore', 'readme.md', 'app.js']
        pathdir.forEach((dir_name) => {
            fs.access(`${__dirname}/${dir_name}`, function(err) {
                if (err) {
                    fs.mkdir(`${__dirname}/${dir_name}`, function(err) {
                        if (err) {
                            return console.error(err);
                        }
                    });
                } else {}
            })

        })
        pathfiles.forEach(async(file_name) => {
            await fs.promises.writeFile(`${file_name}`, '');
        })
        fs.promises.writeFile(`package.json`, basic_setups.package);
        setups.config.forEach((file__name, index) => {
            fs.access(`${__dirname}/config/${file__name}`, function(err) {
                if (err) {
                    fs.writeFile(`${__dirname}/config/${file__name}`, `${basic_setups.config[index]}`, (err) => {
                        if (err) throw err;
                    });
                } else {}
            })

        })
        setups.public.forEach((folders) => {
            fs.access(`${__dirname}/public/${folders}`, function(err) {
                if (err) {
                    fs.mkdir(`${__dirname}/public/${folders}`, function(err) {
                        if (err) {
                            return console.error(err);
                        }
                    })
                } else {}
            })

        })
        console.log('Run `npm i` command in terminal.')
    } catch (error) {
        console.log(error);
    }
}
module.exports = installtion();