import DetailsPresentation from "@/presentation/foods/details"

const DetailsView = () => {
  const { back, name, price, category, handleRemove } = DetailsPresentation()

  return (
    <>
      <h1>{name}</h1>
      <p>{price}</p>
      <p>{category}</p>

      <button onClick={handleRemove}>Remover</button>
      <button onClick={back}>Voltar</button>
    </>
  )
}

export default DetailsView
