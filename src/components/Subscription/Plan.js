import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import TokenContext from "../../context/TokenContext";
import MembershipContext from "../../context/MembershipContext";
import styled from "styled-components";
import arrow from "../../assets/images/Vector.png"

export default function Plan() {
    const { token } = useContext(TokenContext);
    const { setMembership } = useContext(MembershipContext);
    const { idPlan } = useParams();
    const navigate = useNavigate();
    const [plan, setPlan] = useState();
    const [cardName, setCardName] = useState();
    const [cardNumber, setCardNumber] = useState();
    const [securityNumber, setSecurityNumber] = useState();
    const [expirationDate, setExpirationDate] = useState();
    const [confirm, setConfirm] = useState(false);

    useEffect(() => {
        axios.get(`https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships/${idPlan}`, token)
            .then((res) => {
                setPlan(res.data);
            }
            )
            .catch(err => console.log("plan error", err))
    }, [])

    function postPlan(event) {
        event.preventDefault();
        const body2 = {
            membershipId: plan.id,
            cardName: "Fulano Da Silva",
            cardNumber: "1234 1234 1234 1234",
            securityNumber: 123,
            expirationDate: "01/28"
        }
        const body = {
            membershipId: plan.id,
            cardName,
            cardNumber,
            securityNumber,
            expirationDate
        }
        axios.post("https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions",
            body2, token)
            .then((res) => {
                setMembership(res.data.membership)
                navigate("/home");
            })
            .catch((err) => console.log(err))
    }

    return (
        <Container>

            {confirm ? <Confirm>
                <div>
                    <p>Tem certeza que deseja assinar o plano {plan?.name} (R$ {plan?.price})?</p>
                    <div>
                        <button onClick={() => setConfirm(false)}>Não</button>
                        <button onClick={postPlan}>Sim</button>
                    </div>
                </div>
                <ion-icon onClick={() => setConfirm(false)} size="large" name="close-circle"></ion-icon>
            </Confirm> : ""}

            <img onClick={() => navigate("/subscriptions")} src={arrow} alt="back" />
            <Flex>
                <img src={plan?.image} />
                <h3>{plan?.name}</h3>
            </Flex>
            <p>Benefícios:</p>
            {plan?.perks.map((perk, index) =>
                <div key={index}>
                    {perk.id}. {perk.title}
                </div>
            )}
            <p>Preço:</p>
            <span>R$ {plan?.price} cobrados mensalmente</span>
            <input placeholder="Nome impresso no cartão" onChange={e => setCardName(e.target.value)}></input>
            <input placeholder="Digitos do cartão" onChange={e => setCardNumber(e.target.value)}></input>
            <input placeholder="Código de segurança" onChange={e => setSecurityNumber(e.target.value)}></input>
            <input placeholder="Validade" onChange={e => setExpirationDate(e.target.value)}></input>
            <button onClick={() => setConfirm(true)}>Assinar</button>
        </Container>
    )
}

const Confirm = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0,0,0,0.6);
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    ion-icon {
        position: fixed;
        top: 25px;
        right: 25px;
    }
    div:nth-child(1) {
        flex-direction: column;
        padding: 20px;
        position: fixed;
        top: 200px;
        width: 80%;
        background-color: white;
        color: black;
        font-weight: 700;
        font-size: 18px;
        border-radius: 12px;
    }
    div {
        margin-top: 50px;
        display: flex;
        width: 100%;

        button:first-child {
            background-color: #CECECE;
        }
    }
`
const Container = styled.div`
    color: white;
    margin: 40px;
    div:first-child {

    }
    h3 {
        font-size: 32px;
    }
    input {
        width: 91%;
        height: 52px;
        margin: 5px;
        border-radius: 8px;
    }
    input:nth-last-child(2) {
        width: 43%;
    }
    input:nth-last-child(3) {
        width: 43%;
    }
    button {
        color: white;
        font-size: 14px;
        font-weight: 700;
        width: 91%;
        height: 52px;
        margin: 5px;
        background: #FF4791;
        border-radius: 8px;
        border-width: 0;
    }
`

const Flex = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

`