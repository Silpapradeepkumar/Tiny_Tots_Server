import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
    sender: {
        type: mongoose.Types.ObjectId,
    },
    receiver: {
        type:  mongoose.Types.ObjectId,
    },
    message:{
        type:String
    }
});

export const SingleMessage = mongoose.model('SingleMessage', Schema);



//  "password":""
// "name": "",
// "age" : "",
// "email": "",
// "phoneNumber": "",
// "gender" : "",
// "photo": "",
// "houseName": "",
// "place":  "",
// "city":  "",
// "state" : "",
// "qualification" : "",
// "isTeacher": true
