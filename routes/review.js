const express = require("express");
const router = express.Router({mergeParams:true}); // without mergeParams, id cant be pass from app.js to here. Resulting failure to add reviews.
const wrapAsync = require("../utils/wrapAsync.js")
const ExpressError = require("../utils/ExpressError.js")
const Review = require("../models/reviews.js");
const Listing = require("../models/listing.js");
const {validateReview, isLoggedIn,isReviewAuthor} = require("../middleware.js");

const reviewController = require("../controllers/reviews.js");

//Review Create Route
router.post("/",isLoggedIn,validateReview, wrapAsync(reviewController.createReview));

//Review Delete Route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.destroyReview));
 
module.exports = router;