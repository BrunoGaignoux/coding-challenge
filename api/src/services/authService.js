const rfr = require('rfr');
const Repository = rfr('src/repositories/userRepository').model
const jwtHelper = rfr('src/helpers/jwt')
const bcrypt = require('bcrypt')

module.exports = {
    login(req, res) {
        const query = {'email': req.body.email}
        Repository.findOne(query)
            .select('+password')
            .exec((err, user) => {
                if (err) console.error(err)

                if (!user) {
                    return res.status(404).json({error: 'user_not_found'})
                }

                if (!bcrypt.compare(user.password, req.body.password)) {
                    return res.status(422).json({error: 'wrong_credentials'})
                }

                return res.status(200).json({token: jwtHelper.generateToken(user), user})
            })
    },
    me(req, res) {
        return res.status(200).json({ message: 'You have been logged out successfully' });
    }
}