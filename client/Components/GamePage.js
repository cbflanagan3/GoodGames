import React from 'react';

const PLACEHOLDER_IMAGE = 'https://www.slashgear.com/wp-content/uploads/2019/07/space_invaders_Main-1280x720.jpg';

const GamePage = ({game}) => {
    const image = 
        game.image === "N/A" ? PLACEHOLDER_IMAGE : game.image;
    return (
        <div className="game">
            <h2>{game.name}</h2>
        </div>
    )
}; 

export default GamePage;