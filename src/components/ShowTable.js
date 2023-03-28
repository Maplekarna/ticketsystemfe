import React from "react";
import {getMovieList, getOrderHistory, getStatistic} from "../utils";
import {Button, message, Table} from "antd";

let dataSource = [];

let columns = [];

const columns1 = [
    {
        title: 'Showing_id',
        dataIndex: 'showing_id',
        key: 'showing_id',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Time',
        dataIndex: 'time',
        key: 'time',
    },
    {
        title: 'Remaining',
        dataIndex: 'remaining',
        key: 'remaining',
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
    },
];

const columns2 = [
    {
        title: 'ShowingId',
        dataIndex: 'showingId',
        key: 'showingId',
    },
    {
        title: 'TicketsSold',
        dataIndex: 'ticketsSold',
        key: 'ticketsSold',
    },
    {
        title: 'Sales',
        dataIndex: 'sales',
        key: 'sales',
    },
];

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

class ShowTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: props.loggedIn,
            movieList: [],
            statistics: [],
            orderHistory: [],
        }
    }


    onMovieSelect = () => {
        getMovieList().then(
            (data) => {
                this.setState(
                    {
                        movieList: data,
                    }
                )
                dataSource = this.state.movieList;
                columns = columns1;
            }


        ).catch((err) => {
            message.error(err.message);
        })
    }

    onStatisticsSelect = () => {
        getStatistic().then(
            (data) => {
                this.setState(
                    {
                        statistics: data,
                    }
                )
                dataSource = this.state.statistics;
                columns = columns2;
            }
        ).catch((err) => {
            message.error(err.message);
        })
    }

    onOrderSelect = () => {
        getOrderHistory().then(
            (data) => {
                if (this.state.loggedIn) {
                    this.setState(
                        {
                            orderHistory: data,
                            loggedId: true,
                        }
                    )
                    dataSource = this.state.orderHistory;
                    columns = columns3;
                }
            }
        ).catch((err) => {
            message.error(err.message);
        })
    }


    render = () => {

        return (
            <>
                <Button shape="round" onClick={this.onMovieSelect}>
                    Movie List
                </Button>

                <Button shape="round" onClick={this.onStatisticsSelect}>
                    Statistics
                </Button>

                <Button shape="round" onClick={this.onOrderSelect}>
                    My Orders
                </Button>


                <Table dataSource={dataSource} columns={columns} />

            </>


        )
    }
}


export default ShowTable;