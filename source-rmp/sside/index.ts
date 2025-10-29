const server = {
	executeSpawnOfVehicle: async (player: PlayerMp, vehicleModel: string) => {
		new Promise<VehicleMp>((res, reject) => {
			const hash = mp.joaat(vehicleModel);
			if (!hash) {
				reject('Wrong hash!');
			}
			const { x, y, z } = player.position;
			const vehicle = mp.vehicles.new(hash, new mp.Vector3(x, y, z), {
				engine: false
			});
			res(vehicle as VehicleMp);
		}).then((vehicle) => {
			console.log(vehicle.trailer);
			const { x, y, z } = player.position;
			vehicle.position = new mp.Vector3(x + 0.5, y + 0.2, z);
			if (vehicle.trailer) {
				return;
			}
			player.putIntoVehicle(vehicle, 0);
		});
	}
};
mp.events.add('veh-search:CreateVehicle', server.executeSpawnOfVehicle);