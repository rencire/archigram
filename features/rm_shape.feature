Feature: Remove selected shapes
  As an user
  I want to be able to remove selected shapes from the board
  So that I can remove shapes I don't want


  Scenario: Remove selected shape 
    Given I have a board with shapes
    When I select one shape
    And I click on 'remove shapes' button
    Then I should see the shape removed from the board
    And I should see the edges incident on the shape removed as well


  Scenario: Remove multiple selected shapes 
    Given I have a board with shapes
    When I select more than one shape
    And I click on 'remove shapes' button
    Then I should see all the selected shapes removed from the board
    And I should see the edges incident on the selected shapes removed as well


