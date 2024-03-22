import usePerson, { IIMC } from "."

describe("V18", () => {
  test("Should be able get age children <= 10", () => {
    const input = 10
    const { getCategoryAge } = usePerson({ age: input })
    const output = {
      message: "It is a children",
    }
    expect(getCategoryAge()).toEqual(output)
  })

  test("Should be able get age pre-adolescent >= 11", () => {
    const input = 11
    const { getCategoryAge } = usePerson({ age: input })
    const output = {
      message: "It is a pre-adolescent",
    }
    expect(getCategoryAge()).toEqual(output)
  })

  test("Should be able get age adolescent >= 14", () => {
    const input = 14
    const { getCategoryAge } = usePerson({ age: input })
    const output = {
      message: "It is a adolescent",
    }
    expect(getCategoryAge()).toEqual(output)
  })

  test("Should be able get age adult >= 18", () => {
    const input = 18
    const { getCategoryAge } = usePerson({ age: input })
    const output = {
      message: "It is a adult",
    }
    expect(getCategoryAge()).toEqual(output)
  })

  test("Should be able get age maturity >= 30", () => {
    const input = 30
    const { getCategoryAge } = usePerson({ age: input })
    const output = {
      message: "It is a maturity",
    }
    expect(getCategoryAge()).toEqual(output)
  })

  test("Should be able is invalid age", () => {
    const input = -1
    const { getCategoryAge } = usePerson({ age: input })
    const output = {
      message: "It is invalid age",
    }
    expect(getCategoryAge()).toEqual(output)
  })

  test("Should be able invalid weight imc input", () => {
    const input: IIMC = {
      weight: 0,
      height: 1.7,
    }
    const { calculateIMC } = usePerson({ imc: input })
    const output = {
      total: 0,
      message: "Invalid weight",
    }
    expect(calculateIMC()).toEqual(output)
  })

  test("Should be able invalid height imc input", () => {
    const input: IIMC = {
      weight: 71,
      height: 0,
    }
    const { calculateIMC } = usePerson({ imc: input })
    const output = {
      total: 0,
      message: "Invalid height",
    }
    expect(calculateIMC()).toEqual(output)
  })

  test("Should be able get imc very low", () => {
    const input: IIMC = {
      weight: 40,
      height: 1.7,
    }
    const { calculateIMC } = usePerson({ imc: input })
    const output = {
      total: 13.84,
      message: "Muito abaixo do peso",
    }
    expect(calculateIMC()).toEqual(output)
  })

  test("Should be able get imc low", () => {
    const input: IIMC = {
      weight: 50,
      height: 1.7,
    }
    const { calculateIMC } = usePerson({ imc: input })
    const output = {
      total: 17.3,
      message: "Abaixo do peso",
    }
    expect(calculateIMC()).toEqual(output)
  })

  test("Should be able get imc normal weight", () => {
    const input: IIMC = {
      weight: 71,
      height: 1.7,
    }
    const { calculateIMC } = usePerson({ imc: input })
    const output = {
      total: 24.56,
      message: "Peso normal",
    }
    expect(calculateIMC()).toEqual(output)
  })

  test("Should be able get imc over weight", () => {
    const input: IIMC = {
      weight: 82,
      height: 1.7,
    }
    const { calculateIMC } = usePerson({ imc: input })
    const output = {
      total: 28.37,
      message: "Acima do peso",
    }
    expect(calculateIMC()).toEqual(output)
  })

  test("Should be able get imc obesity", () => {
    const input: IIMC = {
      weight: 130,
      height: 1.7,
    }
    const { calculateIMC } = usePerson({ imc: input })
    const output = {
      total: 44.98,
      message: "Obesidade grau 3",
    }
    expect(calculateIMC()).toEqual(output)
  })
})
