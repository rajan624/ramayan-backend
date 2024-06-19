const Router = require("express");
const router = Router.Router();
const {
  getAllModules,
  getModuleById,
  createModule,
  updateModule,
  deleteModule,
} = require("../Controller/moduleController");

router.get("/", getAllModules);
router.get("/:id", getModuleById);
router.post("/", createModule);
router.put("/:id", updateModule);
router.delete("/:id", deleteModule);

module.exports = router;
