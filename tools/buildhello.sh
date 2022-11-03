#!/bin/bash

# LiveG OS Bootstrap Toolchain
# 
# Copyright (C) LiveG. All Rights Reserved.
# 
# https://liveg.tech/os
# Licensed by the LiveG Open-Source Licence, which can be found at tools/LICENCE.md.

dpkg-deb --build tools/liveg-hello
dpkg-name tools/liveg-hello.deb
mv tools/liveg-hello_*.deb pool/main/l

tools/update.sh