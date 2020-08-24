import React, { useState, useEffect } from 'react';
import { Switch, RouteComponentProps, Redirect, Route } from 'react-router-dom';
import './assets/fonts/fonts.css';
import { Layout } from './components/UI/Layout/Layout';
import { Tag } from './containers/Tag/Tag';
import { TagPage } from './components/pages/TagPage/TagPage';
import { Registration } from './containers/Auth/Registration/Registration';
import { ConfirmOTP } from './containers/Auth/ConfirmOTP/ConfirmOTP';
import { Login } from './containers/Auth/Login/Login';
import { ResetPasswordPhone } from './containers/Auth/ResetPassword/ResetPasswordPhone';
import { ResetPasswordConfirmOTP } from './containers/Auth/ResetPassword/ResetPasswordConfirmOTP';
import { StaffManagementList } from './containers/StaffManagement/StaffManagementList/StaffManagementList';
import { StaffManagement } from './containers/StaffManagement/StaffManagement';
import { SpeedSendPage } from './components/pages/Template/SpeedSendPage/SpeedSendPage';
import { SpeedSend } from './containers/Template/Form/SpeedSend/SpeedSend';
import { HSMPage } from './components/pages/Template/HSMPage/HSMPage';
import { HSM } from './containers/Template/Form/HSM/HSM';
import { Chat } from './containers/Chat/Chat';
import styles from './App.module.css';
import gqlClient from './config/apolloclient';
import { ApolloProvider } from '@apollo/client';
import { SessionContext } from './context/session';
import { AutomationList } from './containers/Automation/AutomationList/AutomationList';
import { Automation } from './containers/Automation/Automation';
import { FlowEditor } from './components/floweditor/FlowEditor';
import { ErrorHandler } from './containers/ErrorHandler/ErrorHandler';
import { CollectionList } from './containers/Collection/CollectionList/CollectionList';
import { Collection } from './containers/Collection/Collection';
import { GroupList } from './containers/Group/GroupList/GroupList';
import { Group } from './containers/Group/Group';
import { LogoutService, checkAuthStatusService } from './services/AuthService';

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    setAuthenticated(checkAuthStatusService());
  }, []);

  const values = {
    authenticated: authenticated,
    setAuthenticated: (value: any) => {
      setAuthenticated(value);
    },
  };

  const defaultRedirect = () => <Redirect to="/chat" />;
  let routes;

  if (authenticated) {
    routes = (
      <div className={styles.App}>
        <Layout>
          <Switch>
            <Route path="/tag" exact component={TagPage} />
            <Route path="/tag/add" exact component={Tag} />
            <Route path="/tag/:id/edit" exact component={Tag} />
            <Route path="/speed-send" exact component={SpeedSendPage} />
            <Route path="/speed-send/add" exact component={SpeedSend} />
            <Route path="/speed-send/:id/edit" exact component={SpeedSend} />
            <Route path="/automation" exact component={AutomationList} />
            <Route path="/automation/add" exact component={Automation} />
            <Route path="/automation/:id/edit" exact component={Automation} />
            <Route path="/group" exact component={GroupList} />
            <Route path="/group/add" exact component={Group} />
            <Route path="/group/:id/edit" exact component={Group} />

            <Route path="/automation/configure/:uuid" exact component={FlowEditor} />

            <Route path="/collection" exact component={CollectionList} />
            <Route path="/collection/add" exact component={Collection} />
            <Route path="/collection/:id/edit" exact component={Collection} />

            <Route path="/chat" exact component={Chat} />
            <Route path="/staff-management" exact component={StaffManagementList} />
            <Route path="/staff-management/:id/edit" exact component={StaffManagement} />

            <Route path="/template" exact component={HSMPage} />
            <Route path="/template/add" exact component={HSM} />
            <Route path="/template/:id/edit" exact component={HSM} />

            <Route path="/logout" exact component={LogoutService} />

            <Route
              exact
              path="/chat/:contactId"
              component={({ match }: RouteComponentProps<{ contactId: any }>) => (
                <Chat contactId={match.params.contactId} />
              )}
            />
            <Route path="/" render={defaultRedirect} />
          </Switch>
        </Layout>
      </div>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/registration" exact component={Registration} />
        <Route path="/confirmotp" exact component={ConfirmOTP} />
        <Route path="/resetpassword-phone" exact component={ResetPasswordPhone} />
        <Route path="/resetpassword-confirmotp" exact component={ResetPasswordConfirmOTP} />
        <Route path="/" render={() => <Redirect to="/login" />} />
      </Switch>
    );
  }

  return (
    <SessionContext.Provider value={values}>
      <ApolloProvider client={gqlClient()}>
        <ErrorHandler />
        {routes}
      </ApolloProvider>
    </SessionContext.Provider>
  );
};

export default App;
