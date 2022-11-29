import { CustomerViews } from "./CustomerViews"
import { EmployeeViews } from "./EmployeeViews"




export const ApplicationViews = () => {
	
    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    if (honeyUserObject.staff) {
        //Return employee views
        return <EmployeeViews />
    }
    else {
        //Return customer views
        return <CustomerViews />
    }
    
}


//<Route path="ticket/create" element={ <TicketForm /> } />  This is the navigation route for the customer button created in TicketList to create a new ticket.
//Updated this path to create parent-children of TicketSearch and TicketList.