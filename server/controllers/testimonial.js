import mongoose from "mongoose";
import Testimonial from "../models/testimonial.js"

export const createData = async (req, res) => {
    const { name, image, post, description, active } = req.body;
    try {
        const newTestimonial = await Testimonial.create({ name, image, post, description, active })

        res.status(201).json(newTestimonial);
    } catch (error) {
        res.status(422).json({ error: error.message });
    }
}

export const getDatas = async (req, res) => {
    try {
        const testimonials = await Testimonial.find()
        res.status(200).json(testimonials)
    } catch (error) {
        res.status(422).json({ error: error.message });
    }
}

export const getData = async (req, res) => {
    const { id } = req.params;

    try {
        const singleData = await Testimonial.findById(id)
        res.status(200).json(singleData)
    } catch (error) {
        res.status(422).json({ error: error.message });
    }
}

export const updateData = async (req, res) => {
    const { id: _id } = req.params;
    const newData = req.body;
    const updateData = { newData, updatedAt: new Date() }
    console.log(updateData)

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.statue(404).send("Data not found");
    try {
        const updatedData = await Testimonial.findByIdAndUpdate(_id, updateData, { new: true })
        res.status(202).json(updatedData);
    } catch (error) {
        res.status(422).json({ error: error.message });
    }
}

export const deleteData = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No data with this id is present.');

    try {
        await Testimonial.findByIdAndRemove(id)
        res.status(200).send("Data removed successfully");
    } catch (error) {
        res.status(422).json({ error: error.message });
    }
}