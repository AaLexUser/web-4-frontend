export default class User{
  private username: string
  private password: string
  private token: string

  constructor(username: string, password: string, token?: string ){
    this.username = username
    this.password = password
    this.token = token !== undefined ? token : ''
  }

  setUsername(username:string): void{
    this.username = username
  }
  getUsername(){
    return this.username
  }

  setPassword(password: string): void{
    this.password = password
  }
  getPassword(){
    return this.password
  }

  setToken(token: string): void{
    this.token = token
  }
  getToken(){
    return this.token
  }
  
}