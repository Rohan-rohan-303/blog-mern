import Router from 'express';
import {getAllUsers, signUp, login} from '../controllers/user-controller';

const router = Router();

router.get("/", getAllUsers);
router.post("/signup", signUp);
router.post("/login", login);

export default router;