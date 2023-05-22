import { useState } from "react";
import { Field, Form, Formik } from "formik";
import type { NextPage } from "next";
import { getProviders, signIn } from "next-auth/react";
import Router from "next/router";
import { Alert } from "react-bootstrap";
import { log } from "console";
import axios from 'axios'
import { changePassword } from "@/redux/slice/PersonalSlice";


const Auth: NextPage = ({ providers }: any) => {
  const [authType, setAuthType] = useState("Login");
  const oppAuthType: { [key: string]: string } = {
    Login: "Register",
    Register: "Login",
  };
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formEnviado, setFormEnviado] = useState(false)
  const [errors, setErrors] = useState('no_error')
  const [RegError, setRegError] = useState('no_error')
  const [forgot, setForgot] = useState(false)
  const [changeEmail, setChangeEmail] = useState('')
  // const ProvidersButtons = ({ providers }: any) => (
  //   <div className="d-flex flex-column w-100%">
  //     {providers &&
  //       Object.values(providers).map(
  //         (provider: any) =>
  //           provider.name !== "Credentials" && (
  //             <button
  //               key={provider.name}
  //               type="submit"
  //               onClick={() => {
  //                 signIn(provider.id, {
  //                   callbackUrl: `${process.env.AUTH0_BASE_URL}`,
  //                 });
  //               }}
  //             >
  //               <p>Sign in with {provider.name}</p>
  //             </button>
  //           )
  //       )}
  //   </div>
  // );

  const redirectToHome = () => {
    const { pathname } = Router;
    if (pathname === "/auth") {
      // TODO: redirect to a success register page
      Router.push("/");
    }
  };

  const registerUser = async () => {
    const res = await axios
      .post(
        "/api/register",
        { username, email, password, role: "user" },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then(async () => {
        await loginUser();
        redirectToHome();
      })
      .catch((error: any) => {
        setRegError(error.response.data.error)
      });
  };

  const loginUser = async () => {
    const res: any = await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
      callbackUrl: `${window.location.origin}`,
    });

    res.error ? setErrors(res.error) : redirectToHome()
  };

  const handleChangePassword = async () => {
    await changePassword(changeEmail)
  }

  const formSubmit = () => {
    authType === "Login" ? loginUser() : registerUser();
  };

  return (
    <>
      <div className="container d-flex h-auto justify-content-center custom-container" >
        <div className="form-container" style={{ background: "#9D9D9D" }}>
          <p className="title">{!forgot ? authType : 'Cambio de contraseña'}</p>

          {!forgot && <Formik
            initialValues={{
              username: username,
              email: email,
              password: password,
            }}
            validate={(valor) => {
              let errores: any = {
                username: '',
                email: '',
                password: ''
              };
              //validacion username
              if (!username) {
                errores.username = 'Ingresa un usuario valido'
              } else if (!/^[a-zA-ZÀ-ÿ\s]{8,20}$/.test(username)) {
                errores.username = 'El nombre solo puede contener letras y un minimo de 8 caracteres'
              }

              //validacion email
              if (!email) {
                errores.email = 'Ingrese un correo';
              } else if (!/^[a-z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
                errores.email = 'Correo incorrecto';
              }
              return errores;
            }}
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={(_, actions) => {
              formSubmit()
              setFormEnviado(true)
            }}
          >
            {/* { handleChange, handleBlur, errors, values, touched } */}
            {(props) => (
              <Form
                className="form"
                style={{ width: "100%" }}

              >

                <div className="d-flex flex-column w-100% margin-b-4 input-group">
                  {authType === "Register" && (

                    <Field
                      name="username">
                      {() => (
                        <>
                          <label htmlFor="username">Username:</label>
                          <input
                            value={username}
                            name='username'
                            onChange={(e) => {
                              setUsername(e.target.value)
                            }}
                            placeholder="Username"
                            type="text"
                            onBlur={props.handleBlur}
                          />
                          {props.touched.username && props.errors.username && <div className="error"
                            style={{ color: 'green' }}
                          >{props.errors.username}</div>}
                        </>
                      )}
                    </Field>
                  )}
                  <Field name="email">
                    {() => (
                      <>
                        <label htmlFor="email">Email</label>
                        <input
                          name='email'
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value)
                          }}
                          placeholder="Email Address"
                          type="email"
                          onBlur={props.handleBlur}
                          className={errors === 'Email is not registered' ? 'border' : ''}
                        />
                        {errors === 'Email is not registered'&& <div className="error"
                          style={{ color: 'red' }}
                        >{errors}</div>}
                        {RegError === 'Email already exists'&& <div className="error"
                          style={{ color: 'red' }}
                        >{RegError}</div>}
                      </>
                    )}
                  </Field>
                  <Field name="password">
                    {() => (
                      <>
                        <label className="mt-3" htmlFor="password">Password</label>
                        <input
                          name='password'
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value)
                          }}
                          type="password"
                          placeholder="Password"
                          onBlur={props.handleBlur}
                          required
                          className={errors === 'Password is incorrect' ? '' : ''}
                        />
                        {errors === 'Password is incorrect'&& <div className="error"
                          style={{ color: 'red' }}
                        >{errors}</div>}
                      </>
                    )}
                  </Field>
                  <button type="submit" className="btn-login-auth mt-3" onClick={formSubmit}>{authType}</button>
                  {/* <div className="forgot">
                    <button onClick={() => setForgot(!forgot)}>Forgot Password ?</button>
                  </div> */}
                  {formEnviado && <p
                    style={{ color: 'green' }}
                    className="exito">Usuario creado con Exito!</p>}
                </div>
              </Form>
            )}

          </Formik>}

          {!forgot && <p className="signup mt-4">
            {authType === "Login"
              ? "Don't have an account? "
              : "Already have an account? "}
            <a
              href="#"
              onClick={() => setAuthType(oppAuthType[authType])}
              className=""
            >
              {oppAuthType[authType]}
            </a>
          </p>}
        

          {forgot && 
          <div>
            <label htmlFor="change-for-email">Indique su correo</label>
            <input type="text" name="change-for-email" id='change-for-email' placeholder="Indique su email" value={changeEmail} onChange={(e) => {
              setChangeEmail(e.target.value)
            }}></input>
            <button onClick={handleChangePassword}>Enviar</button>
          </div>}
        </div>
      </div>

    </>
  )
}

