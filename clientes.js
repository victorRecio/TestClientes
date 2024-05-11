class Cliente {
    constructor(nombre, telefono, email) {
      this.nombre = nombre;
      this.telefono = telefono;
      this.email = email;
      this.direcciones = []; 
    }
  
  
    set_Direccion(direccion) {
      this.direcciones.push(direccion);
    }
  
    
    get_Direcciones_console() {
      console.log(`Direcciones de ${this.nombre}:`);
      this.direcciones.forEach((direccion, index) => {
        console.log(`${index + 1}. ${direccion}`);
      });
    }

   
      mostrarDirecciones(cliente) {
        var clienteInfo = document.getElementById("clienteInfo");
        var clienteExistente = document.getElementById(cliente.nombre);
        if (clienteExistente) {
            var direccionesHTML = '';
            cliente.direcciones.forEach((direccion, index) => {
                direccionesHTML += `<p>${index + 1}. ${direccion}</p>`;
            });
            clienteExistente.querySelector('.card-body').innerHTML = direccionesHTML;
        } else {
            var html = `
                <p><strong>Nombre:</strong> ${cliente.nombre}</p>
                <div class="bg-light text-dark mt-2" id="${cliente.nombre}">
                    <div class="card-body">
                        <h5 class="card-title">Direcciones</h5>
            `;
            cliente.direcciones.forEach((direccion, index) => {
                html += `<p>${index + 1}. ${direccion}</p>`;
            });
            html += `</div></div>`;
            clienteInfo.innerHTML += html;
        }
    }
    


}
lista_clientes = []  

const cliente1 = new Cliente("Juan miguel", "1809-467-7982", "miguelDServantes@ejemplo.com");
cliente1.set_Direccion("los alcarrizos primero");
cliente1.set_Direccion("leopordo navarro 256");
cliente1.mostrarDirecciones(cliente1);
cliente1.get_Direcciones_console()

lista_clientes.push(cliente1)

//datos de la pagina

document.addEventListener('DOMContentLoaded', function() {
    var clienteForm = document.getElementById('clienteForm');
  
    clienteForm.addEventListener('submit', function(event) {
      event.preventDefault(); 
  
      var vnombre = document.getElementById('nombre').value;
      var vtelefono = document.getElementById('telefono').value;
      var vcorreo = document.getElementById('email').value;
      var vdireccion = document.getElementById('direccion').value;
  
       // Verificar si el cliente ya está en la lista por su nombre
       var clienteExistente = lista_clientes.find(function(cliente) {
        return cliente.nombre === vnombre;
      });
      
      if (clienteExistente) {
        //alert("El cliente ya Existe");
        clienteExistente.set_Direccion(vdireccion);
        clienteExistente.mostrarDirecciones(clienteExistente);
        clienteExistente.get_Direcciones_console();
        console.log("Dirección agregada al cliente existente:", clienteExistente);
      } else {
        const nuevoCliente = new Cliente(vnombre, vtelefono, vcorreo);
        nuevoCliente.set_Direccion(vdireccion);
        nuevoCliente.mostrarDirecciones(nuevoCliente);
        nuevoCliente.get_Direcciones_console();
        lista_clientes.push(nuevoCliente);
        console.log("Nuevo cliente agregado:", nuevoCliente);
      }

      
       // Enviar datos del cliente al servidor
       fetch('/guardar-cliente', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(cliente)
      })
      .then(response => {
        if (response.ok) {
          console.log('Cliente guardado correctamente');

        } else {
          console.error('Error al guardar cliente');
        }
      })
      .catch(error => {
        console.error('Error al guardar cliente:', error);
      });



    });
  });
  
