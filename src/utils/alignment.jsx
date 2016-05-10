"use strict";

/**
 * Get the horizontal translation amount based on point alignment.
 * @param pointAlign - How the points should be aligned, left, center, or right
 * @param bandwidth - The width of a single band of the X scale
 * @returns {number} - How many horizontal pixels to translate
 */
function _getTranslateXAmount (pointAlign, bandwidth) {
  if (pointAlign === 'center') {
    return bandwidth / 2;
  } else if (pointAlign === 'right') {
    return bandwidth;
  }
  return 0;
}

/**
 * Create an X accessor function to help create a D3 line or area such that the
 * leftmost point is left-aligned, the rightmost is right-aligned, and all
 * others are as specified.
 * @param data - Chart data
 * @param xScale - The D3 scale for x values
 * @param [pointAlign='left'] - How the points should be aligned, left, center,
 *   or right
 */
export function getXPointAlignAccessor (data, xScale, pointAlign='left') {
  return (d, i) => {

    // First element, always left-align
    if (i === 0) {
      return xScale(d.x) +
        _getTranslateXAmount('left', xScale.bandwidth());

    // Last element, always right-align
    } else if (i === data.length - 1) {
      return xScale(d.x) +
        _getTranslateXAmount('right', xScale.bandwidth());
    }

    // Other elements, align as specified
    return xScale(d.x) +
      _getTranslateXAmount(pointAlign, xScale.bandwidth())
  }
}
