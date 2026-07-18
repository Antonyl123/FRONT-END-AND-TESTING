package com.employee.automation.steps;

import com.employee.automation.hooks.Hooks;
import com.employee.automation.pages.LoginPage;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import org.openqa.selenium.WebDriver;
import org.testng.Assert;

/**
 * Step Definitions for the Login feature.
 * Maps Gherkin steps to Selenium actions using the LoginPage page object.
 */
public class LoginSteps {

    private WebDriver driver;
    private LoginPage loginPage;

    // Base URL — React dev server (Vite default port)
    private static final String BASE_URL = "http://localhost:5173";

    @Given("the user is on the AuraHR login page")
    public void theUserIsOnTheAuraHRLoginPage() {
        driver = Hooks.getDriver();
        loginPage = new LoginPage(driver);
        loginPage.navigateTo(BASE_URL);
    }

    @When("the user selects the {string} card")
    public void theUserSelectsTheCard(String portalName) {
        loginPage.selectPortal(portalName);
    }

    @When("the user enters email {string}")
    public void theUserEntersEmail(String email) {
        loginPage.enterEmail(email);
    }

    @When("the user enters password {string}")
    public void theUserEntersPassword(String password) {
        loginPage.enterPassword(password);
    }

    @When("the user clicks the sign in button")
    public void theUserClicksTheSignInButton() {
        loginPage.clickSignIn();
    }

    @Then("the user should be redirected to the dashboard")
    public void theUserShouldBeRedirectedToTheDashboard() {
        Assert.assertTrue(loginPage.isDashboardLoaded(),
            "Dashboard should be loaded after successful login");
    }

    @Then("the page should display {string}")
    public void thePageShouldDisplay(String text) {
        Assert.assertTrue(loginPage.isTextDisplayedOnPage(text),
            "Page should display text: " + text);
    }

    @Then("the user should see the error message {string}")
    public void theUserShouldSeeTheErrorMessage(String expectedError) {
        String actualError = loginPage.getErrorMessage();
        Assert.assertTrue(actualError.contains(expectedError),
            "Expected error message: '" + expectedError + "' but got: '" + actualError + "'");
    }

    @Then("the {string} card should be visible")
    public void theCardShouldBeVisible(String portalName) {
        Assert.assertTrue(loginPage.isPortalCardVisible(portalName),
            portalName + " card should be visible on the login page");
    }
}
