import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Snackbar from '@material-ui/core/Snackbar';

export class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            vertical: "top",
            horizontal: "center",
            name: "",
            code: '',
            values:[]
        }
    }
     handleClose = () => {
        this.setState({
            open: false
        })
    }
    componentDidMount=()=>{
        axios.post('http://localhost:4200/get', this.state).then(res => {
           this.setState({
               values:res.data
           })
        })
        
    }
    create = e => {
        e.preventDefault();

        axios.post('http://localhost:4200/addCandidate', this.state).then(res => {
            this.setState({
                name: "",
            });
            if (res.data == '1') {
                this.setState({open: true,})
            }
            this.componentDidMount();
        }).catch(err => console.log(err));

        
    }

    codee = e => {
        e.preventDefault();
        this.setState({
            code: e.target.value
        })
    }

    Cname = e => {
        e.preventDefault();
        this.setState({
            name: e.target.value
        })
    }



    render() {

        return (
            <div>
            <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={this.state.open}
        onClose={this.handleClose}
        message="Added"
      />
                <div className="container" style={{ margin: "5%" }}>
                    <TextField required id="standard-required" label="Poll Code" onChange={this.codee} /><br /><br />
                    <TextField required id="standard-required" label="Candidates Name" value={this.state.name} onChange={this.Cname} />
                    <Fab size="small" color="secondary" aria-label="add" onClick={this.create}>
                        <AddIcon />
                    </Fab>
                    <br /><br />
                    <Table aria-label="simple table">
                        <TableBody>
                        {this.state.values.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell component="th" scope="row">
                                        {item.name}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <a href="/f" style={{ textDecoration: "none" }}>
                        <Button
                            variant="contained"
                            color="primary"
                        >
                            Done
                    </Button>
                    </a>
                </div>
            </div>
        )
    }
}

export default Register
