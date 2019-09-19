import {Component} from "react";
import React from "react";

import axios from "axios";

import Button from "@material-ui/core/Button/Button";
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Navbar from "../components/Navbar.js";
import QRCode from "qrcode.react";

class IssuePengurus extends Component {

    constructor(props) {
        super(props);

        this.state = {
            delay: 1000,
            result: "No result",
            showQrCode: null,
            issue_key: null
        };

        this.onClickIssue = this.onClickIssue.bind(this);
        this.onClickGetQR = this.onClickGetQR.bind(this);
        this.textInput = React.createRef();
    }

    onClickIssue(){

        // this.state.result.data.secret_key

        const put_data = {
            api_key: process.env.REACT_APP_API_KEY,
            password: this.textInput.current.value,
            secret_name: "issue_key",
            request_type: "put"
        };

        axios.get(process.env.REACT_APP_BASE_URL + `/secret`, {params: put_data})
            .then(res => {
                // alert(res.data.issue_key);

                this.setState({
                    showQrCode: true,
                    issue_key: res.data.issue_key
                });

                localStorage.setItem("password", this.textInput.current.value);
            })
            .catch(error => alert(error.response.data.message));

    }

    onClickGetQR(){

        const get_data = {
            api_key: process.env.REACT_APP_API_KEY,
            password: this.textInput.current.value,
            secret_name: "issue_key",
            request_type: "get",
        };

        axios.get(process.env.REACT_APP_BASE_URL + `/secret`, {params: get_data})
            .then(res => {

                // alert(res.data.issue_key);

                this.setState({
                    showQrCode: true,
                    issue_key: res.data.issue_key
                })
            })
            .catch(error => alert(error.response.data.message));

    }

    componentDidMount(){

        this.textInput.current.value = localStorage.getItem("password")

    }

    render() {

        const onClick = () => {
        };


        var buttonStyle = {
            marginBottom: "20px",
            marginTop: "20px"
        };


        return (
            <>

                <Navbar />

                <Container maxWidth="sm" style={{marginTop: "30px"}}>

                    <div>
                        {/*https://www.npmjs.com/package/qrcode.react*/}
                        {this.state.showQrCode? <QRCode value={this.state.issue_key} size="100%" bgColor="#FFFFFF" level='H' includeMargin="true" renderAs="svg"/> : null}
                    </div>


                    {/*https://stackoverflow.com/questions/51310609/unable-to-retrieve-the-input-field-of-material-ui-using-refs-in-react-js*/}
                    <TextField
                        id="standard-name"
                        label="PASSWORD"
                        fullWidth={true}
                        margin="normal"
                        type="password"
                        inputRef={this.textInput}
                        // onChange={event => {
                        //     const { value } = event.target;
                        //     this.setState({ nimValue: value });
                        // }}
                    />

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.onClickIssue}
                        style={buttonStyle}
                        fullWidth={true}>

                        GENERATE

                    </Button>

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.onClickGetQR}
                        style={buttonStyle}
                        fullWidth={true}>

                        GET QR

                    </Button>

                </Container>

            </>
        );
    }
}

export default IssuePengurus;


