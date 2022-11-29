import { useEffect, useState } from "react"

export const EmployeeForm = () => {
    // TODO: Provide initial state for profile.  Initial state value (profile) is specialty: "", rate: 0, userId: 0
    const [profile, updateProfile] = useState({
        specialty: "",
        rate: 0,
        userId: 0
    })


    const [feedback, setFeedback] = useState("")
    useEffect(() => {
        if (feedback !== "") {
            // Clear feedback to make entire element disappear after 3 seconds
            setTimeout(() => setFeedback(""), 3000);
        }
        }, [feedback])

    const localHoneyUser = localStorage.getItem("honey_user") //Get item out of local storage so can use in fetch statement for userId.
    const honeyUserObject = JSON.parse(localHoneyUser) //Parse item into an object



    // TODO: Get employee profile info from API and update state
    useEffect(() => {
        fetch(`http://localhost:8088/employees?userId=${honeyUserObject.id}`)
            .then(response => response.json())
            .then((data) => { //This data is an array - the array only has one object in it, but can't use an array, so must get object out of array which happens below.
                const employeeObject = data[0]   //Getting object out of array
                updateProfile(employeeObject) //update state
            })

    }, [])



    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        /*
            TODO: Perform the PUT fetch() call here to update the profile.
            Navigate user to home page when done.
        */
        //The primary key of the object that is being replaced = profile.id
        fetch(`http://localhost:8088/employees/${profile.id}`, {  
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(profile) //stringify the state variable.  The body is the replacement - the body of the request
        }) 
            
            .then(() => {
                setFeedback("employee profile succesfully saved")
            })



    }

    return (
        <>
        <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
            {feedback}
        </div>
        
        <form className="profile">
            <h2 className="profile__title">New Service Ticket</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="specialty">Specialty:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={profile.specialty}
                        onChange={
                            (evt) => {
                                // TODO: Update specialty property
                                const copy = {...profile} //makes copy of property
                                copy.specialty = evt.target.value //modifies the copy
                                updateProfile(copy) //updates state w/ copy
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Hourly rate:</label>
                    <input type="number"
                        className="form-control"
                        value={profile.rate}
                        onChange={
                            (evt) => {
                                // TODO: Update rate property
                                const copy = {...profile} //makes copy of property
                                copy.rate = parseFloat(evt.target.value, 2) //modifies the copy - use parseFloat to change string to number, the 2 specifies how many decimal places you want number to have
                                updateProfile(copy) //updates state w/ copy
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Save Profile
            </button>
        </form>
        </>
    )
}