import {Component} from "react";
import axios from "axios";
import React from "react";
import QrReader from "react-qr-reader";
import Container from "@material-ui/core/Container/Container";
import Navbar from "../components/Navbar";
import TextField from "@material-ui/core/TextField/TextField";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            delay: 300,
            resolution: 1000,
            result: "No result",
            isDialogOpen: false,
            dialogContent: "",
        };

        this.textInput = React.createRef();
        this.handleScan = this.handleScan.bind(this);
        this.handleError = this.handleError.bind(this);
        this.openDialog = this.openDialog.bind(this);
        this.handleClose = this.handleClose.bind(this);
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

            axios.get(process.env.REACT_APP_BASE_URL + "/pengurus", {params: put_data})
                .then(res => {
                    // alert(res.data.message)
                    this.openDialog();
                    this.setState({
                        dialogContent: res.data.message
                    });
                    localStorage.setItem("nim", this.textInput.current.value);
                    localStorage.setItem("uniq_key", res.data.uniq_key);
                })
                .catch(error => {
                    // alert(error.response.data.message)
                    this.openDialog();
                    this.setState({
                        dialogContent: error.response.data.message
                    })
                });
        }
    }

    handleError(err) {
        console.error(err);
    }

    openDialog(){
        this.setState({
            isDialogOpen: true
        });
    }

    handleClose(){
        this.setState({
            isDialogOpen: false
        });
    }

    render() {


        return (
            <div className="App">

                <Navbar/>

                <Container maxWidth="sm" style={{marginTop: "30px"}}>

                    <QrReader
                        delay={this.state.delay}
                        resolution={this.state.resolution}
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

                    <Dialog
                        open={this.state.isDialogOpen}
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description">
                        {/*<DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>*/}
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description" style={{color: "#000"}}>
                                {this.state.dialogContent}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                OK
                            </Button>
                        </DialogActions>
                    </Dialog>

                </Container>

            </div>
        );
    }
}

export default Register;