import express from 'express';
import hbs from 'hbs';
import path from 'path';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import sessionFileStore from 'session-file-store';
import { coookieCleaner, getLocals } from './auth.js';
import dbConnect from './dbConnect.js';

const __dirname = path.resolve();
const FileStore = sessionFileStore(session);

const config = (app) => {
  dbConnect();
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cookieParser());

  app.use(
    session({
      store: new FileStore(),
      name: 'user_sid',
      secret: 'exam',
      resave: false,
      saveUninitialized: false,
      cookie: {
        expires: 86400000,
        httpOnly: true,
      },
    }),
  );

  app.use(coookieCleaner);
  app.use(getLocals);
  
  app.use(express.static(path.join(__dirname, 'public')));

  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'hbs');

  hbs.registerPartials(path.join(__dirname, 'views/weeklyPlan/partitials'))

  app.use((req, res, next)=>{
    if(req.query._action){
      req.method = req.query._action;
    }
    next();
  })
};

export default config;
