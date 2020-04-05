var array_respuesta = [];
var array_respuesta_correctas = [
	{pregunta: 1, respuesta: "A"},
	{pregunta: 2, respuesta: "B"},
	{pregunta: 3, respuesta: "C"},
	{pregunta: 4, respuesta: "A"},
	{pregunta: 5, respuesta: "B"},
	{pregunta: 6, respuesta: "C"},
	{pregunta: 7, respuesta: "A"},
	{pregunta: 8, respuesta: "B"},
	{pregunta: 9, respuesta: "C"}
];
const total_preguntas = 9;
var pregunta_actual = 1;

$(document).ready(function(){
	
});

function iniciartest()
{
	
	pregunta_actual = 1;
	array_respuesta = [];

	var nombres = $("#nombre").val();

	if (nombres.trim() == '')
	{
		alert('Por favor digite sus nombres y apellidos');
		return;
	}


	$("#inicio").addClass('ocultar');
	$("#datosestudiante").html(nombres);
	$('#p'+(pregunta_actual)).removeClass('ocultar');
	$('#div_botones').removeClass('ocultar');
	$('#divpreguntas').removeClass('ocultar');
	$('#btn-atras').prop('disabled', true);
	$('#btn-siguiente').prop('disabled', false);
	progreso();
	probar();
}

function atras()
{
	if (pregunta_actual > 1 && pregunta_actual <= total_preguntas)
	{
		$('#p'+(pregunta_actual)).addClass('ocultar');
		$('#p'+(pregunta_actual-1)).removeClass('ocultar');
		pregunta_actual =  pregunta_actual - 1;
		array_respuesta.pop();
	}

	if (pregunta_actual == 1)
	{
		$('#btn-atras').prop('disabled', true);
	}
	else
	{
		$('#btn-atras').prop('disabled', false);	
	}

	if (pregunta_actual == total_preguntas)
	{
		$('#btn-siguiente').prop('disabled', true);
		$('#btn-finalizar').removeClass('ocultar');
	}
	else
	{
		$('#btn-siguiente').prop('disabled', false);	
		$('#btn-finalizar').addClass('ocultar');
	}
	progreso();
}


function siguiente()
{

	var respuesta = $("input:radio[name=r"+pregunta_actual+"]:checked").val();

	if ( typeof respuesta === 'undefined')
	{
		alert('Por favor responda la pregunta antes de avanzar');
		return;
	}

	guardarRespuesta();

	if (pregunta_actual < total_preguntas && pregunta_actual > 0)
	{
		$('#p'+(pregunta_actual)).addClass('ocultar');
		$('#p'+(pregunta_actual+1)).removeClass('ocultar');
		pregunta_actual =  pregunta_actual + 1;
	}

	if (pregunta_actual == total_preguntas)
	{
		$('#btn-siguiente').prop('disabled', true);
		$('#btn-finalizar').removeClass('ocultar');
	}
	else
	{
		$('#btn-siguiente').prop('disabled', false);	
		$('#btn-finalizar').addClass('ocultar');
	}

	if(pregunta_actual > 1 && pregunta_actual <= total_preguntas)
	{
		$('#btn-atras').prop('disabled', false);	
	}

	progreso();
}

function guardarRespuesta()
{
	var respuesta  = $("input:radio[name=r"+pregunta_actual+"]:checked").val();

	array_respuesta.push(
		{
			pregunta: pregunta_actual,
			respuesta:respuesta
		}
	);

	probar();
}

function finalizar()
{
	var respuesta = $("input:radio[name=r"+pregunta_actual+"]:checked").val();

	if ( typeof respuesta === 'undefined')
	{
		alert('Por favor responda la pregunta antes de avanzar');
		return;
	}

	guardarRespuesta();
	analizar();
	probar();
	$("#resultados").removeClass('ocultar');
	$('#p'+(pregunta_actual)).addClass('ocultar');
	$("#div_botones").addClass('ocultar');
}

function analizar()
{
	var html = '';
	var numerocorrecta = 0;

	$.each(array_respuesta, function(key, value){

		var respuestacorrecta = obtenerCorrecta(value.pregunta);

		var resultado = '<span class="rojo">Incorrecta</span>';

		if(value.respuesta == respuestacorrecta)
		{	
			resultado = '<span class="verde">Correcta</span>';
			numerocorrecta++;
		}

		html = html + ('<tr class="center">\
				<td>'+value.pregunta+'</td>\
				<td>'+value.respuesta+'</td>\
				<td>'+respuestacorrecta+'</td>\
				<td>'+resultado+'</td>\
			</tr>');
	});

	$("#cuerporesultado").html(html);


	if (numerocorrecta > ((total_preguntas/2)))
	{
		$("#estadotest").html('<h3>ESTADO DEL TEST: </h3> <span class="verde">APROBADO</span>');
	}
	else
	{
		$("#estadotest").html('<h3>ESTADO DEL TEST: </h3> <span class="rojo">REPROBADO</span>');
	}
}

function progreso()
{
	$("#progreso").html('Pregunta '+pregunta_actual+' de '+total_preguntas);
}

function reestablecer()
{
	location.reload();
}

function obtenerCorrecta(pregunta)
{
	var correcta = '';

	
		$.each(array_respuesta_correctas, function(k, v){

			if (pregunta == v.pregunta )
			{
				correcta = v.respuesta;
				return true;
			}

		});
	

	return correcta;
}

function probar()
{
	for (var i = 1; i <= total_preguntas; i++)
	{
			$("#s"+i).addClass('gris');
	}

	$.each(array_respuesta, function(key, value)
	{
		$.each(array_respuesta_correctas, function(k, v){

			if (value.pregunta == v.pregunta )
			{
				if (value.respuesta == v.respuesta)
				{
					$("#s"+value.pregunta).removeClass('gris');
					$("#s"+value.pregunta).removeClass('verde');
					$("#s"+value.pregunta).removeClass('rojo');
					$("#s"+value.pregunta).addClass('verde');
				}
				else
				{
					$("#s"+value.pregunta).removeClass('gris');
					$("#s"+value.pregunta).removeClass('verde');
					$("#s"+value.pregunta).removeClass('rojo');
					$("#s"+value.pregunta).addClass('rojo');	
				}
				
			}

		});
	});

}