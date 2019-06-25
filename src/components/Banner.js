import React, { Component } from 'react';
import './Banner.css';
// import logo from '../img/logo.png';

class Banner extends Component {
   render(){
      return (

         <header className="troca-banner">
            <h1>
               <img className="troca-banner__logo" src='https://static.carrefour.com.br/imagens/troca-agora/img/logo.png' alt="Troca Agora" title="Troca Agora Carrefour" />
            </h1>
            <h2>
               É muito fácil trocar o seu aparelho usado por um novinho.
            </h2>
            <p>
               Olha só:
            </p>
         </header>

      )
   }
}

export default Banner;