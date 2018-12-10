import React, { Component } from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Eventos from './components/Eventos';


class App extends Component {

token = 'KRTY3ARWSRYUCJ5Z2SKA';

state = {
  categorias: [],
  eventos: []
}

componentDidMount(){
  this.obtenerCategorias();
}

obtenerCategorias = async () => {
  


  let url = `https://www.eventbriteapi.com/v3/categories/?token=${this.token}&locale=es_ES`;

  await fetch(url)
          .then(respuesta => {
                  return respuesta.json();
                })
          .then(categorias => { 
                  this.setState({
                    categorias: categorias.categories
                    });
                })
          .catch(error => { 
                  console.log(error);
                });      
}

obtenerEventos = async(busqueda) => {

  let url = `https://www.eventbriteapi.com/v3/events/search/?q=${busqueda.nombre}&sort_by=date&categories=${busqueda.categoria}&token=${this.token}&locale=es_ES`;

  await fetch(url)
          .then(respuesta => {
                  return respuesta.json();
                })
          .then(eventos => { 
                  this.setState({
                    eventos: eventos.events
                  });                                    
                })
          .catch(error => { 
                  console.log(error);
                }); 
}



  render() {
    return (
      <div className="App">
            <Header titulo = "Eventos" />

            <div className="uk-container">
              <Formulario
                categorias = {this.state.categorias}
                obtenerEventos = {this.obtenerEventos}
              />
              <Eventos 
                eventos = {this.state.eventos}
              />
            </div>
      </div>
    );
  }
}

export default App;
