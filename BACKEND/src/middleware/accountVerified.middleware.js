const User = require('../models/user.model');
const accountVerified = async (req,res,next)=>{
    const {identifier} = req.body;
    try{
        await User.findOne({$or : [{username:identifier},{email:identifier}]})
            .then(user=>{
                if (user){
                    if (user.isVerified){
                        next();
                    }else{
                        return res.status(401).json({error:"Please check your email to verify your account"})
                    }
                }else{
                    return res.status(404).json({error:"Username or Email not found !"})
                }
            })
            .catch(e=>{
                return res.status(500).json({error:"Error middleware auth : ",e})
            })
    }catch (e) {
        console.log(e)
    }

}
module.exports = {accountVerified}