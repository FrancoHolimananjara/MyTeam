const mongoose = require('mongoose');

const groupSchema = mongoose.Schema({
    name: {
        type:String,
    },
    creator: {type:mongoose.Schema.Types.ObjectId , ref: 'User'},
    members: [{type:mongoose.Schema.Types.ObjectId , ref: 'User'}]
},{
    collection:"groups",
    timestamps:true
});
const Group = mongoose.model("Group",groupSchema);
module.exports = Group;
