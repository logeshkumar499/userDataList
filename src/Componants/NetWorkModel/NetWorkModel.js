import { useContext, useState } from 'react';
import AuthContext from '../../store/auth-context';
import { useHistory } from 'react-router-dom';
import "./NetWorkModel.css";

const NetWorkModal= (props) => {
    const closeModel = props.closeModel;

    // const networkInputRef = useRef();
    // const descriptionInputRef = useRef();
    const [enteredNetwork, setNetwork] = useState('');
    const [enteredDescription, setDescription] = useState('');
    const history = useHistory();
  
    const authCtx = useContext(AuthContext);
    
      //validation
      const [networkError, setNetworkError] = useState(false);
      const [descriptionError, setDescriptionError] = useState(false);
      

      const networkChangeHandler = (event) => {
        event.preventDefault();
        setNetwork(event.target.value);
        if(event.target.value === ''){
            setNetworkError(true)
        }else{
            setNetworkError(false)
        }
      };
    
      const descriptionChangeHandler = (event) => {
        event.preventDefault();
        setDescription(event.target.value);
        if(event.target.value === ''){
            setDescriptionError(true)
        }else{
            setDescriptionError(false)
        }
      };

    const submitHandler=(event)=>{
        event.preventDefault();
        authCtx.addNetwork(enteredNetwork,enteredDescription)
        // networkInputRef.current.value = "";
        // descriptionInputRef.current.value = "";
        setNetwork('');
        setDescriptionError('');
        history.replace('/networks');
    }

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <h3>Create Network</h3>
          <button onClick={closeModel}>X</button>
        </div>
        <div className="body">
          <form className="row g-3" onSubmit={submitHandler}>
            <div className="col-md-12">
              <label>Network</label>  
              <input type="text" className="form-control" 
              value={enteredNetwork} onChange={networkChangeHandler}
                required  placeholder="Network" />
                {networkError && (
              <p className="error">Network is required</p>
            )}
            </div>
            <div className="col-md-12">
              <label>Description</label>
              <textarea type="Text" className="form-control" placeholder="Description" required
               value={enteredDescription} onChange={descriptionChangeHandler} row="5" />
               {descriptionError && (
              <p className="error">Description is required</p>
            )}
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

export default NetWorkModal;
