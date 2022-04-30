const rfr = require('rfr');
const Repository = rfr('src/repositories/taskRepository').model

module.exports = {
    all: async (req, res) => {
        const tasks = await Repository.find({}).lean().exec();
        return res.status(201).json(tasks);
    },
    read: async (req, res) => {
        const data = req.params
        const task = await Repository.findById(data._id).lean().exec();

        if (!task) return res.status(404).json({error: 'task not found'});

        return res.status(201).json(task);
    },
    create: async (req, res) => {
        const data = req.body
        const exists = await Repository.findOne({ name: data.name }).lean().exec();

        if (exists) {
            return res.status(400).json({error: 'name already in use'});
        }

        try {
            const task = new Repository(data)
            await task.save()
            return res.status(201).json(task);
        } catch (e) {
            return res.status(500).json({error: 'fail on create task'});
        }
    },
    update: async (req, res) => {
        const params = req.params
        const data = req.body
        const exists = await Repository.findById(params._id).lean().exec();

        if (!exists) {
            return res.status(404).json({error: 'task not found'});
        }

        try {
            await Repository.updateOne({ _id: params._id }, data)
            return res.status(200).json('task created');
        } catch (e) {
            return res.status(500).json({error: 'fail on updated task'});
        }
    },
    delete: async (req, res) => {
        const data = req.params
        const task = await Repository.findById(data._id).lean().exec();

        if (!task) return res.status(404).json({error: 'task not found'});

        try {
            await Repository.deleteOne({ _id: data._id })
            return res.status(200).json('task deleted');
        } catch (e) {
            return res.status(500).json({error: 'fail on delete task'});
        }
    }
}