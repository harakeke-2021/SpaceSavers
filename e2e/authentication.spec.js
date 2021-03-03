const playwright = require('playwright')

const connection = require('../server/db/connection')

const homeUrl = process.env.E2E_URL || 'http://localhost:3000/#/'
const registerUrl = homeUrl + 'register'
const signInUrl = homeUrl + 'signin'

test('User can register, sign out and sign in again', async () => {
  // SETUP -----------------------
  await connection.migrate.latest()
  await connection.seed.run()
  const browser = await playwright.chromium.launch({ headless: false })
  const page = await browser.newPage()
  // -----------------------------

  await page.goto(homeUrl)

  // navigate to register pages
  console.log('line20')
  await Promise.all([
    page.waitForNavigation(),
    page.click('a:text("Register")')
  ])
  expect(page.url()).toBe(registerUrl)

  // fill out registration form
  await page.click('input[name="name"]')
  await page.fill('input[name="name"]', 'Bob')
  await page.click('input[name="username"]')
  await page.fill('input[name="username"]', 'BurgerLord')
  await page.click('input[name="rego"]')
  await page.fill('input[name="rego"]', 'myrego')
  await page.click('input[name="email"]')
  await page.fill('input[name="email"]', 'bob@bobsburgers.abc')
  await page.click('input[name="password"]')
  await page.fill('input[name="password"]', 'password')
  await page.screenshot({ path: 'beforeregisterclick.png', fullPage: true })
  await Promise.all([
    page.waitForNavigation(),
    page.click('button:text("Register")')
  ])

  // Log out
  await page.waitForLoadState('networkidle')
  await Promise.all([
    // page.waitForNavigation(),
    page.waitForSelector('a:text("Log Off")'),
    page.click('a:text("Log Off")')
  ])

  expect(page.url()).toBe(homeUrl)
  console.log('sign in')
  // Navigate to sign in page
  await Promise.all([
    page.waitForNavigation(),
    // page.waitForSelector('a:text("Sign in")'),
    page.click('a:text("Sign In")')
  ])
  expect(page.url()).toBe(signInUrl)

  // fill out sign in form
  await page.click('input[name="username"]')
  await page.fill('input[name="username"]', 'Peter')
  await page.click('input[name="password"]')
  await page.fill('input[name="password"]', 'Peter')

  // click sign in button
  await Promise.all([
    page.waitForNavigation(),
    // page.waitForSelector('button:text("Sign in")'),
    page.click('button:text("Sign in")')
  ])
  expect(page.url()).toBe(homeUrl)

  // TEARDOWN ------------
  await page.close()
  await browser.close()
  await connection.destroy()
  // ---------------------
}, 99999)
