import express from "express";
import formidable from "express-formidable";
const router = express.Router();

// controllers
import {
  addProperty, updatePropertyDetails, removeProperty,fetchAllProperties,fetchProperty,fetchPropertyById, fetchNewProperties
  
} from "../controllers/propertyController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";
import { fetchProperties } from "../controllers/propertyController.js";

router
  .route("/")
  .get(fetchProperties)
  .post(authenticate, formidable(), addProperty);

router.route("/allproperties").get(fetchAllProperties);
router.route("/new").get(fetchNewProperties);
router
  .route("/:id")
  .get(fetchPropertyById)
  .put(authenticate,  formidable(), updatePropertyDetails)
  .delete(authenticate, removeProperty);



export default router;