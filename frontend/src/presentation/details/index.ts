import { useRouter } from "next/router"

const DetailsPresentation = () => {
  const { query, back } = useRouter()
  const { name, price, category } = query

  return {
    name,
    price,
    category,
    back,
  }
}

export default DetailsPresentation
