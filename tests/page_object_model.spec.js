import {test, expect} from '@playwright/test'
import { loginPage } from '../pages/loginPage'
import { homePage } from '../pages/homePage'

test.only('login test', async ({page}) => {
    const login = new loginPage(page)
    const home = new homePage(page)
    await login.navigate()
    await login.login('standard_user', 'secret_sauce')
    await home.logout()
})
