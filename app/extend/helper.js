'use strict';

module.exports = {
    // 生成token
    getToken(data){
        return this.app.jwt.sign(data, this.app.config.jwt.secret);
    },
};