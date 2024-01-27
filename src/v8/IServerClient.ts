export default interface IServerClientV8 {
  get(url: string, callback: (req: any, res: any) => Promise<void>): void
  listen(port: number): void
}
