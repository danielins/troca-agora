import React, { Component } from 'react';
import MenuItem from './MenuItem';
import { menu } from '../data/menu';

class Menu extends Component {

   render(){

      return (
         <ul className="troca-menu">
            {
               menu.map((itemData, i) => 
                  <MenuItem text={itemData.text} index={i+1} key={i+1}></MenuItem>
               )
            }
         </ul>
      )

   }

}

export default Menu;