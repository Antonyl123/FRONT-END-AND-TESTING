package com.employee.automation.runner;

import io.cucumber.testng.AbstractTestNGCucumberTests;
import io.cucumber.testng.CucumberOptions;
import org.testng.annotations.DataProvider;

/**
 * TestNG-based Cucumber Test Runner.
 * Configures Cucumber to find feature files and glue (step definitions + hooks).
 */
@CucumberOptions(
    features = "src/test/resources/features",
    glue = {"com.employee.automation.steps", "com.employee.automation.hooks"},
    plugin = {
        "pretty",
        "html:target/cucumber-reports/cucumber.html",
        "json:target/cucumber-reports/cucumber.json"
    },
    monochrome = true
)
public class TestRunner extends AbstractTestNGCucumberTests {

    /**
     * Override to run scenarios in parallel if needed.
     * Set parallel = true for parallel execution.
     */
    @Override
    @DataProvider(parallel = false)
    public Object[][] scenarios() {
        return super.scenarios();
    }
}
