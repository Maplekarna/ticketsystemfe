import React from "react";
import {getMovieList, getOrderHistory, getStatistic} from "../utils";
import {Button, message, Space, Table} from "antd";
import OrderButton from "./OrderButton";

let columns = [
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
    {
        title: 'Count',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <OrderButton showing_id={record.showing_id} remaining={record.remaining} price={record.price}/>
            </Space>
        ),
    },
];

class Movie extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: props.loggedIn,
            movieList: [],

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

                <Table dataSource={this.state.movieList} columns={columns} />

            </>


        )
    }
}


export default Movie;