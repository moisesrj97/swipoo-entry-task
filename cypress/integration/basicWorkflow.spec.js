/* eslint-disable no-undef */

describe('Selecting 4 inputs', () => {
  it('Load car details and calculate price', () => {
    cy.visit('http://localhost:3000');
    cy.get('#brand').select('Audi');
    cy.get('#date').click().type('2018-01-01');
    cy.get('#fuel-type').select('G');
    cy.get('#fetched-cars').select('A4 Allroad Quattro-ultra 2.0 TFSI S-T 252');
    cy.contains('A4 Allroad Quattro-ultra 2.0 TFSI S-T 252 - Audi').should(
      'exist'
    );
    cy.get('.flex-col > :nth-child(2) > :nth-child(2)').then(($cell) => {
      let price = $cell.text().replace('€', '');
      for (let i = 2018; i < new Date().getUTCFullYear(); i += 1) {
        cy.contains(Math.round(price * 0.9)).should('exist');
        price = Math.round(price * 0.9);
      }
    });
  });
});

describe('Selecting 3 inputs with no cars found', () => {
  it('Should show no cars found', () => {
    cy.visit('http://localhost:3000');
    cy.get('#brand').select('Citroën');
    cy.get('#date').click().type('2022-01-01');
    cy.get('#fuel-type').select('G');
    cy.contains(
      "Sorry, we couldn't find any car matching your criteria."
    ).should('exist');
  });
});

describe('Selecting 3 inputs with server error', () => {
  it('Load show server error', () => {
    cy.visit('http://localhost:3000');
    cy.intercept('GET', '**', { statusCode: 404 });
    cy.get('#brand').select('Audi');
    cy.get('#date').click().type('2018-01-01');
    cy.get('#fuel-type').select('G');
    cy.contains('Sorry, there was an error in the server.').should('exist');
  });
});

describe('Clicking darkMode switch', () => {
  it('Toggles darkMode', () => {
    cy.visit('http://localhost:3000');
    cy.get('[data-testid="dark-mode-switch"]').click();
    cy.get('body').should('have.css', 'background-color', 'rgb(18, 18, 18)');
    cy.get('[data-testid="dark-mode-switch"]').click();
    cy.get('body').should('have.css', 'background-color', 'rgb(255, 255, 255)');
  });
});
