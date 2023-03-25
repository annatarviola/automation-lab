const { Builder, Capabilities, By } = require("selenium-webdriver")
require('chromedriver')
const driver = new Builder().withCapabilities(Capabilities.chrome()).build()

beforeAll(async () => {
    await driver.get('http://localhost:5500/movieList/index.html')
})

afterAll(async () => {
    await driver.quit()
})

test('color when checked off', async () => {
    let myMovie = await driver.findElement(By.xpath('/html/body/main/ul/li/span'))

    myMovie.click

    expect(myMovie).toContain('goncharov')

})
