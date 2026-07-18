Feature: Employee Management Login Page
  As a user of the AuraHR Employee Management System
  I want to log in through the correct portal
  So that I can access the dashboard

  Background:
    Given the user navigates to the login page

  @test1
  Scenario: Admin login with valid credentials
    When the user clicks on the "Admin Portal" card
    And the user enters email as "admin@aurahr.com"
    And the user enters password as "admin123"
    And the user clicks the Sign In button
    Then the user should see the Dashboard page

  @test2
  Scenario: Employee login with valid credentials
    When the user clicks on the "Employee Portal" card
    And the user enters email as "employee@aurahr.com"
    And the user enters password as "employee123"
    And the user clicks the Sign In button
    Then the user should see the Dashboard page
