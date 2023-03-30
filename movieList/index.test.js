const { Builder, Capabilities, By } = require("selenium-webdriver");
require("chromedriver");
const driver = new Builder().withCapabilities(Capabilities.chrome()).build();

beforeAll(async () => {
  await driver.get("http://localhost:5500/movieList/index.html");
});

afterAll(async () => {
  await driver.quit();
});

describe("movie list features", () => {
  test("adding movie to list", async () => {
    const inputElement = await driver.findElement(
      By.xpath("/html/body/main/section/form/input")
    );

    await inputElement.sendKeys("goncharov \n");

    const goncharovTitle = await driver.findElement(
      By.xpath("/html/body/main/ul/li/span")
    );
    const goncharovTitleText = await goncharovTitle.getText();

    expect(goncharovTitleText).toBe("goncharov");
  });

  test("color changes to gray when checked off", async () => {
    const movieTitle = await driver.findElement(
      By.xpath("/html/body/main/ul/li/span")
    );
    await movieTitle.click();
    const gray = await movieTitle.getCssValue("color");
    expect(gray).toBe("rgba(128, 128, 128, 1)");
  });
  
  test("movie watched alert when checked off", async () => {
    const alert = await driver.findElement(By.id("message"))
    const alertText = await alert.getText();
    
    expect(alertText).toBe("goncharov watched!")
  });
  
  test("movie added back alert when unchecked", async () => {
    const movieTitle = await driver.findElement(
      By.xpath("/html/body/main/ul/li/span")
    );
    await movieTitle.click()
    
    const alert = await driver.findElement(By.id("message"))
    const alertText = await alert.getText();
    
    expect(alertText).toBe("goncharov added back!")
  });
  
  test("movie deletion button", async () => { 
    const deleteBtn = await driver.findElement(By.id("goncharov"))
    await deleteBtn.click()
    
    await driver.sleep(500);
    const movieContainer = await driver.findElement(By.xpath("/html/body/main/ul"))
    expect(movieContainer).not.toContain("goncharov")
  })

  test("movie deletion alert", async () => {
    const alert = await driver.findElement(By.id("message"))
    const alertText = await alert.getText();
    
    expect(alertText).toBe("goncharov deleted!")
  })
});
