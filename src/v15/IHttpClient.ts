export default interface IHttpClient {
  get(url: string): Promise<any>
  create(url: string, data: any): Promise<any>
}
