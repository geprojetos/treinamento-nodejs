export default interface IServerClient {
  get(url: string, callback: (req: any, res: any) => void): void
  listen(port: number, callback: () => void): void
}
