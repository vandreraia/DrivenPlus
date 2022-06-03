import axios from "axios";
import { useContext } from "react"
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import MembershipContext from "../context/MembershipContext"
import TokenContext from "../context/TokenContext";

export default function Home({ name }) {
    const navigate = useNavigate();
    const { token } = useContext(TokenContext);
    const { data } = useContext(MembershipContext)
    const { image, perks } = data;

    function cancelMembership(event) {
        // event.preventDefault();
        axios.delete("https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions", token)
            .then(() => navigate("/subscriptions"))
            .catch((err) => console.log(err))
    }
    return (
        <Container>
            <Top>
                <img src={image} />
                <ion-icon size="large" name="person-circle"></ion-icon>
            </Top>
            <h2>Olá, {name}</h2>
            {perks?.map((perk, index) =>
                <a href={perk.link} target="_blank"><Button key={index} onclick >{perk.title}</Button></a>
            )}
            <Button2 onClick={() => navigate("/subscriptions")}>Mudar plano</Button2>
            <Button3 onClick={() => cancelMembership()}>Cancelar plano</Button3>
        </Container>
    )
}

const Button = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 14px;
    font-weight: 700;
    width: 91%;
    height: 52px;
    margin: 5px;
    background-color: #FF4791;
    border-radius: 8px;
    border-width: 0;
`

const Button2 = styled.div`
position: absolute;
bottom: 80px;
left: 30px;
width: 80%;
display: flex;
justify-content: center;
align-items: center;
color: white;
font-size: 14px;
font-weight: 700;
height: 52px;
margin: 5px;
background-color: #FF4791;
border-radius: 8px;
border-width: 0;
`
const Button3 = styled.div`
position: absolute;
bottom: 20px;
left: 30px;
background-color: red;
width: 80%;
display: flex;
justify-content: center;
align-items: center;
color: white;
font-size: 14px;
font-weight: 700;
height: 52px;
margin: 5px;
border-radius: 8px;
border-width: 0;
`


const Container = styled.div`
    padding: 20px;
    color: white;
    text-align: center;
    
    div {
    }
    
    button:last-child {
    }

    button:nth-last-child(2) {
    }
    a {
        color: white;
        text-decoration: none;
    }
`

const Top = styled.div`
    height: 50px;
    display: flex;
    background-color: #0E0E13 !important;
    justify-content: space-between !important;
    align-items: initial !important;
`