import React from 'react';
import '../App.css';

//texto para a parcial dos horarios
const LabelParcial = (props) => 
  {
    return(
      <ul className="mt-3 mx-auto">
        {props.items.map((item, index) => (
        	<li className=" mt-3 bg-dark text-white">{item}</li>
        ))}
      </ul>
        )
  }

export default LabelParcial