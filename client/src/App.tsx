import { Outlet, ReactLocation, Router } from "@tanstack/react-location"
import "./App.css"
import { routes } from "./app.routes"

function App() {
    const location = new ReactLocation()

    return (
        <div className="container">
            <Router location={location} routes={routes}>
                <Outlet />
            </Router>
        </div>
    )
}

export default App
