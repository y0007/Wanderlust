const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js")
const listingController = require("../controllers/listing.js");
const multer  = require('multer')
const {storage} = require("../cloudConfig.js")
const upload = multer({ storage })



//used for requests having same path to compact the code. Here it is used for Index and create route
router.route("/")
  .get(wrapAsync(listingController.index))
  .post(isLoggedIn, upload.single('listing[image]'), validateListing, wrapAsync(listingController.createListing));

//New Route (It should be above than Show Route)
router.get("/new",isLoggedIn,listingController.renderNewForm )


//Here it is used for Show and Update and Delete Route
router.route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(isLoggedIn,isOwner, upload.single('listing[image]'), validateListing, wrapAsync(listingController.updateListing))
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));



//Index Route
// router.get("/",wrapAsync(listingController.index));



//Show route
//router.get("/:id",wrapAsync(listingController.showListing));

//Create Route
// router.post("/",isLoggedIn, validateListing,wrapAsync(listingController.createListing));

//Edit Route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));

//Update Route
//router.put("/:id",validateListing,isLoggedIn,isOwner, wrapAsync(listingController.updateListing));

//Delete Route
//router.delete("/:id",isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

module.exports = router;