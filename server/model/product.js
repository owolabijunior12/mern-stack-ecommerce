const  mongoose = require('mongoose');
const productSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
       product_price: {
            type: Number,
            require: true,
        },
       imageURL: {
            type: String,
            require: true,
        },
       description: {
            type: String,
            require: true,
        },     
       category: {
            type: String,
            require: true,
        },
       brand: {
            type: String,
            require: true,
        },
        product_type: {
            type: String,
            require: true,
        },
        product_size: {
            type: String,
            require: true,
        },
        product_color: {
            type: String,
            require: true,
        },
        product_weight: {
            type: Number,
            require: true,
        },       
        product_quantity: {
            type: Number,
            require: true,
        },       
        product_status: {
            type: String,
            require: true,
        },       
        product_serial_number: {
            type: String,
            require: true,
        },       
        product_model_number: {
            type: String,
            require: true,
        },       
        
    },
    {timestamps:true}
);

module.exports =mongoose.model("product", productSchema);
