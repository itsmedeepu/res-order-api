const mongoose = require("mongoose")

const Order = mongoose.Schema({

    guest_name:{
        type:String,
        required:true
    },
    guest_phone:{
        type:String,
        required:true,

    },
    orders:[{
        table_id:{
            type:Number,
            required:true,
        },
        dishes:{
            type:Array,
            required:true,
        },
        order_time:{
            type:"string",
            default:new Date().getHours()%12+":"+new Date().getMinutes()+":"+new Date().getSeconds()
        }
    }]
    
})


const OrderModule= mongoose.model("Order",Order)

module.exports={OrderModule}