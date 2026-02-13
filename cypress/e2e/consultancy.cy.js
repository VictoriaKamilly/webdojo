describe("Formulário de consultoria ", () => {
  
  before(() => {
    cy.log("Iniciando os testes de consultoria");
  })

  beforeEach(() => {
    cy.start();
    cy.submitLoginForm("papito@webdojo.com", "katana123");

    cy.goTo("Formulários", "Consultoria");
  })

  it("Deve solicitar consultoria individual", () => {
    cy.start();
    cy.submitLoginForm("papito@webdojo.com", "katana123");

    cy.goTo("Formulários", "Consultoria");

    /* 
        Aqui é utilizado os ids
    
        cy.get("#name").type("Victoria Kamilly de Souza");
        cy.get("#email").type("testea@gmail.com");
        cy.get("#phone").type("83987613462"); */

    cy.get('input[placeholder="Digite seu nome completo"]').type(
      "Matheus Julio Oliver da Cruz",
    );
    cy.get('input[placeholder="Digite seu email"]').type(
      "matheusjuliodacruz@centroin.com.br",
    );
    cy.get('input[placeholder="(00) 00000-0000"]')
      .type("83995645296")
      .should("have.value", "(83) 99564-5296"); //valida a utilização da mascara

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

    cy.contains("label", "Tipo de Consultoria")
      .parent()
      .find("select")
      .select("Individual");

    cy.contains("span", "Pessoa Física")
      /* //span[text()="Pessoa Física"]/..//input */
      .parent()
      .find("input")
      .check() //or .click()
      .should("be.checked");

    /* 
        Também da pra fazer diretamente pelo elemento pai, o codigo fica da a seguinte forma 
        
        cy.contains('label', 'Pessoa Física') 
            .find('input')
            .check() 
    
        */

    cy.contains("label", "Pessoa Jurídica")
      .find("input")
      .should("be.not.checked");

    /* cy.get('input[placeholder="000.000.000-00"')
            .type('28209846493')
            .should('have.value', '282.098.464-93')
        */

    cy.contains("label", "CPF") // essa é uma outra forma de se fazer a mesma coisa que com o placeholder
      .parent()
      .find("input")
      .type("28209846493")
      .should("have.value", "282.098.464-93");

    const discoveryChannels = [
      "Instagram",
      "LinkedIn",
      "Udemy",
      "YouTube",
      "Indicação de Amigo",
    ]; //checkbox multiplos

    discoveryChannels.forEach((channel) => {
      cy.contains("label", channel).find("input").check().should("be.checked");
    });

    /* cy.get("input[type=file") //upload de arquivos
      .selectFile("./cypress/fixtures/relatorioPowerbanks.pdf", {
        force: true,
      }); */

    cy.get(
      'textArea[placeholder="Descreva mais detalhes sobre sua necessidade"]',
    ).type(
      '"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."',
    );

    const techs = [
      "Cypress",
      "Selenium",
      "WebdriverIO",
      "Playwright",
      "Robot Framework",
    ];

    techs.forEach((tech) => {
      cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
        .type(tech)
        .type("{enter}"); //dessa forma o cypress consegue ter o comportamento do usuário ao pressionar a tecla enter

      cy.contains("label", "Tecnologias")
        .parent()
        .contains("span", tech)
        .should("be.visible");
    });

    cy.contains("label", "termos de uso").find("input").check();

    cy.contains("button", "Enviar formulário").click();

    cy.get(".modal", { timeout: 7000 })
      .should("be.visible")
      .find(".modal-content")
      .should("be.visible")
      .and(
        "have.text",
        "Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.",
      );

    /* cy.contains('Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')
            .should('be.visible')
            .wait(3000) */

    cy.contains("button", "Fechar").click();
  });

  it("Deve verificar os campos obrigatorios", () => {
    cy.start();
    cy.submitLoginForm("papito@webdojo.com", "katana123");

    cy.goTo("Formulários", "Consultoria");

    cy.contains("button", "Enviar formulário").click();

    cy.contains("label", "Nome Completo *")
      .parent()
      .find("p")
      .should("be.visible")
      .should("have.text", "Campo obrigatório")
      .and("have.class", "text-red-400")
      .and("have.css", "color", "rgb(248, 113, 113)");

    cy.contains("label", "Email *")
      .parent()
      .find("p")
      .should("be.visible")
      .should("have.text", "Campo obrigatório")
      .and("have.class", "text-red-400")
      .and("have.css", "color", "rgb(248, 113, 113)");

    cy.contains("label", "termos de uso")
      .parent()
      .find("p")
      .should("be.visible")
      .should("have.text", "Você precisa aceitar os termos de uso")
      .and("have.class", "text-red-400")
      .and("have.css", "color", "rgb(248, 113, 113)");

    /* cy.contains('p', 'Campo obrigatório')
            .should('be.visible')
            .and('have.class', 'text-red-400')
            .and('have.css', 'color', 'rgb(248, 113, 113)')

        cy.contains('p', 'Campo obrigatório')
            .should('be.visible')
            .and('have.class', 'text-red-400')
            .and('have.css', 'color', 'rgb(248, 113, 113)')  
            
            cy.contains('p', 'Você precisa aceitar os termos de uso')
            .should('be.visible')
            .and('have.class', 'text-red-400')
            .and('have.css', 'color', 'rgb(248, 113, 113)')
            
            */ // dessa forma o cypress não consegue validar corretamente o retorno de campo obrigatorio
  })

  afterEach(() => {
    cy.log("Isso acontece depois de cada teste");
  })

  after(() => {
    cy.log("Isso acontece depois de todos os testes uma única vez");
  })
});
