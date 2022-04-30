const rfr = require('rfr');
const service = rfr('src/services/projectService');

class ProjectController {
    async post (req, res) {
        return service.create(req, res);
    }
    async put (req, res) {
        return service.update(req, res);
    }
    async get (req, res) {
        return service.all(req, res);
    }
    async one (req, res) {
        return service.read(req, res);
    }
    async delete (req, res) {
        return service.delete(req, res);
    }
}

module.exports = ProjectController;