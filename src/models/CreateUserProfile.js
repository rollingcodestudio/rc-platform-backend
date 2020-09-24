import { Schema, model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

let validStatus = {
    values: ['ACTIVE', 'INACTIVE'],
    message: '{VALUE} It is not a valid state'
};

const createUserProfileSchema = new Schema({
    
    uid: {
        type: String,
        required: [true, 'This information is required']
    },
    firstName: {
        type: String,
        required: [true, 'This information is required']
    },
    lastName: {
        type: String,
        required: [true, 'This information is required']
    },
    email: {
        type: String,
        required: [true, 'This information is required'],
        unique: true
    },
    profilePhoto: {
        type: String,
        required: [true, 'This information is required']
    },
    state: {
        type: String,
        required: [true, 'This information is required'],
        default: 'ACTIVE',
        enum: validStatus
    }
});

createUserProfileSchema.plugin(uniqueValidator, { message: '{PATH} must be unique' })

module.exports = model('CreateUserProfile', createUserProfileSchema);