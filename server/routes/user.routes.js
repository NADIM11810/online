import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { 
  getUsersForSidebar, 
  findUserById, 
  updateBalance, 
  updatePassword, 
  deleteUserById, 
  updateBalanceForServer, 
  updateBalanceForNid, 
  updateBalanceForBirth, 
  updateBalanceForTin, 
  updateBalanceForBio, 
  updateBalanceForRoshid 
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", protectRoute, getUsersForSidebar);
router.get("/userInfo", protectRoute, findUserById);
router.put("/update-balance", protectRoute, updateBalance);
router.put("/update-balance-server", protectRoute, updateBalanceForServer);
router.put("/update-balance-nid", protectRoute, updateBalanceForNid);
router.put("/update-balance-birth", protectRoute, updateBalanceForBirth);
router.put("/update-balance-tin", protectRoute, updateBalanceForTin);
router.put("/update-balance-bio", protectRoute, updateBalanceForBio);
router.put("/update-balance-roshid", protectRoute, updateBalanceForRoshid);
router.put("/update-password", protectRoute, updatePassword);
router.delete("/users/:userId", protectRoute, deleteUserById);

export default router;
