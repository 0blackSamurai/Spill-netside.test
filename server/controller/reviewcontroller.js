const Review = require("../models/reviewSchema.js");
const Game = require ("../models/gameSchema.js");
const reviewcontroller = {
    createReview: (async(req, res) => {
        const{gameid}=  req.params;
        const {comments, recommended, stars} = req.body;
        const email = req.user.email;
        console.log(req.body);
        let userid =req.user.id;
        // const user = await User.findOne({ email });
        // Review.create(())
        try {
            const review = await Review.create(
                {
                user: userid,
                 game: gameid,
                  comments:comments,
                   recommended:recommended,
                    stars:stars,
                });
                console.log(review,"REVIEW");
                if(review){
    
                    const updateGame = await Game.findOneAndUpdate(gameid, {$push:{reviwes: review._id}});
    
                    res.status(200).send({msg: "Review created", review: review})
                } else {
                    res.status(500).send({msg: "something went wrong"})
                }
            
        } catch (error) {
            console.log(error)
            res.status(500).send({msg: "something went wrong"});
        }


    }),
    getReviewsByGame: (async(req, res)=> {
        const{id}=  req.params;

        try {
            const reviews = await  Review.find({game: id});

            if(reviews){
                res.status(200).send({msg: "Reviews founded", reviews: reviews})
            } else {
                res.status(404).send({msg: "No reviews founded", reviwes:undefined})
            }
            
        } catch (error) {
            console.log(error)
            res.status(500).send({msg: "something went wrong"});
        }
      }),
    getReviewsByUser: (async(req, res) => {
        const{id}=  req.params;
    }),
    getReview: (async(req, res) => {
        const{id}=  req.params;

        try {
            
            const review = await Review.findById(id);
    
            if(review){
                res.status(200).send({msg: "Review founded", review: review})
            } else {
                res.status(404).send({msg: "No review founded"})
            }
        } catch (error) {
          console.log(error)
          res.status(500).send({msg: "something went wrong"});  
        }
    }),
    deleteReview: (async(req, res) => {
        const{id}=  req.params;
        try {
            
            const review = await Review.findByIdAndDelete(id);
            console.log(review);
            res.status(200).send({msg: "Review deleted", review: review})
        } catch (error) {
         console.log(error)
         res.status(500).send({msg: "something went wrong"});   
        }
    }),

};
module.exports = reviewcontroller