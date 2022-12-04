const express = require("express")
const router = express.Router();
const mealType = require("../controller/MealTypeController.js")
const location = require("../controller/LocationController")
const restuarant = require("../controller/RestuarantController")
const users = require("../controller/UsersController")
const menu_item = require("../controller/MenuItemController")
const paymentController = require("../controller/PaymentController")

router.get("/",mealType.apiHome)

router.get("/get-meal-type",mealType.getMealType)
router.post("/add-meal-type",mealType.addMealType)

router.get("/get-location",location.getLocationList)
router.get("/get-location-by-city",location.getLocationByCity)
router.post("/add-location",location.addLocationList)


router.get("/get-restuarant",restuarant.getRestauarantList)
router.post("/add-restuarant",restuarant.addRestuarantList)
router.get("/get-restuarant-by-id/:id",restuarant.getRestuarantDetailsById)
router.get("/get-restuarant-by-location-id",restuarant.getRestuarantLocationId)

router.post("/filter",restuarant.filterRestuarant)

//menu
router.get("/get-menu-item",menu_item.getMenuItems)
router.post("/add-menu-item",menu_item.addMenuItems)

//users
router.post("/sign-up",users.userSignUp)
router.post("/login",users.userLogin)

//payments
router.post("/payment",paymentController.payment)
router.post("/callback",paymentController.callback)

module.exports = router