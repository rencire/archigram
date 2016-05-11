import a from '../src/js/state.js';

describe('javascript', () => {
  it('should know 2 + 2 is 4', function() {
    expect(2 + 2).toEqual(4);
  });
  it('should know 3 + 2 is 5', () => {
    expect(3 + 2).toEqual(5);
  });
});
