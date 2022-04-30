const rfr = require('rfr');
const Repository = rfr('src/repositories/userRepository').model
const jwt = rfr('src/helpers/jwt')

module.exports = {
    create: async (req, res) => {
        const data = req.body
        const exists = await Repository.findOne({ email: data.email })

        if (exists) {
            return res.status(400).json({error: 'email already in use'});
        }

        data.password = jwt.generateTokenFromObject({ password: data.password }, '365d')
        const user = new Repository(data)
        await user.save()

        if (!user) return res.status(400).json({error: 'fail on create user'});

        return res.status(201).json(user);
    }
}