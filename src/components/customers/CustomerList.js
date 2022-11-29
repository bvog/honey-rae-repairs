import { useEffect, useState } from "react"
import { Customer } from "./Customer"
import "./customers.css"

export const CustomerList = () => {
    const [customers, setCustomers] = useState([])

    useEffect(
        () => {
            fetch ('http://localhost:8088/customers?_expand=user')
            .then(response => response.json())
            .then((customerArray) => {
                setCustomers(customerArray) //update state variable
            })
        },
        []
    )


    return <article className="customers">
        {
            customers.map(customer => <Customer key={`customer--${customer.id}`}
                customer={customer}/>)

        }
    
    </article>
}

//NOTE: on <section className="employee" MUST have react key because react is iterating over an array 
