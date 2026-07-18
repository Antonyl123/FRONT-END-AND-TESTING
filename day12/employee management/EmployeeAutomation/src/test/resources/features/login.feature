Feature: Employee Management Login Page
  As a user of the AuraHR Employee Management System
  I want to log in through the correct portal
  So that I can access the system with my role-based permissions

  Background:
    Given the user is on the AuraHR login page

  @admin @smoke
  Scenario: Admin login with valid credentials
    When the user selects the "Admin Portal" card
    And the user enters email "admin@aurahr.com"
    And the user enters password "admin123"
    And the user clicks the sign in button
    Then the user should be redirected to the dashboard
    And the page should display "Dashboard"

  @employee @smoke
  Scenario: Employee login with valid credentials
    When the user selects the "Employee Portal" card
    And the user enters email "employee@aurahr.com"
    And the user enters password "employee123"
    And the user clicks the sign in button
    Then the user should be redirected to the dashboard
    And the page should display "Dashboard"

  @negative
  Scenario: Login with invalid credentials
    When the user selects the "Admin Portal" card
    And the user enters email "admin@aurahr.com"
    And the user enters password "wrongpassword"
    And the user clicks the sign in button
    Then the user should see the error message "Invalid email or password. Please try again."

  @ui
  Scenario: Portal selection cards are visible
    Then the "Admin Portal" card should be visible
    And the "Employee Portal" card should be visible
    And the page should display "Select your portal to continue"
