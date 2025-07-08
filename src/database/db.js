import mongoose from 'mongoose';
import { config } from '../config/config.js';

export const connecToDb = async () => {
  try {
    mongoose.connect(config.mongo_uri, {
      dbName: 'ErentDb',
    });

    console.log('Connected to Database Succesfully');
  } catch (error) {
    console.log(`some error occured while connecting to database ${error}`);
  }
};
