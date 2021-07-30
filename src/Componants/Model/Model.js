import { useRef, useContext, useState } from 'react';
import AuthContext from '../../store/auth-context';
import { useHistory } from 'react-router-dom';
import "./Model.css";

const Modal= (props) => {
  
  const authCtx = useContext(AuthContext);
  const closeModel = props.closeModel;
    // const id = props.getId;
    
    const nameInputRef = useRef();
    const passwordInputRef = useRef();
    const confirmPasswordInputRef = useRef();
    const statusInputRef = useRef();
    const roleInputRef = useRef();
    const dataInputRef = useRef();
    const history = useHistory();
    
     // filter and a map - shorthand
    const genreList = authCtx.userData 
    .filter(user => user.id === id)
    .map((name)  => name);
  console.log(genreList[0].name);
  if(genreList[0].id){
    console.log("id is work");
  }

      //validation
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [dataError, setDataError] = useState(false);
     const[jsonCheck,setJsonCheck]=useState(false);
    const [confirmPasswordIncorrect, setConfirmPasswordIncorrect] = useState(false);
    
    function confirmPasswordHandler() {
        const confirmPassword = confirmPasswordInputRef.current.value;
        const password = passwordInputRef.current.value;
        if (password === confirmPassword) {
          setConfirmPasswordIncorrect(false);
        } else {
          setConfirmPasswordIncorrect(true);
        }
      }
      
      function JsonString(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }
    const jsonDataHandler =(event)=> {
        event.preventDefault();
        const checkJsonData = dataInputRef.current.value;
        setDataError(false);
        // const tempData=JsonString(checkJsonData);
        if(JsonString(checkJsonData)){
            setJsonCheck(false);
        }
        else{
            setJsonCheck(true);
        }
    
  }
    const submitHandler=(event)=>{
        event.preventDefault();
        const enteredName = nameInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        const enteredConfirmPassword = confirmPasswordInputRef.current.value;
        const enteredRole = roleInputRef.current.value;
        const enteredStatus = statusInputRef.current.value;
        const enteredData = dataInputRef.current.value;
        
        if (enteredName === "") {
            setUsernameError(true);
          }

          if (enteredPassword === "") {
            setPasswordError(true);
          }

          if (enteredConfirmPassword === "") {
            setConfirmPasswordError(true);
          }
          if (enteredData === "") {
            setDataError(true);
            return;
          }
          if(confirmPasswordIncorrect){
            return;
          }
          if(jsonCheck){
            return;
          } 
        authCtx.addUser(enteredName,enteredPassword ,enteredRole ,enteredStatus,enteredData)
        nameInputRef.current.value = "";
        passwordInputRef.current.value = "";
        confirmPasswordInputRef.current.value = "";
        roleInputRef.current.value = "";
        statusInputRef.current.value = "";
        dataInputRef.current.value = "";
        history.replace('/users');
        
    }

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <h3>Craete User</h3>
          <button onClick={closeModel}>X</button>
        </div>
        <div className="body">
          <form className="row g-3" onSubmit={submitHandler} autocomplete="off">
            <div className="col-md-6">
              <label>User Name</label>  
              <input type="text" className="form-control" 
                required ref={nameInputRef} placeholder="UserName" />
                {usernameError && (
              <p className="error">Username is required</p>
            )}
            </div>
            <div className="col-md-6">
            <label>Role</label>
            <select className="form-select" required ref={roleInputRef}>
                <option value="admin">Admin</option>
              <option value="client">Client</option>
              </select>
            </div>
            <div className="col-md-6">
              <label>Password</label>
              <input type="password" className="form-control" placeholder="Password" 
               required ref={passwordInputRef} />
               {passwordError && (
              <p className="error">Password is required</p>
            )}
            </div>
            <div className="col-md-6">
            <label>Confirm Password</label>
              <input type="password" className="form-control" placeholder="Confirm Password"
               required ref={confirmPasswordInputRef}  onChange={confirmPasswordHandler} />
               {confirmPasswordError && (
              <p className="error">Confirm password is required</p>
            )}
            {confirmPasswordIncorrect && (
              <p className="error">Confirm password is not same</p>
            )}
            </div>
            <div className="col-md-6">
            <label>Status</label>
            <select className="form-select"  required ref={statusInputRef}>
            <option value="active">Active</option>
              <option value="logout">Logout</option>
              <option value="disabled">Disabled</option>
              </select>
            </div>
            <div className="col-md-6">
              <label>Data</label>
              <textarea type="text"  required ref={dataInputRef} className="form-control" rows="1" 
              onChange={jsonDataHandler}/>
              {jsonCheck && <p className="error">It's not a Json Data</p>}
            {dataError && <p className="error">Data is required</p>}
            </div>
            <div className="footer">
          <button type="submit" className="btn btn-primary">Save</button>
          <button id="cancelBtn" onClick={closeModel}>
            Cancel
          </button>
        </div>
          </form>
        </div>
        
      </div>
    </div>
  );
}

export default Modal;
