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
            delay: 300,
            result: "No result"
        };

        this.handleScan = this.handleScan.bind(this);
        this.inputNim = React.createRef();
        this.textInput = React.createRef();
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


        // const [values, setValues] = React.useState({
        //     name: 'Cat in the Hat',
        //     age: '',
        //     multiline: 'Controlled',
        //     currency: 'EUR',
        // });

        console.log(`${process.env.REACT_APP_API_KEY} hello`);


        // const data = {
        //     api_key: process.env.REACT_APP_API_KEY,
        //     nim: 175150200111040,
        //     uniq_key: localStorage.getItem("uniq_key"),
        //     secret_key: "af"
        // };
        //
        // // this.state.result.data.secret_key
        //
        // axios.post("http://localhost/presensi_api/presensi", data)
        //     .then(res => alert(res.data.message))
        //     .catch(error => alert(JSON.stringify(error.message)));
        //
        // // this.refs.myField.getValue()

        const onClick = () => {
            alert("hello world " + this.textInput.current.value)
        };

        var buttonStyle = {
            marginBottom: "20px",
            marginTop: "20px"
        };


        return (
            <>

                <Navbar />

                <Container maxWidth="sm" style={{marginTop: "100px"}}>

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

                    {/*<input
                        type="text"
                        ref={this.textInput} />*/}

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={onClick}
                        style={buttonStyle}
                        fullWidth={true}>

                        Issue

                    </Button>

                    <div>
                        <QRCode value={"9ba656b73180a573667afa527b759213aa264f85"} size="100%" bgColor="#FFFFFF" level='H' includeMargin="true" renderAs="svg"/>
                    </div>

                </Container>

            </>
        );
    }
}

export default IssuePengurus;


