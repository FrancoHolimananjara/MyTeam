const User = require("../models/user.model");

const findUser = async (id) => {
    try {
        const user = await User.findById({ _id:id });
        return user;
    } catch (error) {
        throw new Error(error);
    }
}
module.exports = findUser;