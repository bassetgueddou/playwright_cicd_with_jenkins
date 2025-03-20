Feature: Login

  @parcours1 @smoke @valid @conn @positive
  Scenario Outline: Successful login
    Given I open the login page "<env>"
    When I login with username "<username>" and password "<password>"
    Then I should be redirected to the dashboard

    @int
    Examples:
      | username              | password     | env                             |
      | testeur_integration   | testeur_qa   | http://192.168.1.95:9091/admin/ |

    @rec
    Examples:
      | username              | password     | env                             |
      | testeur_recette       | testeur_qa_3 | http://192.168.1.95:9092/admin/ |
      | testeur_recette_2     | testeur_qa_4 | http://192.168.1.95:9092/admin/ |

  @smoke @invalid @negative
  Scenario: Failed login with wrong credentials
    Given I open the login page "<env>"
    When I login with username "<username>" and password "<password>"
    Then I should see an error message

    @int
    Examples:
      | username                 | password     | env                             |
      | testeur_integration_faux | testeur_qa   | http://192.168.1.95:9092/admin/ |

    @rec
    Examples:
      | username                 | password     | env                             |
      | testeur_integration_faux | testeur_qa   | http://192.168.1.95:9092/admin/ |