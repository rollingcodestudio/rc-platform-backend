import {Schema, model} from 'mongoose';

const modelTestSchema = new Schema({
    test: {
        type: String
    }
});


module.exports = model('ModelTest', modelTestSchema);