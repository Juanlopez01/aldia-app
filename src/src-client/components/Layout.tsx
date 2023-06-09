import NavBar from "@client/components/Navbar/NavBar";
import Footer from "@/src-client/components/Footer";

export default function Layout({children}:{children:React.ReactNode}) {
  return (
    <main className="min-h-screen flex flex-col justify-between ">
      <div className="h-20">
      <NavBar />
      </div>
      {children}
      <Footer />
    </main>
  )
}
