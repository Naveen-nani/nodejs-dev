const mongoose = require('mongoose');

const sendConnectionSchema = new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        requied: true
    },
    status:{
        type:String,
        enum: {
            values: ['intrested','ignored','rejected','accepted'],
            message: `{VALUE} is not supported`     
        }
        
    }

},{timestamps: true})

//validation for the self connection Request corner case handing with Schema.

sendConnectionSchema.pre("save", function(next){
    const test = this;
    
    if(test.fromUserId.equals(test.toUserId)){
        throw new Error("You cannot send connection request to yourself")
    }
    next();
})

const ConnectionRequest = mongoose.model('ConnectionRequest', sendConnectionSchema);

module.exports = ConnectionRequest; 