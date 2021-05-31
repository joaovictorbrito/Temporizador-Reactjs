import React, {useState, useEffect} from 'react'
import LabelCronometro from './LabelCronometro'
import Botao from './Botao'
import LabelParcial from './LabelParcial'

const Contador = (props) => {
	const [filterHoras, setfilterHoras] = useState(0)
	const [filterMinutos, setfilterMinutos] = useState(0)
	const [filterSegundos, setfilterSegundos] = useState(0)

	const [horas, setHoras] = useState(0)
	const [minutos, setMinutos] = useState(0)
	const [segundos, setSegundos] = useState(0)
	const [pause, setPause] = useState(true)
	const [namePause, setNamePause] = useState("Play")
	const [parcial, setParcial] = useState([])

	// função para validação da hora
	const validarInputHora = (e) => {
		if(e.target.value < 0 ||e.target.value > 59){
			alert("Digite um valor de 0 a 59")
		}else{
			handleInputHora(e)
		}
	}
	// função para validação dos minutos
	const validarInputMinuto = (e) => {
		if(e.target.value < 0 ||e.target.value > 59){
			alert("Digite um valor de 0 a 59")
		}else{
			handleInputMinuto(e)
		}
	}
	// função para validação dos segundos
	const validarInputSegundos = (e) => {
		if(e.target.value < 0 ||e.target.value > 59){
			alert("Digite um valor de 0 a 59")
		}else{
			handleInputSegundos(e)
		}
	}
	// função para receber e enviar o valor das horas
	const handleInputHora = (e) => {
		setHoras(e.target.value)
		setfilterHoras(e.target.value)	
	}
	// função para receber e enviar o valor dos minutos
	const handleInputMinuto = (e) => {
		setMinutos(e.target.value);
		setfilterMinutos(e.target.value)
	}
	// função para receber e enviar o valor dos segundos
	const handleInputSegundos = (e) => {
		setSegundos(e.target.value);
		setfilterSegundos(e.target.value)
	}	
	//função para as parcias dos horarios
	const parciais = () => {
		let p = horas + ":" + minutos + ":" + segundos
		setParcial([...parcial, p])
	}

	//função para decrementar as horas
	const decrementar = () => { 
		if(pause==false){
			if(horas <= 0 & minutos <= 0 & segundos <= 0){
				setNamePause("Play")
				setPause(true)
			}else if (horas > 0 & segundos <= 0 & minutos <= 0){
				setSegundos(59)
				decrementarHoras()
				setMinutos(59)
			}else {
				setSegundos(segundos - 1)
			}
		}
	}
	//função para parar o tempo
	const pararTempo = () => {
		setPause(!pause)//	
		if(pause){
			setNamePause("Stop")
		}else{
			setNamePause("Play")
		} 
	}
	//função para zerar o temporizador
	const zerarTemporizador = () => {
		setNamePause("Play")
		setfilterHoras(0)
		setfilterMinutos(0)
		setfilterSegundos(0)

		setHoras(0)
		setSegundos(0)
		setMinutos(0)
		setParcial([])
	}
	//função para decrementar as horas
	const decrementarHoras = () => {
		setHoras(horas - 1)
	}
	//função para decrementar os minutos
	const decrementarMinutos = () => {
		setMinutos(minutos - 1)
	}
	
	//causa efeito a cada 1 seg
	useEffect(() => {
		let id = setInterval(() => {
		decrementar()
		}, 1000)
		return () => clearInterval(id);   
	})
	//causa efeito a cada 1 seg
	useEffect(() => {
		if(minutos > 0 & segundos < 0){
			setSegundos(59)
			decrementarMinutos()
		}
		
	}, [segundos])
	
	useEffect(() => {
		if(horas > 0 & minutos < 0 & segundos < 0){	
			setSegundos(59)
			decrementarHoras()
		}

	}, [minutos])

	return(
		<div className="container">
			<input
				type="number"
				placeholder="Hora"
				className=""
				value={filterHoras}
				onChange={validarInputHora}
				disabled={!pause}		
			/> 
			<input
				type="number"
				placeholder="Minuto"
				className=""
				value={filterMinutos}
				onChange={validarInputMinuto}	
				disabled={!pause}
			/> 
			<input
				type="number"
				placeholder="Segundos"
				className=""
				value={filterSegundos}
				onChange={validarInputSegundos}		
				disabled={!pause}					
			/> 

			<LabelCronometro name={horas+":"+minutos+":"+segundos}/>
			<Botao className="btn bg-danger" onClick={() => {zerarTemporizador()}} label="Zerar" />
			<Botao className="btn bg-success" onClick={() => {pararTempo()}} label={namePause} />
			<Botao className="btn bg-secondary" onClick={parciais} label="Parcial" />
			<LabelParcial items={parcial}/>
		</div>
	)
}
export default Contador