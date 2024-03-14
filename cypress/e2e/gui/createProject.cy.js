import { faker } from '@faker-js/faker'

describe('Creat Project', () => {
    before(() => {
        cy.api_deleteProjects()
        cy.login()
    });

    it('sucessfully', () => {
        const project = {
            //Importando dados aleatorios da biblioteca faker
            name: `project-${faker.datatype.uuid()}`,
            description: faker.random.word(5)
        }
        
        cy.gui_createProject(project)
        //Verificando a url apos a criacao do projeto
        cy.url().should('be.equal', `${Cypress.config('baseUrl')}/${Cypress.env('user_name')}/${project.name}`)
        //Verificando o nome do projeto
        cy.contains(project.name).should('be.visible')
        //Verificando a descriçao
        cy.contains(project.description).should('be.visible')
    })
});

