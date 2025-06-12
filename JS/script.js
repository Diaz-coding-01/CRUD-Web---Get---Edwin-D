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
                    <button onclick = "abrirModificar('${persona.id}', '${persona.nombre}', '${persona.apellido}', '${persona.correo}')">Editar</button>
                    <button onclick = "EliminarPersona(${persona.id})">Eliminar</button>
                </td>
            </tr>
        `;
    }); 
}

ObtenerRegistros();

//Proceso para agregar registros

const btnAgregar = document.getElementById("btnAgregar");
const modal = document.getElementById("mdAgregar");
const btnCerrar = document.getElementById("btnCerrarModal");

btnAgregar.addEventListener("click", () => {
    modal.showModal();
});

btnCerrar.addEventListener("click", () => {
    modal.close();
});

btnAgregar.addEventListener("click", modal.showModal());
btnCerrar.addEventListener("click", modal.close());

document.getElementById("frmAgregar").addEventListener("submit", async e => {
    e.preventDefault(); //Evita que los datos se envien por defecto

    const nombre = document.getElementById("txtNombre").value.trim();
    const apellido = document.getElementById("txtApellido").value.trim();
    const correo = document.getElementById("txtCorreo").value.trim();

    //Validación
    if(!nombre || !apellido || !correo){
        alert("No soca");
        return;
    }

    //Llamar a la API
    const respuesta = await fetch(API_URL, {
        method: "POST",
        headers: {'Content-Type': 'aplication/json'},
        body: JSON.stringify({nombre, apellido, correo})
    });

    if(respuesta.ok){
        //Mensaje de confirmación
        alert("Registro hecho correctamente");

        //Limpiar el formulario
        document.getElementById("frmAgregar").reset();

        //Cerrar el modal
        modal.close();

        //Recargar la tabla
        ObtenerRegistros();
    }
    else{
        alert("Hubo un error al guardar");
    }
});


//Eliminar
async function EliminarPersona(id){
    const confirmacion = confirm("¿Desea eliminar el registro?");

    //Validamos si el usuario eligió aceptar
    if(confirmacion){
        await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        }); //Llamada al endpoint

        //Recargar la tabla para actualizar la lista
        ObtenerRegistros();
    }
}

//Modificar
const editar = document.getElementById("mdModificar");
const btnCerrarEditar = document.getElementById("btnCerrarModalEditar");

btnCerrarEditar.addEventListener('click', () => {
    editar.close();
});

function abrirModificar(id, nombre, apellido, correo) {
    //Agregamos los valores a los inputs
    document.getElementById("txtIDModificar").value = id;
    document.getElementById("txtNombreModificar").value = nombre;
    document.getElementById("txtApellidoModificar").value = apellido;
    document.getElementById("txtCorreoModificar").value = correo;
    
    editar.showModal();
}

document.getElementById("mdModificar").addEventListener("submit", async e => {
    e.preventDefault(); //Evita que el formulario se envie de golpe

    const id = document.getElementById("txtIDModificar").value.trim();
    const nombre = document.getElementById("txtNombreModificar").value.trim();
    const apellido = document.getElementById("txtApellidoModificar").value.trim();
    const correo = document.getElementById("txtCorreoModificar").value.trim();

    if(!id || !nombre || !apellido || !correo){
        alert("No soca, complete todos los campos");
        return;
    }

    const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({nombre: nombre, apellido: apellido, correo: correo})
    });

    //Cerrar el modal
    editar.close();

    //Recargar la tabla
    ObtenerRegistros();
});