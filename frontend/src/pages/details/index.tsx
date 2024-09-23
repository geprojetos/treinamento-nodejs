import DetailsPresentation from "@/presentation/details"

const DetailsView = () => {
  const { back, name, price, category } = DetailsPresentation()

  return (
    <>
      <h1>{name}</h1>
      <p>{price}</p>
      <p>{category}</p>

      <button onClick={back}>Voltar</button>
    </>
  )
}

export default DetailsView
