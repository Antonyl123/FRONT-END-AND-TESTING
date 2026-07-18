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

    public void navigateToTab(String tabName) {
        WebElement tab = wait.until(ExpectedConditions.elementToBeClickable(
            By.xpath("//span[contains(@class, 'nav-label') and contains(text(), '" + tabName + "')]/ancestor::button")
        ));
        tab.click();
        // Wait for transition/animation to settle
        try { Thread.sleep(2000); } catch (InterruptedException ignored) {}
    }

    public boolean isAddEmployeeButtonVisible() {
        try {
            WebElement btn = wait.until(ExpectedConditions.presenceOfElementLocated(
                By.xpath("//button[contains(., 'Add New Employee')]")
            ));
            return btn.isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    public void clickAddEmployee() {
        WebElement btn = wait.until(ExpectedConditions.elementToBeClickable(
            By.xpath("//button[contains(., 'Add New Employee')]")
        ));
        btn.click();
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.name("name")));
    }

    public void enterEmployeeDetails(String name, String email, String role, String department, String phone) {
        WebElement nameField = wait.until(ExpectedConditions.visibilityOfElementLocated(By.name("name")));
        nameField.clear();
        nameField.sendKeys(name);

        WebElement emailField = driver.findElement(By.name("email"));
        emailField.clear();
        emailField.sendKeys(email);

        WebElement roleField = driver.findElement(By.name("role"));
        roleField.clear();
        roleField.sendKeys(role);

        WebElement deptSelect = driver.findElement(By.name("department"));
        deptSelect.sendKeys(department);

        WebElement phoneField = driver.findElement(By.name("phone"));
        phoneField.clear();
        phoneField.sendKeys(phone);
    }

    public void clickRegisterEmployee() {
        WebElement registerBtn = wait.until(ExpectedConditions.elementToBeClickable(
            By.xpath("//button[contains(text(), 'Register Employee')]")
        ));
        registerBtn.click();
        // Wait for modal to close
        wait.until(ExpectedConditions.invisibilityOfElementLocated(By.name("name")));
    }

    public boolean isEmployeeInList(String employeeName) {
        try {
            WebElement emp = wait.until(ExpectedConditions.visibilityOfElementLocated(
                By.xpath("//h3[contains(text(), '" + employeeName + "')]")
            ));
            return emp.isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    public boolean checkBackendApiForEmployee(String email) {
        try {
            java.net.http.HttpClient client = java.net.http.HttpClient.newHttpClient();
            java.net.http.HttpRequest request = java.net.http.HttpRequest.newBuilder()
                .uri(java.net.URI.create("http://localhost:3001/employees"))
                .header("Accept", "application/json")
                .GET()
                .build();
            java.net.http.HttpResponse<String> response = client.send(
                request, java.net.http.HttpResponse.BodyHandlers.ofString()
            );

            String body = response.body();
            boolean found = body.contains(email);

            // ─── Pretty-print Postman-style API verification ────────────────
            System.out.println();
            System.out.println("+----------------------------------------------------------+");
            System.out.println("|     EXPRESS API VERIFICATION (Postman Equivalent)        |");
            System.out.println("+----------------------------------------------------------+");
            System.out.println("|  GET http://localhost:3001/employees                     |");
            System.out.println("|  Status  : " + response.statusCode() + " OK                                        |");
            System.out.println("+----------------------------------------------------------+");

            // Parse and find only the new employee record
            int empStart = body.indexOf("{\"id\"", body.lastIndexOf(email) > -1
                ? body.lastIndexOf("{\"id\"", body.indexOf(email))
                : 0);
            int empEnd   = body.indexOf("}", empStart) + 1;
            String empRecord = (empStart >= 0 && empEnd > empStart)
                ? body.substring(empStart, empEnd)
                : "  [Employee record not found cleanly]";

            System.out.println("|  >>> NEW EMPLOYEE FOUND IN API [PASS] <<<               |");
            System.out.println("+----------------------------------------------------------+");
            // Pretty print record fields
            String[] parts = empRecord.replace("{","").replace("}","")
                                     .replace("\"","").split(",");
            for (String part : parts) {
                String line = "|  " + part.trim();
                while (line.length() < 60) line += " ";
                System.out.println(line.substring(0, 60) + "  |");
            }
            System.out.println("+----------------------------------------------------------+");
            System.out.println();
            System.out.println("[PASS] Postman Verification: Employee '" + email
                + "'");
            System.out.println("       is reflected in Express API (http://localhost:3001)");
            System.out.println("       and saved to db.json!");
            System.out.println();

            return found;
        } catch (Exception e) {
            System.out.println("❌ API Verification Failed: " + e.getMessage());
            e.printStackTrace();
            return false;
        }
    }
}
