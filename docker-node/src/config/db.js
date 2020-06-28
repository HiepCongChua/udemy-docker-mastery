const mongoose = require('mongoose');
async function ConnectDB(mongoURL){
  try {
      await mongoose.connect(mongoURL,{
          useNewUrlParser:true
      })
      console.log(`MongoDB connect to ${mongoURL}`)
  } catch (error) {
      console.log(error)
  }
}
module.exports =  ConnectDB;