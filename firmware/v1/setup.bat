@echo off
setlocal
cd /d %~dp0

docker build --target system -t ubit-v1-system .devcontainer
if errorlevel 1 goto :error

docker build --target tools -t ubit-v1-tools .devcontainer
if errorlevel 1 goto :error

docker build --target source -t ubit-v1-source .devcontainer
if errorlevel 1 goto :error

echo :-) SETUP
goto :exit

:error
echo :-( SETUP

:exit
endlocal

cd /d %~dp0
