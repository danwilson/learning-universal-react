import express from 'express';
import http from 'http';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { routes } from './routes';

//Express
const app = express();

app.use(express.static('public'));

app.set('view engine', 'ejs');
app.get('*', (req, res) => {
  match({ routes, location: req.url }, (err, redirectLocation, props) => {
    if (err) {
      res.status(500).send(err.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (props) {
      const markup = renderToString(<RouterContext {...props} />);
      res.render('index', { markup });
    } else {
      res.sendStatus(404);
    }
  });
});

const server = http.createServer(app);

server.listen(3003);
server.on('listening', () => {
  console.log('Listening on port 3003');
});