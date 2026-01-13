describe('Formulário de consultoria ', () => {
    it('Deve solicitar consultoria individual', () => {
        cy.start()
        cy.submitLoginForm('papito@webdojo.com', 'katana123')

        cy.contains('button', 'Formulários')
            .should('be.visible')
            .click()

        
    })
});