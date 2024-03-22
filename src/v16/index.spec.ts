import useFare, { ICalculate } from "."

describe("Exceptions", () => {
  test("Should be able success get data with fare 10%", () => {
    const input: ICalculate[] = [
      {
        id: "1",
        value: 10,
      },
    ]
    const { orchestration } = useFare(input)
    const output: ICalculate[] = [
      {
        id: "1",
        value: 11,
      },
    ]
    expect(orchestration()).toEqual(output)
  })

  test("Should be able exception without data", () => {
    const { orchestration } = useFare([])
    const output = {
      message: "Is not possible calculate fare for clean data",
    }

    expect(orchestration()).toEqual(output)
  })

  test("Should be able exception with negative value", () => {
    const input: ICalculate[] = [
      {
        id: "1",
        value: -10,
      },
    ]
    const { orchestration } = useFare(input)
    const output = {
      message: "Is not possible calculate fare for negative value",
    }

    expect(orchestration()).toEqual(output)
  })

  test("Should be able calculate fare", () => {
    const { fare } = useFare([])
    const input = 10
    const output = 11
    expect(fare(input)).toBe(output)
  })
})
