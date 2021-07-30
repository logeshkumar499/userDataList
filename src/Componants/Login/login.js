import { useContext,useState, useEffect } from 'react';
import classes from './login.module.css';
import AuthContext from '../../store/auth-context';
import { useHistory } from 'react-router-dom';

const Login = () => {
    
    const history = useHistory();
    
    const authCtx = useContext(AuthContext);
    const {isLoggedIn ,showAlert} = useContext(AuthContext);
    const [show, setAlert] = useState(false);
    const [enteredName, setEnteredName] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');

    const [userError, setUserError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    useEffect(() => {
        if(isLoggedIn === false && showAlert === true){
          setAlert(true);
          setTimeout(()=> {
              setAlert(false);
          }, 5000)
      }
    }, [isLoggedIn])

    const nameChangeHandler = (event) => {
        event.preventDefault();
        setEnteredName(event.target.value);
        if(event.target.value === ''){
            setUserError(true)
        }else{
            setUserError(false)
        }
      };
    
      const passwordChangeHandler = (event) => {
        event.preventDefault();
        setEnteredPassword(event.target.value);
        if(event.target.value === ''){
            setPasswordError(true)
        }else{
            setPasswordError(false)
        }
      };
      
    const submitHandler=(event)=>{
        event.preventDefault();
        
        authCtx.login(enteredName,enteredPassword)
        history.replace('/users');
    }

    return (
        <div className={classes.center}>
            { show && <div class="alert alert-warning" role="alert">
                Password is not mathch!
            </div>}
            <h1>Login</h1>
            <form onSubmit={submitHandler} autocomplete="off">
                <div className={classes.txt_field}>
                    <input type='text' id='name' required value={enteredName} 
                        onChange={nameChangeHandler} />
                    <span></span>
                    <label>Username</label>
                    {userError && (
                    <p className={classes.error}>User Name is required</p>
                     )}
                </div>
                <div className={classes.txt_field}>
                    <input type="password" id='password' required value={enteredPassword}
                        onChange={passwordChangeHandler}/>
                    <span></span>
                    <label>Password</label>
                    {passwordError && (
                    <p className={classes.error}>Password field is required</p>
                     )}
                </div>
                <div className={classes.pass}></div>
                <button type="submit" onClick={authCtx.login(true)}>Login </button>
                <div className={classes.signup_link}>
                </div>
            </form>
        </div>
    )
}

export default Login
