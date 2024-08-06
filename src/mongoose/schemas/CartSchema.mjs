import mongoose from 'mongoose';

let CartSchema = mongoose.Schema({
    email: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    name:{
        type: mongoose.Schema.Types.String,
        required: true
    },
    price:{
        type: mongoose.Schema.Types.Number,
        required: true
    },
    potion:{
        type: mongoose.Schema.Types.String,
        required: true
    },
    quantity:{
        type: mongoose.Schema.Types.Number,
        required: true
    },
    img:{
        type: mongoose.Schema.Types.String,
        required: true
    } 
})

let Cart = mongoose.model('Cart',CartSchema);
export default Cart;