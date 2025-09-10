export interface ItemProps {
  id: number;
  name: string;
  color: string;
  size: string;
  price: string;
  url: string;
}

export default class CartAndOptionsPage {
  private webElements = {
    getTxtCurrentStep: () => cy.get(`.step-current span:contains("Panier et options")`),
    itemsDetails: {
      getBtnItemName: (name: string) => cy.get('.step-current button').contains(name),
      getTxtColor: (color: string) => cy.get('.step-current span').contains(color),
      getTxtSize: (size: string) => cy.get('.step-current p').contains(size),
      getTxtPrice: (price: string) => cy.get('.step-current .sales-price').contains(price),
    },
    orderSummary: {
      getTxtTotalItems: (totalItems: string) =>
        cy.get(`.cart-summary span:contains("${totalItems}")`),
      getTxtLabelTotalPrice: () => cy.get('.cart-summary span:contains("Montant total")'),
      getTxtTotalPrice: (totalPrice: string) =>
        cy.get('.cart-summary span:contains("Montant total")').next('.text-end').contains(totalPrice),
    },
    getBtnValidate: () => cy.get('.btn--validate:contains("Valider")'),
  }

  checkAddedItem(item: ItemProps) {
    this.webElements.itemsDetails.getBtnItemName(item.name).should('be.visible');
    this.webElements.itemsDetails.getTxtColor(item.color).should('be.visible');
    this.webElements.itemsDetails.getTxtSize("Taille "+item.size).should('be.visible');
    this.webElements.itemsDetails.getTxtPrice(item.price).should('be.visible');
  }

  validateCurrentStep() {
    this.webElements.getBtnValidate().click();
  }

  checkCartTotals(expectedItems: number, expectedPrice: number) {
    this.webElements.orderSummary.getTxtTotalItems(expectedItems + " articles")
      .should('be.visible');
    this.webElements.orderSummary.getTxtTotalPrice(expectedPrice + " €")
      .should('be.visible');
  }

}