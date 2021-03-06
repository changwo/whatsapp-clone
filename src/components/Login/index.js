import React, {useState} from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import db, {auth, FacebookProvider, GoogleProvider} from "../../firebase";
import {useStateValue} from "../../HOCs/StateProvider";
import {setUser} from "../../store/actions/loginActions";
import {useHistory} from "react-router";
import {createUserCollection} from "../../helperFunctions";
import GreenSpinner from "../spinners";

const Container = styled.div`
  background-color: #f8f8f8;
  height: 100vh;
  width: 100vw;
  display: grid;
  place-items: center;
`

const Content = styled.div`
  padding: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0 ,0,0,0.12), 0 1px;
  img {
    object-fit: contain;
    height: 100px;
    margin-bottom: 40px;
  }
`
const Buttons = styled.div`
  margin-top: 50px;
  display: flex;
  width: fit-content;
  flex-direction: column;
`
const SignInButton = styled(Button)`
  && {
    margin-bottom: 0.4rem;
    text-transform: inherit !important;
    background-color: ${({active}) => (active ? "#3b5998 !important" : "white !important")};
    color: ${({active}) => (active ? "white" : "black")};
    border: 1px solid ${({active}) => (active ? "#3b5998" : "black")};
  }
`
const LoadingText = styled.h1`
  margin-bottom: 10px;
`

const Login = () => {
    // eslint-disable-next-line no-empty-pattern
    const [{}, dispatch] = useStateValue()
    const {push} = useHistory()
    const [loading, setLoading] = useState(false)

    const signIn = (provider) => {
        setLoading(true)
        auth.signInWithPopup(provider).then(result => {
            const {user, additionalUserInfo: {isNewUser}} = result
            const userRef = db.collection('users').doc(user.uid)
            userRef.get()
                .then(docSnapshot => {
                    let userObj = user
                    if (!docSnapshot.exists || isNewUser) {
                        createUserCollection(user)
                    } else {
                        userRef.onSnapshot(snapshot => {
                            userObj = snapshot.data()
                        })
                    }
                    dispatch(setUser(userObj))
                    setLoading(false)
                    push("/rooms")
                })
        }).catch(error => alert(error.message))
    }


    return (
        <Container>
            <Content>
                {loading ?
                    <>
                        <LoadingText>Logging In</LoadingText>
                        <GreenSpinner/>
                    </> :
                    <>
                        <img alt="logo"
                             src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"/>
                        <div>
                            <h1>Sign in to WhatsApp</h1>
                        </div>
                        <Buttons>
                            <SignInButton type="submit" onClick={() => signIn(GoogleProvider)}>
                                Sign In With Google
                            </SignInButton>
                            <SignInButton type="submit" active="true" onClick={() => signIn(FacebookProvider)}>
                                Sign In With Facebook
                            </SignInButton>
                        </Buttons>
                    </>}
            </Content>
        </Container>
    )
}

export default Login