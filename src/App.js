import { BrowserRouter, Route, Routes } from "react-router-dom";
import TokenContext from "./context/TokenContext";
import MembershipContext from "./context/MembershipContext";
import { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Subscription from "./components/Subscription/Subscription";
import Plan from "./components/Subscription/Plan";
import Home from "./components/Home";
import User from "./components/User";
import { createGlobalStyle } from "styled-components";
export default function App() {
    const [token, setToken] = useState()
    const tokenContext = { token, setToken };
    const [data, setMembership] = useState()
    const membershipContext = { data, setMembership };
    const [name, setName] = useState()

    return (
        <BrowserRouter>
            <MembershipContext.Provider value={membershipContext}>
                <TokenContext.Provider value={tokenContext}>
                    <GlobalStyle />
                        <Routes>
                            <Route path="/" element={<Login setName={setName}/>} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/subscriptions" element={<Subscription />} />
                            <Route path="/subscriptions/:idPlan" element={<Plan />} />
                            <Route path="/home" element={<Home name={name}/>} />
                            <Route path="/users/idUser" element={<User name={name}/>} />
                        </Routes>
                </TokenContext.Provider>
            </MembershipContext.Provider>
        </BrowserRouter>
    )
}

const GlobalStyle = createGlobalStyle`
    body {
        background-color: #0E0E13;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        box-sizing: border-box;
    }
`