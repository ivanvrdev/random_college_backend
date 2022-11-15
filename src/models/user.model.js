import { model, Schema } from "mongoose"

const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    phone: {type: Number, required: true, unique: true},
    types: [{type: String, required: true}], // student | teacher | administrative
    profile: {
        avatar: String, //uri
        first_name: String,
        last_name: String,
        cuil: Number,
        nationallity: String, 
        born_date: Date,
        sex: String, // female | male | any
        address: [{
            postal_code: Number,
            city: String,
            street_name: String,
            number: String,
            floor: Number,
            apartment: Number,
            active: {type: Boolean, default: true}
        }],
        documents: [{
            description: String,
            uri: String,
            active: {type: Boolean, default: true}
        }],
    },
    classrooms: [{type: Schema.Types.ObjectId, ref: 'Subject'}],
    creation_date: {type: Date, default: Date.now},
    active: {type: Boolean, default: true}
})

userSchema.methods.toJSON = function(){
    const { __v, password, ...user } = this.toObject()
    return user
}

export default model('User', userSchema)