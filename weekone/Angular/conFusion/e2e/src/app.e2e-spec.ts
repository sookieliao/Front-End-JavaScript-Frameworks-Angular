import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;
  let root: string = '/';
  beforeEach(() => {
    page = new AppPage();
  });

  it('should display message saying Ristorante Con Fusion', () => {
    page.navigateTo(root);
    expect(page.getParagraphText('app-root h1')).toEqual('should display message saying Ristorante Con Fusion');
  });

  it('should navigate to about us page by clicking on the link', ()) => {
    page.navigateTo(root);
    // this returns all <a> tag elements
    let navLink = page.getAllElements('a').get(1);
    navLink.click()
    expect(page.getParagraphText('h3')).toBe('About us');
  }
});
