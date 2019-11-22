import React, {Component} from 'react';
const bcrypt = require('bcrypt')
export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {first_name: "", username: "", password: ""}
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleSubmit(event) {
        const state = this.state
        const storage = window.localStorage
        if(state.first_name == "" || state.username == "" || state.password == "") {
            alert("Some fields are empty. Please try again")            
        } else {
            storage.setItem("first_name", state.first_name)
            storage.setItem("username", state.username)
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(state.password, salt, function(err, hash) {
                    storage.setItem("password", hash)
                });
            });
            alert("Signed up successfully")
            this.props.history.push("/login")
            event.preventDefault();        
        }   
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>First name</label>
                    <input type="text" className="form-control" placeholder="First name" onChange = {(event) => this.setState({first_name: event.target.value})} />
                </div>                

                <div className="form-group">
                    <label>Username</label>
                    <input type="username" className="form-control" placeholder="Enter username"  onChange = {(event) => this.setState({username: event.target.value})} />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" onChange = {(event) => this.setState({password: event.target.value})} />
                </div>

                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>               
            </form>
        );
    }
}