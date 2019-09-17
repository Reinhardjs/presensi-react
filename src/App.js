import React, { Component } from "react";
import logo from './logo.svg';
import './App.css';

import QrReader from "react-qr-reader";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            delay: 300,
            result: "No result"
        };
        this.handleScan = this.handleScan.bind(this);
    }
    handleScan(data) {
        if (data) {
            this.setState({
                result: data
            });
        }
    }

    handleError(err) {
        console.error(err);
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">

                    <div>
                        <QrReader
                            delay={this.state.delay}
                            onError={this.handleError}
                            onScan={this.handleScan}
                            style={{ width: "500px" }}
                        />
                        <p>{this.state.result}</p>
                    </div>

                    {/*<img src={logo} className="App-logo" alt="logo"/>*/}
                    {/*<p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer">
                    Learn React
                </a>*/}
                </header>
            </div>
        );
    }
}

export default App;
