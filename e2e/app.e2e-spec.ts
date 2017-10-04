import { BlankApelPage } from './app.po';

describe('blank-apel App', function() {
  let page: BlankApelPage;

  beforeEach(() => {
    page = new BlankApelPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
