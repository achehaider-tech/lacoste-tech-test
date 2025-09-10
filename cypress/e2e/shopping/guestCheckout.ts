import NavBar from '$pageObjects/navbar';
import ItemDetailsPage from '$pageObjects/items/itemDetailsPage';
import CartAndOptionsPage, { ItemProps } from '$pageObjects/checkout/cartAndOptionsPage';
import Homepage from '$support/page_objects/homepage';

const homepage = new Homepage();
const navbar = new NavBar();
const itemDetailsPage = new ItemDetailsPage();
const cartAndOptionsPage = new CartAndOptionsPage();

describe('As a guest user - Manage cart', () => {
  Cypress.on("uncaught:exception", (err, runnable) => {
    // returning false here prevents Cypress from failing the test
    return false;
  });

  let checkoutTestScenarios: any;

  beforeEach(() => {
    cy.fixture('checkoutTestScenarios').then((testData) => {
      //cy.wrap(checkoutTestScenarios).as('checkoutTestScenarios');
      checkoutTestScenarios = testData;
    });
    homepage.visitHomepage("fr");

  });

  it('Add items to the cart and verify the cart content is correct', () => {
    cy.fixture('items').then((items) => {
      checkoutTestScenarios.addItemsToCart.items.forEach((testItem: any) => {
        const item = items.polos.find((polo: ItemProps) => polo.id === testItem.id);

        if (!item) {
          throw new Error(`Item with id ${testItem.id} not found in fixtures`);
        }

        cy.visit(`/${item.url}`, {
          headers: {
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36',
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
            'accept-language': 'en-US,en;q=0.9',
            'sec-ch-ua': '"Chromium";v="116", "Not)A;Brand";v="24", "Google Chrome";v="116"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'document',
            'sec-fetch-mode': 'navigate',
            'sec-fetch-site': 'none',
          },
          failOnStatusCode: false,
          timeout: 60000
        });
        //Select item size and add to cart
        itemDetailsPage.selectItemSize(item, true);
      });

      //got to cart page and verify added items
      navbar.gotoCart();
      checkoutTestScenarios.addItemsToCart.items.forEach((testItem: any) => {
        const item = items.polos.find((polo: ItemProps) => polo.id === testItem.id);

        cartAndOptionsPage.checkAddedItem(item);
      });

      // Verify cart total section
      cartAndOptionsPage.checkCartTotals(
        checkoutTestScenarios.addItemsToCart.expectedTotalItems,
        checkoutTestScenarios.addItemsToCart.expectedTotalPrice
      );
    });
  });

/*   it('Update item in the cart', () => {
  });

  it('Remove item from the cart', () => {
  });*/

});