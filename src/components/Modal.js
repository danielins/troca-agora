import React, { Component } from 'react';
import './Modal.css';
import copy from '../img/ico-copy.png';

class Modal extends Component {

   constructor(props){
      super(props);

      this.copyText = this.copyText.bind(this);
   }

   copyText(){
      var copy = document.getElementById("cmpCupom");
      copy.select();
      document.execCommand('copy');
   }

   render(){
      return (
         <div className="troca-modal--wrapper">
            <div className="troca-modal--overlay">
               <div className="troca-modal">
                  <button onClick={ this.props.closeModal } className="troca-modal-close">
                     X
                  </button>
                  <h2 className="troca-modal-title">
                     Copie seu cupom
                  </h2>
                  <div className="troca-modal-input-field">
                     <input type="text" id="cmpCupom" value={this.props.data.cupom} readOnly></input>
                     <button title="Copiar cupom" onClick={ this.copyText }>
                        <img src={copy} alt="Copiar" />
                     </button>
                  </div>
                  <p className="troca-modal-input-text">
                     Guarde este cupom este cupom e use-o durante a compra.
                  </p>
                  <button className="troca-modal-cta" onClick={ () =>  window.location.href = `https://www.carrefour.com.br/p/${ this.props.data.rms }` }>
                     Comprar
                  </button>
               </div>
            </div>
         </div>
      )
   }
}


export default Modal;