const ENERGIA_INICIAL = 3
const ENERGIA_MINIMA = 0
const ENERGIA_MAXIMA = 10

const CARTAS_INICIAL = 6
const CARTAS_MINIMA = 0
const CARTAS_MAXIMA = 12

const ENERGIA_POR_RONDA = 2
const CARTAS_POR_RONDA = 3

class Energia {
	constructor() {
		this.cantidad = ENERGIA_INICIAL
	}

	getCantidad() {
		return this.cantidad
	}

	sumar(n) {
		if(this.cantidad + n > ENERGIA_MAXIMA) {
			this.cantidad = ENERGIA_MAXIMA
		} else if(this.cantidad + n < ENERGIA_MINIMA){
			this.cantidad = ENERGIA_MINIMA
		} else {
			this.cantidad = this.cantidad + n
		}
	}
}

class Cartas {
	constructor() {
		this.cantidad = CARTAS_INICIAL
	}

	getCantidad() {
		return this.cantidad
	}

	sumar(n) {
		if(this.cantidad + n > CARTAS_MAXIMA) {
			this.cantidad = CARTAS_MAXIMA
		} else if(this.cantidad + n < CARTAS_MINIMA){
			this.cantidad = CARTAS_MINIMA
		} else {
			this.cantidad = this.cantidad + n
		}
	}
}

class Partida {
	constructor() {
		this.ronda = 1
		this.energia = new Energia()
		this.cartas = new Cartas()
	}

	getRonda() {
		return this.ronda
	}

	getEnergia() {
		return this.energia.getCantidad()
	}

	getCartas() {
		return this.cartas.getCantidad()
	}

	siguienteRonda(energia, cartas) {
		this.energia.sumar(energia)
		this.energia.sumar(ENERGIA_POR_RONDA)
		this.cartas.sumar(cartas)
		this.cartas.sumar(CARTAS_POR_RONDA)
		this.ronda++
	}
}

const rondaHtml = document.getElementById('ronda')
const energiaHtml = document.getElementById('energia')
const cartasHtml = document.getElementById('cartas')

// Simulador de partida
alert("Nueva partida")
const partida = new Partida()

while(true) {
	rondaHtml.innerHTML = partida.getRonda()
	energiaHtml.innerHTML = partida.getEnergia()
	cartasHtml.innerHTML = partida.getCartas()

	alert(`Ronda: ${partida.getRonda()}\nEnergía: ${partida.getEnergia()}\nCartas: ${partida.getCartas()}`)
	let energia = Number(prompt("Ingrese energía a sumar"))
	let cartas = Number(prompt("Ingrese cartas a sumar"))
	partida.siguienteRonda(energia, cartas)

	let terminar = Number(prompt("Ingrese 0 para continuar"))
	if(terminar != 0) {
		break
	}
}