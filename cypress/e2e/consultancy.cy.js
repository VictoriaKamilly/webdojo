describe('Formulário de consultoria ', () => {
    it('Deve solicitar consultoria individual', () => {
        cy.start()
        cy.submitLoginForm('papito@webdojo.com', 'katana123')

        cy.get(':nth-child(3) > .grid > :nth-child(1)').click()
    })
});