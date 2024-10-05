import DetailsPresentation from "@/presentation/foods/details"

const DetailsView = () => {
  const { back, name, price, category } = DetailsPresentation()

  return (
    <section data-id="food-details" className="flex items-center justify-center flex-col h-screen">
      <div className="p-4 w-60 border border-slate-200 rounded-2xl">
        <h1 data-id="food-details-title" className="text-2xl text-gray-800 font-bold mb-2">{name}</h1>
        <p data-id="food-details-price" className="text-xl text-gray-600">
          Preço: <span className="text-sm">R$</span>
          {price}
        </p>
        <p data-id="food-details-category" className="text-xl text-gray-600">Categoria: {category}</p>

        <button
          data-id="food-details-btn-back"
          className="rounded-md bg-slate-800 hover:bg-slate-700 text-white p-2 w-full mt-8"
          onClick={back}
        >
          Voltar
        </button>
      </div>
    </section>
  )
}

export default DetailsView
