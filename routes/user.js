//Requiring dependencies
const express = require('express');
//require model
const UserModel = require('../model/userModel')
const path = require('path')


//setup of router
const router = express.Router();

//setup router handlers
router.get('/form',(req,res)=>{
   res.render('studentProfile')
});

//Route to get single student
router.get('/student/:id', async(req,res)=>{
try {
   const learner = await UserModel.findById(req.params.id)
   console.log(learner);
   res.render('learner', {x:learner})
   
} catch (error) {
   console.log("Unabale to find learner");
   
}
})

//get all route
router.get('/allStudents',async(req,res)=>{
   try{
      const students = await UserModel.find()
      res.render('list',{x:students})
   }catch(error){
      res.status(404).send('student list failed')
   }
})

router.post('/addstudent', async (req,res)=>{
   
      try {
         const newStudent = new UserModel(req.body)
      await newStudent.save()
      res.redirect('/allstudents')
      } catch (error) {
         console.log(error);
         res.status(404).send('Student creation failed')
         
      }
   }
)

router.get('/prompt',(req,res)=>{
   res.send('this is a prompt')
});

router.get('/viewprofile',(req,res)=>{
   res.send('this is the viewprofile route')
});

module.exports = router;

