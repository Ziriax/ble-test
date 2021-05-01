ARG VARIANT="buster"
FROM mcr.microsoft.com/vscode/devcontainers/base:0-${VARIANT} AS system

FROM system AS setup
RUN apt-get update -qq \
  && apt-get install -y git python-pip cmake build-essential ninja-build python-dev libffi-dev libssl-dev srecord gcc-arm-none-eabi

FROM setup AS tools
RUN pip install yotta

FROM tools AS source
RUN git clone https://github.com/lancaster-university/microbit-samples.git /tmp/microbit-samples \
  && cd /tmp/microbit-samples \
  && yt build


