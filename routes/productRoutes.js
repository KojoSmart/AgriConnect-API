const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadFileMiddleware")

const {createEquipment, deleteEquipment, updateEquipment, getAllEquipment, getAllEquipmentByOwner, getOneEquipment, searchItemByVendor, searchItemByUser, oneEquipmentByVendor} = require("../controllers/equipmentController");
const {authMiddlewareHandler, authorizedRoles} = require("../middleware/authMiddleware");



router.post("/adminCreate", authMiddlewareHandler, authorizedRoles("admin"),  upload.single("file"), createEquipment);
router.delete("/adminDelete/:id", authMiddlewareHandler, authorizedRoles("admin"), deleteEquipment)

router.put("/adminUpdate/:id", authMiddlewareHandler, authorizedRoles("admin"), upload.single("file"), updateEquipment ),
router.get("/adminGetAll", authMiddlewareHandler, authorizedRoles("admin"), getAllEquipmentByOwner)
router.get("/viewOneEquipment/:id", getOneEquipment)
router.get("/getAllByUser", getAllEquipment);
router.get("/searchItemByVendor", searchItemByVendor)
router.get("/searchItemByUser", searchItemByUser);
router.get("/oneEquipmentByVendor/:id", authMiddlewareHandler, authorizedRoles("admin"), oneEquipmentByVendor)


module.exports = router