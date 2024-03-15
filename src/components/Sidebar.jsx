
import { Outlet } from "react-router-dom"
import Styles from "../components/Sidebar.module.css"
import Logo from "./Logo"
import AppNav from "../pages/AppNav"



function Sidebar() {
    return (
        <div className={Styles.sidebar}>
            <Logo />
           <AppNav />
           {/** an outlet element to display the nested routes components */}
           <Outlet />
            <footer className={Styles.footer}>
                <p className={Styles.copyright}>&copy; Copyright {new Date().getFullYear()} by Ray Jahrulo</p></footer>
        </div>
    )
}

export default Sidebar
