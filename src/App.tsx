import { useCallback, useRef, useState } from "react";
import './App.css';
import * as microbit from "./micro-bit";

function failure(msg: string): never {
  throw new Error(msg);
}

function f(x: number) {
  return x.toFixed(2).padStart(6, " ");
}

interface State {
  accX: number;
  accY: number;
  accZ: number;
  magX: number;
  magY: number;
  magZ: number;
  bear: number;
  temp: number;
  btnA: number;
  btnB: number;
}

async function connect(log: HTMLElement, canvas: HTMLCanvasElement) {
  const state: State = {
    accX: 0,
    accY: 0,
    accZ: 0,
    magX: 0,
    magY: 0,
    magZ: 0,
    bear: 0,
    temp: 0,
    btnA: 0,
    btnB: 0,
  };

  const context = canvas.getContext("2d")!;
  const middle = canvas.height / 2;
  let accPosX = 0;
  let magPosX = 0;

  function print() {
    const { accX, accY, accZ, magX, magY, magZ, btnA, btnB, bear, temp } = state;
    return log.innerText = `A:(${f(accX)}, ${f(accY)}, ${f(accZ)}) M:(${f(magX)}, ${f(magY)}, ${f(magZ)}) C:${bear} T:${temp} B:(${btnA}, ${btnB})`;
  }

  try {
    const device = await microbit.requestMicrobit(window.navigator.bluetooth) ?? failure("requestMicrobit failed");
    const services = await microbit.getServices(device);
    console.log(services);
    const info = await services.deviceInformationService?.readDeviceInformation();
    console.log(info);
    services.temperatureService?.setTemperaturePeriod(200);
    services.temperatureService?.addEventListener("temperaturechanged", e => {
      state.temp = e.detail;
      print();
    });
    services.magnetometerService?.setMagnetometerPeriod(20);
    services.magnetometerService?.addEventListener("magnetometerdatachanged", e => {
      let { x, y, z } = e.detail;
      x /= 100000;
      y /= 100000;
      z /= 100000;
      state.magX = x;
      state.magY = y;
      state.magZ = z;
      print();

      const mag = Math.sqrt(x * x + y * y + z * z) * canvas.height / 10;
      context.fillStyle = "green";
      context.clearRect(magPosX, 0, 3, middle);
      context.fillRect(magPosX, middle - mag, 2, mag);
      magPosX = (magPosX + 2) % canvas.width;
    });
    services.magnetometerService?.addEventListener("magnetometerbearingchanged", e => {
      state.bear = e.detail;
      print();
    });
    services.accelerometerService?.setAccelerometerPeriod(20);
    services.accelerometerService?.addEventListener("accelerometerdatachanged", e => {
      const { x, y, z } = e.detail;
      state.accX = x;
      state.accY = y;
      state.accZ = z;
      print();

      const mag = Math.sqrt(x * x + y * y + z * z) * canvas.height / 10;
      context.fillStyle = "red";
      context.clearRect(accPosX, middle, 3, middle);
      context.fillRect(accPosX, middle, 2, mag);
      accPosX = (accPosX + 2) % canvas.width;
    });
    services.buttonService?.addEventListener("buttonastatechanged", e => {
      state.btnA = e.detail;
      print();
    });
    services.buttonService?.addEventListener("buttonbstatechanged", e => {
      state.btnB = e.detail;
      print();
    });
    // services.magnetometerService?.addEventListener("magnetometerdatachanged", e => {
    //   const {x,y,z} = e.detail;
    //   return log.innerText = `(${f(x)}, ${f(y)}, ${f(z)})`;
    // });
    return services;
  } catch (err) {
    alert(err.message || err);
    return null;
  }
}

export default function App() {
  const logRef = useRef<HTMLPreElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [services, setServices] = useState<microbit.Services | null>(null);

  const onConnect = useCallback(() => {
    if (logRef.current && canvasRef.current) {
      connect(logRef.current, canvasRef.current).then(setServices);
    }
  }, []);

  const onCalibrate = useCallback(() => {
    if (services?.magnetometerService) {
      services?.magnetometerService?.calibrate();
    }
  }, [services?.magnetometerService]);

  return (
    <div className="App">
      <button onClick={onConnect}>CONNECT</button>
      <button onClick={onCalibrate} disabled={!services?.magnetometerService}> CALIBRATE</button>
      <div>
        <pre className="Log" ref={logRef} />
      </div>
      <canvas ref={canvasRef} width="800" height="200" />
    </div >
  );
}
