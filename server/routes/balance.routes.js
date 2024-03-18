// routes/balanceRoutes.js
import express from 'express';
import { createBalance, getBalance, updateNidBalance, updateServerBalance } from '../controllers/balance.controller.js';

const router = express.Router();

// Route for creating balance
router.post('/create', createBalance);

// Route for updating NID balance
router.post('/update-nid-balance', updateNidBalance);

// Route for updating server balance
router.post('/update-server-balance', updateServerBalance);

// Route for getting balance
router.get('/', getBalance);

export default router;
