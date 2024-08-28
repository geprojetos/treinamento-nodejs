import axios from "axios"
import express from "express"

const port = 3001
const app = express()

app.get("/foods", async (req, res) => {
  const { query } = req
  const response = await axios.get("http://localhost:3000/example")
  const output = response.data.map((food: any) => ({
    ...food,
    price: (10 * food.price) / 100 + food.price,
  }))

  if (query.category === "snack") {
    res.json(output.filter((food: any) => food.category === query.category))
    return
  }

  if (query.category === "dessert") {
    res.json(output.filter((food: any) => food.category === query.category))
    return
  }

  res.json(output)
})
app.listen(port, () => console.log(`Server is running http://localhost${port}`))

export default app
