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

	reiniciar() {
		this.ronda = 1
		this.energia = new Energia()
		this.cartas = new Cartas()
	}
}

const partida = new Partida()

const rondaHtml = document.getElementById('ronda')
const energiaHtml = document.getElementById('energia')
const cartasHtml = document.getElementById('cartas')

const energiaModificarHtml = document.getElementById('energia-modificar')
const cartasModificarHtml = document.getElementById('cartas-modificar')

// Botones 

const btnEnergiaMenos = document.getElementById('btn-energia-menos')
const btnEnergiaMas = document.getElementById('btn-energia-mas')
const btnCartasMenos = document.getElementById('btn-cartas-menos')
const btnCartasMas = document.getElementById('btn-cartas-mas')

const btnSiguiente = document.getElementById('siguiente')
const btnNueva = document.getElementById('nueva')

// Modificador de energia

btnEnergiaMenos.onclick = () => {
	let anterior = Number(energiaModificarHtml.innerHTML)
	energiaModificarHtml.innerHTML = anterior - 1
}

btnEnergiaMas.onclick = () => {
	let anterior = Number(energiaModificarHtml.innerHTML)
	energiaModificarHtml.innerHTML = anterior + 1	
}

// Modificador de cartas

btnCartasMenos.onclick = () => {
	let anterior = Number(cartasModificarHtml.innerHTML)
	cartasModificarHtml.innerHTML = anterior - 1	
}

btnCartasMas.onclick = () => {
	let anterior = Number(cartasModificarHtml.innerHTML)
	cartasModificarHtml.innerHTML = anterior + 1		
}

// Siguiente ronda

btnSiguiente.onclick = () => {
	let energia = Number(energiaModificarHtml.innerHTML)
	let cartas = Number(cartasModificarHtml.innerHTML)

	partida.siguienteRonda(energia, cartas)

	energiaModificarHtml.innerHTML = 0
	cartasModificarHtml.innerHTML = 0

	rondaHtml.innerHTML = partida.getRonda()
	energiaHtml.innerHTML = partida.getEnergia()
	cartasHtml.innerHTML = partida.getCartas()
}

// Nueva partida

btnNueva.onclick = () => {
	partida.reiniciar()

	energiaModificarHtml.innerHTML = 0
	cartasModificarHtml.innerHTML = 0

	rondaHtml.innerHTML = partida.getRonda()
	energiaHtml.innerHTML = partida.getEnergia()
	cartasHtml.innerHTML = partida.getCartas()		
}
