import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getUsersForSidebar , findUserById , updateBalance , updatePassword,deleteUserById , updateBalanceForServer,updateBalanceForNid} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", protectRoute, getUsersForSidebar);
router.get("/userInfo", protectRoute, findUserById);
router.put("/update-balance", protectRoute, updateBalance);
router.put("/update-balance-server", protectRoute, updateBalanceForServer);
router.put("/update-balance-nid", protectRoute,updateBalanceForNid);
router.put("/update-password", protectRoute, updatePassword);
router.delete("/users/:userId", protectRoute, deleteUserById);

export default router;