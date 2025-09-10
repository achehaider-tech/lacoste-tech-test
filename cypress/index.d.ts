declare namespace Cypress {
  interface Chainable {
    /**
     * Accept cookies if the cookie consent popup is present on the page.
     */
    acceptCookiesIfPresent(): Chainable<void>;
  }
}