import React, { useState } from 'react';

const AuthContext = React.createContext({
  userData:[],
  networkData:[],
  getId:'',
  isLoggedIn: false,
  showAlert: false,
  login: () => {},
  logout: () => {},
  
  addUser:()=>{},
  getUser:()=>{},
  updateUser:()=>{},
  deleteUser:()=>{},
  
  addNetwork:()=>{},
  updateNetwork:()=>{},
  deleteNetwork:()=>{}
});

export const AuthContextProvider = (props) => {
  
  const [ userData, setUserData ] = useState([
    { id:0, name: "logesh", role: "SuperAdmin", status: "active",password:"1234",data: "Json Data" }
])

  const [loginData, setLoginData] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const loginHandler = (name,password) => {

    for(var i=0;i<userData.length;i++) {
      let userName = userData[i].name;
      let userPassword = userData[i].password;
      
      if(name !== userName && password !== userPassword){
        setShowAlert(true);
        setLoginData(false);
      }
      
      if(name === userName && password === userPassword){
        setLoginData(true);
        setShowAlert(false);
      }
      
    }
  };

  const logoutHandler = () => {
    setLoginData(false);
  };

  const addUserData = (name, password, role, status, data) => {
    setUserData([...userData , {id:Math.floor(Math.random()*100), name, password, role,status, data}])
    console.log(userData);
  }

  const [getId, setGetId] = useState('');
  const getUserData = (id) => {
    setGetId(id)
  }
  
  const updateUserData = (id, updatedUser) => {
    setUserData(userData.map((userData) => userData.id === id ? updatedUser : userData))
  }

  const deleteUserData = (id) => {
    setUserData(userData.filter(userData => userData.id !== id))
  }

  //Network
  const [networkData , setNetworkData ] = useState([])

  const addNetworkData = (network, description) => {
    setNetworkData([...networkData , {id:Math.floor(Math.random()*100), network, description}])
  }
  const updateNetworkData = (id, updatedNetwork) => {
    setNetworkData(networkData.map((networkData) => networkData.id === id ? updatedNetwork : networkData))
  }
  
  const deleteNetworkData = (id) => {
    setNetworkData(networkData.filter(networkData => networkData.id !== id))
  }

  const contextValue = {
    userData : userData,
    getId:getId,
    showAlert:showAlert,
    networkData:networkData,
    isLoggedIn: loginData,
    login: loginHandler,
    logout: logoutHandler,
    
    addUser:addUserData,
    getUser:getUserData,
    updateUser:updateUserData,
    deleteUser:deleteUserData,
    
    addNetwork: addNetworkData,
    updateNetwork:updateNetworkData,
    deleteNetwork:deleteNetworkData
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;