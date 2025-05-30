const API_URL = "https://api-generator.retool.com/kypsrM/data";

//Función que llama la API y realiza una solicitud GET. Obtiene un JSON 
async function ObtenerRegistros() {
    //Hacemos GET al "servidor" (La API) y obtenemos su respuesta (response)
    const respuesta = await fetch(API_URL);

    //Obtenemos los datos en formato JSON a partir de la respuesta
    const data = await respuesta.json();

    MostrarRegistros(data);
}

//Función para generar lsa filas de la tabla
//Pide un json como parámetro
function MostrarRegistros(datos){
    //Se llama al elemento tbody dentro de la tabla con id "tabla"
    const tabla = document.querySelector("#tabla tbody");

    //Vaciamos el contenido de la tabla
    tabla.innerHTML = ""; //innerHTML sirve para inyectar código HTML

    //Por cada persona del arreglo de datos
    datos.forEach(persona => {
        tabla.innerHTML += `
            <tr>
                <td>${persona.id}</td>
                <td>${persona.nombre}</td>
                <td>${persona.apellido}</td>
                <td>${persona.correo}</td>
                <td>
                    <button>Editar</button>
                    <button>Eliminar</button>
                </td>
            </tr>
        `;
    }); 
}

ObtenerRegistros() 
