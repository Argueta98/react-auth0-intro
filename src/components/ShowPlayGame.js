import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { show_alerta } from "../functions";
import { useAuth0 } from '@auth0/auth0-react';



const ShowPlayGame = () => {

  
  const dominio = "videogame";
  const url ="https://et1awybnrd.execute-api.us-east-1.amazonaws.com/dev/";


  const [videojuegos, setVideojuegos] = useState([]);
  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [anio_lanzamiento, setAnioLazamiento] = useState("");
  const [desarrolladores, setDesarrolladores] = useState("");
  const [distribuidor, setDistribuidor] = useState("");
  const [plataforma, setPlataforma] = useState("");
  const [genero, setGenero] = useState("");
  const [operation, setOperation] = useState(1);
  const [title, setTitle] = useState("");

  const { getIdTokenClaims } = useAuth0(); // Extraer la función getIdTokenClaims de useAuth0

  useEffect(() => {
    getVideojuegos();
  });

  const getVideojuegos = async () => {
    try {
      const tokenGlobal = await obtenerInformacion(); // Obtener el tokenGlobal
      const response = await axios.get(url+dominio, {
        headers: {
          Authorization: tokenGlobal,
        },
      });
      setVideojuegos(response.data);
    } catch (error) {
      console.error("Error fetching videojuegos:", error);
      // Handle error display or any other logic...
    }
  };
  const obtenerInformacion = async () => {
    try {
      const claims = await getIdTokenClaims(); // Obtener los claims del token de acceso
      if (claims) {
        const tokenGlobal = claims.__raw; // Obtener el token de acceso
        return tokenGlobal; // Devolver el tokenGlobal
      } else {
        console.error('Los claims del token de acceso son nulos o no están definidos.');
      }
    } catch (error) {
      console.error('Error al obtener los claims del token de acceso:', error);
    }
  };

  const openModal = (op,id,nombre, anio_lanzamiento, desarrolladores, distribuidor, plataforma, genero) => {
    setId('');
    setNombre('');
    setAnioLazamiento('');
    setDesarrolladores('');
    setDistribuidor('');
    setPlataforma('');
    setGenero('');
    setOperation(op);

    if(op === 1){
      setTitle('REGISTRAR VIDEO JUEGO');
    }
    else if(op === 2 ){
      setTitle('EDITAR VIDEO JUEGO');
      setId(id);
      setNombre(nombre);
      setAnioLazamiento(anio_lanzamiento);
      setDesarrolladores(desarrolladores);
      setDistribuidor(distribuidor);
      setPlataforma(plataforma);
      setGenero(genero);
    }

    window.setTimeout(function(){
      document.getElementById('nombre').focus();
    },500);
  }

  const validar = () => {
    let parametros;
    let metodo;
    if(nombre.trim() === ''){
      show_alerta('Escribe el nombre del video juego');
    }
    else if(anio_lanzamiento.trim() === ''){
      show_alerta('Escribe el año de lanzamiento del video juego');
    }
    else if(desarrolladores.trim() === ''){
      show_alerta('Escribe los desarrolladores del video juego');
    }
    else if(distribuidor.trim() === ''){
      show_alerta('Escribe el nombre del distribuidor del video juego');
    }
   
    else if (plataforma.trim() === '') {
      show_alerta('Escribe el nombre de plataforma del videojuego');
    }
    else if(genero.trim() === ''){
      show_alerta('Escribe el genero del video juego');
    }
    else{
      if(operation === 1){
        parametros = {
          nombre:nombre.trim(),
          anio_lanzamiento:anio_lanzamiento.trim(),
          distribuidor:distribuidor.trim(),
          desarrolladores: desarrolladores.trim(),
          plataforma: plataforma.trim(),
          genero: genero.trim()
        };
        metodo = 'POST';
      }
      else {
        parametros = {
         // id:id.trim(),
          nombre:nombre.trim(),
          anio_lanzamiento:anio_lanzamiento.trim(),
          desarrolladores: desarrolladores.trim(),
          distribuidor:distribuidor.trim(),
          plataforma: plataforma.trim(),
          genero: genero.trim()
        };
        metodo = 'PUT';
      }

      enviarSolicitud(metodo,parametros);
    }
  }
  const enviarSolicitud = async (metodo, parametros) => {
    const tokenGlobal = await obtenerInformacion(); // Obtener el tokenGlobal
    const config = {
      method: metodo,
      url: url + dominio + "/" + id,
      data: parametros,
      headers: {
        Authorization: "Bearer " + tokenGlobal,
      },
    };
      
    try {
      const response = await axios(config);
      const tipo = response.data[0];
      const msj = response.data[1];
      
      Swal.fire({
        title: tipo === 'success' ? 'Registro Guardado' : msj,
        icon: tipo,
        confirmButtonText: 'Aceptar',
      }).then(() => {
        if (tipo === 'success') {
          document.getElementById('btnCerrar').click();
          getVideojuegos();
        }
      });
    }  
    catch (error) {
      Swal.fire({
        title: "Error en la solicitud",
        icon: "error"
      });
      console.log(error);
    }
  };

const eliminarVideojuego = async (id, nombre) => {
  const tokenGlobal = await obtenerInformacion();
  const MySwal = withReactContent(Swal);
  MySwal.fire({
    title: '¿Seguro que quieres eliminar este videojuego: ' + nombre + '?',
    icon: 'question',
    text: 'No se podrá dar marcha atrás',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  }).then(async (result) => {
    if (result.isConfirmed) {
      setId(id);
      const metodo = 'DELETE';
      const parametros = { id: id.trim() };
      const config = {
        method: metodo,
        url: url + dominio + "/" + id,
        data: parametros,
        headers: {
          Authorization: "Bearer " +  tokenGlobal,
        },
      };
      try {
        const response = await axios(config);
        const tipo = response.data[0];
        const msj = response.data[1];
        show_alerta(msj, tipo);
        if (tipo === "success") {
          document.getElementById("btnCerrar").click();
          getVideojuegos();
        }
      } catch (error) {
        show_alerta("Error en la solicitud", "error");
        console.log(error);
      }
    } else {
      show_alerta('El videojuego NO fue eliminado', 'info');
    }
  });
};
 

  return (
    <div className="App">
      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col-md-4 offset-4">
            <div className="d-grid mx-auto">
              <button
                onClick={() => openModal(1)}
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#modalVideojuegos"
              >
                <i className="fa-solid fa-circle-plus"></i> Añadir
              </button>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12 col-lg-8 offset-0 offset-lg-2">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>#</th>
                  <th>NOMBRE</th>
                  <th>LAZAMIENTO</th>
                  <th>DESARROLLADORES</th>
                  <th>DISTRIBUIDOR</th>
                  <th>PLATAFORMA</th>
                  <th>GENERO</th>
                  <th>ACCIONES</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {videojuegos.map((videojuego, i) => (
                  <tr key={videojuego.id}>
                    <td>{i + 1}</td>
                    <td>{videojuego.nombre}</td>
                    <td>{videojuego.anio_lanzamiento}</td>
                    <td>{videojuego.desarrolladores}</td>
                    <td>{videojuego.distribuidor}</td>
                    <td>{videojuego.plataforma}</td>
                    <td>{videojuego.genero}</td>
                    <td className='col-2'>
                      <button onClick={() => openModal(2, 
                          videojuego.id, 
                          videojuego.nombre,
                          videojuego.anio_lanzamiento,
                          videojuego.distribuidor,
                          videojuego.desarrolladores,
                          videojuego.plataforma,
                          videojuego.genero)} className='btn btn-warning' data-bs-toggle='modal' data-bs-target='#modalVideojuegos'>
                        <i className='fa-solid fa-edit'></i>
                      </button>
                      &nbsp;
                      <button  onClick={() =>eliminarVideojuego(videojuego.id,videojuego.nombre)} className="btn btn-danger">
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div id='modalVideojuegos' className='modal fade' aria-hidden='true'>
          <div className='modal-dialog'>
                <div className='modal-content'>
                  <div className='modal-header'>
                    <label className='h5'>{title}</label>
                    <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='close'></button>
                  </div>
                  <div className='modal-body'>
                    <input type='hidden' id='id'></input>
                    <div className='input-group mb-3'>
                      <span className='input-group-text'><i className="fa-solid fa-gamepad"></i> </span>
                      <input type='text' id='nombre' className='form-control' placeholder='Nombre' value={nombre}
                      onChange={(e) => setNombre(e.target.value)}></input> 
                    </div>
                    <div className='input-group mb-3'>
                      <span className='input-group-text'><i className="fa-regular fa-calendar-days"></i> </span>
                      <input type='text' id='lanzamiento' className='form-control' placeholder='Año lanzamiento' value={anio_lanzamiento}
                      onChange={(e) => setAnioLazamiento(e.target.value)}></input> 
                    </div>
                    <div className='input-group mb-3'>
                      <span className='input-group-text'><i className="fa-solid fa-code"></i></span>
                      <input type='text' id='desarrolladores' className='form-control' placeholder='Desarrolladores' value={desarrolladores}
                      onChange={(e) => setDesarrolladores(e.target.value)}></input> 
                    </div>
                    <div className='input-group mb-3'>
                      <span className='input-group-text'><i className="fa-solid fa-building"></i> </span>
                      <input type='text' id='distribuidor' className='form-control' placeholder='Distribuidor' value={distribuidor}
                      onChange={(e) => setDistribuidor(e.target.value)}></input> 
                    </div>
                    <div className='input-group mb-3'>
                      <span className='input-group-text'><i className="fa-brands fa-xbox"></i>  </span>
                      <input type='text' id='plataforma' className='form-control' placeholder='Plataforma' value={plataforma}
                      onChange={(e) => setPlataforma(e.target.value)}></input> 
                    </div>
                    <div className='input-group mb-3'>
                      <span className='input-group-text'><i className="fa-solid fa-video"></i></span>
                      <input type='text' id='genero' className='form-control' placeholder='Genero' value={genero}
                      onChange={(e) => setGenero(e.target.value)}></input> 
                    </div>
                    <div className='d-grid col-4 mx-auto'>
                      <button onClick={()=> validar()} className='btn btn-success'>
                        <i className='fa-solid fa-floppy-disk'></i> GUARDAR
                      </button>
                    </div>
                  </div>
                  <div className='modal-footer'>
                    <button type='button' id='btnCerrar'  className='btn btn-danger' data-bs-dismiss='modal' >Cerrar</button>
                  </div>
                </div>
          </div>
      </div>
    </div>

  );
};

export default ShowPlayGame;
