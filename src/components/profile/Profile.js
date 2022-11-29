import { CustomerForm } from "./CustomerForm"
import { EmployeeForm } from "./EmployeeForm"


export const Profile = () => {
    const localHoneyUser = localStorage.getItem("honey_user") //Get item out of local storage
    const honeyUserObject = JSON.parse(localHoneyUser) //Parse item into an object

    if (honeyUserObject.staff) {
        return <>
             <EmployeeForm/>
        </> 
    }
    else {
        return <CustomerForm/>
    }
    
}
