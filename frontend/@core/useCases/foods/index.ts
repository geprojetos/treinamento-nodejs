import Gateway from "../../infra/Gateway"
import HttpClientAxiosAdapter from "../../infra/HttpAxiosAdapterClient"
import UseCreateFood from "./UseCreateFood"
import UseDeleteFood from "./UseDeleteFood"
import UseGetAllFoods from "./UseGetAllFoods"
import UseGetOnlyFood from "./UseGetOnlyFood"
import UseNavigateDetailFood from "./UseNavigateDetailFood"

const baseUrl = "http://localhost:3001/foods"
const httpClient = new HttpClientAxiosAdapter(baseUrl)
const gateway = new Gateway(httpClient)
const useCreateFood = new UseCreateFood(gateway)
const useDeleteFood = new UseDeleteFood(gateway)
const useGetAllFoods = new UseGetAllFoods(gateway)
const useGetOnlyFood = new UseGetOnlyFood(gateway)
const useNavigateDetailFood = new UseNavigateDetailFood()

export {
  useCreateFood,
  useDeleteFood,
  useGetAllFoods,
  useGetOnlyFood,
  useNavigateDetailFood,
}
