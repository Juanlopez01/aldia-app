import { useSearchParams } from "next/navigation"

export default function CheckEmail() {
  const query = useSearchParams()
  console.log(query.get('aaa'));

  return (
    <main className='grid place-content-center'>
<section>
    <h1 className='text-xl'>Revisa tu email</h1>
    <p>Te enviamos un email, revisa tu bandeja de entrada o tu carpeta de spam!</p>
</section>
    </main>
  )
}
