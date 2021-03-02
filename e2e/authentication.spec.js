const playwright = require('playwright')

const connection = require('../server/db/connection')

const homeUrl = process.env.E2E_URL || 'http://localhost:3000/#/'
const registerUrl = homeUrl + 'register'
const signInUrl = homeUrl + 'signin'

test('User can register, sign out and sign in again', async () => {
  // SETUP -----------------------
  // await connection.migrate.latest()
  // await connection.seed.run()
  const browser = await playwright.chromium.launch()
  const page = await browser.newPage()
  // -----------------------------

  await page.goto(homeUrl)

  // navigate to register pages
  try {
    await Promise.all([
      console.log('1'),
      page.waitForNavigation(),
      page.click('a:text("Register")')

    ])
  } catch (e) {
    console.log('try-catch error', e)
  }
  expect(page.url()).toBe(registerUrl)

  // fill out registration form
  await page.click('input[name="name"]')
  await page.fill('input[name="name"]', 'pete')

  await page.click('input[name="username"]')
  await page.fill('input[name="username"]', 'pete')

  await page.click('input[name="password"]')
  await page.fill('input[name="password"]', '1234qwer')

  await page.click('input[name="email"]')
  await page.fill('input[name="email"]', 'pete@mail.com')

  // submit registration
  await Promise.all([
    console.log('2'),
    page.click('button:text("Register")')
  ])
  expect(page.url()).toBe(registerUrl)

  // Log out
  try {
    await Promise.all([console.log('3'), page.waitForNavigation(), page.click('a:text("Log out")')])
  } catch (e) {
    console.log('try-catch error', e)
  }
  expect(page.url()).toBe(registerUrl)

  // Navigate to sign in page
  await Promise.all([console.log('4'), page.waitForNavigation(), page.click('a:text("Sign in")')])
  expect(page.url()).toBe(signInUrl)

  // fill out sign in form
  await page.click('input[name="username"]')
  await page.fill('input[name="username"]', 'pete')

  await page.click('input[name="password"]')
  await page.fill('input[name="password"]', '1234qwer')

  // click sign in button
  await Promise.all([
    console.log('5'),
    page.waitForNavigation(),
    page.click('button:text("Sign in")')
  ])
  expect(page.url()).toBe(homeUrl)

  // TEARDOWN ------------
  await page.close()
  await browser.close()
  await connection.destroy()
  // ---------------------
}, 99999)
