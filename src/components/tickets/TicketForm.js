import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const TicketForm = () => {
    /*
        TODO: Add the correct default properties to the
        initial state object
    */
    const [ticket, update] = useState({
        description: "", //These properties are updated when the form is filled out by the customer
        emergency: false

    })
    /*
        TODO: Use the useNavigation() hook so you can redirect
        the user to the ticket list
    */
    const navigate = useNavigate()
    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        // TODO: Create the object to be saved to the API
/* 
    "userId": 3,
    "description": "Vero est adipisci sed natus quasi consectetur occaecati. Modi maxime sunt officia cumque. Vel at culpa. Sint accusamus deserunt dolorem qui.",
    "emergency": true,
    "dateCompleted": ""
*/
        const ticketToSendToAPI = {
            userId: honeyUserObject.id,
            description: ticket.description,
            emergency: ticket.emergency,
            dateCompleted: ""
        }
        // TODO: Perform the fetch() to POST the object to the API

        return fetch('http://localhost:8088/serviceTickets', { //URL sending post(newly created object) to
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ticketToSendToAPI)
        }) 
            .then(respons => Response.json())
            .then(() => { //Directing user back to ticket list
                navigate("/tickets")
            })
    }

    return (
        <form className="ticketForm">
            <h2 className="ticketForm__title">New Service Ticket</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Brief description of problem"
                        value={ticket.description}
                        onChange={
                            (evt) => {
                                const copy = {...ticket} //Created copy of existing state.
                                copy.description =  evt.target.value//Modifying copy made in above line.  New value will be what is typed in form - whatever is currently in input field.
                                update(copy) //Passing copy to be the new state.
                            }

                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Emergency:</label>
                    <input type="checkbox"
                        value={ticket.emergency}
                        onChange={
                            (evt) => { //Capturing event as a perameter
                                const copy = {...ticket}
                                copy.emergency = evt.target.checked //Since using checkbox can't use "value", must capture the value of the checked which will return as true or false
                                update(copy) //Passing copy to be the new state.
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)} //To invoke the handleSaveButtonClick function must pass clickEvent - do this because event was passed to function above.
                className="btn btn-primary">
                Submit Ticket
            </button>
        </form>
    )
}