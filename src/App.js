import React from 'react';
import {Button, Layout, message, Row, Col} from 'antd';
import Login from './components/Login';
import Register from './components/Register';
import {logout} from './utils';

import Movie from "./components/Movie";
import Order from "./components/Order";
import Statistics from "./components/Statistics";



const { Header } = Layout;


class App extends React.Component {
  state = {
    loggedIn: false
  }


  signinOnSuccess = () => {
      this.setState(
          {
              loggedIn: true,
          }
      )
  }

  signoutOnClick = () => {
    logout()
      .then(() => {
        this.setState({
            loggedIn : false
        });
        message.success(`Successfull signed out`);
      }).catch((err) => {
        message.error(err.message);
      })
  }


render = () => (
  <Layout>
    <Header>
      <Row justify="space-between">
        <Col>
          {
          this.state.loggedIn ?
          <Button shape="round" onClick={this.signoutOnClick}>
            Logout
          </Button> :
          (
            <>
            <Login onSuccess={this.signinOnSuccess} />
            <Register />
            
            </>
          )
        }
        </Col>
      </Row>
    </Header>

    <Layout>
      <Layout style={{ padding: '24px' }}>



          <Movie/>

          <Order loggedIn = {this.state.loggedIn}/>

          <Statistics/>


      </Layout>

    </Layout>
    
  </Layout>
)
}
export default App;