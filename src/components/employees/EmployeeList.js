import { useEffect, useState } from "react"
import { Employee } from "./Employee"
import "./employees.css"

export const EmployeeList = () => {
    const [employees, setEmployees] = useState([])

    useEffect(
        () => {
            fetch ('http://localhost:8088/users?isStaff=true')
            .then(response => response.json())
            .then((employeeArray) => {
                setEmployees(employeeArray) //update state variable
            })
        },
        []
    )


    return <article className="employees">
        {
            employees.map(employee => <Employee key={`employee--${employee.id}`}
                id={employee.id}
                fullName={employee.fullName}
                email={employee.email}/>)

        }
    
    </article>
}

//NOTE: on <section className="employee" MUST have react key because react is iterating over an array 