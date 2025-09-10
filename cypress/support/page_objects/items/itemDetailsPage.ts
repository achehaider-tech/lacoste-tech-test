import { ItemProps } from "../checkout/cartAndOptionsPage";

export default class ItemDetailsPage {
  private webElements = {
    getBtnSelectSize: () => cy.get(`button:contains("Sélectionnez votre taille")`),
    sizePopin: {
      getPopin: () => cy.get('.popin'),
      getPopinTitle: () => cy.get('.popin .popin-header-title'),
      getBtnSize: (size: string) => cy.get(`.popin button:contains("${size}")`),
      getBtnPopinAddToCart: () => cy.get(`.popin .btn-cta:contains("Ajouter au panier")`),
      getBtnClosePopin: () => cy.get('.popin .popin-close-button'),
    },
    getBtnAddToCart: () =>
      cy.get(`.pdp-product-details .btn-cta:contains("Ajouter au panier")`).first(),

  }

  selectItemSize(item: ItemProps, addToCart: boolean = true) {
    this.webElements.getBtnSelectSize().click();
    this.webElements.sizePopin.getPopin().should('be.visible');
    this.webElements.sizePopin.getBtnSize(item.size).click();
    cy.wait(1000);
    if (addToCart){
      this.webElements.sizePopin.getBtnPopinAddToCart().click();
    }
    this.webElements.sizePopin.getPopinTitle()
      .contains("Sélectionnez votre taille")
      .should('not.exist');
    this.webElements.sizePopin.getPopinTitle()
      .contains("L’article a été ajouté à votre panier")
      .should('be.visible');
    this.webElements.sizePopin.getBtnClosePopin().click();
  }

}