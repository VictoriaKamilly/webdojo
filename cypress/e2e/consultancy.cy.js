describe("Formulário de consultoria ", () => {
  it("Deve solicitar consultoria individual", () => {
    cy.start();
    cy.submitLoginForm("papito@webdojo.com", "katana123")

    cy.goTo("Formulários", "Consultoria")

    /* 
    Aqui é utilizado os ids

    cy.get("#name").type("Victoria Kamilly de Souza");
    cy.get("#email").type("viictoriakamillydesouza@gmail.com");
    cy.get("#phone").type("83987617062"); */

    cy.get('input[placeholder="Digite seu nome completo"').type("Matheus Julio Oliver da Cruz")
    cy.get('input[placeholder="Digite seu email"').type("matheusjuliodacruz@centroin.com.br")
    cy.get('input[placeholder="(00) 00000-0000"')
        .type("83995645296")
        .should('have.value', '(83) 99564-5296') //valida a utilização da mascara

    //cy.get('#consultancyType').select('In Company') Esse caso é utilizado quando possui um id e a tag select
    
    /* Em caso de não ter um identificador ou a tag select no html é possivel efetuar a localização do mesmo a partir de um Xpath nesse caso o Xpath fica //label[text()="Tipo de Consultoria"] 
    
    O Xpath da maneira como esta não consegue encontrar o elemento pai pois o mesmo é um elemento irmão, para que seja possivel o Xpath fica 
    
    //label[text()="Tipo de Consultoria"]/..//select

    vale ressaltar que o cypress não funciona com XPath 100% nesse caso para que o mesmo consiga efetuar a localização do elemento  é da seguinte forma 

    cy.contains('label', 'Tipo de Consultoria')
        .parent()
        .find('select')
        .select('In Company') 


    Nesse caso, essa é maneira correta de escrever Xpath com o cypress
    */

    cy.contains('label', 'Tipo de Consultoria')
        .parent()
        .find('select')
        .select('Individual') 

    cy.contains('span', 'Pessoa Física') 
     /* //span[text()="Pessoa Física"]/..//input */
        .parent()
        .find('input')
        .check() //or .click()
        .should('be.checked')
    

    /* 
    Também da pra fazer diretamente pelo elemento pai, o codigo fica da a seguinte forma 
    
    cy.contains('label', 'Pessoa Física') 
        .find('input')
        .check() 

    */

    cy.contains('label', 'Pessoa Jurídica')
        .find('input')
        .should('be.not.checked')

    /* cy.get('input[placeholder="000.000.000-00"')
        .type('28209846493')
        .should('have.value', '282.098.464-93')
    */

    cy.contains('label', 'CPF') // essa é uma outra forma de se fazer a mesma coisa que com o placeholder
        .parent()
        .find('input')
        .type('28209846493')
        .should('have.value', '282.098.464-93')

  });
});
