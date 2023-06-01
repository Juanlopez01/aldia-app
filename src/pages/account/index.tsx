import NavBar from "@/src-client/components/NavBar";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Container, Row, Image } from "react-bootstrap";
import LogoUser from "../../../assets/UserDefault.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faEnvelope,
	faPencil,
	faUser,
} from "@fortawesome/free-solid-svg-icons";
import { ButtonSolid } from "@/src-client/components/Styles/Button";
import { useSelector } from "react-redux";

const Account = () => {
	const { data: session } = useSession();

	const [inputs, setInputs] = useState({
    name: session?.user?.name,
    mail: session?.user?.email
  });
  const [edit, setEdit] = useState(true)

  const selector = useSelector(s=>s)
  const plan = selector?.PersonalReducer?.user?.status

  useEffect(()=>{
    if(session?.user?.name && session?.user?.email){
      setInputs({
        name: session?.user?.name,
        mail: session?.user?.email
      })
    }
  }, [session?.user])

  const handleChange = (e: any) => {
    console.log(e)
    setInputs({
      ...inputs,
      [e?.target?.name]: e?.target?.value
    })
  }

	return (
		<div className="min-h-[90vh] bg-darkest-blue w-100 d-flex justify-content-center align-items-center">
			<aside className="bg-violet-blue-profile hadow-2xl min-h-[60vh] w-10/12 md:w-8/12 lg:w-1/2 xl:w-1/3 2xl:w-3/12 mx-auto rounded-[10px]">
				{session && (
					<div className="w-full flex flex-col items-center pb-6">
						<div className="w-full flex flex-col items-center">
							<div
								className="bg-[#d6d4e4] bg-profile absolute h-[100px] md:h-[150px] w-10/12 md:w-8/12 lg:w-1/2 xl:w-1/3 2xl:w-3/12 mx-auto
              rounded-t-[10px]"
							></div>
							<Image
								src={session.user?.image ?? LogoUser.toString()}
								alt="img"
								className={`user-img rounded-circle border-4 border-black w-[150px] h-[150px] md:w-[200px] md:h-[200px] mt-4
                z-[1000000]`}
							></Image>
						</div>

						{/* data */}
						<div className="w-3/5 md:w-7/10">
							{/* user */}
							<div className="">
								<div
									className="text-main-yellow flex items-center
                justify-between w-full"
								>
									<div className="flex items-center gap-1 text-md">
										<FontAwesomeIcon icon={faUser} />
										<span className="ml-1">Usuario</span>
									</div>
									<div>
										<FontAwesomeIcon icon={faPencil} className="text-white" />
									</div>
								</div>
								<input type="text" className={`text-white mt-2 text-md bg-violet-blue-profile outline-0 outline-white py-1 pl-1 ${!edit ? "border-b-2 border-white" : "border-b-0"}`} maxLength={35}
                value={inputs?.name} name="name" onChange={(e)=>handleChange(e)} disabled={edit}/>
								<hr className="border-main-yellow border-2"></hr>
							</div>

							{/* email */}
							<div className="">
								<div
									className="text-main-yellow flex items-center
                justify-between w-full"
								>
									<div className="flex items-center gap-1 text-md">
										<FontAwesomeIcon icon={faEnvelope} />
										<span className="ml-1">Email</span>
									</div>
								</div>
								<input type="text" className={`text-white mt-2 text-md bg-violet-blue-profile outline-0 outline-white py-1 pl-1`} value={inputs?.mail} maxLength={35} disabled={edit}
                name="email" onChange={(e)=>handleChange(e)}/>
								<hr className="border-main-yellow border-2"></hr>
							</div>

							{/* plan actual */}
							<div className="">
								<div
									className="text-main-yellow flex items-center
                justify-between w-full"
								>
									<div className="flex items-center gap-1 text-md">
										<FontAwesomeIcon icon={faEnvelope} />
										<span className="ml-1">Estado de plan</span>
									</div>
								</div>
								<p className="text-white mt-2 text-md">
									{plan !== 'disabled'
										? "Activo"
										: "Inactivo"}
								</p>
								<hr className="border-main-yellow border-2"></hr>
							</div>
							<ButtonSolid classes="w-full my-2" 
              onClick={()=>setEdit(prev=>!prev)}>
								<FontAwesomeIcon icon={faPencil} />
								<span className="ml-1">{!edit ? "Sacar editado" : "Editar"}</span>
							</ButtonSolid>
						</div>
					</div>
				)}
			</aside>
			{/* <aside className="card bg-light w-50 h-75 p-4 border-dark d-flex align-items-center">
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

      </aside> */}
		</div>
	);
};

export default Account;

{
	/* <Container className="mt-4">
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
      </Container> */
}
