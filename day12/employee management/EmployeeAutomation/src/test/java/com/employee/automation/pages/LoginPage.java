package com.employee.automation.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;
import java.util.List;

/**
 * Page Object Model for the AuraHR Login Page.
 * Encapsulates all locators and actions on the login/portal selection screen.
 */
public class LoginPage {

    private final WebDriver driver;
    private final WebDriverWait wait;

    // ── Portal Selection Screen Locators ──
    // The portal cards contain h2 elements with "Admin Portal" / "Employee Portal"
    private final By portalCards = By.cssSelector("div[style*='cursor: pointer']");
    
    // ── Login Form Locators ──
    private final By emailInput = By.cssSelector("input[type='email']");
    private final By passwordInput = By.cssSelector("input[type='password']");
    private final By submitButton = By.cssSelector("button[type='submit']");
    
    // ── Error Message ──
    // Use XPath text matching — inline style selectors are unreliable with React
    private final By errorMessage = By.xpath("//div[contains(text(), 'Invalid') or contains(text(), 'Something went wrong')]");
    
    // ── Back Button ──
    private final By backButton = By.xpath("//button[contains(text(), 'Choose Portal')]");

    public LoginPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(15));
    }

    // ── Navigation ──

    public void navigateTo(String url) {
        driver.get(url);
        // Wait for the page to fully load (brand name appears)
        wait.until(ExpectedConditions.presenceOfElementLocated(
            By.xpath("//*[contains(text(), 'AuraHR')]")
        ));
    }

    // ── Portal Selection Actions ──

    public void selectPortal(String portalName) {
        // Find the portal card that contains the specified text
        WebElement card = wait.until(ExpectedConditions.elementToBeClickable(
            By.xpath("//h2[contains(text(), '" + portalName + "')]/ancestor::div[contains(@style, 'cursor')]")
        ));
        card.click();
        // Wait for the login form to appear
        wait.until(ExpectedConditions.visibilityOfElementLocated(emailInput));
    }

    public boolean isPortalCardVisible(String portalName) {
        try {
            WebElement card = wait.until(ExpectedConditions.visibilityOfElementLocated(
                By.xpath("//h2[contains(text(), '" + portalName + "')]")
            ));
            return card.isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    // ── Login Form Actions ──

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
        // Small wait for React's async login handler to complete
        try { Thread.sleep(2000); } catch (InterruptedException ignored) {}
    }

    // ── Verification Methods ──

    public String getErrorMessage() {
        WebElement error = wait.until(ExpectedConditions.visibilityOfElementLocated(errorMessage));
        return error.getText();
    }

    public boolean isTextDisplayedOnPage(String text) {
        try {
            WebElement element = wait.until(ExpectedConditions.presenceOfElementLocated(
                By.xpath("//*[contains(text(), '" + text + "')]")
            ));
            return element.isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    public boolean isDashboardLoaded() {
        try {
            // After successful login the sidebar and dashboard view appear.
            // Look for the "Dashboard" text or sidebar elements.
            WebElement dashboard = wait.until(ExpectedConditions.presenceOfElementLocated(
                By.xpath("//*[contains(text(), 'Dashboard')]")
            ));
            return dashboard.isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
}
