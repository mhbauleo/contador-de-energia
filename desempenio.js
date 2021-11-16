// Desempeño

$('#desempenio-elementos').hide()

$('#btn-desempenio').click(function () {
	$('#desempenio-elementos').toggle()
})

$('#agregar-partida').submit(function (e) {
	e.preventDefault()

	let hijos = $(e.target).children()

	let anteriorSlp = Number($('#slp').html())
	$('#slp').html(anteriorSlp + Number(hijos[0].value))

	console.log(hijos[1].value)
	if(hijos[1].value == "Victoria") {
		let anterior = Number($('#victorias').html())
		$('#victorias').html(anterior + 1)

	} else if (hijos[1].value == "Derrota") {
		let anterior = Number($('#derrotas').html())
		$('#derrotas').html(anterior + 1)
		$('#slp').html(anteriorSlp)

	} else if (hijos[1].value == "Empate") {
		let anterior = Number($('#empates').html())
		$('#empates').html(anterior + 1)
	}
})