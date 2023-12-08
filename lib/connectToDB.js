

import mongoose from 'mongoose';
import React from 'react'

const connectToDB = async() => {
  const url=process.env.MONGODB_URI;
  if(mongoose.connection.readyState===1){
    return mongoose.connection.asPromise();
  }else{
    let connection=await mongoose.connect(url);
    return connection
  }
}

export default connectToDB