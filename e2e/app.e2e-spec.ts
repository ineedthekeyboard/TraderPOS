import { AngSimpleRegisterPage } from './app.po';

describe('ang-simple-register App', function() {
  let page: AngSimpleRegisterPage;

  beforeEach(() => {
    page = new AngSimpleRegisterPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
