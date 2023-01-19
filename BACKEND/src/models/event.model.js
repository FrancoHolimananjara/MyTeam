const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    name : {
        type:String,
    },
    description:{
        type:String,
    },
    place:{
        type:String
    },
    date:[{debut:new Date},{fin:new Date}]
},{
    collection:"events",
    timestamps:true
})
const Event = mongoose.model("Event",eventSchema);
module.exports = Event;