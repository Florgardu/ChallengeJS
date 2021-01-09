CREATE DATABASE `node_mysql`;

CREATE TABLE `operaciones` (
  `nro_id` int(24) NOT NULL AUTO_INCREMENT,
  `concepto` varchar(128) DEFAULT NULL,
  `monto` int(24) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `tipo` varchar(10) DEFAULT NULL,
  `idUser` int(24) DEFAULT NULL,
  PRIMARY KEY (`nro_id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;

CREATE TABLE `user` (
  `nro_id` int(24) NOT NULL AUTO_INCREMENT,
  `username` varchar(128) DEFAULT NULL,
  `email` varchar(128) DEFAULT NULL,
  `contrasena` varchar(128) DEFAULT NULL,
  `rol` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`nro_id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;