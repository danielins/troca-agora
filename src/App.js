import React, { Component } from 'react';
import './App.css';
import { troca } from './data/rms';
import { trocados } from './data/rms';
import { lojas } from './data/lojas';
import Banner from './components/Banner';
import Menu from './components/Menu';
import Modal from './components/Modal';

import './components/Modal.css';
import copy from './img/ico-copy.png';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      step: 1,
      marcaCompra: '',
      modeloCompra: '',
      condicao: '',
      avaliacao: 0,
      aceite: '',
      imei: '',
      // modalOpen: true
    }
    this.closeModal = this.closeModal.bind(this);
  }

  /**
   * HELPERS
   */
  getDesconto(value){
    const compra = troca.filter(marca => marca.marca === this.state.marcaCompra)[0].modelos
           .filter(modelo => modelo.rms === value)[0];
    return compra;
  }

  getLoja(value){
    return lojas.filter(loja => loja.id === value)[0];
  }

  /**
   * HANDLES
   */

  handleMarcaCompra(e){
    this.setState({
      marcaCompra: e.target.value,
      modeloCompra: '',
      marcaUsado: '',
      modeloUsado: '',
      condicao: '',
      aceite: '',
      avaliacao: 0,
      step: 1,
    });
  }

  handleModeloCompra(e){
    this.setState({
      modeloCompra: e.target.value,
      marcaUsado: '',
      modeloUsado: '',
      condicao: '',
      aceite: '',
      step: 2,
    });
  }

  handleMarcaUsado(e){
    this.setState({
      marcaUsado: e.target.value,
      modeloUsado: '',
      condicao: '',
      aceite: '',
      step: 2,
    });
  }

  handleModeloUsado(e){

    const comprado = this.getDesconto(this.state.modeloCompra);

    this.setState({
      modeloUsado: e.target.value,
      condicao: '',
      aceite: '',
      avaliacao: comprado.desconto,
      cupom: comprado.cupom,
      step: (this.state.imei.length > 10 ? 3 : 2),
    });
  }

  // handleCondicao(e){
  //   this.setState({
  //     condicao: e.target.value,
  //     avaliacao: comprado.desconto,
  //     cupom: comprado.cupom,
  //     step: 3,
  //   });
  // }

  handleImei(e){
    this.setState({
      imei: e.target.value,
      step: (this.state.modeloUsado !== "" && e.target.value.length > 10 ? 3 : 2),
    })
  }

  handleAceite(e){
    this.setState({
      aceite: e.target.value === "true" ? true : false,
      step: 4,
      // modalOpen: e.target.value === "true" ? true : false,
    });

    if ( e.target.value === "false" ) {
      window.location.href = `https://www.carrefour.com.br/p/${ this.state.modeloCompra }?crfint=subhome|troca-agora|termo-não|26062019|2`;
    } else {
      setTimeout(() => document.getElementById("lojas").scrollIntoView(), 500);
    }

  }

  handleLoja(e){
    this.setState({
      lojaSelect: e.target.value,
      loja: this.getLoja(e.target.value),
    });
  }

  closeModal(){
    window.document.querySelector('.troca-modal').classList.add('is-closing');
    setTimeout(() => {
      this.setState({
        modalOpen: false
      });
    }, 400);
  }

  copyText(){
    var copy = document.getElementById("cmpCupom");
    copy.select();
    document.execCommand('copy');
 }

  render(){

    const modelosCompra = troca.filter(marca => marca.marca === this.state.marcaCompra).length
                  ? troca.filter(marca => marca.marca === this.state.marcaCompra)[0].modelos
                  : [];
    const modelosUsado = trocados.filter(marca => marca.marca === this.state.marcaUsado).length
                  ? trocados.filter(marca => marca.marca === this.state.marcaUsado)[0].modelos
                  : [];


    return (
      <div>
        <div className="troca--container">
          
          <Banner />

          <h1 className="troca__title">
            Troca de celular: passo a passo
          </h1>
        
          <Menu step={ this.state.step } />

          { this.state.modalOpen && <Modal data={{
            cupom: this.state.cupom,
            rms: this.state.modeloCompra
          }} closeModal={ this.closeModal } />}
          
          {/**
            STEP 1
          **/}

          { (this.state.step >= 1 && this.state.aceite === '') &&
            <section className="troca-step">
              <h2 className="troca__title">
                Conte para a gente:
                <span>qual smartphone você quer?</span>
              </h2>
              
              <select 
                id="cmpMarca" name="cmpMarcaCompra"
                onChange={this.handleMarcaCompra.bind(this)}
                value={ this.state.marcaCompra }>
                <option value="">Selecione a marca:</option>
                {
                  troca.map(marca => <option value={ marca.marca } key={marca.id}>{ marca.marca }</option>)
                }
              </select>

              <select
                id="cmpModeloCompra" name="cmpModeloCompra"
                onChange={this.handleModeloCompra.bind(this)}
                value={ this.state.modeloCompra }
                disabled={this.state.marcaCompra.length ? "" : "disabled"}>
                <option value="">Selecione o modelo:</option>

                {
                  modelosCompra.map(modelo => <option value={ modelo.rms } key={modelo.rms}>{ modelo.modelo }</option>)
                }

              </select>

            </section>
          }

          {/**
            STEP 2
          **/}

          { (this.state.step >= 2 && this.state.aceite === '') &&
            <section className="troca-step">
              <h2 className="troca__title">
                Faça agora a avaliação do seu smartphone usado <span>e veja quanto você vai ganhar de desconto na compra de um novo:</span>
              </h2>

              <select 
                id="cmpMarca" name="cmpMarca"
                onChange={this.handleMarcaUsado.bind(this)}
                value={ this.state.marcaUsado }>
                <option value="">Selecione a marca:</option>
                {
                  trocados.map(marca => <option value={ marca.marca } key={marca.id}>{ marca.marca }</option>)
                }
              </select>

              <select
                id="cmpModelo" name="cmpModelo"
                onChange={this.handleModeloUsado.bind(this)}
                value={ this.state.modeloUsado }
                disabled={this.state.marcaUsado.length ? "" : "disabled"}>
                <option value="">Selecione o modelo:</option>

                {
                  modelosUsado.map(modelo => <option value={ modelo.modelo } key={modelo.modelo}>{ modelo.modelo }</option>)
                }

              </select>

              {/* ( this.state.marcaUsado !== '' && this.state.modeloUsado !== '' ) && <div>

              <div className="troca-radio-input">
                <label htmlFor="cmpBom" className="troca-radio-label">
                  <input type="radio"
                    name="cmpCondicao" id="cmpBom"
                    checked={ (this.state.condicao === "bom") }
                    onChange={ this.handleCondicao.bind(this) }
                    value="bom"/>
                  <span>Bom</span>
                </label>
                <p className={ this.state.condicao === "bom" ? 'is-active' : '' }>
                  O aparelho está em bom estado, com alguns detalhes físicos de uso diário. O aparelho não está quebrado ou faltando botões.
                </p>
              </div>

              <div className="troca-radio-input">
                <label htmlFor="cmpDefeituoso" className="troca-radio-label">
                  <input type="radio"
                    name="cmpCondicao" id="cmpDefeituoso"
                    checked={ (this.state.condicao === "defeituoso") }
                    onChange={ this.handleCondicao.bind(this) }
                    value="defeituoso"/>
                    <span>Defeituoso</span>
                </label>
                <p className={ this.state.condicao === "defeituoso" ? 'is-active' : '' }>
                  O aparelho tem algum defeito no LCD: Tela quebrada ou trincos na tela, touchscreen defeituoso ou manchas na tela.
                </p>
              </div>

              </div> */}

              <label 
                className="text-label" htmlFor="cmpImei">Digite o IMEI do aparelho usado:</label>
              <input
                type="text"
                name="cmpImei" id="cmpImei"
                value={ this.state.imei }
                onChange={ this.handleImei.bind(this) }
              />

            </section>
          }

          {/**
            STEP 2
          **/}

          { (this.state.step >= 3 && this.state.aceite === '') &&
            <section className="troca-step">

              <h2 className="troca__title">
                Seu aparelho foi avaliado <span>e você ganhou um desconto de:</span>
              </h2>

              <p className="troca__price">
                R$ { this.state.avaliacao }.
              </p>

              <h2 className="troca__title">
                Quando o smartphone novo chegar, <span>você aceita levar o seu usado até uma loja Carrefour Faz + Fácil?*</span>
              </h2>

              <div className="troca-radio-input">
                <label htmlFor="cmpSim" className="troca-radio-label">
                  <input type="radio"
                    name="cmpAceite" id="cmpSim"
                    checked={ (this.state.aceite === true) }
                    onChange={ this.handleAceite.bind(this) }
                    value="true"/>
                  <span>Sim</span>
                </label>
                <p className={ this.state.aceite === true ? 'is-active' : '' }>
                  Eu concordo com o <a href="https://static.carrefour.com.br/imagens/troca-agora/REGULAMENTO%20DA%20A%C3%87%C3%83O%20TROCA%20AGORA.pdf" rel="noopener noreferrer" target="_blank">regulamento</a> e as regras da promoção.
                </p>
              </div>

              <div className="troca-radio-input">
                <label htmlFor="cmpNao" className="troca-radio-label">
                  <input type="radio"
                    name="cmpAceite" id="cmpNao"
                    checked={ (this.state.aceite === false) }
                    onChange={ this.handleAceite.bind(this) }
                    value="false"/>
                  <span>Não</span>
                </label>
                <p className={ this.state.aceite === false ? 'is-active' : '' }>
                  Prefiro efetuar a compra sem o desconto da promoção.
                </p>
              </div>

            </section>
          }

        </div>


        { this.state.aceite === true &&

          <div>
          <div id="lojas" className="troca-step">

            <h2 className="troca__title">
              *Conheça as lojas<br />Faz + Fácil participantes para<br />levar o seu celular usado
            </h2>

            <select
                id="cmpLoja" name="cmpLoja"
                onChange={this.handleLoja.bind(this)}
                value={ this.state.lojaSelect }>
                <option value="">Selecione a loja:</option>

                {
                  lojas.map(loja => <option value={ loja.id } key={loja.id}>{ loja.loja }</option>)
                }

            </select>

            {
              this.state.loja && <p className="troca__loja">
              <strong>{ this.state.loja.loja }</strong><br />
              { this.state.loja.logradouro }, { this.state.loja.numero }{ this.state.loja.complemento ? ` - ${this.state.loja.complemento}` : '' }<br />
              { this.state.loja.bairro }, { this.state.loja.cidade } - { this.state.loja.uf }
            </p>
            }

            </div>

            <article id="cupom">
            
              <header>
                Copie seu cupom
              </header>
            
              <div className="troca-modal-input-field">
                <input type="text" id="cmpCupom" value={this.state.cupom} readOnly></input>
                <button title="Copiar cupom" onClick={ this.copyText }>
                  <img src={copy} alt="Copiar" />
                </button>
              </div>

              <p className="troca-modal-input-text">
                <strong>
                  Guarde este cupom e use-o durante a compra. Imprima o laudo gerado abaixo e leve-o junto com o seu aparelho usado na Loja Faz + Fácil de sua escolha.
                </strong>
              </p>

              <button className="troca-modal-cta" onClick={ () => {
                     window.open(`https://www.carrefour.com.br/p/${ this.state.modeloCompra }?crfint=subhome|troca-agora|termo-sim|26062019|1`);
                  } }>
                Comprar
              </button>

            </article>

            {/* LAUDO */}

            <article id="laudo">

              <header>
                  Laudo de Celular Usado
              </header>

              <p>
                  O participante está de acordo que o aparelho informado na ação "Troca Agora", modelo <span>{ this.state.modeloUsado }</span> lhe concedeu um desconto de <span>R$ { this.state.avaliacao }</span> para a compra do novo aparelho selecionado.
              </p>

              <p>
                  Leve este laudo ao entregar o seu aparelho usado nas lojas Faz Mais Fácil.
              </p>

            </article>

            <button id="btn-print" onClick={ window.print }>Imprimir</button>
            <button id="btn-print" onClick={ () => window.open('https://static.carrefour.com.br/imagens/troca-agora/REGULAMENTO%20DA%20A%C3%87%C3%83O%20TROCA%20AGORA.pdf') }>Regulamento</button>
          </div>
        }
      </div>

    );
  }
  
}

export default App;
