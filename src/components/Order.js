import React from "react";
import {getHistoryOnPage, getOrderHistory,} from "../utils";
import {Button, message, Table} from "antd";



class Order extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: props.loggedIn,
            orderHistory: [],
            page: 1,
            pageSize: 5,
        }
    }

    columns = [
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
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: 'Booking_time',
            dataIndex: 'booking_time',
            key: 'booking_time',
        },

    ];


    onOrderSelect = () => {
            getOrderHistory().then(
                (data) => {
                    this.setState(
                        {
                            orderHistory: data.data,
                            loggedId: true,
                        }

                    )

                }
            ).catch((err) => {
                message.error(err.message);
            })
    }

    onPageSelect = (page) => {
        getHistoryOnPage(page).then(
            (data) => {
                this.setState(
                    {
                        orderHistory: data.data,
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


                <Table
                    dataSource={this.state.orderHistory}
                    columns={this.columns}
                    pagination={{
                        pageSize: this.state.pageSize,
                        total: 50,
                        onChange: (page) => {
                            this.setState(
                                {
                                    page: page,
                                }
                            )

                            this.onPageSelect(page - 1)
                        }

                    }}
                />
            </>


        )
    }
}


export default Order;