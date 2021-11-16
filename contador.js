const ENERGIA_INICIAL = 3
const ENERGIA_MINIMA = 0
const ENERGIA_MAXIMA = 10

const CARTAS_INICIAL = 6
const CARTAS_MINIMA = 0
const CARTAS_MAXIMA = 12

const ENERGIA_POR_RONDA = 2
const CARTAS_POR_RONDA = 3

const URL_PARTES = "partes.json"

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

// Funciones

function reiniciarCartasRival(cartasRival) {
	$.getJSON( URL_PARTES, (response, status) => {

		if( status !== 'success') {
			throw new Error('error')
		}

		for (const article of response) {
			cartasRival.set(article.boca, 0)
			cartasRival.set(article.cuerno, 0)
			cartasRival.set(article.espalda, 0)
			cartasRival.set(article.cola, 0)
			console.log(article)
		}
	})

	$('#boca-1').html(0)
	$('#boca-2').html(0)
	$('#boca-3').html(0)

	$('#cuerno-1').html(0)
	$('#cuerno-2').html(0)
	$('#cuerno-3').html(0)

	$('#espalda-1').html(0)
	$('#espalda-2').html(0)
	$('#espalda-3').html(0)

	$('#cola-1').html(0)
	$('#cola-2').html(0)
	$('#cola-3').html(0)
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

$('#btn-energia-menos').click(function () {
	let anterior = Number($('#energia-modificar').html())
	if(-anterior < partida.getEnergia()) {
		$('#energia-modificar').html(anterior - 1)
	}
})

$('#btn-energia-mas').click(function () {
	let anterior = Number($('#energia-modificar').html())
	$('#energia-modificar').html(anterior + 1)
})

// Modificador de cartas

$('#btn-cartas-menos').click(function () {
	let anterior = Number($('#cartas-modificar').html())
	if(-anterior < partida.getCartas()) {
		$('#cartas-modificar').html(anterior - 1)
	}
})

$('#btn-cartas-mas').click(function () {
	let anterior = Number($('#cartas-modificar').html())
	$('#cartas-modificar').html(anterior + 1)
})

// Siguiente ronda

$('#siguiente').click(function () {
	let energia = Number($('#energia-modificar').html())
	let cartas = Number($('#cartas-modificar').html())

	partida.siguienteRonda(energia, cartas - calcularCartasUsadas(cartasRival))
	actualizarCartasRival(cartasRival)

	$('#energia-modificar').html(0)
	$('#cartas-modificar').html(0)

	$('#ronda').html(partida.getRonda())
	$('#energia').html(partida.getEnergia())
	$('#cartas').html(partida.getCartas())
})

// Nueva partida

$('#nueva').click(function () {
	partida.reiniciar()

	$('#energia-modificar').html(0)
	$('#cartas-modificar').html(0)

	$('#ronda').html(partida.getRonda())
	$('#energia').html(partida.getEnergia())
	$('#cartas').html(partida.getCartas())

	reiniciarCartasRival(cartasRival)
})

// Cartas usadas del rival

function cartaUsada(clicked_id) {
	let anterior = Number(document.getElementById(clicked_id).innerHTML)
	document.getElementById(clicked_id).innerHTML = (anterior + 1)%3
}

// Inicializar diccionario de cartas del rival

reiniciarCartasRival(cartasRival)