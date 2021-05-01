#!/bin/bash

# exit asap
set -ex

cd /tmp/microbit-v2-samples
cp /work/src/main.cpp ./source/
cp /work/src/codal.json ./

python3 build.py --clean

cp ./MICROBIT.hex /work/out/




