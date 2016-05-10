import _ from 'lodash';
import sinon from 'sinon';
import {getXPointAlignAccessor} from '../../src/utils/alignment';

describe('getXPointAlignAccessor', () => {
  let data = null;
  let xScale = null;
  
  beforeEach(() => {
    data = [
      {x: 'xval-shifted-by-'},
      {x: 1},
      {x: 'xval-'}
    ];
    xScale = xVal => xVal;
  });

  it('left-aligns the first point', () => {
    xScale.bandwidth = _.noop;

    const firstIdx = 0;
    const acc = getXPointAlignAccessor(data, xScale);
    const xPos = acc(data[firstIdx], firstIdx);

    expect(xPos).to.equal('xval-shifted-by-0');
  });

  it('right-aligns the last point', () => {
    xScale.bandwidth = () => 'shifted-by-bandwidth';

    const lastIdx = data.length - 1;
    const acc = getXPointAlignAccessor(data, xScale);
    const xPos = acc(data[lastIdx], lastIdx);

    expect(xPos).to.equal('xval-shifted-by-bandwidth');
  });

  it('aligns all other points as specified', () => {
    xScale.bandwidth = () => 10;

    const midIdx = 1;
    const acc = getXPointAlignAccessor(data, xScale, 'center');
    const xPos = acc(data[midIdx], midIdx);

    expect(xPos).to.equal(1 + 10 / 2);
  });
});
