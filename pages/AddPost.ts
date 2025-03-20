import {Page} from 'playwright';

export class AddPost{
    private page : Page;

    constructor(page: Page) {
        this.page = page;
      }

      elements = {
        title : () => this.page.locator('#id_title'),
        content : () => this.page.locator('#id_content'),
        save: () => this.page.locator('input[name="_save"]'),
        saveAndAddAnother: () => this.page.locator('input[name="_addanother"]')
      }

    async TitrePostPage(){
        return await this.page.locator('h1').textContent();
    }

    async SaisirTitre(titre :string){
      await this.elements.title().fill(titre);
    }

    async SaisirContent(contenus: string){
      await this.elements.content().fill(contenus);
    }

    async CliqueSurSave(){
      await this.elements.save().click();
    }

    async CliqueSurSaveAndAnother(){
      await this.elements.saveAndAddAnother().click();
    }



   
    
}

export default AddPost;