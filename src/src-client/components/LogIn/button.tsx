import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Image } from "react-bootstrap";
import Link from "next/link";

const LogButton = () => {
  const { data: session } = useSession();
  if (session && session.user) {
    return (
      <>
        <div className="d-flex justify-content-center bg-light rounded py-4 mb-1 h-50 w-100">
          <div className="row">
            <div className="col-md-4 m1">
              <div className="d-flex flex-column align-items-center justify-content-center">
                <div className="position-relative">
                  <Image
                    src={session.user.image!}
                    alt="User image" className=""
                    style={{ height: "50px", width: "50.92px" }}
                  />
                  <Link href="/account">
                    <Image
                      src="pencil-svgrepo-com.svg"
                      alt="User image"
                      className="position-absolute"
                      style={{ width: "19px", height: "19px", left: "35px", top: "31px", }}
                    />
                  </Link>
                </div>
              </div>
              <p className="text-center my-0" style={{ minHeight: "1px", fontSize: "10px" }}>Mi perfil</p>
            </div>
            <div className="col-md-8 d-flex flex-column justify-content-center">
              <p className="" style={{ fontSize: "12px" }} >Hola, {session?.user.name}!</p>
              <div className="d-flex justify-content-center flex-md-grow-1">
                <button
                  className="btn-general h-xxs-75 w-100 mb-xs-4 mb-4"
                  onClick={() => signOut()}
                >
                  <span className="text-light">Desconectarse</span>
                </button>
              </div>
            </div>
          </div>
        </div >
      </>

    );
  }

  return (
    <>
      <div className="d-flex justify-content-center bg-light rounded py-4 mb-1 h-75 w-100">
        <div className="row">
          <div className="col-md-4">
            <div className="d-flex flex-column align-items-center justify-content-center">
              <div className="position-relative">
                <Link href="/account">
                  <Image
                    src="UserDefault.png"
                    alt="User image"
                    style={{ height: "50px", width: "50.92px" }}
                    className=""
                  />
                </Link>
              </div>

            </div>
          </div>
          <div className="col-md-8 d-flex flex-column justify-content-center">
            <p className="" style={{ fontSize: "12px" }}>No registrado</p>
            <div className="d-flex justify-content-center flex-md-grow-1">
              <button
                className="btn-general h-xxs-75 w-100 mb-xs-4 mb-4"
                onClick={() => signIn('credentials')}
              >
                <span className="text-light">Iniciar sesión</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default LogButton;



{/* 
     <div className="divCard align-items-center" style={{ whiteSpace: 'nowrap' }}>
        <div className="d-flex align-items-center flip-vertical-right user-card">
          <Link href="/account">
            <Image
              width={45}
              height={45}
              src={session.user.image!}
              alt="User image"
            />
          </Link>

        </div>
        <div className="d-flex flex-column gap-4">

          <span className="text-light">¡Hola, {session?.user.name}!</span>

          <button className="btn-general mt-1" onClick={() => signOut()}>
            <span className=" text-light my-2">Sign out</span>
          </button>
        </div>

      </div> 
*/}


{/* 
  <div className="divCard" style={{ whiteSpace: 'nowrap' }}>
      <span className="ms-2 mx-3 text-light flip-vertical-right" >Not signed in</span>
      <div className="d-flex flip-vertical-right gap-2" >
        <button className="btn btn-general btn-Logaout" style={{ width: "calc(50% + 100px)" }} onClick={() => signIn()}>
          <span className="ms-2 mx-3 text-light flip-vertical-right">Sign in</span>
        </button>
      </div>
  </div> 
*/}

