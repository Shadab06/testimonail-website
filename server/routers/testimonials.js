import express from 'express';
import { createData, deleteData, getData, getDatas, updateData } from "../controllers/testimonial.js";

const router = express.Router();

router.post("/create", createData)
router.get("/get", getDatas)
router.get("/get/:id", getData)
router.patch("/update/:id", updateData)
router.delete("/delete/:id", deleteData)

export default router;