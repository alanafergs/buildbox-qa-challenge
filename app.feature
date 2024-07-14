Feature: User Registration

  Scenario: Registration with valid data
    Given I am on the registration page
    When I fill out the form with valid data
    And I submit the form
    Then I should see a success message

  Scenario: Registration with missing required fields
    Given I am on the registration page
    When I submit the form without filling in the required fields
    Then I should see an error message indicating required fields

  Scenario: Registration with invalid birth date
    Given I am on the registration page
    When I fill in the birth date field with an invalid value
    And I submit the form
    Then I should see an error message indicating an invalid birth date

  Scenario: Registration with invalid email adress
    Given I am on the registration page
    When I fill in the email field with an invalid value
    And I submit the form
    Then I should see an error message indicating an invalid email

  Scenario: Registration with non-matching passwords
    Given I am on the registration page
    When I fill in the password confirmation field with a different value from the password
    And I submit the form
    Then I should see an error message indicating non-matching passwords

  Scenario: Registration with already registered email adress
    Given I am on the registration page
    When I fill in the email field with an email that is already registered
    And I submit the form
    Then I should see an error message indicating the email is already registered

 Scenario: Registration with terms and conditions not accepted
    Given I am on the registration page
    When I fill out the form without accepting the terms and conditions
    And I submit the form
    Then I should see an error message indicating that the terms and conditions must be accepted

    
