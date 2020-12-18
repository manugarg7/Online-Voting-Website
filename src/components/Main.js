import React from 'react'
import Button from '@material-ui/core/Button';

export default function Main() {
    return (
        <div>
            
            <h1>Welcome, give vote to your favorite candidate</h1>
      <img src="E-voting-696x464.jpg"></img>
      <br /><br />
      <Button
        variant="contained"
        color="primary" href="/f">
        Let's Begin
      </Button>
        </div>
    )
}
