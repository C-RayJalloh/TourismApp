import Styles from "../CSSModules/Navbar.module.css"
import {  NavLink }  from "react-router-dom";
import Logo from "../components/Logo";



function Navbar() {
    return (
        <>
        
        <nav className={Styles.nav}>
        <Logo />
           
            <ul>
               
                <li>
                    <NavLink to="/pricing"  >Pricing</NavLink>
                </li>
                <li>
                    <NavLink to="/product"  >Product</NavLink>
                </li>
                <li>
                    <NavLink to="/login" className={Styles.ctaLink} >Login</NavLink>
                </li>
            </ul>
         
        </nav>
        </>
    );
}

export default Navbar
