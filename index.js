
async function onLoadFunction() {
	const notExistedVehicleImages = [ 'astron2', 'arbitergt', 'cyclone2', 'ignus2', 's95' ];
	const boxContainer = document.querySelector( '.boxContainer' );
	const cacheKey = 'vehiclesData';
	let vehicles = [];
	const cached = localStorage.getItem( cacheKey );
	if ( cached ) {
		try {
			vehicles = JSON.parse( cached );
			console.log( 'Załadowano dane z cache' );
			renderVehicles( vehicles, boxContainer, notExistedVehicleImages );
		} catch {
			localStorage.removeItem( cacheKey );
		}
	}

	try {
		const response = await fetch(
			'https://raw.githubusercontent.com/DurtyFree/gta-v-data-dumps/refs/heads/master/vehicles.json'
		);
		if ( !response.ok ) throw new Error( 'Błąd pobierania danych' );
		const data = await response.json();
		const compressedData = data.map( v => ( {
			Name: v.Name
		} ) );
		localStorage.setItem( cacheKey, JSON.stringify( compressedData ) );
		if ( !cached ) renderVehicles( data, boxContainer, notExistedVehicleImages );
		console.log( 'Dane pobrane i zapisane w cahce' );
	} catch ( err ) {
		console.error( 'Nie udało się pobrać danych:', err );
	}
}

function renderVehicles( data, container, excluded ) {
	const observer = new IntersectionObserver( entries => {
		entries.forEach( entry => {
			if ( entry.isIntersecting ) {
				const el = entry.target;
				const id = el.dataset.id;
				el.style.backgroundImage = `url(https://docs.fivem.net/vehicles/${id}.webp)`;
				observer.unobserve( el );
			}
		} );
	}, {
		root: null,
		rootMargin: '100px', 
		threshold: 0.1
	} );

	data.forEach( v => {
		const vehicleModel = v[ 'Name' ]?.toLowerCase();
		if ( !vehicleModel || excluded.includes( vehicleModel ) ) return;
		const carBox = document.createElement( 'div' );
		carBox.className = 'carBox';

		const imageDiv = document.createElement( 'div' );
		imageDiv.className = 'image';
		imageDiv.dataset.id = vehicleModel;
		carBox.appendChild( imageDiv );
		container.appendChild( carBox );

		observer.observe( imageDiv );
	} );
	setTimeout( () => {
		window.dispatchEvent( new Event( 'scroll' ) );
	}, 200 );
}

document.addEventListener( 'DOMContentLoaded', onLoadFunction );