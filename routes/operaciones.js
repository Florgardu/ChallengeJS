const express = require('express');
const router = express.Router();
const operacionesController = require('../controllers/operacionesController');


/* GET users listing. */
router.get("/", operacionesController.list);
router.get("/:id", operacionesController.getOperacion);

router.get("/egresos", operacionesController.listEgresos);

router.get("/ingresos", operacionesController.listIngresos);

router.post("/", operacionesController.insert);

router.delete("/:id",operacionesController.delete );

router.put("/:id",operacionesController.update )



module.exports = router;
