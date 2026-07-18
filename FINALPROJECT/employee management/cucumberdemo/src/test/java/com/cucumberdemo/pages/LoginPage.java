package com.cucumberdemo.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

/**
 * Page Object for the AuraHR Login Page.
 */
public class LoginPage {

    private final WebDriver driver;
    private final WebDriverWait wait;

    // Locators
    private final By emailInput = By.cssSelector("input[type='email']");
    private final By passwordInput = By.cssSelector("input[type='password']");
    private final By submitButton = By.cssSelector("button[type='submit']");

    public LoginPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(15));
    }

    public void openPage(String url) {
        driver.get(url);
        wait.until(ExpectedConditions.presenceOfElementLocated(
            By.xpath("//*[contains(text(), 'AuraHR')]")
        ));
    }

    public void clickPortalCard(String portalName) {
        WebElement card = wait.until(ExpectedConditions.elementToBeClickable(
            By.xpath("//h2[contains(text(), '" + portalName + "')]/ancestor::div[contains(@style, 'cursor')]")
        ));
        card.click();
        wait.until(ExpectedConditions.visibilityOfElementLocated(emailInput));
    }

    public void enterEmail(String email) {
        WebElement field = wait.until(ExpectedConditions.visibilityOfElementLocated(emailInput));
        field.clear();
        field.sendKeys(email);
    }

    public void enterPassword(String password) {
        WebElement field = wait.until(ExpectedConditions.visibilityOfElementLocated(passwordInput));
        field.clear();
        field.sendKeys(password);
    }

    public void clickSignIn() {
        WebElement btn = wait.until(ExpectedConditions.elementToBeClickable(submitButton));
        btn.click();
        // Wait for React async login to complete
        try { Thread.sleep(2000); } catch (InterruptedException ignored) {}
    }

    public boolean isDashboardVisible() {
        try {
            WebElement dashboard = wait.until(ExpectedConditions.presenceOfElementLocated(
                By.xpath("//*[contains(text(), 'Dashboard')]")
            ));
            return dashboard.isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
}
