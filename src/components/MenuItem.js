import React from 'react';

const MenuItem = (props) => {
   return (
      <li className="troca-menu__li" dangerouslySetInnerHTML={{__html:  props.text}} data-index={props.index}></li>
   )
};

export default MenuItem;