import {Locator, test} from '@playwright/test'
import dotenv from 'dotenv'

dotenv.config();

test.describe('Naukri Automation', () => {
    
    // test('Navigate to naukri', async ({page}) => {
    //     await page.goto('https://www.naukri.com')
    //     await page.getByRole('heading', { name: 'Find your dream job now' }).isVisible()
    // });

    test('Login to account', async ({page}) => {
        const username = process.env.naukri_username || '';
        const password = process.env.naukri_password || '';
        await page.route('**/gsi/client*', route => route.abort());
        await page.goto('https://www.naukri.com')
        await page.getByRole('heading', { name: 'Find your dream job now' }).isVisible()
        await page.getByRole('link', { name: 'Login', exact: true }).click()
        await page.getByRole('textbox', { name: 'Enter your active Email ID /' }).fill(username)
        await page.getByRole('textbox', { name: 'Enter your password' }).fill(password)
        await page.getByRole('button', { name: 'Login', exact: true }).click()
        await page.waitForLoadState('load')
        await page.getByRole('img', { name: 'naukri user profile img' }).isVisible()
        await page.waitForTimeout(5000)
        await page.getByRole('link', { name: 'Complete profile' }).click()
        //  await page.getByRole('button', { name: 'Update resume' }).click()
        await page.waitForSelector('#attachCV', { state: 'visible' })
         await page.waitForTimeout(5000)
        await page.locator('#attachCV').setInputFiles('./data/Manish_SDET.pdf')
        // await page.getByText('Success', { exact: true }).isVisible()
         await page.waitForTimeout(5000)
         await page.waitForSelector('text=Success', { state: 'visible' })
    });

    // test.afterEach(async ({page}) => {
    //     await page.close()
    // });

});