const express = require("express");
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const expressJwt=require('express-jwt');
const app = express();
const jwtClave="laclave_de_samr";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('publica'));
app.use(bodyParser.json());	
//app.use(expressJwt({secret:jwtClave}).unless({path: ["/login"]}));

 
let login = {
 usuario:'',
 password: ''
};
 
let LineaCredito = {
 credito:'',
 linea: ''
};
let respuesta = {
 error: false,
 codigo: 200,
 mensaje: ''
};
function generateToken(usuario) {
  let u = {
   userusuario: login.usuario,
   userpassword: login.password
  }
  return token = jwt.sign(u, jwtClave, {
     expiresIn: 60 * 60 * (1/4) // expira en un cuarto de hora 
  })
}
app.get('/', function(req, res) {
 respuesta = {
  error: true,
  codigo: 200,
  mensaje: 'Punto de inicio'
 };
 res.send(respuesta);
});


app.post('/login', function (req, res) {
  login = {
     usuario: req.body.usuario,
     password: req.body.password
    };
 
  if( !(login.usuario == 'sergio' && login.password == 'melo')){ 
    respuesta = {
	error: true,
	codigo: 401,
	mensaje: login
	};
	res.send(respuesta);
  }
  res.send(generateToken(login));
})

app.route('/LineaCredito')
 .get(function (req, res) {
	/*var token = req.headers['authorization']
    if(!token){
        respuesta = {
			error: true,
			codigo: 401,
			mensaje: 'Es necesario el token de autenticación'
		};
		res.send(respuesta);
    }
 
    token = token.replace('Bearer ', '')
 
    jwt.verify(token, jwtClave, function(err, user) {
      if (err) {
        respuesta = {
			error: true,
			codigo: 401,
			mensaje: 'token invalido'
		};
		res.send(respuesta);
      } else {
        respuesta = {
			error: false,
			codigo: 200,
			mensaje: 'sisas'
		};
      }
    })*/
  if(LineaCredito.credito == '' || LineaCredito.linea == '') {
   respuesta = {
    error: true,
    codigo: 501,
    mensaje: 'la linea de credito no ha sido creada'
   };
  } else {
   respuesta = {
    error: false,
    codigo: 200,
    mensaje: 'respuesta del usuario',
    respuesta: LineaCredito
   };
  }
  res.send(respuesta);
 })
 .post(function (req, res) {
  if(!req.body.credito || !req.body.linea) {
   respuesta = {
    error: true,
    codigo: 502,
    mensaje: 'El campo credito y linea credito son requeridos'
   };
  } else {
   if(LineaCredito.credito !== '' || LineaCredito.linea !== '') {
    respuesta = {
     error: true,
     codigo: 503,
     mensaje: 'Linea Credito ya fue creada previamente'
    };
   } else {
    LineaCredito = {
     credito: req.body.credito,
     linea: req.body.linea
    };
    respuesta = {
     error: false,
     codigo: 200,
     mensaje: 'linea creada creado',
     respuesta: LineaCredito
    };
   }
  }
  
  res.send(respuesta);
 })
 .put(function (req, res) {
  if(!req.body.credito || !req.body.linea) {
   respuesta = {
    error: true,
    codigo: 502,
    mensaje: 'El campo credito y linea son requeridos'
   };
  } else {
   if(LineaCredito.credito === '' || LineaCredito.linea === '') {
    respuesta = {
     error: true,
     codigo: 501,
     mensaje: 'Linea credito no ha sido creado'
    };
   } else {
    LineaCredito = {
     credito: req.body.credito,
     linea: req.body.linea
    };
    respuesta = {
     error: false,
     codigo: 200,
     mensaje: 'linea credito actualizado',
     respuesta: LineaCredito
    };
   }
  }
  
  res.send(respuesta);
 })
 .delete(function (req, res) {
  if(LineaCredito.credito === '' || LineaCredito.linea === '') {
   respuesta = {
    error: true,
    codigo: 501,
    mensaje: 'linea credito no ha sido creado'
   };
  } else {
   respuesta = {
    error: false,
    codigo: 200,
    mensaje: 'linea credito eliminado'
   };
   LineaCredito = { 
    credito: '', 
    linea: '' 
   };
  }
  res.send(respuesta);
 });
app.use(function(req, res, next) {
 respuesta = {
  error: true, 
  codigo: 404, 
  mensaje: 'URL no encontrada'
 };
 res.status(404).send(respuesta);
});
app.listen(3000, () => {
 console.log("El servidor está inicializado en el puerto 3000");
});