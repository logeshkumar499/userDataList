import React,{ useContext, useState } from 'react';
import { Link } from "react-router-dom";
import './UserTable.css';
import AuthContext from '../../store/auth-context';
import Model from '../Model/Model';

const UserTable = (props) => {
    const userCtx = useContext(AuthContext);
    // console.log(userCtx.userData)
    const [openModel, setOpenModel] = useState(false);

    const showModal = () => {
        setOpenModel(true);
      }
    
    const  closeModal=() => {
        setOpenModel(false);
      }

    return (
        <div className="container">
            <div className="userTable">
            <table className="table table-light table-striped table-hover">
                <thead>
                    <tr className="table-warning">
                        <th scope="col"></th>
                        <th scope="col">Login</th>
                        <th scope="col">Role</th>
                        <th scope="col">Status</th>
                        <th scope="col">Data</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {   userCtx.userData.map(data => (
                            <tr key={data.id}>
                            <th></th>
                            <th scope="row">{data.name}</th>
                            <td>{data.role}</td>
                            <td>{data.status}</td>
                            <td>{data.data}</td>
                            <td>
                                <Link to="/user/detail">
                                <button  onClick={() => userCtx.getUser(data.id)} type="button" className="btn btn-primary detailButton">
                                Details</button></Link>
                                
                                <button onClick={() => userCtx.deleteUser(data.id)} type="button" className="btn btn-success">Delete</button>
                            </td>
                        </tr>
                        ))  
                    }
                    
                </tbody>
            </table>
            </div>
            <div className="addUser">
                <button type="button" className="btn btn-warning " 
                onClick={showModal}>Add New User</button>
                {openModel && <Model closeModel={closeModal} type='add' />}
            </div>
        </div>
    )
}

export default UserTable
