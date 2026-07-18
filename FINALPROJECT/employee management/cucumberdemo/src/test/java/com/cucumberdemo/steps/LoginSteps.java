package com.cucumberdemo.steps;

import com.cucumberdemo.hooks.Hooks;
import com.cucumberdemo.pages.LoginPage;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import org.openqa.selenium.WebDriver;
import org.testng.Assert;

/**
 * Step Definitions for the Login feature file.
 */
public class LoginSteps {

    private WebDriver driver;
    private LoginPage loginPage;
    private static final String BASE_URL = "http://localhost:5173";

    @Given("the user navigates to the login page")
    public void theUserNavigatesToTheLoginPage() {
        driver = Hooks.getDriver();
        loginPage = new LoginPage(driver);
        loginPage.openPage(BASE_URL);
    }

    @When("the user clicks on the {string} card")
    public void theUserClicksOnTheCard(String portalName) {
        loginPage.clickPortalCard(portalName);
    }

    @And("the user enters email as {string}")
    public void theUserEntersEmailAs(String email) {
        loginPage.enterEmail(email);
    }

    @And("the user enters password as {string}")
    public void theUserEntersPasswordAs(String password) {
        loginPage.enterPassword(password);
    }

    @And("the user clicks the Sign In button")
    public void theUserClicksTheSignInButton() {
        loginPage.clickSignIn();
    }

    @Then("the user should see the Dashboard page")
    public void theUserShouldSeeTheDashboardPage() {
        Assert.assertTrue(loginPage.isDashboardVisible(),
            "Dashboard should be visible after successful login");
    }
}
