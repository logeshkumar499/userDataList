import { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import AuthContext from './store/auth-context';
import Login from './Componants/Login/login';
import UserTable from './Componants/UserTable/UserTable';
import NetWorkTable from './Componants/NetworkTable/netWorkTable';
import Layout from './Componants/Header/Layout';
import UserDetail from './Componants/UserDetailPage/UserDetailPage';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <Layout>
      <Switch>
      {!authCtx.isLoggedIn && (
            <Route path="/login" exact>
              <Login />
            </Route>
          )}
          
           {authCtx.isLoggedIn && <Route path="/users">
              <UserTable />
            </Route>}
            
            {authCtx.isLoggedIn && <Route path="/user/detail">
              <UserDetail />
            </Route>}
          
          {authCtx.isLoggedIn && (
            <Route path="/networks">
              <NetWorkTable />
            </Route>
          )}
          {!authCtx.isLoggedIn && (
            <Route path="/">
              <Redirect to="/login" />
            </Route>
          )}
          {authCtx.isLoggedIn && (
            <Route path="/">
              <Redirect to="/users" />
            </Route>
          )}
      </Switch>
    </Layout>
  );
}

export default App;
