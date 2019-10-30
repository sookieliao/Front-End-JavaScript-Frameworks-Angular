import { AppPage } from './app.po';
import { browser } from 'protractor';

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

  it('should navigate to about us page by clicking on the link', () => {
    page.navigateTo(root);
    // this returns all <a> tag elements
    let navLink = page.getAllElements('a').get(1);
    navLink.click()
    expect(page.getParagraphText('h3')).toBe('About us');
  });

  it('should enter a new comment for the first dish', () => {
    // this brings us to the very first dish
    page.navigateTo('/dishdetail/0');

    // bind input web element 
    const newAuthor = page.getElement('input[type=text');
    
    // this will tight value with that web element
    newAuthor.sendKeys('Test Author');

    // bind input web element for comment
    const newComment = page.getElement('textarea');
    newComment.sendKeys('Test Common');

    const submitButton = page.getElement('button[type=submit');
    submitButton.click();
    
    browser.pause()
  });

});
