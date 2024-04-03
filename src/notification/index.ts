interface IBookAction {
  update(): void
}

interface IClientActions {
  subscribe(observe: IBookAction): void
  unsubscribe(observe: IBookAction): void
  unsubscribeAll(): void
  notify(observe: IBookAction): void
  notifyAll(): void
}

class BookStore implements IBookAction {
  constructor(private _id: number) {}
  update(): void {
    console.log("update realizado", this._id)
  }
}

class Clients implements IClientActions {
  private observers: IBookAction[] = []

  subscribe(observe: IBookAction): void {
    this.observers.push(observe)
  }
  unsubscribe(observe: IBookAction): void {
    this.observers = this.observers.filter(
      (filterObserver) => filterObserver !== observe
    )
  }
  unsubscribeAll(): void {
    this.observers = []
  }
  notify(observe: IBookAction): void {
    observe.update()
  }
  notifyAll(): void {
    this.observers.forEach((observer) => this.notify(observer))
  }
}

import express from "express"

const app = express()

app.get("/", (_, res) => {
  const client1 = new BookStore(1)
  const client2 = new BookStore(2)
  const client3 = new BookStore(3)

  const clientsBookStore = new Clients()

  clientsBookStore.subscribe(client1)
  clientsBookStore.subscribe(client2)
  clientsBookStore.subscribe(client3)
  clientsBookStore.notifyAll()
  res.json({ message: "Treinando oberserve" })
})
app.listen(3000, () => console.log("servidor rodando"))
