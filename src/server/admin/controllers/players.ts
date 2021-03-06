import * as express from 'express';

export default function (app: express.Application) {
  app.get('/players', (req, res, next) => {
    let characters = [];
    let clients = req.gameState.clients.clients;
    for (let i = 0; i < clients.length; i++) {
      if (clients[i] && clients[i].playing) {
        characters.push(clients[i].character);
      }
    }
    res.json(characters);
    next();
  });

  app.post('/players/:characterName', (req, res, next) => {
    console.log(req);
    console.log(req.body);
    let clients = req.gameState.clients.clients;
    for (let i = 0; i < clients.length; i++) {
      if (clients[i] && clients[i].playing) {
        if (clients[i].character && clients[i].character.name.toLowerCase() == req.params.characterName.toLowerCase()) {
          clients[i].account.access = req.body.access;
          res.status(200);
          res.end();
          return;
        }
      }
    }
    res.status(404);
    res.end();
  });
}
