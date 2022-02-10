import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
    titile:String,
    message:String,
    creator:String,
    tags:[String],
    selectedFile:String,
    likeCount:{
        type:Number,
        default:0
    },
    createDate:{
        type: Date,
        default:new Date()
    }
})


const postMessage = mongoose.model('postMessage',postSchema);

export default postMessage;