import React, { Component,useState } from 'react'

import {
    withStyles,
    makeStyles,
} from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import axios from "axios";



const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },

    margin: {
        margin: theme.spacing(1),
    },
    button: {
        margin: theme.spacing(1),
    },

}));

const ValidationTextField = withStyles({
    root: {
        '& input:valid + fieldset': {
            borderColor: 'green',
            borderWidth: 2,
        },
        '& input:invalid + fieldset': {
            borderColor: 'red',
            borderWidth: 2,
        },
        '& input:valid:focus + fieldset': {
            borderLeftWidth: 6,
            padding: '4px !important', // override inline-style
        },
    },
})(TextField);


export default function First() {
    const [open,setOpen] = useState(false);
    let history = useHistory();
   
    function code(e) {
        localStorage.setItem("code", e.target.value); 
    }

    function next() {
        var data={
            code:localStorage.getItem("code")
        }
        axios.post('http://localhost:4200/allcodes', data).then(res => {
            
            if (res.data == "true") {
                axios.post('http://localhost:4200/code', data).then(res2 => {
            
                }).catch(err => console.log(err));
                history.push('/id')
            }
            else{
               setOpen(true);

            }
            

        }).catch(err => console.log(err));

        
    }
    function checkk(){
        window.location.href = "./compare";
    }
    const classes = useStyles();

    return (
        <div className="first">


            <div className="container" >
                <div style={{ margin: "2%" }}>
                    <img src="vote-voting-online-e-voting-vector-30039866.jpg" width="20%" height="10%" />

                </div>
                <div>
                    <ValidationTextField
                        className={classes.margin}
                        label="Enter code"
                        required
                        variant="outlined"
                        id="validation-outlined-input"
                        onChange={code}
                    /><br /><br />
                    {open ? (<span style={{color:"red"}}> **invalid code</span>) : null}
                    <br />
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={next}
                    >
                        Vote 
                        </Button>
                        <br/><br/>
                        <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={checkk}
                    >
                        Check Results 
                        </Button>

                </div>

                <div >
                    <hr style={{ width: "20%",marginTop:"2%",marginBottom:"2%" }} />
                    <a href="/create" style={{textDecoration:"none"}}>
                        <Button style={{marginBottom:"2%"}} variant="contained" color="primary" >Create your own poll</Button>
                    </a>

                </div>
            </div>
        </div>
    )
}


// export default First

