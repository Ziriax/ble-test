# Bluetooth Web Services experiment with micro:bit

See the `firmware` folder for Docker files and batch files to create the HEX files.

**For some unknown reason, only the V1 micro:bit seems to work correctly, the V2 stops working after a random time...**

## Enabling HTTPS localhost
* To run locally, you need to enable HTTPS for localhost (the web bluetooth spec says HTTPS is required, although it did seem to work without...)
* [Download and extract the mkcert tool, Windows version](https://github.com/FiloSottile/mkcert/releases)
* Open a `CMD.exe` (we didn't test Powershell)
* `cd` into the cloned source folder
* install a root CA using the mkcert tool (`mkcert-XXX.exe -install`)
* `mkdir .cert`
* `cd .cert`
* Create a localhost dev certificate, using `mkcert-XXX.exe -cert-file cert.pem -key-file key.pem localhost`

## Deployed website

https://ziriax.github.io/ble-test

