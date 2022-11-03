#!/bin/bash

# LiveG OS Bootstrap Toolchain
# 
# Copyright (C) LiveG. All Rights Reserved.
# 
# https://liveg.tech/os
# Licensed by the LiveG Open-Source Licence, which can be found at tools/LICENCE.md.

dpkg-scanpackages --multiversion . > Packages
gzip -k -f Packages

apt-ftparchive release . > Release
gpg --default-key hi@liveg.tech -abs -o - Release > Release.gpg
gpg --default-key hi@liveg.tech --clearsign -o - Release > InRelease