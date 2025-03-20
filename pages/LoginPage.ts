import { Page } from 'playwright';

export class LoginPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }


  async goto(url : string){
    await this.page.goto(url);
  }

  elements = {
    username: () => this.page.locator('input[name="username"]'),
    password: () => this.page.locator('input[name="password"]'),
    submit: () => this.page.locator('input[type="submit"]'),
    errorMessage: () => this.page.locator('.errornote'),
    dashboard: () => this.page.locator('.dashboard'),
  }

  async SaisirUsername (username : string){
    await this.elements.username().fill(username);
  }

  async SaisirPassword (password : string){
    await this.elements.password().fill(password);
  }

  async clicSurLogin (){
    await this.elements.submit().click();
  }

  async getErrorMessage(){
    return this.elements.errorMessage();
  }

  async getDashboard(){
    this.elements.dashboard();
  }
  async isDashboardVisible(): Promise<boolean> {
    return await this.page.isVisible('.dashboard');
  }

  async PostsListVisible(): Promise<boolean> {
    return await this.page.isVisible('.post');
  }

  async login(username:string, password:string){
    await this.elements.username().fill(username);
    await this.elements.password().fill(password);
    await this.elements.submit().click();
  }

}

export default LoginPage;
