const rfr = require('rfr');
const service = rfr('src/services/authService');

class AuthController {
    async login(req, res) {
        return service.login(req, res);
    }
    async info(req, res) {
        return service.me(req, res);
    }
}

module.exports = AuthController;