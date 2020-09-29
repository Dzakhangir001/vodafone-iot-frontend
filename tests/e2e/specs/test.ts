// https://docs.cypress.io/api/introduction/api.html

describe('My First Test', () => {
  it('Visit Login', () => {
    cy.visit('/login');
    // cy.contains('Anmeldung');
  });
});
