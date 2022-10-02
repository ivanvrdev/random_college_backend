import { model, Schema } from 'mongoose'

const degreeSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    duration: {type: Number, required: true}, //years
    boss: {type: Schema.Types.ObjectId, ref: 'User'},
    subjects: [{
        data: {type: Schema.Types.ObjectId, ref: 'Subject'},
        year: Number,
        active: {type: Boolean, default: true}
    }],
    students: [{
        user: {type: Schema.Types.ObjectId, ref: 'User'}, 
        start_date: Date,
        end_date: Date,
        active: {type: Boolean, default: true}
    }],
    creation_date: {type: Date, default: Date.now},
    active: {type: Boolean, default: true}
})

export default model('Degree', degreeSchema)