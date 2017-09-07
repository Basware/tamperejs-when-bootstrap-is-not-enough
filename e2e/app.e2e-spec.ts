import { TampereJSPage } from './app.po';

describe('tamperejs-when-bootstrap-is-not-enough App', () => {
  let page: TampereJSPage;

  beforeEach(() => {
    page = new TampereJSPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
