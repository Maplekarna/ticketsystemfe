import React from "react";
import {getOrderHistory, } from "../utils";
import {Button, message, Table} from "antd";

const columns = [
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

class Order extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: props.loggedIn,
            orderHistory: [],
        }
    }


    onOrderSelect = () => {
            getOrderHistory().then(
                (data) => {
                    this.setState(
                        {
                            orderHistory: data,
                            loggedId: true,
                        }

                    )

                }
            ).catch((err) => {
                message.error(err.message);
            })



    }


    render = () => {
        return (
            <>
                <Button shape="round" onClick={this.onOrderSelect}>
                    My Orders
                </Button>


                <Table dataSource={this.state.orderHistory} columns={columns} />
            </>


        )
    }
}


export default Order;