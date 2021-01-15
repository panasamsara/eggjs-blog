'use strict';

module.exports = {
    // 生成token
    getToken(value){
        return this.app.jwt.sign(value, this.app.config.jwt.secret);
    },
};