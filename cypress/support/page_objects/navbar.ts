export default class NavBar {
  private webElements = {
    mainMenu: {
      getMainNavBarItem: (textItem: string) =>
          cy.get(`#main-menu #js-main-nav>li>a:contains("${textItem}")`),
    },
    subMenu: {
      getSubMenuItem: (mainMenuItem: string, textItem: string) =>
        cy.get(`#submenu-Lacoste_${mainMenuItem}>ul>li>button:contains("${textItem}")`),

      getSpecificSubMenuItem: (mainMenuItem: string, textItem: string) =>
        cy.get(`#submenu-Lacoste_${mainMenuItem}>ul>li>a:contains("${textItem}")`),
    },
    subMenuMen: {
      getSubNavBarMenItem: (textItem: string) =>
        cy.get(`#submenu-Lacoste_Men>ul>li>button:contains("${textItem}")`),
    },
    subMenuWomen: {
      getSubNavBarWomenItem: (textItem: string) =>
        cy.get(`#submenu-Lacoste_Women>ul>li>button:contains("${textItem}")`),
    },
    subMenuKids: {
      getSubNavBarKidsItem: (textItem: string) =>
        cy.get(`#submenu-Lacoste_Kids>ul>li>button:contains("${textItem}")`),
    },
    subMenuSale: {
      getSubNavBarSaleItem: (textItem: string) =>
        cy.get(`#submenu-Lacoste_Sale>ul>li>button:contains("${textItem}")`),
    },
    subMenuDiscover: {
      getSubNavBarDiscoverItem: (textItem: string) =>
        cy.get(`#submenu-Lacoste_Discover>ul>li>button:contains("${textItem}")`),
    },
    searchBar: {
      getInputSearch: () => cy.get('#search-input'),
    },
    menuIcons: {
      getMenuIconsItem: (textItem: string) =>
        cy.get(`#menu-icons>li>a[title="${textItem}"]`),
      getMenuItemMyShoppingBag: (textItem: string) =>
        cy.get(`#menu-icons>li a[title="${textItem}"]`),
    }

  }

  checkMainMenu(language: string) {
    cy.fixture(`dict_${language}.json`).then((dict: any) => {
      Object.keys(dict.mainMenu).forEach((key) => {
        const menuItem = dict.mainMenu[key];
        if (menuItem === "Sale") {
          this.webElements.mainMenu.getMainNavBarItem(menuItem)
            .should('be.visible');
        } else {
          this.webElements.mainMenu.getMainNavBarItem(menuItem.label)
            .should('be.visible');
        }
      });
    });
  }

  checkSubmenuContent(mainMenuItem: string, language: string) {
    cy.fixture(`dict_${language}.json`).then((dict) => {
      const mainMenuKeyItem = mainMenuItem === "default" ? "Men" : mainMenuItem;
      const mainMenuItemLabel = dict.mainMenu[mainMenuKeyItem].label;

      if (mainMenuItem !== "default"){
        this.webElements.mainMenu.getMainNavBarItem(mainMenuItemLabel).click();
      }

      const subMenu = dict.mainMenu[mainMenuKeyItem].subMenu;

      Object.keys(subMenu).forEach((key) => {
        const subMenuItem = subMenu[key];

        if (subMenuItem.label === "Seconde Main"){
          this.webElements.subMenu.getSpecificSubMenuItem(mainMenuKeyItem, subMenuItem.label)
            .should('be.visible');
        } else{
          this.webElements.subMenu.getSubMenuItem(mainMenuKeyItem, subMenuItem.label)
            .should('be.visible');
        }
      });
    });
  }

  checkSearchBar(language: string) {
    this.webElements.searchBar.getInputSearch().should('be.visible');
    cy.fixture(`dict_${language}.json`).then((dict) => {
      const expectedPlaceholder = dict.searchPlaceholder;

      this.webElements.searchBar.getInputSearch()
        .invoke('attr', 'placeholder')
        .should('eq', expectedPlaceholder);
    });
  }

  checkMenuIcons(language: string) {
    cy.fixture(`dict_${language}.json`).then((dict) => {
      Object.keys(dict.secondaryNavBar).forEach((key) => {
        const expectedTitle = dict.secondaryNavBar[key];

        if (key === "cart") {
          this.webElements.menuIcons.getMenuItemMyShoppingBag(expectedTitle)
            .should('be.visible');
        } else {
          this.webElements.menuIcons.getMenuIconsItem(expectedTitle).should('be.visible');
        }
      });
    });
  }

  gotoCart() {
    this.webElements.menuIcons.getMenuItemMyShoppingBag("Mon panier").click();
  }

}