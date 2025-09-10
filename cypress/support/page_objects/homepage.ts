import dict_en from '$fixtures/dict_en.json';
import dict_fr from '$fixtures/dict_fr.json';

export default class Homepage {
  private webElements = {

  }

  visitHomepage(lang: string) {
    cy.visit(`https://www.lacoste.com/${lang}/`, {
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
        'sec-fetch-user': '?1',
        'upgrade-insecure-requests': '1',
      },
      failOnStatusCode: false,
      timeout: 60000
    });

    cy.acceptCookiesIfPresent();
  }

  checkTitle(language: string) {
    const expectedTitle = language === 'fr' ? dict_fr.homePageTitle : dict_en.homePageTitle;

    cy.title().should('eq', expectedTitle);
  }

}