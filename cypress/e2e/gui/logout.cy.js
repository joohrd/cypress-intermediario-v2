describe('Logout', () => {
    //Sempre executa antes de cada teste
    before(() => {
        cy.login()
        cy.visit('/') 
    });
    
    it('successfully', () => {
        cy.logout()
        //Afirma que foi deslogado com sucesso
        cy.url().should('be.equal', `${Cypress.config('baseUrl')}/users/sign_in`)
    });
});