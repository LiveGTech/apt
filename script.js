/*
    LiveG APT Repository

    Copyright (C) LiveG. All Rights Reserved.

    https://opensource.liveg.tech/liveg-apt
    Licensed by the LiveG Open-Source Licence, which can be found at LICENCE.md.
*/
 
import * as $g from "https://opensource.liveg.tech/Adapt-UI/src/adaptui.js";
import * as astronaut from "https://opensource.liveg.tech/Adapt-UI/astronaut/astronaut.js";
 
window.$g = $g;
 
astronaut.unpack();

import * as packagesView from "./packagesview.js";

export var packagesViewScreen = null;

var screensContainer = Container() ();

export function addScreen(screen) {
    screensContainer.add(screen);
}

$g.waitForLoad().then(function() {
    return $g.l10n.selectLocaleFromResources({
        "en_GB": "locales/en_GB.json"
    });
}).then(function(locale) {
    window._ = function() {
        return locale.translate(...arguments);
    };
 
    $g.theme.setProperty("primaryHue", "340");
    $g.theme.setProperty("primarySaturation", "100%");
    $g.theme.setProperty("primaryLightness", "30%");

    packagesViewScreen = packagesView.PackagesViewScreen() ();

    addScreen(packagesViewScreen);
    astronaut.render(screensContainer);
});