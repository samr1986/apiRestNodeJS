$(document).ready(function() {
			let token = "";
            $("#login").click(function(event) {
				event.preventDefault();
                let usuario = {
                    ususario: $("#usuario").val(),
                    password: $("#password").val()
                };
				let salida = "";
                $.ajax({
                    url: 'login',
                    type: 'post',
                    contentType: 'application/json; charset=utf-8',
                    data: JSON.stringify(usuario),
					dataType: "JSON",
                    success: function(data) {
                    token=data;
					//salida=token.error;
					//cambioX	
					$.each(token, function(i,item){
						salida = salida + " <br> " + i + " " + item;
						//salida = "<br>" + i + " - " + token[i].error+" - "+ token[i].codigo+" - "+ token[i].mensaje.nombre+" - " + token[i].mensaje.apellido;
					});
					$('#lblRes').html('salida login ' + salida	 );
                    },
                    error:function(error) {
						$('#lblRes').html('login error');
                    }
                });
            });
            $("#LineaCredito").click(function(event) {
				event.preventDefault();
				let LineaCredito = {
                    credito:'123',
                    linea: '200'
                };
				let tmpData = "";
				let formattedJson = "";
                $.ajax({
                    url: 'LineaCredito',
                    type: 'get',
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
					data: JSON.stringify(LineaCredito),
                    success: function(data) {
						tmpData = JSON.parse(data);
						formattedJson = JSON.stringify(tmpData, null, '\t');
						$('#lblRes').html('salida linea credito '+ formattedJson);
                    },
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader("Accept", "application/json");
                        xhr.setRequestHeader("Authorization", "Bearer "+token);
                    }
                });
            });
        });