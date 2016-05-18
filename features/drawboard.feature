Feature: Drawboard
  As an user
  I want to be able to create/modify my architecture diagram
  So that I can show my changes to other teams

  Background:
    Given I am on the main drawboard page


  Scenario: Save state of diagram
    Given I have a diagram ready
    When  I click on the Save State button
    Then  I should see that the diagram has been saved

    When  I reload the main page
    Then  I should see the saved diagram 


  Scenario: Add edges between rects
    Given I have rects A and B
    When  I hold the shift key
    And   I drag from rect A to rect B
    Then  I should see an edge form between rects A and B


  Scenario: Auto update edge coordinates when moving rects around
    Given I have a diagram with edges:
      | from | to |
      | A    | B  |
    When  I click and drag around rect B 
    Then  I should see the edge update to follow B's new position




  Scenario: Remove rects from the board
  Scenario: Space out multiple edges between two rects so that they don't overlap
  Scenario: User labeled rects
  Scenario: User labeled edges

