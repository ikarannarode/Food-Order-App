import express from 'express';
import { addFood } from '../controllers/food.controller.js';
const router = express.Router();

router.post('/add', addFood);


export default router;


