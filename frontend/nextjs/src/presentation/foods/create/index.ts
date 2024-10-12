import { useCreateFood } from "@core"
import { ICreateFood } from "@core/useCases/foods/UseCreateFood"
import { useRouter } from "next/navigation"
import { ChangeEvent, FormEvent, useState } from "react"

const createPresentation = () => {
  const defaultFormValues = {
    name: "",
    price: 0,
    category: "",
  }
  const { push } = useRouter()
  const [formValues, setFormValues] = useState<ICreateFood>(defaultFormValues)
  const [formErrors, setFormErrors] = useState<ICreateFood>(defaultFormValues)

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
    setFormErrors(defaultFormValues)
  }

  return {
    handleChange,
    handleSubmit,
    formErrors,
  }
}

export default createPresentation
