describe('Simulando Mouseover', () => {
    it('Deve mostrar um texto ao passar o mouse em cima do link do instagram', () => {
        cy.start()
        cy.submitLoginForm("papito@webdojo.com", "katana123")

        cy.contains('Isso é Mouseover!')
            .should('not.exist')

        cy.get('[data-cy="instagram-link"]').realHover()
         /* O cypress não consegue validar o hover então nesse caso você para o cypress e no bash instala o npm install cypress-real-events */
        
        cy.contains('Isso é Mouseover!')
            .should('exist')
            .and('be.visible')
    });
});