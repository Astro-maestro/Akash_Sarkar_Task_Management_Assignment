const Token = require('../models/Token'); 
class TokenRepository {

    async createToken(tokenData) {
        const token = new Token(tokenData);
        return await token.save();
    }


    async findTokenByUserId(userId) {
        return await Token.findOne({ _userId: userId });
    }


    async findToken(tokenString) {
        return await Token.findOne({ token: tokenString });
    }


    async deleteTokenByUserId(userId) {
        return await Token.deleteOne({ _userId: userId });
    }


    async deleteToken(tokenString) {
        return await Token.deleteOne({ token: tokenString });
    }

    async listTokensForUser(userId) {
        return await Token.find({ _userId: userId });
    }
}

module.exports = new TokenRepository();