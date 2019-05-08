'use strict';

const addFunctionsValidation = require('./validations/addFunctionsValidation');
const readFunctionsValidation = require('./validations/readFunctionsValidation');
const fetchQuestions = require('./functions/fetchQuestions');
const readAllRequest = require('./functions/readAllRequest');
const AddScore = require('./functions/AddScore'); 
const cors = require('cors'); //middleware to connected
var path = require('path'); 
var express = require('express'); //middleware to response
module.exports = router => {
    router.post("/addData", cors(), (req, res) => {

        addFunctionsValidation.addDataTestValidation(req, function(err, result) {
            
            if (err) {
                res.status(err.status).json({
                    message: err
                });
            } else {
                res.json({
                    status: result.status,
                    message: result.message
                });
            }
        });

    })
    //UploadScore service
    router.post('/UploadScore', (req, res) => {
        const rollNo = req.body.rollNo;
        const score = req.body.score;
        const name = req.body.name;
        const mobNo= req.body.mobNo;
       console.log(rollNo,"rollNo")
      // logger.debug("Some debug messages");
      
        
        
    
         if (!rollNo) {
        console.log("invalid body")
        return res.status(400).json({
            message: 'Invalid Request !'
        });
    
    }else{
            //route to AddScore.js
            AddScore.AddScore(rollNo,score,name,mobNo)
    
        .then(result => {
           
                res.status(result.status).json({
                    message: result.message,
                    marks: result.score
                })
            })
            
            .catch(err => res.status(err.status).json({
                message: err.message
            }));
    
        }
    });  
    //To fetch questions
    router.get('/fetchQuestions', cors(), (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
   // res.header("Access-Control-Allow-Headers", "Orig
        const userid = "001"
        console.log(userid);

        if (!userid || !userid.trim()) {
            // the if statement checks if any of the above paramenters are null or not..if
            // is the it sends an error report.
            res
                .status(400)
                .json({
                    message: 'Invalid Request !'
                });

        } else {

            fetchQuestions
                .fetchQuestions(userid)
                .then(function(result) {
                    console.log(result)
                    res
                        .status(result.status)
                        .json({
                            status: result.status,
                            Questions: result.policylist
                        })
                })
                .catch(err => res.status(err.status).json({
                    message: err.message
                }));
        }

    });
    // get all request
    router.get("/readAllrequest", cors(), (req, res) => {
            readAllRequest
                .readAllRequest()
                .then(function(result) {
                    console.log("  result.query---->", result.query.response.length);                  
                    
                     res.json({
                        
                        "status": 200,
                        "readAllRequest": result,
                        //"score": JSON.stringify(result.query.Score)
                    });
                })
            
                .catch(err =>{
                     console.log("error from parsing,",err) 
                    res.status(err.status).json({
                    message: err.message
                });
        })
    })

    router.post("/readData", cors(), (req, res) => {

        readFunctionsValidation.readDataTestValidation(req, function(err, result) {
            
            if (err) {
                res.status(err.status).json({
                    message: err
                });
            } else {
                res.json({
                    status: result.status,
                    data: result
                });
            }
        });
    })
}

