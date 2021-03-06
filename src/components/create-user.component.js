import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {

    constructor(props){
        super(props);

        //The below allows for this class to know what this will refer to
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        //initializing state
        this.state = {
            username: ''
        }
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
    }


    onSubmit(e) {
        //prevents default HTML submission reload
        e.preventDefault();

        const user = {
            username: this.state.username,
        }
        console.log(user);

        //this end point is expecting some kind of JSON body which is what we are sending!
        axios.post('http://localhost:5000/users/add', user)
            .then(res => console.log(res.data));

        this.setState({
            username: ''
        })

    }
    
    render(){
        return(
            <div>
                <h3> Create New User </h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                            />

                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}