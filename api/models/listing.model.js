import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter a name for the listing'],
  },
  description: {
    type: String,
    required: [true, 'Please enter a description for the listing'],
  },
  address: {
    type: String,
    required: [true, 'Please enter an address for the listing'],
  },
  regularPrice: {
    type: Number,
    required: [true, 'Please enter a regular price for the listing'],
  },
  discountedPrice: {
    type: Number,
    required: [true, 'Please enter a discounted price for the listing'],
  },
  bathrooms: {
    type: Number,
    required: [true, 'Please enter the number of bathrooms'],
  },
  bedrooms: { 
    type: Number,
    required: [true, 'Please enter the number of bedrooms'],
  },
  furnished: {
    type: Boolean,
    required: [true, 'Please enter the furnishing'],
  },
  parking: {
    type: Boolean,
    required: [true, 'Please enter the parking'],
  },
  type: {
    type: String,
    required: [true, 'Please enter the type of listing'],
  },
  offer: {
    type: Boolean,
    required: [true, 'Please enter the offer'],
  },
  imageURLs: {
    type: Array,
    required: [true, 'Please enter the image'],
  },
  userRef: {
    type: String,
    required: [true, 'Please enter the user'],
  }, 
}, {timestamps: true}
);

const Listing = mongoose.model('Listing', listingSchema);

export default Listing;