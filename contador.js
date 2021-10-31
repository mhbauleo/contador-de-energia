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

// Variables

const partida = new Partida()
let cartasRival = new Map()

// Elementos html modificables

const rondaHtml = document.getElementById('ronda')
const energiaHtml = document.getElementById('energia')
const cartasHtml = document.getElementById('cartas')

const energiaModificarHtml = document.getElementById('energia-modificar')
const cartasModificarHtml = document.getElementById('cartas-modificar')

// Cartas rival

const boca1 = document.getElementById('boca-1')
const boca2 = document.getElementById('boca-2')
const boca3 = document.getElementById('boca-3')

const cuerno1 = document.getElementById('cuerno-1')
const cuerno2 = document.getElementById('cuerno-2')
const cuerno3 = document.getElementById('cuerno-3')

const espalda1 = document.getElementById('espalda-1')
const espalda2 = document.getElementById('espalda-2')
const espalda3 = document.getElementById('espalda-3')

const cola1 = document.getElementById('cola-1')
const cola2 = document.getElementById('cola-2')
const cola3 = document.getElementById('cola-3')

// Botones 

const btnEnergiaMenos = document.getElementById('btn-energia-menos')
const btnEnergiaMas = document.getElementById('btn-energia-mas')
const btnCartasMenos = document.getElementById('btn-cartas-menos')
const btnCartasMas = document.getElementById('btn-cartas-mas')

const btnSiguiente = document.getElementById('siguiente')
const btnNueva = document.getElementById('nueva')

// Funciones

function reiniciarCartasRival(cartasRival) {
	cartasRival.set('boca-1', 0)
	cartasRival.set('boca-2', 0)
	cartasRival.set('boca-3', 0)

	cartasRival.set('cuerno-1', 0)
	cartasRival.set('cuerno-2', 0)
	cartasRival.set('cuerno-3', 0)

	cartasRival.set('espalda-1', 0)
	cartasRival.set('espalda-2', 0)
	cartasRival.set('espalda-3', 0)

	cartasRival.set('cola-1', 0)
	cartasRival.set('cola-2', 0)
	cartasRival.set('cola-3', 0)

	boca1.innerHTML = 0
	boca2.innerHTML = 0
	boca3.innerHTML = 0 

	cuerno1.innerHTML = 0
	cuerno2.innerHTML = 0
	cuerno3.innerHTML = 0

	espalda1.innerHTML = 0
	espalda2.innerHTML = 0
	espalda3.innerHTML = 0

	cola1.innerHTML = 0
	cola2.innerHTML = 0
	cola3.innerHTML = 0
}

function calcularCartasUsadas(cartasRival) {
	let cartasUsadas = 0

	cartasRival.forEach((valor,clave)=> {
		let diferencia = Number(document.getElementById(clave).innerHTML) - valor
		cartasUsadas += diferencia
	})
	return cartasUsadas
}

function actualizarCartasRival(cartasRival) {
	cartasRival.forEach((valor,clave)=> {
		cartasRival.set(clave, Number(document.getElementById(clave).innerHTML))
	})
}


// Modificador de energia

btnEnergiaMenos.onclick = () => {
	let anterior = Number(energiaModificarHtml.innerHTML)
	if(-anterior < partida.getEnergia()) {
		energiaModificarHtml.innerHTML = anterior - 1
	}
}

btnEnergiaMas.onclick = () => {
	let anterior = Number(energiaModificarHtml.innerHTML)
	energiaModificarHtml.innerHTML = anterior + 1	
}

// Modificador de cartas

btnCartasMenos.onclick = () => {
	let anterior = Number(cartasModificarHtml.innerHTML)
	if(-anterior < partida.getCartas()) {
		cartasModificarHtml.innerHTML = anterior - 1
	}
}

btnCartasMas.onclick = () => {
	let anterior = Number(cartasModificarHtml.innerHTML)
	cartasModificarHtml.innerHTML = anterior + 1		
}

// Siguiente ronda

btnSiguiente.onclick = () => {
	let energia = Number(energiaModificarHtml.innerHTML)
	let cartas = Number(cartasModificarHtml.innerHTML)

	partida.siguienteRonda(energia, cartas - calcularCartasUsadas(cartasRival))
	actualizarCartasRival(cartasRival)

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

	reiniciarCartasRival(cartasRival)
}

// Cartas usadas del rival

function cartaUsada(clicked_id) {
	let anterior = Number(document.getElementById(clicked_id).innerHTML)
	document.getElementById(clicked_id).innerHTML = (anterior + 1)%3
}

// Inicializar diccionario de cartas del rival

reiniciarCartasRival(cartasRival)