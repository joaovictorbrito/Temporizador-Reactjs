import React, {useState} from 'react';

const TimerInput = (props) => {
  const horas = props.onTimeHoras
  const minutos = props.onTimeMinutos
  const segundos = props.onTimeSegundos
  const porcentagem = ((horas + minutos + segundos)/10)

  return (
    <div className="progress-bar">
      <span style={{width: `${porcentagem}%`}}>
				{`${porcentagem}`}
      </span>

		</div>
    )
}
export default TimerInput
