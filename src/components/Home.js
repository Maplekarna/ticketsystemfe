import React, { Component } from 'react';
import {getMovieList} from "../utils";
import {message} from "antd";

class Tab extends Component {
    render() {
        return <div>{this.props.children}</div>;
    }
}

class MovieList extends Component {
    state = {
        movieList: [],
    }



    onMovieSelect = () => {
        getMovieList().then(
            (data) => {
                this.setState(
                    {
                        movieList: data,
                    }
                )
            },
        ).catch((err) => {
            message.error(err.message);
        })
    }
    render() {
        this.onMovieSelect();
        return (
            <h2>
                {
                    this.state.movieList.map((movie) => {
                        const {price, showingId, name, time, remaining} = movie
                        return (
                            <h1> {price}</h1>
                        )
                    })
                }
            </h2>
        )
    }
}

class OrderHistory extends Component {
    render() {
        return <h2>Order History</h2>;
    }
}

class Statistics extends Component {
    render() {
        return <h2>Statistics</h2>;
    }
}

class TabSwitcher extends Component {

    state = {
        activeTab: 'movieList',
    };

    handleTabClick(tab) {
        this.setState({ activeTab: tab });
    }

    render() {
        const { activeTab } = this.state;

        return (
            <div>
                <div>
                    <button onClick={() => this.handleTabClick('movieList')}>Movie List</button>
                    <button onClick={() => this.handleTabClick('orderHistory')}>Order History</button>
                    <button onClick={() => this.handleTabClick('statistics')}>Statistics</button>
                </div>
                {activeTab === 'movieList' && <Tab><MovieList /></Tab>}
                {activeTab === 'orderHistory' && <Tab><OrderHistory /></Tab>}
                {activeTab === 'statistics' && <Tab><Statistics /></Tab>}
            </div>
        );
    }
}

export default TabSwitcher;