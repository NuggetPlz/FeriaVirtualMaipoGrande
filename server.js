var express = require("express");
var app = express();
var bodyparser = require('body-parser');
var oracledb = require('oracledb');

var paypal = require('paypal-rest-sdk');

paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'AUOj0KdLXc9QCtHOb5fkyqxOBveavYpaDYKwzSKYh-r4XPS67McaiQa7QDP3xEEUZPOHjmcv7q3B1aVg',
  'client_secret': 'EJuyer_lMJhMM2ZoxkAGxtGNNGN4Yd5HUs0scwr3-r_Kw_rvL3YMZSZKw1jRB3TpoXBcUFXFkUNqGORc'
});

var PORT = process .env.PORT || 3000

var app = express();

app.get('/', (req, res) => res.sendFile(__dirname + "/src/app/pedidoMaiz/pedidoMaiz.component.html"));


app.listen(PORT, () => console.log(`Server Started on ${PORT}`));

  app.post('/pay', (req, res) => {
    const create_payment_json = {
      "intent": "sale",
      "payer": {
          "payment_method": "paypal"
      },
      "redirect_urls": {
          "return_url": "http://localhost:3000/success",
          "cancel_url": "http://localhost:3000/cancel"
      },
      "transactions": [{
          "item_list": {
              "items": [{
                  "name": "Maiz 50 KG",
                  "sku": "001",
                  "price": "50.00",
                  "currency": "USD",
                  "quantity": 1
              }]
          },
          "amount": {
              "currency": "USD",
              "total": "50.00"
          },
          "description": "Pedido Maiz 50 KG"
      }]
  };

  app.get('/success', (req, res) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
  
    const execute_payment_json = {
      "payer_id": payerId,
      "transactions": [{
          "amount": {
              "currency": "USD",
              "total": "50.00"
          }
      }]
    };
  
    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
      if (error) {
          console.log(error.response);
          throw error;
      } else {
          console.log(JSON.stringify(payment));
          res.send('Success');
      }
  });
  });
  
  app.get('/cancel', (req, res) => res.send('Cancelled'));
  
  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
        throw error;
    } else {
        for(let i = 0;i < payment.links.length;i++){
          if(payment.links[i].rel === 'approval_url'){
            res.redirect(payment.links[i].href);
          }
        }
    }
  });
  
  });  

//app.use('/', express.static(path.join(__dirname, 'static')))

app.use(express.json()) 

app.use(express.urlencoded({
 extended: true
}));

app.post('/api/register', async (req, res) => {
    
    console.log(req.body)
    res.json({ status: 'ok'})
 
 })

 
//Variable con nuestra base de datos
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

app.post('/addUser', function (req, res) {

    var name="Ricardo";
    var apellido="Estrella";
    var psw="123123";
    var defaulttbs="UsuariosFeria";
    var requete="";
   
      oracledb.getConnection(connAttrs, function (err, connection) {
        if (err) {
            // Error connecting to DB
            res.set('Content-Type', 'application/json');
            res.status(500).send(JSON.stringify({
                status: 500,
                message: "Error connecting to DB",
                detailed_message: err.message
            }));
            return;
        }
		if(psw==psw)
			if(defaulttbs!="")
				requete="INSERT INTO "+defaulttbs+" VALUES ("+name+","+apellido+","+psw+")";
			else
		     	requete="INSERTO INTO "+defaulttbs+" VALUES ("+name+","+apellido+","+psw+")";	
        connection.execute(requete, {}, {
            outFormat: oracledb.OBJECT // Return the result as Object
        }, function (err, result) {
            if (err) {
                res.header('Access-Control-Allow-Origin','*'); 
                res.header('Access-Control-Allow-Headers','Content-Type');
                res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,OPTIONS');
                res.contentType('application/json').status(200);
                res.send(JSON.stringify(err.message+" "+defaulttbs)) ;
               
            } else {
                res.header('Access-Control-Allow-Origin','*');
                res.header('Access-Control-Allow-Headers','Content-Type');
                res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,OPTIONS');
                res.contentType('application/json').status(200);
                res.send(JSON.stringify("1"))   ; 
                
            }
            // Release the connection
            connection.release(
                function (err) {
                    if (err) {
                        console.error(err.message);
                    } else {
                        console.log("POST /sendTablespace : Connection released");
                    }
                });
        });
    });
   
});

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


//////Consulta de productos tipo Maiz////// done
app.get('/pedidoMaiz', function (req, res) {
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
        connection.execute("SELECT * FROM PEDIDO WHERE NOM_PRODUCTO = 'Maiz'", {}, {
            outFormat: oracledb.OBJECT // Return the result as Object
        }, function (err, result) {
            if (err) {
                res.set('Content-Type', 'application/json');
                res.status(500).send(JSON.stringify({
                    status: 500,
                    message: "Error al traer la tabla UsuariosFeria",
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