const Router = require("express");
const router = Router.Router();
const {
  getAllKands,
  getKandById,
  createKand,
  updateKand,
  deleteKand,
} = require("../Controller/kandController");

router.get("/", getAllKands);
router.get("/:id", getKandById);
router.post("/", createKand);
router.put("/:id", updateKand);
router.delete("/:id", deleteKand);

module.exports = router;
