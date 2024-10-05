import createPresentation from "@/presentation/foods/create"

const createFoodView = () => {
  const { handleChange, handleSubmit, formErrors } = createPresentation()
  return (
    <section className="flex items-center justify-center flex-col h-screen">
      <form onSubmit={handleSubmit} className="w-96">
        <div className="w-full max-w-sm min-w-[200px] mb-4">
          <label htmlFor="name">
            Name:
            <input
              data-id="food-create-input-name"
              id="name"
              className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-blue-500 hover:border-blue-300 shadow-sm focus:shadow"
              type="text"
              placeholder="name"
              onChange={handleChange}
            />
            <span data-id="food-create-error-input-name" className="text-sm text-red-600">{formErrors?.name}</span>
          </label>
        </div>

        <div className="w-full max-w-sm min-w-[200px] mb-4">
          <label htmlFor="price">
            Price:
            <input
              data-id="food-create-input-price"
              id="price"
              className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-blue-500 hover:border-blue-300 shadow-sm focus:shadow"
              type="number"
              placeholder="price"
              onChange={handleChange}
            />
            <span data-id="food-create-error-input-price" className="text-sm text-red-600">{formErrors?.price}</span>
          </label>
        </div>

        <div className="w-full max-w-sm min-w-[200px] mb-4">
          <label htmlFor="category">
            Category:
            <input
              data-id="food-create-input-category"
              id="category"
              className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-blue-500 hover:border-blue-300 shadow-sm focus:shadow"
              type="text"
              placeholder="category"
              onChange={handleChange}
            />
            <span data-id="food-create-error-input-category" className="text-sm text-red-600">{formErrors?.category}</span>
          </label>
        </div>

        <button
          data-id="food-create-btn-create"
          className="rounded-md bg-blue-700 text-white p-2 mt-2 w-full"
          type="submit"
        >
          Cadastrar
        </button>
      </form>
    </section>
  )
}

export default createFoodView
