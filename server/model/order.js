const mongoose= require("mongoose");
const addToCartSchema = mongoose.Schema(
    {
        name:{
            type:String,
            require:true
        },
        product_price:{
            type:Number,
            require:true
        },
        imageURL:{
            type:String,
            require:true
        },
        product_size:{
            type:String,
            require:true
        },
        product_qty:{
            type:Number,
            require:true
        },
        userId:{
            type:String,
            require:true
        }        
    },
    {timestamps:true}
);
module.exports = mongoose.model("addToCart", addToCartSchema);