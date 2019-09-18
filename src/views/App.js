import React, {Component} from "react";
import '../css/App.css';
import axios from 'axios';

import QrReader from "react-qr-reader";
import Navbar from "../components/Navbar.js"
import Container from "@material-ui/core/Container/Container";

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
            // this.setState({
            //     result: data
            // });

            const post_data = {
                api_key: process.env.REACT_APP_API_KEY,
                nim: localStorage.getItem("nim"),
                uniq_key: localStorage.getItem("uniq_key"),
                presensi_key: data,
                request_type: "post",
            };

            // presensi_key => "d5c91dca1d8baf439b0f12843443a6a12757fb6f"
            // localStorage.setItem("nim", "175150200111040");

            axios.post(""+process.env.REACT_APP_BASE_URL+"/presensi", post_data)
                .then(res => alert(res.data.message))
                .catch(error => alert(error.response.data.message));
        }
    }

    handleError(err) {
        console.error(err);
    }

    render() {

        return (
            <div className="App">

                <Navbar/>

                <Container maxWidth="sm" style={{marginTop: "30px"}}>
                    <QrReader
                        delay={this.state.delay}
                        onError={this.handleError}
                        onScan={this.handleScan}
                        style={{width: "100%"}}
                    />
                    <p>{this.presensi_key}</p>
                </Container>

            </div>
        );
    }
}

export default App;
