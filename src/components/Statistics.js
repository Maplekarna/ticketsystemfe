import React from "react";
import {getStatistic} from "../utils";
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




    render = () => {

        return (
            <>
                <Button shape="round" onClick={this.onStatisticsSelect}>
                    Statistics
                </Button>

                <Table dataSource={this.state.statistics} columns={columns} />

            </>


        )
    }
}


export default Statistics;