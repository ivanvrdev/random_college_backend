import { model, Schema } from 'mongoose'

const subjectSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    duration: {type: String, required: true}, // quartely | biannual | annual
    degrees: [{type: Schema.Types.ObjectId, ref: 'Degree'}],
    start_date: {type: Date, required: true},
    end_date: {type: Date, required: true},
    lessons_schedule: [{
        day: String, // monday | tuesday | wednesday | thursday | friday
        start_hour: String, // 24hs
        end_hour: String, // 24hs
    }],
    commissions: [Number],
    teachers: [{
        user: {type: Schema.Types.ObjectId, ref: 'User'},
        role: String, // assistant | holder | boss
        assistence: Number,
        active: {type: Boolean, default: true}
    }],
    students: [{
        user: {type: Schema.Types.ObjectId, ref: 'User'},
        commission: Number,
        grades: {
            exams: [{
                name: String, //first_partial | second_partial | recovery_exam | final_exam
                comment: String,
                grade: Number
            }],
            final: Number
        },
        assistence: Number,
        active: {type: Boolean, default: true}
    }],
    exams_schedule: [{
        name: String,
        description: String,
        date: Date,
        active: {type: Boolean, default: true},
    }],
    total_lessons: Number,
    classroom_access_code: String,
    creation_date: {type: Date, default: Date.now},
    active: {type: Boolean, default: true}
})

export default model('Subject', subjectSchema)