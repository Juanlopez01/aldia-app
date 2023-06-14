import NavBar from "@client/components/Navbar/NavBar";
import Footer from "@/src-client/components/Footer";
import Head from "next/head";
import { useRouter } from "next/router";
import { ThemeProvider } from 'next-themes'

export default function Layout({ children }: { children: React.ReactNode }) {
	const { pathname } = useRouter();
	const flag = pathname !== "/auth";
	return (
		<ThemeProvider enableSystem={true} attribute="class">
			<main className="min-h-screen flex flex-col">
				<Head>
					<title>AlDia App</title>
				</Head>
				{flag && <NavBar />}
				{children}
				{flag && <Footer />}
			</main>
		</ThemeProvider>
	);
}
