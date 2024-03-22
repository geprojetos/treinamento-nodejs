export default interface IServerClient {
  get(url: string, callback: (req: any, res: any) => Promise<void>): void
  listen(port: number, callback: () => void): void
}
