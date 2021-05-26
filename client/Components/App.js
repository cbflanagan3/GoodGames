import React, {Component, useEffect, useState, useReducer} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import igdb from 'igdb-api-node';
const client = igdb('130d015e5a9bdf6428cbb1de58b9c4fa');
import Nav from './Nav';
import Search from './Search';
import Login from './Login';
import Profile from './Profile';
import Recommendations from './Recommendations';
import Register from './Register';
import Games from './Games';
import GamePage from './GamePage';
import store, {fetchGames} from '../store/actions'
import axios from 'axios';
import gameReducer from '../store/gameReducer';
// const fetchGames = async(req, res) {
// const response = await igdb()
//     .fields(['name', 'movies', 'age']) // fetches only the name, movies, and age fields
//     .fields('name,movies,age') // same as above
 
//     .limit(50) // limit to 50 results
//     .offset(10) // offset results by 10
 
//     .sort('name') // default sort direction is 'asc' (ascending)
//     .sort('name', 'desc') // sorts by name, descending
//     .search('mario') // search for a specific name (search implementations can vary)
 
//     .where(`first_release_date > ${new Date().getTime() / 1000}`) // filter the results
 
//     .request('/games'); // execute the query and return a response object
 
// console.log(response.data);

// class App extends Component {

const App = (props) => {

// const [loading, setLoading] = useState(true);
// const [games, setGames] = useState([]);
// const [errorMessage, setErrorMessage] = useState(null);

//     useEffect(() => {
//         fetch("http://localhost:3000/api/games")
//         .then(res => res.text())
//         console.log(res)
//         .then(res => {
//             setGames(res.Search)
//             setLoading(false)
//         })
// }, []);
useEffect(() => {
    console.log(props)
    props.fetchGames();
}, []);

// const search = searchValue => {
//     setLoading(true);
//     setErrorMessage(null)
// }

// fetch(`http://localhost:3000/api/games/?=${searchValue}`)
//         .then(res => res.text())
//         console.log(res)
//         .then(res => {
//             if(res === 'true') {
//             setGames(res.Search)
//             setLoading(false)
//             } else {
//                 setErrorMessage(res.Error)
//                 setLoading(false)
//             }
//         })
    // this.getGames = (querySettings) => {
    //     client.games(querySettings).then(response => {
    //       this.setState({games: response.body});
    //     }).catch(error => {
    //       throw error;
    //     });
// };
// render() {
//     console.log(this.props);
    return (
        <div>
        <h1 classname="text-primary">GoodGames</h1>
        <h3 classname="text-primary">Find your next favorite game!</h3>
        <Nav />
        {/* {props.games.map(game => {
        return ( <li>{game.name} </li> )
        }
        )} */}
        <Switch>
            <Route path ='/login' component={Login} />
            <Route path ='/register' component={Register} />
            <Route path ='/search' component={Search} />
            <Route path ='/profile' component={Profile} />
            <Route path ='/games' component ={Games} />
            <Route path ='/recommendations' component={Recommendations} />
        </Switch>
        {/* <div>
            <Search search = {search} />
        </div>
        <div className = "games">
            {loading && !errorMessage ? (
                <span>loading...</span>
            ) : errorMessage ? (
                <div className="errorMessage">{errorMessage}</div>
            ) : (
                games.map((game) => 
                <GamePage key={game.id} game={game} />
                )
            )}
        </div> */}
        </div>
    )
}

const mapStateToProps = ({games}) => {
    return {
        games
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchGames: () => {
            dispatch(fetchGames())
        },
        }
    }
export default connect(mapStateToProps, mapDispatchToProps)(App);

// export default connect(mapStateToProps, mapDispatchToProps)(App);