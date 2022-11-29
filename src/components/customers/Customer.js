import { Link } from "react-router-dom"



export const Customer = ({ customer }) => {
    return <section className="customer"> 
        <div>
            <Link to={`/customers/${customer.id}`}>Name: {customer?.user?.fullName}</Link> 
        </div>
        <div>Address: {customer.address}</div>
        <div>Phone Number: {customer.phoneNumber}</div>
    </section>

}




//<Link to={`/customer/${id}`}>Name: {fullName}</Link>   This is creating the hyperlink so that an employee can click on the customer name and it will take them to the customer info.  That is why the Name: {fullName} is inside the Link and not in its own <div>.

//This page is creating one customer so that we can .map over it and create a list of all customers in the CustomerList.js module.