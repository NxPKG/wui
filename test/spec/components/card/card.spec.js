/* global browser expectImageToBeSame */
describe('Card Component', function () {

  beforeEach(function () {
    browser.url('/#/display/card');
    browser.waitForExist('.wuiTitle');
    expect('.wuiTitle').to.have.text('Card');
  });

  it('Basic Card', function () {
    browser.waitForExist('#basic-card');
    const results = browser.checkElement('#basic-card .wuiFlexGroup');
    expectImageToBeSame (results);
  });

});