{/* 
        <div className="d-flex flex-column justify-content-center  align-content-center">
          <h1 className="display-3">{authType}</h1>
          <p>
            {authType === "Login"
              ? "Not registered yet? "
              : "Already have an account? "}
            <button onClick={() => setAuthType(oppAuthType[authType])}>
              <p>{oppAuthType[authType]}</p>
            </button>
          </p>

          <ProvidersButtons providers={providers} />

          <Formik
            initialValues={{}} // { email: "", password: "" }
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={(_, actions) => {
              formSubmit(actions);
            }}
          >
            {(props) => (
              <Form className="form" style={{ width: "100%" }}>
                <div className="d-flex flex-column w-100% margin-b-4 input-group">
                  {authType === "Register" && (
                    <Field name="username">
                      {() => (
                        <>
                          <label htmlFor="username">Username:</label>
                          <input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                            type="text"
                          />
                        </>
                      )}
                    </Field>
                  )}
                  <Field name="email">
                    {() => (
                      <>
                        <label htmlFor="email">Email</label>
                        <input
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Email Address"
                          type="email"
                        />
                      </>
                    )}
                  </Field>
                  <Field name="password">
                    {() => (
                      <>
                        <label htmlFor="password">Password</label>
                        <input
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          type="password"
                          placeholder="Password"
                        />
                      </>
                    )}
                  </Field>
                  {/* <div className="forgot">
                    <a rel="noopener noreferrer" href="#">Forgot Password ?</a>
                  </div> */}
//   <button type="submit" className="btn-general mt-3">
//     {authType}
//   </button>
//     </div >
//     </Form >
//             )}
//           </Formik >
//         </div > * /}
//       </div >
//     </>
//   );
// };

export default Auth;

export async function getServerSideProps() {
  return {
    props: {
      providers: await getProviders(),
    },
  };
}