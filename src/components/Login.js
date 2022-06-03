import styled from 'styled-components';
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import axios from 'axios';
import TokenContext from '../context/TokenContext';
import MembershipContext from '../context/MembershipContext';
import PropagateLoader from "react-spinners/PropagateLoader";
import logo from "../assets/images/Driven_white 1.png"

export default function Login({setName}) {
    const { setToken } = useContext(TokenContext);
    const { setMembership } = useContext(MembershipContext)
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const localUser = localStorage.getItem("token");

    function login(event) {
        event.preventDefault();
        const body2 = {
            email: "fulno@email.com",
            password: "123"
        };
        const body = {
            email,
            password
        };
        setLoading(true);

        const promise = axios.post("https://mock-api.driven.com.br/api/v4/driven-plus/auth/login",
            body2);
        promise.then((res) => {
            setToken({
                headers: {
                    Authorization: `Bearer ${res.data.token}`
                }
            });
            setName(res.data.name);
            setMembership(res.data.membership);
            setLoading(false);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("membership", res.data);
            if (res.data.membership) {
                navigate("/home");
            } else {
                navigate("/subscriptions")
            }
        }
        )

        promise.catch(() => {
            setLoading(false);
            console.log("falha de login");
        }
        );
    }

    // if (localUser) {
    //     setToken({
    //         headers: {
    //             Authorization: `Bearer ${localUser}`
    //         }
    //     });
    //     navigate("/home");
    // }

    return (
        <>

            <Container>
                <img src={logo} alt="logo" />
                <input disabled={loading ? true : false} type="email" placeholder="e-mail" onChange={e => setEmail(e.target.value)}></input>
                <input disabled={loading ? true : false} type="password" placeholder="senha" onChange={e => setPassword(e.target.value)}></input>
                <button onClick={login}><PropagateLoader size={10} loading={loading} color="white" />{loading ? "" : "Entrar"}</button>
                <Link to="/register">
                    <p>Não tem uma conta? Cadastre-se!</p>

                </Link>
            </Container>
        </>
    )
}

const Container = styled.div`
    margin-top: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    img {
        margin-bottom: 100px;
    }
    p {
        color: white;
        font-style: normal;
        font-weight: 400;
        font-size: 13.976px;
    }
    button {
        background-color: #FF4791;
        height: 45px;
        width: 90%;
        border-width: 0;
        border-radius: 3px;
        color: #ffffff;
        margin: 0px 0px 10px 0px;
        padding: 0;
        font-size: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    input {
        height: 45px;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        width: 90%;
        margin: 3px;
    }
`