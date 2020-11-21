import React, { useState, useEffect } from 'react'
import { Button } from 'antd';

function LandingPage(props) {

    const [IsCouple, setIsCouple] = useState(false)

    useEffect(() => {
        props.user.userData && setIsCouple(props.user.userData.IsCouple)
    }, [props.user])
    
    const isNotCoupleRender = () => {
        return (
            <div style={{
                display: 'flex', flexDirection: 'column', justifyContent: 'center',
                alignItems: 'center', margin: '3rem auto'
            }}>
                <div style={{ fontSize: '3rem' }}>
                    Welcome to Timetree
                </div>
                <br />
                Share your schedule and memory with your lover!
                <br />
                <Button href="/connect" style={{ marginTop: '2rem' }} type="primary">
                    Connect with your partner first!!
                    </Button>
            </div>
        )
    }

    const isCoupleRender = () => {
        return (
            <div style={{
                display: 'flex', flexDirection: 'column', justifyContent: 'center',
                alignItems: 'center', margin: '3rem auto'
            }}>
                <div style={{ fontSize: '3rem' }}>
                    Welcome to Timetree
                </div>
                <br />
                Share your schedule and memory with your lover!
            </div>
        )
    }

    return (
        <>
            <div>
                {IsCouple ? isCoupleRender() : isNotCoupleRender()}
            </div>
        </>
    )
}

export default LandingPage
