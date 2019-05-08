//const {validationResult} = require('express-validation/check');

const Post = require('../models/model');
var bcSdk = require('../sdk/invoke');
var bcSdkf= require('../sdk/query')
var post

exports.readAllRequest = (req, res, next) => {
  bcSdkf.readAllRequest({
    // key:"111"
  })
  
  .then((response) => {
     console.log("data in response " + JSON.stringify(response))
     res
            .status(200)
            .json({
              message: 'Fetched sucessfull.........',
              query: response
           })
    


             

  })
  
  .catch(err => {
  
    if (err.code == 401) {
      
        res.json({
             status: 401,
             message: 'cant fetch !'
         });
  
    } else {
         console.log("error occurred" + err);
  
        res.json({
             status: 500,
             message: 'Internal Server Error !'
         });
     }
  })
}

//Fetching all data from Mongodb
exports.getPosts = (req, res, next) => {
  Post.find()
    .then(post => {
      res
      .status(200)
      .json({
        message: 'Fetched sucessfull..',
        posts: post
      })
    })
      .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err)
     
    })
};


//Fetching all data from Mongodb (by Async Await)
//exports.getPosts = async (req, res, next) => {
  // try {
  // const post = await Post.find()
  //     res.status(200).json({
  //       message: 'Fetched sucessfull',
  //       posts: post
  //     })
  //    } catch(err) {
  //       if (!err.statusCode) {
  //         err.statusCode = 500;
  //       }
  //       next(err)
     
  //   }



//Fetching data from mongoDb by title //
exports.getPost = (req, res, next) => {
  const name = req.body.title; 
  Post.find({ title: name})
  //console.log("postId--->", name)
    .then(post => {
      if (!post) {
        const error = new Error('Could not find post.');
        error.statusCode = 404;
        throw error;
      }
      res
      .status(200)
      .json({
        message: 'Fetched sucessfull',
        post: post
      })
     // return post
    })
      .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err)
     
    })
};

//Posting Data in MongoDb//
exports.createPost = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  // Create post in db
   post = new Post({
    title: title,
    content: content,
     creator: {name: 'Rahul'},
  })
//   post
//   .save()
//   .then(result => {
//     console.log("data---->>>",result)
//     res.status(201).json({
//       message: 'Post created successfully!',
//       post: result
//     //console.log(result)
//   });
// })
  
//   .catch(err => {
//     console.log(err);
// res.status(401).json({
//       message: 'Data Already Exist',
//   });
    
//   });
  


  bcSdk.addData({
            
    post: post
   
    
}).then((result) =>{
    
    res
    .status(200)
    .json({
        "message": "Data Stored sucessfully in Blockchain",
        "result":result
    })

})
.catch(err => {
res
.status(500)
.json({
    "message": 'Something went wrong please try again later!!'
});

});

}


