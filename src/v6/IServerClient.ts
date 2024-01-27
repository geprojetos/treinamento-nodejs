export default interface IServerClientV6 {
  get(url: string, callback: (req: any, res: any) => Promise<any>): void
  listen: (port: number) => void
}
