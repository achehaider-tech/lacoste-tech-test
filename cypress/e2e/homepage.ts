import Homepage from '$pageObjects/homepage';
import NavBar from '$pageObjects/navbar';

const homepage = new Homepage();
const navbar = new NavBar();

describe('Homepage - Content Verification', () => {
  Cypress.on("uncaught:exception", (err, runnable) => {
    // returning false here prevents Cypress from failing the test
    return false;
  });

  it(`should display correct content in US`, () => {
    homepage.visitHomepage("us");
    homepage.checkTitle("en");
    navbar.checkMainMenu("en");
    navbar.checkSubmenuContent("default", "en");
    navbar.checkSearchBar("en");
    navbar.checkMenuIcons("en");
  });

  it(`should display correct content in FR`, () => {
    homepage.visitHomepage("fr");
    homepage.checkTitle("fr");
    navbar.checkMainMenu("fr");
    navbar.checkSubmenuContent("default", "fr");
    navbar.checkSearchBar("fr");
    navbar.checkMenuIcons("fr");
  });

});