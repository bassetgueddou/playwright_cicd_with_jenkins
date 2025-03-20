Feature: Add Post Page

  @positive
  @parcours2
  @smoke
  @valid
  @ignore
  Scenario: Verify Add Post Page Elements
    Given I am on the dashboard
    When I write the title "Title2" in  input field
    When I write the content "Content" in text area
    When I Click on Save button
