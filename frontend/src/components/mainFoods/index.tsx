import { IUseNavigateDetailFoodParams } from "@/@core/useCases/foods/UseNavigateDetailFood"
import useGetAllPresentation from "@/presentation/foods/main"
import Head from "next/head"

const MainFoods = () => {
  const { foods, navigateToDetail, navigateToCreate, handleRemove } =
    useGetAllPresentation()

  return (
    <>
      <Head>
        <title>Foods</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col h-full p-4">
        <main>
          <button
            className="rounded-md bg-slate-800 py-2 px-4 mt-6 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none p-2 mb-4 w-50"
            type="button"
            onClick={navigateToCreate}
          >
            Cadastrar
          </button>

          <div className="grid grid-cols-3 gap-3">
            {foods.map((food, index) => {
              return (
                <section
                  className="flex flex-col p-4 items-center justify-center border border-slate-200 rounded-2xl"
                  key={`list-${index}`}
                >
                  <h1 className="mb-2 text-slate-800 text-xl font-semibold">
                    {food.name}
                  </h1>
                  <p className="text-slate-600 leading-normal font-light">
                    Preço:
                    <span className="text-sm">R$</span>
                    {food.price}
                  </p>

                  <div>
                    <button
                      className="rounded-md bg-blue-800 hover:bg-blue-700 text-white p-2 mt-2 w-full"
                      onClick={() =>
                        navigateToDetail(food as IUseNavigateDetailFoodParams)
                      }
                    >
                      Detalhar
                    </button>
                    <button
                      className="rounded-md bg-red-800 hover:bg-red-700 text-white p-2 mt-2 w-full"
                      onClick={() => handleRemove(food.id!)}
                    >
                      Remover
                    </button>
                  </div>
                </section>
              )
            })}
          </div>
        </main>
        <footer className="flex justify-center">
          <p>@Foods</p>
        </footer>
      </div>
    </>
  )
}

export default MainFoods
