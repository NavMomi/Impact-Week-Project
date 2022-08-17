const Commentmodel = require("../models/Comment");
const Usermodel = require("../models/User");
const Questionmodel = require("../models/Question");
const jwt = require('jsonwebtoken');



const viewpage = (req, res) => {
    const user = res.locals.user;
    
    // check json web token exists & is verified
    if (user) {
            Questionmodel.findById(req.query.question_id).populate("comments").populate("user")
                .then(result => {

                    result.rate = result.rate + 1;
                    result.save();
                    res.render('communitydetails', {
                        questions: result,
                        error: ''
                    })
                })
                .catch(err => {
                    console.log(err)
                })
    
    } else {
        console.log(user);
    }
};

const addcomment = async (req, res) => {
    let question = await Questionmodel.findById(req.query.questions_id);
    let user = await Usermodel.findById(req.query.user_id);
    
  try {
      const comment = new Commentmodel();
      comment.text = req.body.text;
      comment.user_id = user._id;
      comment.user_name = user.username;
      comment.upvote = 0;
      comment.save().then(() => {
          question.comments.push(comment);
          question.save();
          
          res.redirect(`/communitydetails/?question_id=${req.query.questions_id}`)
      }).catch(err => {
          console.log(err)
      })

  }
  catch (err) {
      console.log(err);

    }
 
}

const deletecomment = async (req, res) => {

    Commentmodel.findByIdAndDelete(req.query.comment_id)
        .then(() => {
            res.redirect(`/communitydetails/?question_id=${req.query.question_id}`)
        })
        .catch(err => {
            console.log(err)
        })
}

module.exports = {
    viewpage,
    addcomment,
    deletecomment,

}