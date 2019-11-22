const express = require("express")
const router = express.Router()
const controller = require("../controllers/clientesController")

router.post("/", controller.post)
// router.get("/", controller.getVariosFiltros)
router.get("/", controller.get)
router.get("/compradores", controller.getCompradores)
router.get("/:cpf", controller.getCPF)
router.put("/:cpf", controller.update)
router.delete("/:cpf", controller.deletarCliente)

module.exports = router