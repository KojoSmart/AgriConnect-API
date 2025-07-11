const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadFileMiddleware")

const {createEquipment, deleteEquipment, updateEquipment, getAllEquipment, getAllEquipmentByOwner, getOneEquipment} = require("../controllers/equipmentController");
const authMiddlewareHandler = require("../middleware/authMiddleware");



router.post("/adminCreate", authMiddlewareHandler, upload.single("image"), createEquipment);
router.delete("/adminDelete/:id", authMiddlewareHandler, deleteEquipment)

router.put("/adminUpdate/:id", authMiddlewareHandler, updateEquipment ),
router.get("/adminGetAll", authMiddlewareHandler, getAllEquipmentByOwner)
router.get("/viewOneEquipment/:id", authMiddlewareHandler, getOneEquipment)
router.get("/getAllByUser", getAllEquipment);


module.exports = router