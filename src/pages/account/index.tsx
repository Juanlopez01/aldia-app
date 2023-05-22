import NavBar from "@/src-client/components/NavBar";
import React from "react";
import { useSession } from "next-auth/react";
import { Container, Row, Image } from "react-bootstrap";
import LogoUser from "../../../assets/UserDefault.png";

const Account = () => {
  const { data: session } = useSession();

  return (
    <div className="bg-Blue w-100 d-flex justify-content-center align-items-center">
      <aside className="card bg-light w-50 h-75 p-4 border-dark d-flex align-items-center">
        <div className=" card-title">
          <h1>Cuenta</h1>
        </div>

        {session && (
          <div className="card-body flex-column align-items-center">
            <Image
              src={session.user?.image ?? LogoUser.toString()}
              alt="img"
              className="user-img rounded-circle mt-4"
            ></Image>
            <div className="d-flex flex-column align-content-start">
              <p className="mt-5">
                <strong>Usuario:</strong> {session.user?.name}
              </p>
              <p className="mt-4">
                <strong>Email:</strong> {session.user?.email}
              </p>
            </div>
          </div>
        )}
        <div className=" card-footer d-flex justify-content-center align-items-center border-0 w-100 bg-light">

          <button
            className="btn btn-warning btn-lg w-100"
            // href="#"
            role="button"
          >
            Editar
          </button>

        </div>

      </aside>

    </div>
  );
};

export default Account;


{/* <Container className="mt-4">
        <h1>Cuenta</h1>
        <Row>
          {session && (
            <div className="jumbotron">
              <h2 className="display-4">User information:</h2>
              <Image
                src={session.user?.image ?? LogoUser.toString()}
                alt="img"
                className="user-img rounded-circle"
              ></Image>
              <p className="lead mt-2">
                <strong>User:</strong> {session.user?.name}
              </p>
              <p className="lead">
                <strong>Email:</strong> {session.user?.email}
              </p>
              <hr className="my-4"></hr>
              <p className="lead">
                <a
                  className="btn btn-outline-warning btn-lg"
                  href="#"
                  role="button"
                >
                  Edit
                </a>
              </p>
            </div>
          )}
        </Row>
      </Container> */}
