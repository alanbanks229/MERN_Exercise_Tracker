import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

// This allows us to add exercise to database
// For this we need a constructor
export default class EditExercise extends Component {

    constructor(props){
        super(props);

        //The below allows for this class to know what this will refer to
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        //initializing state
        this.state = {
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            users: []
        }
    }

    //React calls this right before anything displays on the page
    // So when this create exercise component is about load...
    componentDidMount() {

        // We another axios here for edit exercise because we also 
        // need to set the username 
        //Here we are getting the id from the URL
        //maybe debugger here and look at this.props.match.params.id lol
        // debugger
        axios.get('http://localhost:5000/exercises/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    username: response.data.username,
                    description: response.data.description,
                    duration: response.data.duration,
                    date: new Date(response.data.date)
                })
            })
            .catch( (error) => {console.log(error)})


        axios.get('http://localhost:5000/users/')
            .then(response => {
                console.log(response)
                if (response.data.length > 0) {
                    this.setState({
                        users: response.data.map( user => user.username ),
                        
                    })
                }
            })

    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
    }
    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        })
    }
    onChangeDuration(e) {
        this.setState({
            duration: e.target.value
        })
    }
    onChangeDate(date) {
        this.setState({
            date: date
        })
    }

    onSubmit(e) {
        //prevents default HTML submission reload
        console.log("we submitted")
        e.preventDefault();

        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }
        console.log(exercise);

        axios.post('http://localhost:5000/exercises/update/'+this.props.match.params.id, exercise)
            .then(res => res.json(res.data));

        // So we are taking the person back to homepage here
        // Which will be the list of exercises.
        window.location = '/';

    }

    render(){
        return(
            <div>
                <h3>Update Exercise Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        {/* Fancy stuff below, inside select box we have different options */}
                        <select ref="userInput"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}>
                            {
                                // for each user in array it will return an option
                                // with a key and value set to user
                                this.state.users.map( (user) => {
                                    return (
                                    <option key={user} value={user}> {user} </option>);
                                })
                            }
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                            />
                    </div>

                    <div className="form-group">
                        <label>Duration (in minutes): </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.duration}
                            onChange={this.onChangeDuration}
                            />
                    </div>

                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Update Exercise Log" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}