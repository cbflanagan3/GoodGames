import React, {Component} from 'react';
import jwt_decode from 'jwt-decode';
import {Link} from 'react-router-dom';

class Profile extends Component {
    constructor() {
        super()
        this.state = {
            firstName: '',
            lastName: '',
            image: '',
            username: '',
        }
    }
    componentDidMount() {
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        this.setState({
            firstName: decoded.firstName,
            lastName: decoded.lastName,
            image: decoded.image,
            username: decoded.username,
        })
    }
    render() {
        return (
            <div className="container">
            <div className="jumbotron mt-5">
              <div className="col-sm-8 mx-auto">
                <h1 className="text-center">PROFILE</h1>
              </div>
              <img className="text-center" src={this.state.image} />
              <table className="table col-md-6 mx-auto">
                <tbody>
                  <tr>
                    <td>First Name</td>
                    <td>{this.state.firstName}</td>
                  </tr>
                  <tr>
                    <td>Last Name</td>
                    <td>{this.state.lastName}</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>{this.state.username}</td>
                  </tr>
                </tbody>
              </table>
              <Link to="/favorites">My Favorite Games</Link>
            </div>
          </div>
        )
    }
}

export default Profile;