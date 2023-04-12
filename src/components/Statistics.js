import React from "react";
import {getStatistic, getStatisticOnPage} from "../utils";
import {Button, message, Table} from "antd";

const columns = [
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



class Statistics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: props.loggedIn,
            statistics: [],
            page: 1,
            pageSize: 5,
        }
    }


    onStatisticsSelect = () => {
        getStatistic().then(
            (data) => {
                this.setState(
                    {
                        loggedIn: true,
                        statistics: data.data,
                    }
                )
            }
        ).catch((err) => {
            message.error(err.message);
        })
    }


    onPageSelect = (page) => {
        getStatisticOnPage(page).then(
            (data) => {
                this.setState(
                    {
                        statistics: data.data,
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
                <Button shape="round" onClick={this.onStatisticsSelect}>
                    Statistics
                </Button>

                <Table
                    dataSource={this.state.statistics}
                    columns={columns}
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


export default Statistics;