import {Component} from "react";
import axios from "axios";
import Button from "@material-ui/core/Button/Button";
import React from "react";
import QrReader from "react-qr-reader";
import Container from "@material-ui/core/Container/Container";
import Navbar from "../components/Navbar";
import TextField from "@material-ui/core/TextField/TextField";

class Register extends Component {

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

            const data = {
                api_key: process.env.REACT_APP_API_KEY,
                nim: 175150200111040,
                issue_key: this.state.result.data.issue_key,
            };

            axios.put(process.env.REACT_APP_BASE_URL + "/presensi_api/pengurus", data)
                .then(res => alert(res.data.message))
                .catch(error => alert(JSON.stringify(error.message)));
        }
    }

    handleError(err) {
        console.error(err);
    }

    render() {


        return (
            <div className="App">

                <Navbar/>

                <Container maxWidth="sm" style={{marginTop: "100px"}}>

                    <TextField
                        id="standard-name"
                        label="NIM"
                        fullWidth={true}
                        margin="normal"
                        inputRef={this.textInput}
                        style={{marginBottom: "50px"}}
                        // onChange={event => {
                        //     const { value } = event.target;
                        //     this.setState({ nimValue: value });
                        // }}
                    />

                    <QrReader
                        delay={this.state.delay}
                        onError={this.handleError}
                        onScan={this.handleScan}
                        style={{width: "100%"}}
                    />
                    <p>{this.state.result}</p>
                </Container>

            </div>
        );
    }
}

export default Register;