import { CustomerNav } from "./CustomerNav"
import { EmployeeNav } from "./EmployeeNav"
import "./NavBar.css"

export const NavBar = () => {
    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    if (honeyUserObject.staff) {
        //Return employee views
        return <EmployeeNav />
    }
    else {
        //Return customer views
        return <CustomerNav />
    }
    
}



//<Link className="navber_link" etc.</> on lines 16-19 This is the hyperlink for the logout on the navbar.

//NOTE: to attribule is the URL that will support link to="/tickets"