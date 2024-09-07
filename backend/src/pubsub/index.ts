// links
// https://www.youtube.com/watch?v=nVl0iOcg9ZU
// https://codepen.io/Admin-Devaria/pen/JjzWdNm?editors=0012

import express from "express"

enum Subscribes {
  SOCCER = "soccer",
  BASKETBALL = "basketball",
}

class PubSub {
  private tracker: any = {
    // key: eventname, value: [ funcs ]
  }

  subscribe(eventName: any, func: any) {
    if (this.tracker[eventName]) {
      this.tracker[eventName].push(func)
    } else {
      this.tracker[eventName] = [func]
    }
  }

  publish(eventName: any, ...args: any) {
    const funcs = this.tracker[eventName]
    if (Array.isArray(funcs)) {
      funcs.forEach((func) => {
        func.apply(null, args)
      })
    }
  }

  unsubscribe(eventName: string, callback: () => void) {
    const funcs = this.tracker[eventName]
    const idx = funcs.indexOf(callback)
    if (idx > -1) {
      funcs.splice(idx, 1)
    }
  }

  getChannels() {
    console.log("all", JSON.stringify(this.tracker))
    console.log("all", this.tracker?.soccer[0]())
  }
}

const app = express()
const pubsub = new PubSub()

app.get("/", (_, res) => {
  pubsub.subscribe(Subscribes.BASKETBALL, function (data: any) {
    console.log("subscribe basketball", JSON.stringify(data))
    console.log("-----------")
  })
  pubsub.subscribe(Subscribes.SOCCER, function (data: any) {
    console.log("subscribe soccer", JSON.stringify(data))
    console.log("-----------")
  })
  pubsub.publish(Subscribes.BASKETBALL, {
    message: "Los Angeles Lakers",
  })
  pubsub.publish(Subscribes.SOCCER, { message: "Manchester City" })
  pubsub.getChannels()
  res.json({ message: "ok" })
})

app.listen(3000, () => console.log("server is running 3000"))
