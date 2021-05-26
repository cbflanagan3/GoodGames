import React, {Component, useEffect} from 'react';
import { fetchGames } from '../store/actions';
import {connect} from 'react-redux';
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import Button from 'react-bootstrap/Button';

const Games = (props) => {
    useEffect(() => {
        console.log(props)
        props.fetchGames();
    }, []);
        return (
        <div>
        <h1 classname="text-center">Games</h1>
        <div className='d-flex flex-wrap justify-content-center'>
        {props.games.map( game => {
            return (
<Card style={{ width: '18rem', marginTop:20, marginLeft:20, marginRight:20 }}>
  <Card.Img variant="top" src="https://vignette.wikia.nocookie.net/fictionalcrossover/images/a/a1/Space_invaders_alien.jpg/revision/latest/scale-to-width-down/340?cb=20180913064758" />
  <Card.Body>
    <Card.Title>{game.name}</Card.Title>
    <Card.Text>
      {game.summary}
    </Card.Text>
  </Card.Body>
  <ListGroup className="list-group-flush">
    <ListGroupItem>Platform: Playstation 4</ListGroupItem>
    <ListGroupItem>Released: 1/01/2010</ListGroupItem>
    <ListGroupItem>Average Time To Beat: 3 hours</ListGroupItem>
  </ListGroup>
  <Card.Body>
    <Card.Link href={game.url}>More Info</Card.Link>
  </Card.Body>
  <Card.Body>
    <Button variant="success">Like</Button>{' '}
    <Button variant="danger">Dislike</Button>{' '}
  </Card.Body>
</Card>
)})
}
</div></div>        )
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
    export default connect(mapStateToProps, mapDispatchToProps)(Games);