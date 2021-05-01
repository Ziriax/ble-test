@echo off
setlocal
cd /d %~dp0

docker build --target system -t ubit-v2-system .devcontainer
if errorlevel 1 goto :error

docker build --target source -t ubit-v2-source .devcontainer
if errorlevel 1 goto :error

docker build --target build -t ubit-v2-build .devcontainer
if errorlevel 1 goto :error

echo :-) SETUP
goto :exit

:error
echo :-( SETUP

:exit
endlocal

cd /d %~dp0
