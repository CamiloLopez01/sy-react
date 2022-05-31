import logo from './logo.svg';
import { EnrollmentSDK } from "@soyyo/sdk_web_enrollment";
import './App.css';
let environment = {
  API_COGNITO: "https://soyyo-snb.auth.us-east-1.amazoncognito.com",
  API_REGISTRY:
    "https://api.soyyo.mobi/snb-enrollment-process/enrollment-process/v1.0",
  API_AUTHENTICATION:
    "https://api.soyyo.mobi/snb-authentication-process/authentication-process/v1.0",
  API_KEY: "PBxc0p3bsb4E2gqSzx29oDwaBgQPFM377ASwIBic",
  // shoud go for parameters
  CLIENT_ID: "74koct3c6c340av4768dmhlimi",
  CLIENT_SECRET: "1d3r723c48647nanm2rtgejo9vi2q9fef99ju47rcs42j7208els",
  API_GET_ENROLLMENT:
    "https://api.soyyo.mobi/snb-enrollment/enrollment/v2.1/enrollments/",
};
let enrollment = new EnrollmentSDK(environment, (err) => {
  console.log('Error enrollment: ', err);
});

let data = {
  entityId: "2",
  processType: "ENR",
  documentType: "CC",
  identificationNumber: "1019065175",
  phoneIndicative: "57",
  phoneNumber: "3143161554",
  channel: "APP_CLIENT",
  email: "cesar@soyyo.co",
  appIdentifier: "web.demo.idcolombia",
  termsAccept: "true",
  policiesAccept: "true",
  biometricsAccept: "true",
  versionTerms: "V1.2",
  versionPolicies: "V1.2",
  versionBiometrics: "V1.2"
}



async function onSubmit() {
  enrollment.basicDataRegister(data)
    .then((data) => {
      console.log('after basicDataRegister');
      captureFace();

    }).catch((error) => {
      console.log("error2");
      console.log(error);
    });
}

function captureFace() {
  enrollment.captureFace(
    (response) => {
      if (response.liveness.code === "EP006") {
        console.log("Holas EP006");
        documentValidate();
      } else if (response.liveness.code === "EP004") {
        console.log("Holas EP004");
      }
    },
    (error) => {
      //Manejo de errores    
    }
  )
}

function documentValidate() {
  enrollment.documentValidate(
    (res) => {
      //Llamada a activación del usuario
    },
    (error) => {
      // Manejo de errores   
    }
  );
}

function App() {
  EnrollmentSDK.preInitialize();
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button
          className='Btn-register'
          onClick={onSubmit}>
          Registro
        </button>
      </header>
    </div>
  );
}

export default App;
