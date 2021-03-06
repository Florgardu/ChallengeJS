const controller = {};

controller.list = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query("SELECT * FROM operaciones", (err, users) => {
      if (err) {
        res.status(500).json({err});
        return;
      }
      if (users) {
        res.json(users);
      } else {
        res.status(404).send("NOT FOUND");
      }
    });
  });
};

controller.listEgresos = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query(
      'SELECT * FROM operaciones WHERE TIPO="egreso"',
      (err, users) => {
        if (err) {
          res.status(500).json({err});
          return;
        }
        if (users) {
          res.json(users);
        } else {
          res.status(404).send("NOT FOUND");
        }
      }
    );
  });
};

controller.listIngresos = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query(
      'SELECT * FROM operaciones WHERE TIPO="ingreso"',
      (err, users) => {
        if (err) {
          res.status(500).json({err});
          return;
        }
        if (users) {
          res.json(users);
        } else {
          res.status(404).send("NOT FOUND");
        }
      }
    );
  });
};

controller.insert = (req, res) => {
    if(!(req.body.tipo === 'EGRESO' || req.body.tipo === 'INGRESO')){
        res.status(400).end();
        return;
    }

  req.getConnection((err, conn) => {
    conn.query(
      "INSERT INTO operaciones (concepto, monto, fecha, tipo, idUser) VALUES(?, ?, ?,?, ?)",
      [
        req.body.concepto,
        req.body.monto,
        req.body.fecha,
        req.body.tipo,
        req.body.idUser,
      ],
      (err, operacion) => {
        if (err) {
          res.status(500).json(err);
          return;
        }
        res.status(201).json({message: `se inserto correctamente la operaciones con el ID ${operacion.insertId}`});
      }
    );
  });
};

controller.delete = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    conn.query(
      "DELETE FROM operaciones WHERE nro_id= ?",
      [id], (err) => {
        if (err) {
          res.status(500).json(err);
          return;
        }
        res.json({message: `se elimino correctamente la operacion con id ${id}`});
      }
    );
  });
};

controller.getOperacion = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    conn.query(
      "SELECT * FROM operaciones WHERE nro_id= ?",
      [id],
      (err, operacion) => {
        if (err) {
          res.status(500).json({err});
          return;
        }
        res.json(operacion);
      }
    );
  });
};

controller.update = (req, res) => {
  const { id } = req.params;
  if (req.body.tipo != null) {
    res.json("no se puede modificar el tipo");
  } else {
    const newOperation = req.body;
    req.getConnection((err, conn) => {
      conn.query(
        "UPDATE operaciones set ? where nro_id = ?",
        [newOperation, id],
        (err) => {
          if (err) {
            res.status(500).json(err);
            return;
          }
          res.json({message: `se actualizo correctamente la operacion con id ${id}`});
        }
      );
    });
  }
};

module.exports = controller;
