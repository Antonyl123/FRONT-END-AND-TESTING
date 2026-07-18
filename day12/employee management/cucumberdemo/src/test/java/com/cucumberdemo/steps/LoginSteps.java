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

    @When("the admin navigates to the {string} tab")
    public void adminNavigatesToTab(String tabName) {
        loginPage.navigateToTab(tabName);
    }

    @When("the employee navigates to the {string} tab")
    public void employeeNavigatesToTab(String tabName) {
        loginPage.navigateToTab(tabName);
    }

    @And("the admin clicks the {string} button")
    public void adminClicksButton(String btnName) {
        if (btnName.equalsIgnoreCase("Add New Employee")) {
            loginPage.clickAddEmployee();
        } else if (btnName.equalsIgnoreCase("Register Employee")) {
            loginPage.clickRegisterEmployee();
        }
    }

    @And("the admin enters the following employee details:")
    public void adminEntersEmployeeDetails(io.cucumber.datatable.DataTable dataTable) {
        java.util.Map<String, String> data = dataTable.asMap(String.class, String.class);
        loginPage.enterEmployeeDetails(
            data.get("Name"),
            data.get("Email"),
            data.get("Role"),
            data.get("Department"),
            data.get("Phone")
        );
    }

    @Then("the new employee {string} should be visible in the employees list")
    public void theNewEmployeeShouldBeVisibleInTheEmployeesList(String employeeName) {
        Assert.assertTrue(loginPage.isEmployeeInList(employeeName),
            "Employee " + employeeName + " should be present in the employees list");
    }

    @And("the new employee {string} should reflect in the backend API")
    public void theNewEmployeeShouldReflectInTheBackendApi(String email) {
        Assert.assertTrue(loginPage.checkBackendApiForEmployee(email),
            "Employee with email " + email + " should be successfully stored and returned by json-server API at http://localhost:3001/employees");
    }

    @Then("the {string} button should not be visible")
    public void theButtonShouldNotBeVisible(String btnName) {
        if (btnName.equalsIgnoreCase("Add New Employee")) {
            Assert.assertFalse(loginPage.isAddEmployeeButtonVisible(),
                "Add New Employee button should be hidden for standard employee portal users");
        }
    }
}
