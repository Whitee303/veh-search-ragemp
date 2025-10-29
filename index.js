let timeout
async function onLoadFunction() {
	const boxContainer = document.querySelector( '.boxContainer' );

	const notExistedVehicleImages = [ 'astron2', 'arbitergt', 'cyclone2', 'ignus2', 's95' ];
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

function findSpecified( findBy = "" ) {
	const carBox = document.querySelectorAll( '.carBox' )
	if ( !findBy.length ) {
		Array.from( carBox ).forEach( ( e ) => {
			Array.from( carBox ).forEach( e => e.classList.remove( 'hidden' ) );
			e.style.border = '1px solid rgba(65, 209, 154, 0.233)'

		} )
		return;
	}

	const imageDiv = document.querySelectorAll( '.image' )

	Array.from( carBox ).forEach( e => e.classList.add( 'hidden' ) );

	const finder = Array.from( imageDiv ).find( e => e.id === findBy.toLowerCase() )
	if ( finder && finder.parentElement ) {
		finder.parentElement.classList.remove( 'hidden' )
		finder.parentElement.style.border = '1px solid rgb(65, 209, 154)'
	}

}

function renderVehicles( data, container, excluded ) {
	const observer = new IntersectionObserver( entries => {
		entries.forEach( entry => {
			if ( entry.isIntersecting ) {
				const el = entry.target;
				const id = el.id;
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
		const vehicleNameDiv = document.createElement( 'div' )
		imageDiv.className = 'image';
		imageDiv.id = vehicleModel;
		vehicleNameDiv.className = 'vehicleName'
		vehicleNameDiv.innerText = vehicleModel
		carBox.id = vehicleModel;
		carBox.appendChild( imageDiv );
		carBox.appendChild( vehicleNameDiv );
		container.appendChild( carBox );
		observer.observe( imageDiv );
	} );
	setTimeout( () => {
		window.dispatchEvent( new Event( 'scroll' ) );
	}, 200 );
}

document.addEventListener( 'DOMContentLoaded', onLoadFunction );


function research( ev ) {
	if ( ev.target.matches( 'input[type="text"], input[type="search"]' ) ) {
		if ( timeout ) {
			clearTimeout( timeout )
		}
		timeout = setTimeout( () => {
			const findSimilarItemStartingWith = ev.target.value
			findSpecified( findSimilarItemStartingWith.trim() )
		}, 300 )
	}

}

document.addEventListener( "input", research )


function executeSpawn( ev ) {
	const vehicleModel = ev.target.id
	console.log( `Call event: CEF=> RAEG:MP spawnVehicle(${ev.target.id})` )
	mp.trigger( 'veh-search:ExecuteSpawn', vehicleModel )

}
document.addEventListener( "click", executeSpawn )