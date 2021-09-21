
const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima);
})




function buscarClima(e) {
    e.preventDefault();
    const ciudad = document.querySelector('#ciudad').value
    const pais = document.querySelector('#pais').value

    console.log(ciudad);
    console.log(pais);

    if(ciudad === '' || pais === '') {
        // Hubo un error
        mostrarError('Ambos campos son obligatorios')

        return;
    }
    consultarAPI(ciudad, pais );
}

function mostrarError(mensaje) {
  const alerta = document.querySelector('.bg-red-100');
  if(!alerta) {
      const alerta = document.createElement('div');

      alerta.classList.add('bg-red-100', "border-red-400", "text-red-700", "px-4", "py-3", "rounded", "relative", "max-w-md", "mx-auto", "mt-6", "text-center" );

      alerta.innerHTML = `
          <strong class="font-bold">Error!</strong>
          <span class="block sm:inline">${mensaje}</span>
      `;

      container.appendChild(alerta);
      setTimeout(() => {
          alerta.remove();
      }, 3000);
  }
}

function consultarAPI(ciudad, pais){
  const appId= "2415b320381000eddec63669cf8ee20a"
  const url= `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
  Spinner() //Mostrar spinner de carga
  fetch(url)
    .then(respuesta => respuesta.json())
    .then(datos => {
      limpiarHTML(); //Limpiar el HTML previo
      if(datos.cod==="404"){
        mostrarError("Ciudad no encontrada")
        return;
      }
      //Imprime la respuesta en el HTML
      mostrarClima(datos)
    })


}

//Entrada de datos
function mostrarClima(datos){
  const {name, main:{ temp, temp_max, temp_min }}=datos

  const centigrados= kelvinACentgrados(temp)
  const max= kelvinACentgrados(temp_max)
  const min= kelvinACentgrados(temp_min)

  const nombreCiudad= document.createElement("p")
  nombreCiudad.textContent= `Clima en ${name}`
  nombreCiudad.classList.add("font-bold", "text-2xl");
  
  const actual = document.createElement("p");
  actual.innerHTML= `${centigrados}&#8451;`;
  actual.classList.add("font-bold", "text-6xl");

  const temperaturaMaxima = document.createElement("p");
  temperaturaMaxima.innerHTML= `Temperatura máxima: ${max}&#8451;`
  temperaturaMaxima.classList.add("text-xl");

  const temperaturaMin = document.createElement("p");
  temperaturaMin.innerHTML= `Temperatura mínima: ${min}&#8451;`
  temperaturaMin.classList.add("text-xl");


  const resultadoDiv= document.createElement("div");
  resultadoDiv.classList.add("text-center", "text-white");

  resultadoDiv.appendChild(actual)
  resultadoDiv.appendChild(temperaturaMaxima)
  resultadoDiv.appendChild(temperaturaMin)
  resultadoDiv.appendChild(nombreCiudad)


  resultado.appendChild(resultadoDiv)
}

//Retorno de datos (function kelvinACentigrados)
function kelvinACentgrados(grados){

  return parseInt(grados-273.15)

}


function limpiarHTML(){
  while(resultado.firstChild){
    resultado.removeChild(resultado.firstChild)
  }
}

function Spinner(){
  limpiarHTML()
  const divSpinner= document.createElement("div");
  divSpinner.classList.add("sk-fading-circle");

  divSpinner.innerHTML= `
      <div class="sk-fading-circle"></div>
      <div class="sk-circle1 sk-circle"></div>
      <div class="sk-circle2 sk-circle"></div>
      <div class="sk-circle3 sk-circle"></div>
      <div class="sk-circle4 sk-circle"></div>
      <div class="sk-circle5 sk-circle"></div>
      <div class="sk-circle6 sk-circle"></div>
      <div class="sk-circle7 sk-circle"></div>
      <div class="sk-circle8 sk-circle"></div>
      <div class="sk-circle9 sk-circle"></div>
      <div class="sk-circle10 sk-circle"></div>
      <div class="sk-circle11 sk-circle"></div>
      <div class="sk-circle12 sk-circle"></div>
  `;
  resultado.appendChild(divSpinner)
}