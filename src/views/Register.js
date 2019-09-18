import {Component} from "react";
import axios from "axios";
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

        this.textInput = React.createRef();
        this.handleScan = this.handleScan.bind(this);

    }

    handleScan(data) {
        if (data) {
            // this.setState({
            //     result: data
            // });

            const put_data = {
                api_key: process.env.REACT_APP_API_KEY,
                nim: this.textInput.current.value,
                issue_key: data,
                request_type: "put"
            };

            axios.post(process.env.REACT_APP_BASE_URL + "/pengurus", put_data)
                .then(res => {
                    alert(res.data.message);
                    localStorage.setItem("nim", this.textInput.current.value);
                    localStorage.setItem("uniq_key", res.data.uniq_key);
                })
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
                    {/*<p>{this.state.result}</p>*/}

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
                </Container>

            </div>
        );
    }
}

export default Register;