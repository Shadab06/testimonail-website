import mongoose from "mongoose";

const testimonial = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    post: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    active: {
        type: String,
    },
    updatedAt: {
        type: String,
    },
    createAt: {
        type: Date,
        default: new Date()
    },
})

export default mongoose.model("Testimonial", testimonial);