import {Router } from "express";
import { validateCreate } from "../../validators/product";
import { getAll, create, getById, remove, update } from "../../controllers/product";

const router = Router();

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', validateCreate, create);
router.put('/:id', update);
router.delete('/:id', remove);

export default router;