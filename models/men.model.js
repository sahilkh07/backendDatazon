const mongoose = require("mongoose");

const manSchema = mongoose.Schema(
  {
    URL:String,
    title:{type:String,required:true},
      stitle: {type:String,required:true},
      rating: String,
      reviews: String,
      price: {type:Number,required:true},
      description:String,
      ASIN: String,
      img:{type:String,required:true}
  },
  {
    versionKey: false,
  }
);

const MenModel = mongoose.model("mendata", manSchema);

module.exports = {
  MenModel,
};