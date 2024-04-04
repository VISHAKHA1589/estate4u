import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;



const propertySchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { public_id:{
      type: String,
      requires:true
    },
  url:{
    type: String,
    required:true
  } },
    ownerName: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    category: { type: ObjectId, ref: "Category", required: true },
    owner: {
      type: String,
      required: true
    },
    
  
    description: { type: String, required: true },
    price:{type: Number, required: true},
    address:{type: String, required: true}
  }

  ,{ timestamps: true }
);

const Property = mongoose.model("Property", propertySchema);
export default Property;