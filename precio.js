URL = "https://api.coingecko.com/api/v3/coins/"

$.get( URL, (response, status) => {

		if( status !== 'success') {
			throw new Error('error')
		}

		for(const dato of response) {
			if(dato.symbol == "axs") {
				$('#precio-axs').html(dato.market_data.current_price.usd)
			}
		}
})
