import { useRouter } from "next/router";
import {useState, useRef, useContext} from 'react'
import AuthContext from '../../store/auth-context';
import classes from "./Form.module.css"


const Form = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null)  
  const emailInputRef = useRef()
  const passwordInputRef = useRef()
  const router = useRouter()

  const authctx = useContext(AuthContext)

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };


  const submitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true)
      
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    console.log(enteredEmail)

    const data = {
      email : enteredEmail,
      password : enteredPassword,
    }

    if (isLogin){
        const loginData = await authctx.login(data)
        const result = await loginData.json()
        setMessage(result.message)
        if (loginData.ok) {
          setIsLogin(true)
          localStorage.setItem("accessToken", JSON.stringify(result.data))
          router.replace('/home')
        }
        setIsLoading(false)
    }
    else{
      const signupData = await fetch("/api/signup",{
        method : "POST",
        headers: {
          "Content-Type":"application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await signupData.json();
      setMessage(res.message)
      if (signupData.ok) {
     
        router.replace('/')
      }
      setIsLoading(false)
      }
  };

  return (  
    <div>
      <h2 className={classes.message}>{message}</h2>
      <section className={classes.auth}>
        <h1>{isLogin ? 'Login':'SignUp' }</h1>
        <form onSubmit={submitHandler}>
            <div className={classes.control}>
                <label htmlFor="Email">Your Email</label>
                <input type="email" id="email" required ref={emailInputRef}/>
            </div>

            <div className={classes.control}>
              <label htmlFor="password">Your Password</label>
              <input type="password" id="password" required ref={passwordInputRef}/>
            </div>
            
            <div className={classes.actions}>
                {!isLoading && (
                                <button> {isLogin ?  'Login' : 'Create' } </button>
                )}
                {isLoading && <p>Sending Request...</p>}

            <button type="button" 
            className={classes.toggle}
            onClick={switchAuthModeHandler}

            >{ isLogin ? "Create new account" : "Login to existing account"}</button>
            </div>
        </form>
      </section>
    </div>
  )
}

export default Form
