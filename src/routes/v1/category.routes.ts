import { Router } from "express";
import { getAll, create, getById, remove, update } from "../../controllers/category";
import { validateCreate } from "../../validators/category";

const router = Router();

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', validateCreate, create);
router.put('/:id', update);
router.delete('/:id', remove);

export default router;