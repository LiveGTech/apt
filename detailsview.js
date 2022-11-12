/*
    LiveG APT Repository

    Copyright (C) LiveG. All Rights Reserved.

    https://opensource.liveg.tech/liveg-apt
    Licensed by the LiveG Open-Source Licence, which can be found at LICENCE.md.
*/

import * as astronaut from "https://opensource.liveg.tech/Adapt-UI/astronaut/astronaut.js";
import * as sizeUnits from "https://opensource.liveg.tech/Adapt-UI/src/sizeunits.js";

export var DetailsViewScreen = astronaut.component("DetailsViewScreen", function(props, children) {
    return Screen (
        Header (
            IconButton({icon: "back", alt: _("back"), attributes: {"aui-bind": "back"}}) (),
            CodeSnippet() (props.Package)
        ),
        Page(true) (
            Section (
                Heading(1) (CodeSnippet() (props.Package)),
                PropertyList (
                    Property (Text(_("details_version")), Text(props.Version)),
                    Property (Text(_("details_arch")), CodeSnippet() (props.Architecture)),
                    Property (Text(_("details_size")), Text(sizeUnits.getString(props.Size, _))),
                    Property (
                        Text(_("details_website")),
                        props.Homepage ? Link(props.Homepage, true) (props.Homepage.match(/(?:[a-zA-Z0-9-]+:\/\/\/?)?([^?]+)(?:\?.*)?/)[1]) : Text(_("details_website_none"))
                    ),
                    Property (
                        Text(_("details_downloadLink")),
                        Link({source: props.Filename, download: props.Filename.match(/([^\/]+.deb)$/)[1]}) (`opensource.liveg.tech/${props.Filename.replace(/^\.\//, "")}`)
                    )
                ),
                Paragraph({attributes: {"aui-select": true}}) (
                    BoldTextFragment() (props.Description.split("\n")[0])
                ),
                // For description, split by paragraph for double line breaks only
                ...props.Description
                    .split("\n")
                    .slice(1) // Skip short description line
                    .map((line) => line.trim() == "" ? "\n" : line)
                    .join(" ")
                    .split("\n")
                    .map((line) => Paragraph({attributes: {"aui-select": true}}) (line))
            )
        )
    );
});