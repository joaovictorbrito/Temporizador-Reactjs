import React from 'react'

const Botao = (props) => (
    <button className="btn bg-primary text-white" onClick={props.onClick}>{props.label}</button>
)

export default Botao