import React,{ useContext, useState } from 'react';
import './networkTable.css';
import AuthContext from '../../store/auth-context';
import NetWorkModel from '../NetWorkModel/NetWorkModel';

const NetWorkTable = () => {
    const userCtx = useContext(AuthContext);
    // console.log(userCtx.networkData)
    const [openModel, setOpenModel] = useState(false);
    
    const showModal = () => {
        setOpenModel(true);
      }
    
    const  closeModal=() => {
        setOpenModel(false);
      }
    return (
        <div className="container">
            <div className="netWorkTable">
            <table className="table table-light table-striped table-hover">
                <thead>
                    <tr className="table-warning">
                        <th scope="col"></th>
                        <th scope="col">Network</th>
                        <th scope="col">Description</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {  userCtx.networkData.length !== 0 && userCtx.networkData.map(data => (
                        <tr key={data.id} >
                            <td></td>
                            <td>{data.network}</td>
                            <td>{data.description}</td>
                            <td>
                                <button type="button" className="btn btn-primary detailButton" onClick={showModal}>Edit</button>
                                <button onClick={() => userCtx.deleteNetwork(data.id)} 
                                    type="button" className="btn btn-success">Delete</button>
                            </td>
                        </tr>
                        ))  
                    }
                    {  userCtx.networkData.length === 0 && 
                        <tr>
                            <td className="text-center" colspan="4">No Network Data</td>
                        </tr>
                        
                    }
                </tbody>
            </table>
            </div>
            <div className="network">
                <button type="button" className="btn btn-warning networkButton" 
                onClick={showModal}>Add New Network</button>
            </div>
            
            {openModel && <NetWorkModel closeModel={closeModal} />}
        </div>
    )
}

export default NetWorkTable
