import { Router } from "express"
import { deleteTaskById, getAllTask, getTaskById, getTasksByTarget, postTask, putTaskById } from "../controllers/tasks.controller"
import { checkSuperKey } from "../middlewares/accessProtector"
const router = Router()

router.post('/', checkSuperKey, postTask)
router.get('/', getAllTask)
router.get('/:id', getTaskById)
router.get('/target/:target', getTasksByTarget)
router.put('/:id', checkSuperKey, putTaskById)
router.delete('/:id', checkSuperKey, deleteTaskById)

export default router