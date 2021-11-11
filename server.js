var express = require("express");
var app = express();
var bodyparser = require('body-parser');
var oracledb = require('oracledb');
var bcrypt = require('bcrypt');
var User = require('./model/user')

app.use(express.json()); 

app.use(express.urlencoded({
 extended: true
}));

var conexionOracle = {
    "user": "FERIA",
    "password": "123456",
    "connectString": "(DESCRIPTION =(LOAD_BALANCE = ON)(FAILOVER = ON)(ADDRESS =(PROTOCOL = TCP)(HOST = localhost)(PORT = 1521))(ADDRESS = (PROTOCOL = TCP)(HOST = localhost)(PORT=1521))(CONNECT_DATA=(SERVICE_NAME=XE)(FAILOVER_MODE=(TYPE=SELECT)(METHOD = BASIC))))"
}

app.get('/',(req,res)=>{
    res.send([{message: 'Test Server Oracle Application is reciving data'}]);
});



/////Crear un usuario////// done
/*

app.set("view engine", "ejs");

app.post("/newuser", function(req, res) {
    // get data from forms and add to the table called user..

    var sql = `INSERT INTO UsuariosFeria 
            (
                nombre, apellidos, contrasena
            )
            VALUES
            (
                name, apellido, psw
            )`;
connection.query(sql, [name , apellido, psw], function (err, data) {
    if (err) {
        // some error occured
    } else {
        // successfully inserted into db
    }
});
});

*/

app.post('/registro', function (req, res) {
    "use strict";
    oracledb.getConnection(conexionOracle, function (err, connection) {
        if (err) {
            // Error connecting to DB
            res.set('Content-Type', 'application/json');
            res.status(500).send(JSON.stringify({
                status: 500,
                message: "Error al conectar con la base de datos",
                detailed_message: err.message
            }));
            return;
        }

        var sql = "INSERT INTO usuario (id_usuario, nom_us, contrasenia, id_usuario_persona, fk_usuario_rol) VALUES ( ?, " ({username}) + " , " ({password}) + " , " ({tipeuser}) + " , " ({tiperol}) + ");"

        connection.execute(sql, {

        }, function (err, result) {
            if (err) {
                res.set('Content-Type', 'application/json');
                res.status(500).send(JSON.stringify({
                    status: 500,
                    message: "Error al traer la tabla UsuariosFeria",
                    detailed_message: err.message
                }));
            } else {
                res.header('Access-Control-Allow-Methods','POST');
                res.contentType('application/json').status(200);
                res.send(JSON.stringify(result.rows));	
            }
            // Release the connection
            connection.release(
                function (err) {
                    if (err) {
                        console.error(err.message);
                    } else {
                        console.log("Connection released");
                    }
                });
        });
    });
});

app.get('/productosManzanas', function (req, res) {
    "use strict";
    oracledb.getConnection(conexionOracle, function (err, connection) {
        if (err) {
            // Error connecting to DB
            res.set('Content-Type', 'application/json');
            res.status(500).send(JSON.stringify({
                status: 500,
                message: "Error al conectar con la base de datos",
                detailed_message: err.message
            }));
            return;
        }
        connection.execute("SELECT * FROM PRODUCTO WHERE FK_PRDUCTO_TIPOPROD = 1", {}, {
            outFormat: oracledb.OBJECT // Return the result as Object
        }, function (err, result) {
            if (err) {
                res.set('Content-Type', 'application/json');
                res.status(500).send(JSON.stringify({
                    status: 500,
                    message: "Error al traer la tabla Productos",
                    detailed_message: err.message
                }));
            } else {
                res.header('Access-Control-Allow-Origin','*');
                res.header('Access-Control-Allow-Headers','Content-Type');
                res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,OPTIONS');
                res.contentType('application/json').status(200);
                res.send(JSON.stringify(result.rows));	
            }
            // Release the connection
            connection.release(
                function (err) {
                    if (err) {
                        console.error(err.message);
                    } else {
                        console.log("Connection released");
                    }
                });
        });
    });
});




app.listen(3000,'localhost',function(){
    console.log("El servidor esta escuchando desde el puerto 3000");
})
