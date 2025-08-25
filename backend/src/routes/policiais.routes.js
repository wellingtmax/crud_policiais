import express from 'express';
import { cadastrarPolicial, listarPoliciais } from '../controller/policiais.controller.js';

const router = express.Router();

router.post('/policiais', cadastrarPolicial);
router.get('/policiais', listarPoliciais);

export default router;
