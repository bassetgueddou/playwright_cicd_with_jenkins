  Feature:  Dashboard

  @parcours1
  @smoke
  @valid
  @ignore
  Scenario: Successful Click on Add Button
    Given I Connect on the dashboard
    When When I click on AddPost
    Then I should be redirected to the AddPost page