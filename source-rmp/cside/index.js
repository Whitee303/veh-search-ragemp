"use strict";
var viewURL = "http://package/Your/Link";
var view;
var localPlayer = mp.players.local;
var client = {
    createViewInstance: function() {
        if (view) {
            return;
        }
        view = mp.browsers.new(viewURL);
        mp.gui.chat.push("Loaded");
        view.active = false;
    },
    doActive: function() {
        view.active = !view.active;
        if (view.active == false) {
            mp.gui.cursor.show(false, false);
        } else if (view.active == true) {
            mp.gui.cursor.show(true, true);
        }
    },
    catchVehicle: function(vehicleModelName) {
        if (view && view.active) {
            if (localPlayer.vehicle) {
                return;
            }
            mp.game.cam.doScreenFadeOut(2000);
            view.active = false;
            mp.gui.chat.show(false);
            setTimeout(function() {
                mp.events.callRemote("veh-search:CreateVehicle", vehicleModelName);
                mp.game.cam.doScreenFadeIn(6000);
                mp.gui.chat.show(true);
                mp.gui.cursor.show(false, false);
            }, 10000);
        }
    },
    quit: function() {
        if (view) {
            view.destroy();
            view = null;
        }
    }
};
mp.events.add("playerReady", client.createViewInstance);
mp.events.add("veh-search:ExecuteSpawn", client.catchVehicle);
mp.keys.bind(0x42, false, client.doActive);
