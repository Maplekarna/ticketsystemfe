import React from 'react';
import {Button, Layout, message, Row, Col, Menu, Table} from 'antd';
import Login from './components/Login';
import Register from './components/Register';
import {logout, getMovieList, getStatistic, getOrderHistory } from './utils';
import ShowTable from "./components/ShowTable";



const { Header, Content, Sider } = Layout;

let dataSource = [];
let columns = [];

const columns3 = [
    {
        title: 'Order_id',
        dataIndex: 'order_id',
        key: 'order_id',
    },
    {
        title: 'Movie_name',
        dataIndex: 'movie_name',
        key: 'movie_name',
    },
    {
        title: 'Showing_id',
        dataIndex: 'showing_id',
        key: 'showing_id',
    },
    {
        title: 'Nickname',
        dataIndex: 'nickname',
        key: 'nickname',
    },
    {
        title: 'Count',
        dataIndex: 'count',
        key: 'count',
    },
    {
        title: 'Booking_time',
        dataIndex: 'booking_time',
        key: 'booking_time',
    },

];

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



    onOrderSelect = () => {
        getOrderHistory().then(
            (data) => {
                this.setState(
                    {
                        orderHistory: data,
                    }
                )
                dataSource = this.state.orderHistory;
                columns = columns3;
            }
        ).catch((err) => {
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
          <ShowTable
            loggedIn = {this.state.loggedIn}
          />

          <Button shape="round" onClick={this.onOrderSelect}>
            My Orders
          </Button>


        <Table dataSource={dataSource} columns={columns} />

      </Layout>

    </Layout>
    
  </Layout>
)
}
export default App;