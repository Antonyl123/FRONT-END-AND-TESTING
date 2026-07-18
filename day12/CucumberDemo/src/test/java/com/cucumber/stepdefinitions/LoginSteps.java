package com.cucumber.stepdefinitions;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import io.github.bonigarcia.wdm.WebDriverManager;

public class LoginSteps {

    WebDriver driver;

    @Given("User opens the login page")
    public void user_opens_the_login_page() {
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
        driver.get("https://www.facebook.com/"); 
    }

    @When("user enters the username {string}")
    public void user_enters_the_username(String user) {
        driver.findElement(By.id("_R_1h6kqsqppb6amH1_")).sendKeys(user);
    }

    @When("user enters the password {string}")
    public void user_enters_the_password(String pass) {
        driver.findElement(By.id("_R_1hmkqsqppb6amH1_")).sendKeys(pass);
    }

    @Then("click the Login Button")
    public void click_the_login_button() {
        driver.findElement(By.xpath("//div/div/span/span[contains(text(),'Log in')]")).click();
        driver.quit();
    }
}
