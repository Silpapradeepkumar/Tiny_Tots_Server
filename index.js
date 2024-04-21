import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import {createAdmin,getAllAdmins,getAdminById,updateAdmin,deleteAdmin,loginAdmin,paySalary,getAllSalary,getHealthRecords ,getAllAdminsAll} from './controllers/Admin.js';
import {create,login,getAll,getById,updateById,deleteById,ChangeStatus,addActivity,viewAllActivites, AttendanceAssignment,getAttendanceAssignmentById ,getAllTeachers,getTeacherAttendancesById} from './controllers/Teachers.js';
import { verifyingAdminToken,verifyingAdminAndTeacherToken, verifyingAdminAndDoctorToken, verifyingAdminAndParentToken, verifyingAllUsersToken } from "./middleware/verifyingToken.js";
import {loginDoctor,registerDoctor,getAllDoctors,getDoctorById,updateDoctorById, deleteDoctorById,getAllDoctorsWithoutAuth,createSchedule,updateDoctorByIdNoAuth} from "./controllers/Doctors.js"
import {deleteParentById,getAllParents,getAllParentsAll,getParentById,loginParent,registerParent, updateParentById} from "./controllers/Parent.js"
import {registerChildren,getAllChildrens,getChildrenById,updateChildrenById, deleteChildrenById,getChildrenByParentId,getChildrensAttendanceById,getChildrenByAttendanceBased,getAllChildrensWithoutCredentials, getSchedules,getChildrensSchedulesById,getallschedules,addDescription,getAllChildrensAll} from "./controllers/Children.js"
import { sentMessage,getMessages,sentDoctorMessage,getDoctorMessage,getHealthRecordsByChildId,getAttendanceOf,addFeedback, getFeedback, sentMessageAll, getMessagesAll,addFees,getFees,getFeesByIdOfChildren ,deleteFee,editFee} from "./controllers/Message.js"

const app = express();
const PORT = 3000;

mongoose.connect('mongodb://127.0.0.1:27017/tinydots').then((response)=>{
    console.log(`databse connected on host : ${response.connection.host}`);
})

app.use(cors())
app.use(express.json({limit:"50mb"}))
app.use(cookieParser())


// Admin Module Routes
app.post('/api/admin-register', createAdmin);
app.post('/api/admin-login', loginAdmin);
app.post('/api/accept-users',verifyingAdminToken, ChangeStatus);
app.post('/api/admins/pay-salary', verifyingAdminToken,paySalary);
app.get('/api/admins',verifyingAllUsersToken, getAllAdmins);
app.get('/api/admins/all', getAllAdminsAll);
app.get('/api/admins/:id',verifyingAdminToken, getAdminById);
app.put('/api/admins/:id', updateAdmin);
app.delete('/api/admins/:id', verifyingAdminToken,deleteAdmin);



// teachers Module Routes
app.post('/api/teacher-register', create);
app.post('/api/teacher-login', login);
app.get('/api/teachers',verifyingAllUsersToken, getAll);
app.get('/api/teachers/getall', getAllTeachers);
app.get('/api/teachers/:id', getById);
app.put('/api/teachers/:id',verifyingAdminAndTeacherToken, updateById);
app.post('/api/teachers/add-activity',verifyingAdminAndTeacherToken, addActivity);
app.get('/api/teachers/view-activity/:id', viewAllActivites);
app.delete('/api/teachers/:id', verifyingAdminToken,deleteById);


app.get('/api/doctors/getallschedules', getallschedules);

// doctor Module Routes
app.post('/api/doctor-register', registerDoctor);
app.post('/api/doctor-login', loginDoctor);
app.post('/api/doctors/schedule/create/:id/:doctorid', createSchedule);
app.get('/api/doctors', verifyingAllUsersToken,getAllDoctors);
app.get('/api/doctors/getall', getAllDoctorsWithoutAuth);
app.get('/api/doctors/:id', getDoctorById);
app.put('/api/doctors/:id',verifyingAdminAndDoctorToken, updateDoctorById);
app.delete('/api/doctors/:id', verifyingAdminToken,deleteDoctorById);
app.put('/api/doctors/update/:id', updateDoctorByIdNoAuth);




// parent module routes
app.post('/api/parent-register', registerParent);
app.post('/api/parent-login', loginParent);
app.get('/api/parents',verifyingAllUsersToken, getAllParents);
app.get('/api/parents/all', getAllParentsAll);
app.get('/api/parents/:id', getParentById);
app.put('/api/parents/:id',verifyingAdminToken, updateParentById);
app.delete('/api/parents/:id', verifyingAdminToken,deleteParentById);
// 
app.put('/api/parents/update/:id', updateParentById);


// children module routes
app.post('/api/children-register/:id', registerChildren);
app.get('/api/childrens/parent/:id', getChildrenByParentId);
app.get('/api/childrens',verifyingAllUsersToken,getAllChildrens);
app.get('/api/all-childrens',getAllChildrensWithoutCredentials);
app.get('/api/childrens/:id', getChildrenById);
app.put('/api/childrens/:id',verifyingAdminAndParentToken, updateChildrenById);
app.delete('/api/childrens/:id', verifyingAdminToken,deleteChildrenById);
app.get('/api/schedules-by-id', getSchedules);
app.get('/api/doctors/getsschedulebyid/:id', getChildrensSchedulesById);
app.get('/api/all-childrens-all', getAllChildrensAll);



app.post('/api/message/:id', verifyingAllUsersToken,sentMessage);
app.post('/api/message-doctor/:doctorsid/:recieverid',sentDoctorMessage);
app.get('/api/message-doctor/:doctorsid/:recieverid',getDoctorMessage);

app.get('/api/message/:id', verifyingAllUsersToken,getMessages);
app.post('/api/teachers-attendance', verifyingAllUsersToken,AttendanceAssignment);
app.get('/api/children-attendance/all/:id',getAttendanceOf);
app.get('/api/children-attendance/:id', verifyingAllUsersToken,getChildrensAttendanceById);
app.get('/api/by-attendance-based/childrens', verifyingAllUsersToken,getChildrenByAttendanceBased);
app.get('/api/getsalaries/:id', getAllSalary);
// progressing
app.get('/api/by-attendance-byid/:id',getTeacherAttendancesById);
app.post('/api/add-description',addDescription);
app.get('/api/schedules/:id',getHealthRecords);


app.get('/api/gethealthrecords/:id',getHealthRecordsByChildId);
app.post('/api/add-feedback',addFeedback);
app.get('/api/get-feedback',getFeedback);
app.post('/api/sent-message/:sender/:reciever',sentMessageAll);
app.get('/api/get-message/:sender/:reciever',getMessagesAll);   
app.post('/api/add-fees',addFees);   
app.get('/api/get-fees',getFees);   
app.delete('/api/delete-fees/:id',deleteFee);   
app.put('/api/edit-fees',editFee);   




// admins






app.listen(PORT,()=>{
    console.log(`server listening on port :${PORT}`)
})

