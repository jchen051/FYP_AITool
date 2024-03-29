const express = require('express');
const router = express.Router();

var userController = require('../controllers/user')
var projectController = require('../controllers/project')
var projectdetailsController = require('../controllers/projectdetails')
var projectreviewsController = require('../controllers/projectreviews')
var survey = require('../controllers/survey')

router.post('/login', userController.login) //users login route
router.post('/users', userController.register) //create users
router.post('/users/forget',userController.forgetPW)
router.post('/users/reset/:token',userController.resetPW)
router.get('/users', userController.getAllUsers) //get all users
router.get('/users/reset/:token',userController.getUsers)
router.put('/users/:userid', userController.insertInvitedProjectId) //Insert inviteprojectid into user
router.put('/users/:userid/accept', userController.insertAcceptedProjectId) //Insert acceptedprojectid into user
router.put('/users/:userid/reject', userController.insertRejectedProjectId) //Insert rejectedprojectid into user
router.put('/users/:userid/input', userController.insertInputtedProjectId) //Insert inputtedprojectid and remove acceptedprojectid from user
router.put('/users/:userid/review',userController.insertReviewedProjectId) //Insert reviewedprojectid and remove inputtedprojectid from user
router.put('/users/:userid/survey',userController.insertSurveyDone) //Insert surveydone into user table

router.post('/create', projectController.createProject) //create project
router.get('/create/facilitator', projectController.getFProjects) //get projects by members/facilitator
router.get('/create/memberspr',projectController.getPRProjects) //get members pr projects
router.get('/create/membersog',projectController.getOGProjects) //get members og projects
router.get('/create/membersnr',projectController.getNRProjects) //get members nr projects
router.get('/create/memberscp',projectController.getCPProjects) //get members cp projects
router.get('/create/:projectid', projectController.getProjectDetails) //get selected projectdetails members accept
router.put('/create/:projectid', projectController.insertProjectSettings) //facilitator inserts projectsettings
router.put('/create/:projectid/accept', projectController.acceptUserid) //Insert into acceptedmembers
router.put('/create/:projectid/reject',projectController.rejectUserid) //Insert into rejectedmembers
router.put('/create/:projectid/input', projectController.inputUserid) //Remove userid from acceptedmembers and insert into inputtedmembers
router.put('/create/:projectid/review',projectController.reviewUserid) //Insert into reviewedmembers

router.post('/projectdetails', projectdetailsController.createProjectDetails) //Create a collection to store member's project inputs
router.get('/projectdetails',projectdetailsController.getAllProjectDetails) //Get project details inputted by all members

router.post('/projectreviews', projectreviewsController.createProjectReviews)
router.get('/projectreviews', projectreviewsController.getFairnesscardReviews) //get ratings of fairness cards for each project

router.post('/survey',survey.createSurvey)
module.exports = router;