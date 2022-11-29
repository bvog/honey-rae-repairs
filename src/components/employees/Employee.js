import { Link } from "react-router-dom"

export const Employee = ({ id, fullName, email }) => {
    return <section className="employee"> 
        <div>
            <Link to={`/employees/${id}`}>Name: {fullName}</Link>
        </div>
        <div>Email: {email}</div>
    </section>

}






//<Link to={`/employee/${id}`}>Name: {fullName}</Link>   This is creating the hyperlink so that an employee can click on the employee name and it will take them to the employee info.  That is why the Name: {fullName} is inside the Link and not in its own <div>.

//This page is creating one employee so that we can .map over it and create a list of all employees in the EmployeeList.js module.