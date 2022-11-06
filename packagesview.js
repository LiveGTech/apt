/*
    LiveG APT Repository

    Copyright (C) LiveG. All Rights Reserved.

    https://opensource.liveg.tech/liveg-apt
    Licensed by the LiveG Open-Source Licence, which can be found at LICENCE.md.
*/

import * as astronaut from "https://opensource.liveg.tech/Adapt-UI/astronaut/astronaut.js";

import * as packageData from "./packagedata.js";

const ADD_APT_REPO_CODE = `\
$ curl -s --compressed https://opensource.liveg.tech/liveg-apt/KEY.gpg | gpg --dearmor | sudo tee /etc/apt/trusted.gpg.d/liveg-apt.gpg > /dev/null
$ sudo curl -s --compressed https://opensource.liveg.tech/liveg-apt/liveg-apt.list -o /etc/apt/sources.list.d/liveg-apt.list
$ sudo apt update\
`;

export var PackagesViewScreen = astronaut.component("PackagesViewScreen", function(props, children) {
    // TODO: Add package searching implementation
   
    var packageList = Container() ();

    packageData.load().then(function(packages) {
        packageList.clear().add(
            ...packages.map((data) => Card (
                Heading(1) (
                    CodeSnippet() (data.Package)
                ),
                Paragraph() (data.Description) // TODO: Make this cut off with ellipsis
            ))
        );
    });

    return Screen(true) (
        Header (
            Text(_("livegAptRepo"))
        ),
        Page(true) (
            Section (
                Heading({level: 1, attributes: {"aui-justify": "middle"}}) (
                    BrandWordmark(_("livegAptRepo")) (
                        Text(_("intro_title"))
                    )
                ),
                Paragraph() (_("intro_description")),
                Accordion({open: false, mode: "boxed"}) (
                    Text(_("addAptRepo_title")),
                    Paragraph() (_("addAptRepo_description1")),
                    CodeBlock() (ADD_APT_REPO_CODE),
                    Paragraph() ().setHTML(_("addAptRepo_description2"))
                )
            ),
            Section (
                Heading(2) (_("searchForPackage_title")),
                // TODO: Implement searching to limit list
                Input({type: "search", placeholder: _("searchForPackage_inputPlaceholder")}) (),
                packageList
            )
        )
    );
});