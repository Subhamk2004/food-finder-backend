import mongoose from 'mongoose';

let CartSchema = mongoose.Schema({
    cartvalue: {
        type: mongoose.Schema.Types.String,
        required: true
    }, 
    email: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    carttotal: {
        type: mongoose.Schema.Types.Number,
        required: true
    } 
})

let Cart = mongoose.model('Cart',CartSchema);
export default Cart;