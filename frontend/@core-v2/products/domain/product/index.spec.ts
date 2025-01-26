import Product from "."
import { IGetAllProductsResponse } from "../../../test/inMemory/InMemoryProduct"

describe("Domain Product", () => {
  test("Should be able error, name is required", async () => {
    const product = new Product("", "description", 10, "category")
    const output = {
      status: 400,
      message: "Name is required",
    }
    expect(product.error).toEqual(output)
  })

  test("Should be able error, description is required", async () => {
    const product = new Product("name", "", 10, "category")
    const output = {
      status: 400,
      message: "Description is required",
    }
    expect(product.error).toEqual(output)
  })

  test("Should be able error, price is required", async () => {
    const product = new Product("name", "description", 0, "category")
    const output = {
      status: 400,
      message: "Price is required",
    }
    expect(product.error).toEqual(output)
  })

  test("Should be able error, category is required", async () => {
    const product = new Product("name", "description", 10, "")
    const output = {
      status: 400,
      message: "Category is required",
    }
    expect(product.error).toEqual(output)
  })

  test("Should be able generate dynamic id", async () => {
    const product = new Product("name", "description", 10, "category")
    expect(product.id).toBeTruthy()
  })

  test("Should be able is invalid to edit", async () => {
    const product = new Product("name", "description", 10, "category")
    const input = {
      status: 200,
      data: [],
    }
    const output = {
      status: 400,
      message: "Product not found",
    }
    product.isInvalidToEdit(input, "test")
    expect(product.error).toEqual(output)
  })

  test("Should be able is valid to edit", async () => {
    const product = new Product("name", "description", 10, "category")
    const input: IGetAllProductsResponse = {
      status: 200,
      data: [
        {
          id: "test",
          name: "test",
          description: "test",
          category: "test",
          price: 10,
        },
      ],
    }
    const output = {
      status: 400,
      message: "Product not found",
    }
    product.isInvalidToEdit(input, "test")
    expect(product.error).toEqual(undefined)
  })

  test("Should be able is invalid to delete", async () => {
    const input: IGetAllProductsResponse = {
      status: 200,
      data: [],
    }
    const output = {
      status: 400,
      message: "Product not found",
    }
    Product.isInvalidToDelete(input, "test")
    expect(Product._deleteError).toEqual(output)
  })

  test("Should be able is valid to delete", async () => {
    const input: IGetAllProductsResponse = {
      status: 200,
      data: [
        {
          id: "test",
          name: "test",
          description: "test",
          category: "test",
          price: 10,
        },
      ],
    }
    Product.isInvalidToDelete(input, "test")
    expect(Product._deleteError).toEqual(undefined)
  })
})
