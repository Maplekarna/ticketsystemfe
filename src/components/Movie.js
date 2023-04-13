import React from "react";
import {getMovieList, movieOnPage} from "../utils";
import {Button, message, Space, Table} from "antd";
import OrderButton from "./OrderButton";



class Movie extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            loggedIn: props.loggedIn,
            movieList: [],
            page: 1,
            pageSize: 4,
        }
    }

    columns = [
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
            title: 'ScheduleId',
            dataIndex: 'scheduleId',
            key: 'scheduleId',
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
            title: 'Version',
            dataIndex: 'version',
            key: 'version',
        },

        {
            title: 'Count',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <OrderButton showing_id={record.showing_id} remaining={record.remaining} price={record.price} updatMovie={this.onPageSelect} version={record.version} page={this.state.page} scheduleId={record.scheduleId}/>
                </Space>
            ),
        },

    ].filter(col => col.dataIndex !== 'version' );


    onMovieSelect = () => {
        getMovieList().then(
            (data) => {
                this.setState(
                    {
                        movieList: data.data,
                        page: 1,
                    }
                )
            }
        ).catch((err) => {
            message.error(err.message);
        })
    }

    onPageSelect = (page) => {
        movieOnPage(page).then(
            (data) => {
                this.setState(
                    {
                        movieList: data.data,
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

                <Table
                    dataSource={this.state.movieList}
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


export default Movie;