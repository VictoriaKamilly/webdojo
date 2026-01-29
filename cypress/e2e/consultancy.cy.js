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


        const discoveryChannels = ['Instagram', 'LinkedIn', 'Udemy', 'YouTube', 'Indicação de Amigo'] //checkbox multiplos

        discoveryChannels.forEach((channel) => {
            cy.contains('label', channel)
                .find('input')
                .check()
                .should('be.checked')
        });

        cy.get('input[type=file') //upload de arquivos 
            .selectFile('./cypress/fixtures/relatorioPowerbanks.pdf', { force: true })

        cy.get('textArea[placeholder="Descreva mais detalhes sobre sua necessidade"]')
            .type('"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"')


        const techs = [
            'Cypress',
            'Selenium',
            'WebdriverIO',
            'Playwright',
            'Robot Framework'
        ]

        techs.forEach((tech) => {
            cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
                .type(tech)
                .type('{enter}') //dessa forma o cypress consegue ter o comportamento do usuário ao pressionar a tecla enter


            cy.contains('label', 'Tecnologias')
                .parent()
                .contains('span', tech)
                .should('be.visible')
        })

        cy.contains('label', 'termos de uso')
            .find('input')
            .check()

        cy.contains('button', 'Enviar formulário')
            .click()

        cy.contains('Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')
            .should('be.visible')
            .wait(3000)
        
        cy.contains('button', 'Fechar')
            .click()
    });
});
