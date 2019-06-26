import React, { Component } from 'react';
import './Banner.css';
// import logo from '../img/logo.png';

class Banner extends Component {
   render(){
      return (

         <header className="troca-banner">
            <img className="troca-banner__logo" src='https://static.carrefour.com.br/imagens/troca-agora/img/logo.png' alt="Troca Agora" title="Troca Agora Carrefour" />
            <img className="troca-banner__samsung" src='https://static.carrefour.com.br/imagens/troca-agora/img/logo-samsung.png' alt="Samsung" title="Samsung" />
            <h2>
               Ganhe até R$ <span>1.100</span>,00 de desconto na compra de um novo smartphone na troca do seu usado.
            </h2>
            <p>
               Olha só:
            </p>
         </header>

      )
   }
}

export default Banner;