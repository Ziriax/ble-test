#!/bin/bash

# exit asap
set -ex

cd /tmp/microbit-samples/
cp /work/src/main.cpp ./source/
cp /work/src/config.json ./

yt clean
yt build

cp ./build/bbc-microbit-classic-gcc/source/microbit-samples-combined.hex /work/out/




