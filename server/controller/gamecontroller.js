const Game = require("../models/gameSchema.js");

const gamecontroller = {
    getAllGames: (async(req, res) => {

        try {
            
            const games = await Game.find();
            if(games.length>0){
                
                res.status(200).send({msg:"games found", games: games})
            }else {
                res.status(404).send({msg: "No games found"})
            }
        } catch (error) {
            console.log(error)
            res.status(500).send({msg: "something went wrong"})
        }

    }),
    createGame: (async(req, res) => {
        const{title, price, publisher, releaseDate, status, description, shortDescritons} = req.body;

        try {
            
            const game = new Game({
                title, 
                price, 
                publisher, 
                releaseDate, 
                status, 
                description, 
                shortDescritons,
            })
            let result = await game.save();
            console.log(result);
            if(result.id){
                res.status(200).send({msg: "Game created", game: game})
            } else {
                
                res.status(500).send({msg: "something went wrong"})
            }
        } catch (error) {
            console.log(error)
            res.status(500).send({msg: "something went wrong"})
        }
    }),
    editGame: (async(req, res) => {
        const {id} = req.params;

        const updateContent = req.body;
        try {
            
            const game = await Game.findByIdAndUpdate(id, updateContent);
    
            console.log(game, "UPdating game");
            res.status(200).send({msg: "Game updated", game: game})
        } catch (error) {
            console.log(error);
        }

    }),
    getGame: (async(req, res) => {
        const {id} = req.params;

        try {
            const game = await Game.findById(id);
    
            console.log(game)
    
            res.status(200).send({msg: "Game founded", game: game})
            
        } catch (error) {
            console.log(error)
            res.status(500).send({msg: "something went wrong"})   
        }

        
    }),
    deleteGame: (async(req, res) => {
        const {id} = req.params;
        
        try {
            const game = await Game.findByIdAndDelete(id);
            console.log(game);
            res.status(200).send({msg: "Game deleted", game: game})
            
        } catch (error) {
            console.log(error)
            res.status(500).send({msg: "something went wrong"})
        }
    }),






}


module.exports = gamecontroller;