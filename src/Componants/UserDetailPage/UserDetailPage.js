import React, { useContext, useState} from 'react';
import AuthContext from '../../store/auth-context';
import './UserDetailPage.css';
import { Link } from "react-router-dom";
import Model from '../Model/Model';

const UserDetail = () => {

  const { userData } = useContext(AuthContext);
  const { getId } = useContext(AuthContext);
  const [openModel, setOpenModel] = useState(false);

  const showModal = () => {
      setOpenModel(true);
    }
  
  const  closeModal=() => {
      setOpenModel(false);
    }
  
    return (
        <div className="container page">
        <div className="main-body">

              <nav aria-label="breadcrumb" className="main-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><Link to="/users/">User</Link></li>
                  <li className="breadcrumb-item active" aria-current="page">User Details</li>
                </ol>
              </nav>
              {userData.filter(user => user.id === getId).map(user => (
              <div className="row gutters-sm" key={user.id}>
                <div className="col-md-4 mb-3">
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex flex-column align-items-center text-center">
                        <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle" width="150" />
                        <div className="mt-3">
                          <h4>{user.name}</h4>
                          <p className="text-secondary mb-1">{user.role}</p>
                              <button className="btn btn-outline-primary" type="button"
                               onClick={showModal} >User Edit</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="card mb-3">

                    <div className="card-body">
                      <div className="row">
                        <div className="col-sm-5">
                          <h6 className="mb-0">User Name</h6>
                        </div>
                        <div className="col-sm-7 text-secondary">
                        {user.name}
                        </div>
                      </div>
                      <hr/>
                      <div className="row">
                        <div className="col-sm-5">
                          <h6 className="mb-0">Role</h6>
                        </div>
                        <div className="col-sm-7 text-secondary">
                          {user.role}
                        </div>
                      </div>
                      <hr/>
                      <div className="row">
                        <div className="col-sm-5">
                          <h6 className="mb-0">Status</h6>
                        </div>
                        <div className="col-sm-7 text-secondary">
                        {user.status}
                        </div>
                      </div>
                      <hr/>
                      <div className="row">
                        <div className="col-sm-5">
                          <h6 className="mb-0">Data</h6>
                        </div>
                        <div className="col-sm-7 text-secondary">
                        {user.data}
                        </div>
                      </div>
                      <hr/>
                      <div className="row">
                        <div className="col-sm-12"></div>
                      </div>
                    </div>    
                  </div>
    
                </div>
                {openModel && <Model closeModel={closeModal} type="edit" data={user} />}
              </div>
                ))}

               
            </div>
        
        </div>
    )
}

export default UserDetail
