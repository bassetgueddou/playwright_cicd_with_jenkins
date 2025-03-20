import {Page} from 'playwright';

export class DashBoardPage{
    private page : Page;

    constructor(page: Page) {
        this.page = page;
      }

      elements = {
       // clicAddPost: () => this.page.locator('a:has-text("Add")'),
        clicAddPost: () => this.page.getByRole('link', { name: 'Add' }),

        getTitlePost: () => this.page.locator('h1')
      }

    async ClicOnAddPost(){
        await this.elements.clicAddPost().click();
    }

    async TitrePostPage(){
        await this.page.locator('h1');
    }

   
    
}

export default DashBoardPage;