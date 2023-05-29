import Link from "next/link";

export default function EmailValidated() {
  return (
    <>
        <div className="grid place-content-center gap-4 text-center w-100">
          <div className="max-w-sm">
            <h1 className="text-xl">
              Tu Email fue validado correctamente
            </h1>
            <p className="">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque porro repellendus quaerat sint eligendi suscipit esse commodi dolorem dolorum! Voluptatum quidem iure unde numquam impedit aut minus laboriosam dicta labore!
            </p>
          </div>
            <Link href="/auth" >
             <button className='p-4 bg-blue-600 rounded text-black' >Ingresar</button>
            </Link>
        </div>

    </>
  )
}
