/* eslint-disable react-hooks/rules-of-hooks */
import { useCreateFood } from "@core"
import { ICreateFood } from "@core/dist/useCases/foods/UseCreateFood"
import { IFoodCreateResponse } from "@core/dist/infra/HttpAxiosAdapterClient"
import { useRouter } from "next/navigation"
import { ChangeEvent, FormEvent, useState } from "react"

const createPresentation = () => {
  const defaultFormValues: ICreateFood = {
    name: "",
    category: "",
    price: 0,
  }
  const defaultErrorFormValues: IFoodCreateResponse = {
    status: "",
    message: "",
    error: {
      name: "",
      category: "",
      price: "",
    },
  }
  const { push } = useRouter()
  const [formValues, setFormValues] = useState<ICreateFood>(defaultFormValues)
  const [formErrors, setFormErrors] = useState<IFoodCreateResponse>(
    defaultErrorFormValues
  )

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const _target = event.target.id
    const _value = event.target.value
    setFormValues((oldState) => {
      return {
        ...oldState,
        [_target]: _value,
      }
    })
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = await useCreateFood.execute(formValues, () => {
      _navigateToList()
      _resetForms()
    })
    setFormErrors(data)
  }

  const _navigateToList = () => {
    push("/")
  }

  const _resetForms = () => {
    setFormValues(defaultFormValues)
    setFormErrors(defaultErrorFormValues)
  }

  return {
    handleChange,
    handleSubmit,
    formErrors,
  }
}

export default createPresentation
