import mongoose from 'mongoose';

const foodItemSchema = new mongoose.Schema({
  CategoryName: String,
  name:String,
  img:String,
  options:Array,
  description: String,
}, { collection: 'food_items' }); 

const FoodItem = mongoose.model('FoodItem', foodItemSchema);

export default FoodItem;
