import { Repairs } from "./components/Repairs"
import { createRoot } from "react-dom/client"
import "./index.css"
import { BrowserRouter } from "react-router-dom"
import {TicketList} from "./components/tickets/TicketList"

const container = document.getElementById("root")
const root = createRoot(container)
root.render(
    <BrowserRouter>
        <Repairs />
        
    </BrowserRouter>
)



