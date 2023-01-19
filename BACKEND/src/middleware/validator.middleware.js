const {userSchema} = require("../config/user.config");
const validateUser = (req,res,next)=>{
    const error = userSchema.validate(req.body);
    if(error.error){
        return res.status(401).json({error:error.error.details[0].message});
    }else{
        next();
    }
}
module.exports = {validateUser}