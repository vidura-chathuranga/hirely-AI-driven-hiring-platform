import Navigation from "@/components/shared/Navigation"
import { Outlet } from "react-router-dom"

const RootLayout = () => {
  return (
    <main className="container">
        <Navigation/>
        <Outlet/>
    </main>
  )
}

export default RootLayout
