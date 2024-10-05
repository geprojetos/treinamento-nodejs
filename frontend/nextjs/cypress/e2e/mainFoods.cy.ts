describe('Foods', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/')
  })

  it('should be able get all foods', () => {
    cy.get('button[data-id="new-food"]')
    cy.get('button[data-id="new-food"]').contains('Cadastrar')
    cy.get('section[data-id="food-list"]')
    cy.get('h1[data-id="food-list-title"]')
    cy.get('p[data-id="food-list-price"]')
    cy.get('button[data-id="food-list-btn-details"]')
    cy.get('button[data-id="food-list-btn-remove"]')
  })
  
  it('should be able navigate details foods', () => {
    cy.get('button[data-id="food-list-btn-details"]').first().click()
    cy.get('section[data-id="food-details"]')
    cy.get('h1[data-id="food-details-title"]')
    cy.get('p[data-id="food-details-price"]')
    cy.get('p[data-id="food-details-category"]')
    cy.get('button[data-id="food-details-btn-back"]')
  })

  it('should be able back to main page', () => {
    cy.get('button[data-id="food-list-btn-details"]').first().click()
    cy.get('button[data-id="food-details-btn-back"]').click()
    cy.url('http://localhost:8080/')
    cy.get('section[data-id="food-list"]')
  })

  it('should be able error create new food, name is required', () => {
    cy.get('button[data-id="new-food"]').click()
    cy.get('input[data-id="food-create-input-price"]').type("10")
    cy.get('input[data-id="food-create-input-category"]').type("teste-cy")
    cy.get('button[data-id="food-create-btn-create"]').click()
    cy.get('span[data-id="food-create-error-input-name"]').contains("Name is required")
  })

  it('should be able error create new food, price is required', () => {
    cy.get('button[data-id="new-food"]').click()
    cy.get('input[data-id="food-create-input-name"]').type("teste-cy")
    cy.get('input[data-id="food-create-input-category"]').type("teste-cy")
    cy.get('button[data-id="food-create-btn-create"]').click()
    cy.get('span[data-id="food-create-error-input-price"]').contains("Price is required")
  })

  it('should be able error create new food, category is required', () => {
    cy.get('button[data-id="new-food"]').click()
    cy.get('input[data-id="food-create-input-name"]').type("teste-cy")
    cy.get('input[data-id="food-create-input-price"]').type("10")
    cy.get('button[data-id="food-create-btn-create"]').click()
    cy.get('span[data-id="food-create-error-input-category"]').contains("Category is required")
  })

  it('should be able create new food', () => {
    cy.get('button[data-id="new-food"]').click()
    cy.get('input[data-id="food-create-input-name"]').type("teste-cy")
    cy.get('input[data-id="food-create-input-price"]').type("10")
    cy.get('input[data-id="food-create-input-category"]').type("teste-cy")
    cy.get('button[data-id="food-create-btn-create"]').click()
    cy.url('http://localhost:8080/')
    cy.get('button[data-id="new-food"]').contains('Cadastrar')
    cy.get('h1[data-id="food-list-title"]').contains('teste-cy')
    cy.get('p[data-id="food-list-price"]').contains('10')
  })

  it('should be able delete food', async () => {
    cy.get('button[data-id="food-list-btn-remove"]').last().click()
    cy.window().then((win) =>
      cy.stub(win, 'confirm').as('confirm').returns(true),
    )
  })
})