#!/bin/bash

# LiveG APT Repository
# 
# Copyright (C) LiveG. All Rights Reserved.
# 
# https://liveg.tech/os
# Licensed by the LiveG Open-Source Licence, which can be found at LICENCE.md.

dpkg-deb --build sources/$1
dpkg-name sources/$1.deb

if [[ $1 =~ "lib.+" ]]; then
    mv sources/$1_*.deb pool/main/${1:0:4}
else
    mv sources/$1_*.deb pool/main/${1:0:1}
fi

tools/update.sh