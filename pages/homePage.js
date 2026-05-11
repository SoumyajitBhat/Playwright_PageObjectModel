exports.homePage = class homePage{
    constructor(page){
        this.page = page;
    }

    async logout(){
        await this.page.getByRole('button', { name: 'Open Menu' }).click()
        await this.page.locator('[data-test="logout-sidebar-link"]').click()
    }
}