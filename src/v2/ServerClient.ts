interface IServerClientV2 {
  get(url: string, callback: (req: any, res: any) => Promise<any>): void
  listen(port: number): void
}

export default IServerClientV2
