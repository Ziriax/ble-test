# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.166.1/containers/ubuntu/.devcontainer/base.Dockerfile

# [Choice] Ubuntu version: bionic, focal
ARG VARIANT="bionic"
FROM mcr.microsoft.com/vscode/devcontainers/base:0-${VARIANT} as system

FROM system AS setup
RUN apt-get update -qq \
    && export DEBIAN_FRONTEND=noninteractive \
    && apt-get install -y --no-install-recommends software-properties-common \
    && add-apt-repository -y ppa:team-gcc-arm-embedded/ppa \
    && apt-get update -qq \
    && apt-get install -y --no-install-recommends git make cmake python3 gcc-arm-embedded \
    && apt-get autoremove -y \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/*

FROM setup AS source
RUN git clone https://github.com/lancaster-university/microbit-v2-samples.git /tmp/microbit-v2-samples \
  && rm -r -f /tmp/microbit-v2-samples/source/samples/*

FROM source AS build
RUN cd /tmp/microbit-v2-samples \
  && python3 build.py



