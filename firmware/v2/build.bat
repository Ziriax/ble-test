@echo off
setlocal

cd /d %~dp0

set WORK_DIR="%~dp0\work"
set WORK_OUT="%~dp0\work\out"

if not exist %WORK_OUT% (
  mkdir %WORK_OUT%
  if errorlevel 1 goto :error
)

docker run --rm --name ubit-v2-compile --volume "%WORK_DIR%":/work ubit-v2-build /work/compile.sh
if errorlevel 1 goto :error

if NOT "%1"=="" (
  copy "%~dp0\work\out\microbit.hex" %1
  if errorlevel 1 goto :error
)

REM docker run -i --rm --name ubit-v1-compile --volume "%~dp0\work":/work ubit-v1-source /bin/bash


echo :-) BUILD
goto :exit

:error
echo :-( BUILD

:exit
endlocal

cd /d %~dp0
