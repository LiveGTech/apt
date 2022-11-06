/*
    LiveG APT Repository

    Copyright (C) LiveG. All Rights Reserved.

    https://opensource.liveg.tech/liveg-apt
    Licensed by the LiveG Open-Source Licence, which can be found at LICENCE.md.
*/

export var packages = [];
export var loaded = false;

export function parsePackageData(text) {
    var lastProperty = null;
    var currentPackage = {};
    var parsedPackages = [];

    text.split("\n").forEach(function(line) {
        if (line.trim().startsWith("#")) {
            return;
        }

        var match = line.match(/^([\w].*?):(.*)$/);

        if (match) {
            var property = match[1];

            if (property == "Package" && lastProperty != null) {
                parsedPackages.push(currentPackage);

                currentPackage = {};
            }

            currentPackage[property] = match[2].trim();
            lastProperty = property;

            return;
        }

        if (lastProperty == null) {
            return;
        }

        if (line.trim() == ".") {
            currentPackage[lastProperty] += "\n";

            return;
        }

        currentPackage[lastProperty] += "\n" + line.trim();
    });

    parsedPackages.push(currentPackage);

    return parsedPackages;
}

export function load(force = false) {
    if (loaded && !force) {
        return Promise.resolve(packages);
    }

    return fetch("Packages").then(function(response) {
        return response.text();
    }).then(function(text) {
        packages = parsePackageData(text);
        loaded = true;

        return Promise.resolve(packages);
    });
}