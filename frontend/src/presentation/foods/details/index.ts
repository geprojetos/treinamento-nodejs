import { useDeleteFood } from "@/@core"
import { useRouter } from "next/router"

const DetailsPresentation = () => {
  const { query, back, push } = useRouter()
  const { id, name, price, category } = query as any

  const handleRemove = async () => {
    const isConfirm = confirm("Deseja remover?")
    isConfirm &&
      (await useDeleteFood.execute({
        id,
        callback: () => push("/"),
        isConfirm,
      }))
  }

  return {
    name,
    price,
    category,
    back,
    handleRemove,
  }
}

export default DetailsPresentation
