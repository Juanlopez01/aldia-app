import Sidenav from "@components/Sidenav/Sidenav"

export default function LayoutWithSideNav({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="flex flex-row">
      <Sidenav />
      {children}
    </main>
  )
}
    