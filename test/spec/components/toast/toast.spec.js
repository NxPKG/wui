/* global browser expectImageToBeSame */
describe('Toast Component', function () {

  beforeEach(function () {
    browser.url('/#/display/toast');
    browser.waitForExist('.wuiTitle');
    expect('.wuiTitle').to.have.text('Toast');
  });

  it('Default Toast', function () {
    browser.waitForExist('#default');
    const results = browser.checkElement('#default .wuiToast');
    expectImageToBeSame (results);
  });

});
