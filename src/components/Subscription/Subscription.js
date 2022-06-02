
import { useState, useEffect, useContext } from "react";
import TokenContext from "../../context/TokenContext";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Subscription() {
    const { token } = useContext(TokenContext);
    const [plans, setPlans] = useState();
    console.log(token)
    useEffect(() => {
        axios.get("https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships", token)
            .then((res) => {

                setPlans(res.data)
                console.log(res.data)
            }
            )
            .catch(err => console.log("subscription error", err))
    }, [])
    return (
        <>
            <Container>
                <h3>Escolha seu Plano</h3>

                {plans?.map((plan, index) =>
                    <Link key={index} to={`/subscriptions/${plan.id}`}>
                        <div>
                            <img src={plan.image} />
                            <h4>{plan.price}</h4>
                        </div>
                    </Link>
                )}
            </Container>
        </>
    )
}

const Container = styled.div`
text-align: center;
h3 {
    font-size: 32px;
    color: white;
}

div {
    border: 2px solid white;
    border-radius: 10px;
    margin: 10px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

img {
    margin: 30px 0;
}
h4 {
    font-size: 24px;
    color: white;
}
`