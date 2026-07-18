package com.employee.automation.hooks;

import io.cucumber.java.After;
import io.cucumber.java.Before;
import io.cucumber.java.Scenario;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

/**
 * Cucumber Hooks for WebDriver lifecycle management.
 * Sets up ChromeDriver before each scenario and tears it down after.
 */
public class Hooks {

    private static WebDriver driver;

    @Before
    public void setUp() {
        // Auto-download and configure the correct ChromeDriver version
        WebDriverManager.chromedriver().setup();

        ChromeOptions options = new ChromeOptions();
        options.addArguments("--start-maximized");
        options.addArguments("--disable-notifications");
        // Uncomment the line below to run headless (no visible browser window)
        // options.addArguments("--headless=new");

        driver = new ChromeDriver(options);
        driver.manage().window().maximize();
    }

    @After
    public void tearDown(Scenario scenario) {
        if (driver != null) {
            // Capture screenshot on failure for debugging
            if (scenario.isFailed()) {
                byte[] screenshot = ((TakesScreenshot) driver).getScreenshotAs(OutputType.BYTES);
                scenario.attach(screenshot, "image/png", scenario.getName());
            }
            driver.quit();
        }
    }

    /**
     * Returns the shared WebDriver instance for step definitions.
     */
    public static WebDriver getDriver() {
        return driver;
    }
}
