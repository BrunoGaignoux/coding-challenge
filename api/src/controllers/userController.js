const rfr = require('rfr');
const service = rfr('src/services/userService');

class UserController {
    async post (req, res) {
        return service.create(req, res);
    }
}

module.exports = UserController;