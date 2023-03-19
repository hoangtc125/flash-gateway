import {
  entityTableSelector,
  entityDetailsButtonSelector,
  entityDetailsBackButtonSelector,
  entityCreateButtonSelector,
  entityCreateSaveButtonSelector,
  entityCreateCancelButtonSelector,
  entityEditButtonSelector,
  entityDeleteButtonSelector,
  entityConfirmDeleteButtonSelector,
} from '../../support/entity';

describe('Pc e2e test', () => {
  const pcPageUrl = '/pc';
  const pcPageUrlPattern = new RegExp('/pc(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const pcSample = {};

  let pc;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/services/flashapp/api/pcs+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/services/flashapp/api/pcs').as('postEntityRequest');
    cy.intercept('DELETE', '/services/flashapp/api/pcs/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (pc) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/services/flashapp/api/pcs/${pc.id}`,
      }).then(() => {
        pc = undefined;
      });
    }
  });

  it('Pcs menu should load Pcs page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('pc');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Pc').should('exist');
    cy.url().should('match', pcPageUrlPattern);
  });

  describe('Pc page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(pcPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Pc page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/pc/new$'));
        cy.getEntityCreateUpdateHeading('Pc');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', pcPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/services/flashapp/api/pcs',
          body: pcSample,
        }).then(({ body }) => {
          pc = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/services/flashapp/api/pcs+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [pc],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(pcPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details Pc page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('pc');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', pcPageUrlPattern);
      });

      it('edit button click should load edit Pc page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Pc');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', pcPageUrlPattern);
      });

      it('edit button click should load edit Pc page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Pc');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', pcPageUrlPattern);
      });

      it('last delete button click should delete instance of Pc', () => {
        cy.intercept('GET', '/services/flashapp/api/pcs/*').as('dialogDeleteRequest');
        cy.get(entityDeleteButtonSelector).last().click();
        cy.wait('@dialogDeleteRequest');
        cy.getEntityDeleteDialogHeading('pc').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', pcPageUrlPattern);

        pc = undefined;
      });
    });
  });

  describe('new Pc page', () => {
    beforeEach(() => {
      cy.visit(`${pcPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Pc');
    });

    it('should create an instance of Pc', () => {
      cy.get(`[data-cy="make"]`).type('Gloves').should('have.value', 'Gloves');

      cy.get(`[data-cy="model"]`).type('scale').should('have.value', 'scale');

      cy.get(`[data-cy="price"]`).type('11200').should('have.value', '11200');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        pc = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', pcPageUrlPattern);
    });
  });
});
