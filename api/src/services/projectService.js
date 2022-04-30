const rfr = require('rfr');
const Repository = rfr('src/repositories/projectRepository').model

module.exports = {
    all: async (req, res) => {
        const projects = await Repository.find({}).lean().exec();
        return res.status(201).json(projects);
    },
    read: async (req, res) => {
        const data = req.params
        const project = await Repository.findById(data._id).lean().exec();

        if (!project) return res.status(404).json({error: 'project not found'});

        return res.status(201).json(project);
    },
    create: async (req, res) => {
        const data = req.body
        const exists = await Repository.findOne({ name: data.name }).lean().exec();

        if (exists) {
            return res.status(400).json({error: 'name already in use'});
        }

        try {
            const project = new Repository(data)
            await project.save()
            return res.status(201).json(project);
        } catch (e) {
            return res.status(500).json({error: 'fail on create project'});
        }
    },
    update: async (req, res) => {
        const params = req.params
        const data = req.body
        const exists = await Repository.findById(params._id).lean().exec();

        if (!exists) {
            return res.status(404).json({error: 'project not found'});
        }

        try {
            await Repository.updateOne({ _id: params._id }, data)
            return res.status(200).json('project created');
        } catch (e) {
            return res.status(500).json({error: 'fail on updated project'});
        }
    },
    delete: async (req, res) => {
        const data = req.params
        const project = await Repository.findById(data._id).lean().exec();

        if (!project) return res.status(404).json({error: 'project not found'});

        try {
            await Repository.deleteOne({ _id: data._id })
            return res.status(200).json('project deleted');
        } catch (e) {
            return res.status(500).json({error: 'fail on delete project'});
        }
    }
}