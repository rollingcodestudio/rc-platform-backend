import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config()

mongoose.connect(process.env.MONGODBCONNECT, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function () {
    
});


