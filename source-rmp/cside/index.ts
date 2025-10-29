const viewURL = "http://package/Your/Link";
let view: BrowserMp;
const localPlayer = mp.players.local;

const client = {
	createViewInstance: () => {
		if (view) {
			return;
		}
		view = mp.browsers.new(viewURL);
		view.active = false;
	},
	doActive: () => {
		view.active = !view.active;
		if (view.active == false) {
			mp.gui.cursor.show(false, false);

		} else if (view.active == true) {
			mp.gui.cursor.show(true, true);

		}
	},
	catchVehicle: (vehicleModelName: string) => {
		if (view && view.active) {
			if (localPlayer.vehicle) {
				return;
			}
			mp.game.cam.doScreenFadeOut(2000);
			view.active = false;
			mp.gui.chat.show(false);
			setTimeout(() => {
				mp.events.callRemote('veh-search:CreateVehicle', vehicleModelName);
				mp.game.cam.doScreenFadeIn(6000);
				mp.gui.chat.show(true);
				mp.gui.cursor.show(false, false);
			}, 10000);

		}
	},
	quit: () => {
		if (view) {
			view.destroy();
			view = null;
		}
	}
};
mp.events.add('playerReady', client.createViewInstance);
mp.events.add('veh-search:ExecuteSpawn', client.catchVehicle);
mp.events.add('playerQuit', client.quit);
mp.keys.bind(0x42, false, client.doActive); // B Key 