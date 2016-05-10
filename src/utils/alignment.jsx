"use strict";

/**
 * Get the horizontal translation amount based on point alignment.
 * @param [pointAlign='left'] - How the points should be aligned, left, center,
 *   or right
 * @param bandwidth - The width of a single band of the X scale
 * @returns {number} - How many horizontal pixels to translate
 */
export function getTranslateXAmount (pointAlign, bandwidth) {
  if ( pointAlign === 'center' ) {
    return bandwidth / 2;
  } else if ( pointAlign === 'right') {
    return bandwidth;
  }
  return 0;
}

/**
 * Create an X accessor function to help create a D3 line or area such that the
 * leftmost shape is left-aligned, and the rightmost is right-aligned.
 */
export function getXPointAlignAccessor (data, pointAlign, xScaleSet) {
  return (d, i) => {

    // First element, always left-align
    if (i === 0) {
      console.log('1st, left');
      return xScaleSet(d.x) +
        getTranslateXAmount('left', xScaleSet.bandwidth());

    // Last element, always right-align
    } else if (i === data.length - 1) {
      console.log('last, right');
      return xScaleSet(d.x) +
        getTranslateXAmount('right', xScaleSet.bandwidth());
    }

    // Other elements, align as specified
    console.log('other, normal');
    return xScaleSet(d.x) +
      getTranslateXAmount(pointAlign, xScaleSet.bandwidth())
  }
}
