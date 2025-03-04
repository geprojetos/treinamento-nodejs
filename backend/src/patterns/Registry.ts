class RegistryV1 {
  private _dependencies: { [name: string]: any }
  static instance: RegistryV1

  private constructor() {
    this._dependencies = {}
  }

  static getInstance() {
    if (!RegistryV1.instance) {
      RegistryV1.instance = new RegistryV1()
    }
    return RegistryV1.instance
  }

  provide(name: string, dependency: any) {
    this._dependencies[name] = dependency
  }

  inject(name: string) {
    return this._dependencies[name]
  }
}

const inject = (name: string) => {
  return function (obj: any, propertyKey: string) {
    obj[propertyKey] = new Proxy(
      {},
      {
        get(_, property: string) {
          const dependency = RegistryV1.getInstance().inject(name)
          return dependency[property]
        },
      }
    )
  }
}

export { RegistryV1, inject }
