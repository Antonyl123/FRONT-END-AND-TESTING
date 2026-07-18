Feature: Employee Management Portal Automation
  As a user of the AuraHR Employee Management System
  I want to log in and manage employees
  So that the data is correctly reflected in the API

  Background:
    Given the user navigates to the login page

  @test1
  Scenario: Admin logs in and adds a new employee reflecting in the API
    When the user clicks on the "Admin Portal" card
    And the user enters email as "admin@aurahr.com"
    And the user enters password as "admin123"
    And the user clicks the Sign In button
    Then the user should see the Dashboard page
    When the admin navigates to the "Employees" tab
    And the admin clicks the "Add New Employee" button
    And the admin enters the following employee details:
      | Name       | Alex Turing               |
      | Email      | alex.turing@aurahr.com    |
      | Role       | Software Tester           |
      | Department | Engineering               |
      | Phone      | +1-555-7890               |
    And the admin clicks the "Register Employee" button
    Then the new employee "Alex Turing" should be visible in the employees list
    And the new employee "alex.turing@aurahr.com" should reflect in the backend API

  @test2
  Scenario: Employee logs in and has restricted access
    When the user clicks on the "Employee Portal" card
    And the user enters email as "employee@aurahr.com"
    And the user enters password as "employee123"
    And the user clicks the Sign In button
    Then the user should see the Dashboard page
    When the employee navigates to the "Employees" tab
    Then the "Add New Employee" button should not be visible
