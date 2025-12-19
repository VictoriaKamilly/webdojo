describe('Login', () => {
  it('Deve logar com sucesso', () => {
    cy.start()

    cy.submitLoginForm('papito@webdojo.com', 'katana123')

    cy.get('[data-cy="user-name"]') //data-cy pode ser solicitado ao desenvolvedor para que ele adicione no código, permitindo uma identificação consistente e confiável dos elementos durante a automação dos testes no Cypress.
      .should('be.visible')
      .and('have.text','Fernando Papito')

    cy.get('[data-cy="welcome-message"]')
      .should('be.visible')
      .and('have.text', 'Olá QA, esse é o seu Dojo para aprender Automação de Testes.')
  })

   it('Não deve logar com senha invalida', () => {
    cy.start()

    cy.submitLoginForm('papito@webdojo.com', 'katana23')

    cy.get('[data-sonner-toaster="true"] li.toast')
      .should('be.visible')
      .and('contain.text', 'Acesso negado')

  })

  it('Não deve logar com email não cadastrado', () => {
    cy.start()

    cy.submitLoginForm('papito@webdo.com', 'katana123')

    cy.get('[data-sonner-toaster="true"] li.toast')
      .should('be.visible')
      .and('contain.text', 'Acesso negado')

  })

  it('Não deve logar sem as credenciais de login', () => {
    cy.start()

    cy.contains('button', 'Entrar').click();

    cy.get(':nth-child(1) > .mt-2')
      .should('be.visible')
      .and('contain.text', 'Ei, não esqueça de digitar seu email!')

    cy.get('.space-y-4 > :nth-child(2) > .mt-2')
      .should('be.visible')
      .and('contain.text', 'Você precisa de uma senha para entrar! 🔒')
  })
})