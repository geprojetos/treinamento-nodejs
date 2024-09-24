import createPresentation from "@/presentation/foods/create"

const createFoodView = () => {
  const { handleChange, handleSubmit, formErrors } = createPresentation()
  return (
    <section>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Name:
          <input
            id="name"
            type="text"
            placeholder="name"
            onChange={handleChange}
          />
          <span>{formErrors?.name}</span>
        </label>
        <label htmlFor="price">
          Price:
          <input
            id="price"
            type="number"
            placeholder="price"
            onChange={handleChange}
          />
          <span>{formErrors?.price}</span>
        </label>
        <label htmlFor="category">
          Category:
          <input
            id="category"
            type="text"
            placeholder="category"
            onChange={handleChange}
          />
          <span>{formErrors?.category}</span>
        </label>

        <button type="submit">Cadastrar</button>
      </form>
    </section>
  )
}

export default createFoodView
