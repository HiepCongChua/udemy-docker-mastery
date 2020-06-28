module.exports = {
    port : process.env.PORT || 3000,
    mongoURL :  process.env.MONGODB_URL || 'mongodb://localhost:27018/example',
    env:process.env.NODE_ENV || 'development'
}