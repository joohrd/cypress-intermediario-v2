//Comando de login
Cypress.Commands.add('login', (
    //Se não passar nada o user e senha vira da variavel de ambiente user e password
    user = Cypress.env('user_name'),
    password = Cypress.env('user_password'),
    //faz o cache de sessao
    { cacheSession = true } = {},
  ) => {
    const login = () => {
      cy.visit('/users/sign_in')
  
      cy.get("[data-qa-selector='login_field']").type(user)
      cy.get("[data-qa-selector='password_field']").type(password, { log: false })
      cy.get("[data-qa-selector='sign_in_button']").click()
    }
    //Verifica se esta na url certa, na home, e executa a funcao de login
    const validate = () => {
        cy.visit('/')
        cy.location('pathname', { timeout: 1000 })
          .should('not.equal', '/users/sign_in')
      }
    //compartilha o cache da sessao entre as specs (arquivos de teste)
    const options = {
      cacheAcrossSpecs: true,
      validate,
    }
    //Verifica se o cachessions é true, para compartilhar o cache ou não com outras specs
    if (cacheSession) {
      cy.session(user, login, options)
    } else {
      login()
    }
  })
//Comando de logout
Cypress.Commands.add('logout', () => {
    cy.get('.qa-user-avatar').click()
    cy.contains('Sign out').click()

})
//Comando para criar um projeto
Cypress.Commands.add('gui_createProject', project => {
    //Visitando a pagina de criacao de projeto direto
    cy.visit('/projects/new')
  
    cy.get('#project_name').type(project.name)
    cy.get('#project_description').type(project.description)
    cy.get('.qa-initialize-with-readme-checkbox').check()
    cy.contains('Create project').click()
  })
//Comando que cria uma issue
Cypress.Commands.add('gui_createIssue', issue => {
    cy.visit(`/${Cypress.env('user_name')}/${issue.project.name}/issues/new`)
  
    cy.get('.qa-issuable-form-title').type(issue.title)
    cy.get('.qa-issuable-form-description').type(issue.description)
    cy.contains('Submit issue').click()
  })