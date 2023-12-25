
require("dotenv").config();

const express = require('express');
const router = express.Router();

const userAuthRouter = require('./userAuth');
const employeeRouter = require('../routes/employeeRouter');
const userRouter = require('../routes/userRouter');
const departmentRouter = require('../routes/departmentRouter');
const postRouter = require('../routes/postRouter');
const uploadRouter = require('../routes/uploadRouter');
const eventRouter = require('../routes/eventRouter');
const roleRouter = require('../routes/roleRouter');
const newsRouter = require('../routes/newsRouter');
const messageRouter = require('../routes/messageRouter');


router.use(userAuthRouter);
router.use('/dashboard/employees', employeeRouter);
router.use('/dashboard/admin', userRouter);
router.use('/departments', departmentRouter);
router.use('/posts', postRouter);
router.use('/events', eventRouter);
router.use('/roles', roleRouter);
router.use('/news', newsRouter);
router.use('/upload', uploadRouter);
router.use('/messages', messageRouter);




module.exports = router;