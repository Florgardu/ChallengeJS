const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');


/* GET users listing. */
router.get("/", usersController.list);

router.post("/",usersController.signIn );

router.post("/login",usersController.login );

router.delete("/:id",usersController.delete );



module.exports = router;
