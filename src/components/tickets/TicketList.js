//Imported these with Jess, don't think I need them.
import userEvent from "@testing-library/user-event"
import { useNavigate } from "react-router-dom"


//Copied and pasted from book:
import { useEffect, useState } from "react"
import "./Tickets.css"

export const TicketList = ({searchTermState}) => {
    const [tickets, setTickets] = useState([])//Establishing initial state.  Initially, tickets is an empty array.

    const [filteredTickets, setFiltered] = useState([])//Creating new array of tickets so do not manipulate original array set above.

    const [emergency, setEmergency] = useState(false)//getting array of tickets but setting to false so do not get only emergency tickets.

    const [openOnly, updateOpenOnly] = useState(false) //state used in customer button to see only open tickets.

    //Getting honey_user out of storage - honey_user was put into local storage during login process in Login.js
    const localHoneyUser = localStorage.getItem("honey_user")
    
    //Above a string, so now must convert string to JSON
    const honeyUserObject = JSON.parse(localHoneyUser)

    const navigate = useNavigate() //Must have this so navigation can happen in button in route<> below.  Imported from React Router DOM above.


    useEffect(
        () => {
            const searchedTickets = tickets.filter(ticket => {
                return ticket.description.toLowerCase().startsWith(searchTermState.toLowerCase())
            })
            setFiltered(searchedTickets)
        },
        [ searchTermState]
    )




    useEffect(
        () => {
            if (emergency) {
                const emergencyTickets = tickets.filter(ticket => ticket.emergency === true)
                setFiltered(emergencyTickets)
            }
            else {
                setFiltered(tickets)
            }
        },
        [emergency]
    )


    useEffect(//Observes when itial state is done, then requests data from API.
        () => {
            fetch(`http://localhost:8088/serviceTickets`)// View the initial state of tickets. "Go get all the tickets."
                .then(response => response.json())//"Go get the response back, parse the json and convert it back to an actual JavaScript array."
                .then((ticketArray) => { //ticketArray parameter captures all the data we got after the json process is done.
                    setTickets(ticketArray) //calling the setTickets function and passing what we want the new value to be which is our ticket array
                })
        },
        [] // When this array is empty, you are observing initial component state
    )

    //This useEffect is filtering tickets
    useEffect(
        () => {
            //console.log(honeyUserObject.staff)
            if (honeyUserObject.staff) {
                setFiltered(tickets) //Staff can see all tickets
            }
            else {
                //Customers can only see thier own tickets
                const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)                                                   
                setFiltered(myTickets)//Setting the state variable to new array that was just generated.

            }
        },
        [tickets]
    )

    useEffect(
        () => {
            if (openOnly) {
                const openTicketArray = tickets.filter(ticket => {
                    return ticket.userId === honeyUserObject.id && ticket.dateCompleted === ""
            })
                setFiltered(openTicketArray)
            }
            else {
                const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
                setFiltered(myTickets)
            }
        },
        
        [openOnly]
    )






    return <>
        {
            honeyUserObject.staff //Shows button if user is an employee  The question mark is the "if", the colon is the "else" in the if...else statement.
                ? <>
                    <button onClick={ () => { setEmergency(true)}} >Emergency Only</button> 
                    <button onClick={ () => { setEmergency(false)}} >Show All</button>
                </>
                : <>
                <button onClick={() => navigate("/ticket/create")}>Create Ticket</button> 
                <button onClick={() => updateOpenOnly(true)}>Open Tickets</button>
                <button onClick={() => updateOpenOnly(false)}>All My Tickets</button>
                </>
        }  
       
        <h2>List of Tickets</h2>
        <article className="tickets">
            {
                filteredTickets.map(
                    (ticket) => {
                        return <section className="ticket" key={`ticket--${ticket.id}`}>
                            <header>{ticket.description}</header>
                            <footer>Emergency: {ticket.emergency ? "Yes" : "No"}</footer>
                        </section>
                    }
                )
            }
        </article>
    </>
}