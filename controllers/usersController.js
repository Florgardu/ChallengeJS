const controller= {};
const jwt = require("jsonwebtoken");
const config = require("../config");


controller.list = (req, res, next) => {
    req.getConnection((err, conn) =>  {
        conn.query('SELECT * FROM user',  (err, users) => {
            if(err){
                res.status(500).json(err);
            }
            if(users){
                res.json(users);
            }else{
                res.status(404).send("NOT FOUND");
            }
        });
    })
};

controller.signIn = (req, res, next) => {
    const user= req.body;
    user.rol= "customer";

    req.getConnection((err, conn) =>  {
        conn.query('INSERT INTO user (username , email , contrasena , rol) VALUES(?, ?, ?,?)', [req.body.username, req.body.email, req.body.contrasena, 'customer']  , (err, user) =>  {
            if(err){
                res.json(err);
            } 
            res.json("Usuario generado correctamente con ID: " + user.insertId);
        });
    })
};
   


controller.login= (req, res, next) => {
    const { email, contrasena } = req.body;
    req.getConnection((err, conn) =>  {
        conn.query( 'SELECT * FROM user WHERE email= ?', [email], (err, user) =>  {
            if(err){
                return res.json(err);
            } 
            if (user.length===0) {
                return res.status(404).send("User o contraseña incorrecta");
            } else{
                let constrasenaEnBase= user[0].contrasena;
                if (constrasenaEnBase===contrasena) {
                   // return res.json("Ok");

                // Creacion de token al logearse
                const token = jwt.sign({ id: user[0].nro_id}, config.secret, { expiresIn: "1d" });
                //HACER EL ARCHIVO CONFIG SECRET 
                // Respuesta enviando token
                res.json({ autorizacion: true, token: token, mensaje: "Sesión inciada" });


                } else{
                    return res.status(404).send("User o contraseña incorrecta");
                }
            }
           


        })
    })
};



controller.delete = (req, res, next) => {
    const { id } = req.params;
    req.getConnection((err, conn) =>  {
        conn.query( 'DELETE FROM user WHERE nro_id= ?', [id], (err, user) =>  {
            if(err){
                res.json(err);
            } 
            res.json("se elimino correctamente el user con id " + user.nro_id);
        })
    })
};





module.exports = controller;
