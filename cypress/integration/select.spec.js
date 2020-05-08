/// <reference types="cypress" />

context('Select', () => {
  it('Examples opening', () => {
    cy.visit('https://sanusart.github.io/react-dropdown-select/examples/');
    cy.url().should('eq', 'https://sanusart.github.io/react-dropdown-select/examples/');
  });

  it('Basic exists and dropdown opens', () => {
    const code = `<Select
options={options}
values={[]}
/>`;
    cy.get('textarea').eq(0).clear().type(code, { parseSpecialCharSequences: false });
    cy.get('.react-dropdown-select')
      .eq(0)
      .click({ force: true })
      .find('.react-dropdown-select-dropdown')
      .should('exist');
  });

  it('Basic can select values', () => {
    cy.get('.react-dropdown-select')
      .eq(0)
      .find('.react-dropdown-select-content')
      .trigger('click')
      .type('a')
      .type('{downarrow}')
      .type('{enter}');
  });
});
