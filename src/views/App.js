import React, {Component} from "react";
import '../css/App.css';
import axios from 'axios';

import QrReader from "react-qr-reader";
import Navbar from "../components/Navbar.js"
import Container from "@material-ui/core/Container/Container";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            delay: 200,
            resolution: 1000,
            result: "No result",
            isDialogOpen: false,
            dialogContent: "",
        };
        this.handleScan = this.handleScan.bind(this);
        this.handleError = this.handleError.bind(this);
        this.openDialog = this.openDialog.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleScan(data) {
        if (data && !this.state.isDialogOpen) {
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

            axios.get(process.env.REACT_APP_BASE_URL+"/presensi", {params: post_data})
                .then(res => {
                    // alert(res.data.message)
                    this.openDialog();
                    this.setState({
                        dialogContent: res.data.message
                    })
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
                    <p>{this.presensi_key}</p>

                    <Button variant="outlined" color="primary" onClick={this.openDialog}>
                        Open alert dialog
                    </Button>
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

export default App;
