import { model, Schema } from 'mongoose'

const postSchema = new Schema({
    author: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    creation_date: {type: Date, default: Date.now},
    type: {type: String, required: true}, // public | private
    classroom: {type: Schema.Types.ObjectId, ref: 'Subject'},
    content: {
        header: {type: String, required: true},
        description: {type: String, required: true},
        media: [{
            type: String, //img, video
            source: String //uri
        }] 
    },
    comments: [{
        author: {type: Schema.Types.ObjectId ,ref: 'User'},
        description: String,
        creation_date: {type: Date, default: Date.now},
        active: {type: Boolean, default: true}
    }],
    active: {type: Boolean, default: true}
})

export default model('Post', postSchema)