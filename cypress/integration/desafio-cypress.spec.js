/// <reference types="Cypress" />

describe('Sign in to GitHub', function () {

     
    beforeEach(function () {
        cy.visit('https://github.com/login')
    })

    it('Deve efetuar o login com sucesso com e-mail', function() {
        cy.get('#login_field').type('thaysalopessilva@gmail.com')
        cy.get('#password').type('Th210990')
        cy.get('.position-relative > .btn').click()
        cy.url().should('eq', 'https://github.com/')
        cy.get('.AppHeader-context-item-label').should('be.visible')
        
    })

    it('Deve efetuar o login com sucesso com username', function() {
        cy.get('#login_field').type('ThaysaLopes')
        cy.get('#password').type('Th210990')
        cy.get('.position-relative > .btn').click()
        cy.url().should('eq', 'https://github.com/')
        cy.contains('Updates to your homepage feed').should('be.visible')
    })

    it('Exibir mensagem de erro ao submeter login com um email não cadastrado', function() {
        cy.get('#login_field').type('thaysa@gmail.com')
        cy.get('#password').type('Th210990')
        cy.get('.position-relative > .btn').click()
        cy.url().should('not.include', '/pagina-de-redirecionamento')
        cy.contains('Incorrect username or password.').should('be.visible')

    })

    it('Exibir mensagem de erro ao submeter login com senha inválida', function() {
        cy.get('#login_field').type('thaysalopessilva@gmail.com')
        cy.get('#password').type('Th21099')
        cy.get('.position-relative > .btn').click()      
        cy.get('#password').should('have.value', '')
        cy.contains('Incorrect username or password.').should('be.visible')
                
    })

    it('Exibir mensagem de erro ao submeter o login com os campos login e senha em branco', function(){
        cy.get('.position-relative > .btn').click()
        cy.url().should('eq', 'https://github.com/session')
        cy.contains('Incorrect username or password.').should('be.visible')


    })

    it('Deve redirecionar para a página "Esqueci a Senha"', function() {
        cy.get('#forgot-password').click()
        cy.url().should('eq', 'https://github.com/password_reset')
        cy.contains('Reset your password').should('be.visible')

    })


})