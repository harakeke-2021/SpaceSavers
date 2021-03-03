const playwright = require('playwright')

const connection = require('../server/db/connection')

const homeUrl = process.env.E2E_URL || 'http://localhost:3001/#/'
const registerUrl = homeUrl + 'register'
const signInUrl = homeUrl + 'signin'

test('User can register, sign out and sign in again', async () => {
  // SETUP -----------------------
  await connection.migrate.latest()
  await connection.seed.run()
  const browser = await playwright.chromium.launch()
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
  // await Promise.all([
  // page.waitForNavigation(),
  //   page.waitForSelector('button:text("Register")'),
  // page.click('button:text("Register")')
  //   // await page.click('a:text("Home")')
  // ])
  await page.click('button', { force: true })
  console.log('button clicked... now lets wait ')
  await page.waitForLoadState('networkidle')
  await page.waitForLoadState('networkidle')
  await page.waitForLoadState('networkidle')
  await page.waitForLoadState('networkidle')
  await page.waitForLoadState('networkidle')
  await page.waitForLoadState('networkidle')
  await page.waitForLoadState('networkidle')
  await page.waitForLoadState('networkidle')
  await page.waitForLoadState('networkidle')
  await page.waitForLoadState('networkidle')
  await page.waitForLoadState('networkidle')
  await page.waitForLoadState('networkidle')
  await page.screenshot({ path: 'afterbuttonclick.png', fullPage: true })
  console.log(page.url())

  // Log out
  await Promise.all([
    // page.waitForNavigation(),
    // page.waitForSelector('a:text("Log Off")')
    // page.click('a:text("Log Off")')
    page.click('a:text("Sign In")')
  ])
  await page.screenshot({ path: 'afterlogout.png', fullPage: true })

  await page.waitForLoadState('networkidle')
  expect(page.url()).toBe(registerUrl)
  console.log('sign in')
  // Navigate to sign in page
  await Promise.all([
    page.waitForSelector('a:text("Sign in")'),
    page.click('a:text("Sign in")')
  ])
  expect(page.url()).toBe(signInUrl)

  console.log('fill out sign in')
  // fill out sign in form
  await page.click('input[name="username"]')
  await page.fill('input[name="username"]', 'Burgerlord')
  await page.click('input[name="password"]')
  await page.fill('input[name="password"]', 'password')

  console.log('click sign in')
  // click sign in button
  await Promise.all([
    // page.waitForNavigation(),
    page.waitForSelector('button:text("Sign in")'),
    page.click('button:text("Sign in")')
  ])
  expect(page.url()).toBe(homeUrl)

  // TEARDOWN ------------
  await page.close()
  await browser.close()
  await connection.destroy()
  // ---------------------
}, 99999)
