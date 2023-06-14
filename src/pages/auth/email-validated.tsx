import Link from "next/link";

export default function EmailValidated() {
  return (
    <>
      <main className="grid place-content-center gap-4 text-center w-full h-full my-2">
        <section className="max-w-lg grid gap-2">
          <header className="grid gap-2">
            <h1 className="m-0 text-3xl font-semibold">!Te damos la bienvenida a ALDIA!</h1>
            <h3 className="m-0 text-xl">Tu cuenta fue validada correctamente</h3>
          </header>
          <p className="m-0">
            Ya puedes navegar por la aplicación y manejar tus finanzas de manera
            ágil y alcanzar tus metas financiearas, simplemente inicia sesión
            con el email que creaste
          </p>
        </section>
        <Link href="/auth">
          <button className="py-2 px-4 bg-medium-blue rounded text-white">
            Ingresar
          </button>
        </Link>
      </main>
    </>
  )
}
