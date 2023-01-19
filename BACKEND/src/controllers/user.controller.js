const ObjectId = require('mongoose').Types.ObjectId;
const User = require('../models/user.model');
module.exports = {
    profile: async (req, res) => {
        try {
            if (!ObjectId.isValid(req._userId)){
                return res.status(404).json({error : "ID unknown : " + req._userId})
            }else{
                const user = await User.findById(ObjectId(req._userId)).select(['-_id', '-__v', '-password'])
                    .populate('todos', ['title', 'content', 'completed'])
                    .populate('adminInGroup', ['name']);
                if (user) {
                    return res.status(200).json({ success: true, message: user });
                }
            }
        } catch (error) {
            return res.status(500).json({ success: false, message: error });
        }
    }
}
