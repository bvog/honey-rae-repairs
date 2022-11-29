//Export function that returns an input field for Search.  Sharing state between two components.
export const TicketSearch = ({setterFunction}) => {
    return (
        <div>
            <input
                onChange={
                    (changeEvent) => {
                        setterFunction(changeEvent.target.value)
                    }
                } 
            type="text" placeholder="Enter search terms" />
        </div>


    )
}