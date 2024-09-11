const Listing = require("../models/listing.js");
const Review = require("../models/reviews.js");


module.exports.createReview = async (req,res)=>{
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review) ;
    newReview.author = req.user._id;

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    req.flash("success", "New Review Created");
    res.redirect(`/listings/${listing._id}`);
}

module.exports.destroyReview = async (req, res)=>{
    let {id, reviewId} = req.params;

    await Listing.findByIdAndUpdate(id, {$pull:{reviews:reviewId}});   //This to delete reviews from review array from database
    await Review.findByIdAndDelete(reviewId); //This will simple delete the review from listing schema  

    req.flash("success", "Review deleted");
    res.redirect(`/listings/${id}`);
}