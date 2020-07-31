const express = require("express")
const redis = require("redis")
const app = express()
const client = redis.createClient({ host: "redis-server" })
client.set("visits", 0)
app.get("/", (req, res) => {
  process.exit(0)
  client.get("visits", (err, data) => {
    res.send("Number of visits is" + data)
    client.set("visits", parseInt(data) + 1)
  })
})
app.listen(3000, () => {
  console.log(`Server running on port 3000`)
})
