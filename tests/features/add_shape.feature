Feature: Add shapes to drawboard
  As an user
  I want to be able to add new shapes to the board
  So that I can complete my diagram

  Scenario Outline: Add new rects to the board
    Given I have a <state> board
    When I click on an empty spot
    Then a new shape should be created

    Examples:
      | state     |
      | blank     |
      | non-blank |


  Scenario: No new shape should be added when clicking on existing shape
    Given I have a board with existing shapes
    When I click on an existing shape
    Then no new shape should be created




