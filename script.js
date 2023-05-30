// Obtener el formulario
var form = document.getElementById('cuotasForm');

// Obtener el botón de nuevo cálculo
var nuevoCalculoBtn = document.getElementById('nuevoCalculo');

// Agregar un evento de escucha para el envío del formulario
form.addEventListener('submit', function(event) {
  event.preventDefault(); // Evitar el envío del formulario

  // Obtener las cuotas ingresadas por el usuario
  var cuotaLocal = parseFloat(document.getElementById('cuota1').value);
  var cuotaEmpate = parseFloat(document.getElementById('cuotaX').value);
  var cuotaVisitante = parseFloat(document.getElementById('cuota2').value);

  // Actualizar los valores de la consulta inicial
  var consultaCuotas = "Cuota Local: " + cuotaLocal + "<br>";
  consultaCuotas += "Cuota Empate: " + cuotaEmpate + "<br>";
  consultaCuotas += "Cuota Visitante: " + cuotaVisitante + "<br>";
  document.getElementById('consultaCuotas').innerHTML = consultaCuotas;

  // Ocultar el formulario de consulta inicial
  form.classList.add('oculto');
  document.getElementById('consultaInicial').classList.remove('oculto');

  // Realizar el análisis de cuotas
  var resultados = analizarCuotas(cuotaLocal, cuotaEmpate, cuotaVisitante);

  // Mostrar los resultados en la página
  var resultadosDiv = document.getElementById('resultados');
  resultadosDiv.innerHTML = "<h2>Resultados de Probabilidades:</h2>";
  resultadosDiv.innerHTML += resultados.resultados;

  // Mostrar la recomendación
  var recomendacionDiv = document.getElementById('recomendacion');
  recomendacionDiv.innerText = resultados.recomendacion;

  // Mostrar el botón de nuevo cálculo
  nuevoCalculoBtn.classList.remove('oculto');
});

// Función para realizar el análisis de cuotas
function analizarCuotas(cuotaLocal, cuotaEmpate, cuotaVisitante) {
  var resultado = {}; // Objeto para almacenar los resultados

  // Ejemplo de análisis de cuotas
  resultado.resultados = "Probabilidad Local: " + (1 / cuotaLocal).toFixed(2) + "<br>";
  resultado.resultados += "Probabilidad Empate: " + (1 / cuotaEmpate).toFixed(2) + "<br>";
  resultado.resultados += "Probabilidad Visitante: " + (1 / cuotaVisitante).toFixed(2) + "<br><br>";

  var recomendacion = '';
  if (cuotaLocal === cuotaEmpate && cuotaLocal === cuotaVisitante) {
    recomendacion = 'No se recomienda realizar apuesta, todas las cuotas son iguales.';
  } else if (cuotaLocal === cuotaEmpate || cuotaLocal === cuotaVisitante || cuotaEmpate === cuotaVisitante) {
    recomendacion = 'No se recomienda realizar apuesta, dos o más cuotas son coincidentes.';
  } else {
    if (cuotaLocal < cuotaEmpate && cuotaLocal < cuotaVisitante) {
      recomendacion = 'Se sugiere seleccionar la cuota Local.';
    } else if (cuotaEmpate < cuotaLocal && cuotaEmpate < cuotaVisitante) {
      recomendacion = 'Se sugiere seleccionar la cuota Empate.';
    } else {
      recomendacion = 'Se sugiere seleccionar la cuota Visitante.';
    }
  }

  resultado.recomendacion = '';

  var index = 0;
  var interval = setInterval(function() {
    resultado.recomendacion += recomendacion[index];
    document.getElementById('recomendacion').innerHTML = resultado.recomendacion;
    index++;

    if (index === recomendacion.length) {
      clearInterval(interval);
    }
  }, 100);

  return resultado; // Retornar los resultados del análisis
}


// Función para reiniciar el formulario y borrar los resultados
function resetForm() {
  form.reset();
  document.getElementById('resultados').innerText = '';
  document.getElementById('recomendacion').innerText = '';
  form.classList.remove('oculto');
  document.getElementById('consultaInicial').classList.add('oculto');
  nuevoCalculoBtn.classList.add('oculto');
}
