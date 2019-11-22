import React, { Component } from "react";
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
const bcrypt = require('bcrypt')
export default class Login extends Component {    
    constructor(props) {
        super(props);
        this.state = {username: "", password: ""}
        this.handleSumbit = this.handleSumbit.bind(this)
    }
    handleSumbit(event) {
        const props = this.props
        if(this.state.username == localStorage.getItem("username")) {
            bcrypt.compare(this.state.password, localStorage.getItem("password"), function(err, res) {
                if(res) {
                    props.history.push('/file-manager')                    
                } else {
                    alert("Incorrect password. Please try again")
                }
            });
        } else {
            alert("The username you entered does not exist")
        }
        event.preventDefault()
    }
    render() {       
        return (
            <form onSubmit={this.handleSumbit}>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Username</label>
                    <input type="username" className="form-control" placeholder="Enter username" onChange={(event) => this.setState({username: event.target.value})} />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" onChange={(event) => this.setState({password: event.target.value})} />
                </div>              

                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                <br/>                           
                <Link to="/signup">Sign Up</Link>                           
            </form>
        );
    }
}
