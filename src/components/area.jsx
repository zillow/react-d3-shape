"use strict";

import {
  default as React,
  Component,
  PropTypes,
} from 'react';

import D3Shape from 'd3-shape'
import CommonProps from '../commonProps';
import {series} from '../utils/series';
import {getXPointAlignAccessor} from '../utils/alignment';

export default class Area extends Component {
  constructor (props) {
    super(props);
  }

  static propTypes = {
    pointAlign: PropTypes.oneOf(['left', 'center', 'right'])
  };

  static defaultProps = {
    areaClassName: 'react-d3-basic__area',
    ...CommonProps
  }

  _mkArea() {
    const {
      areaClassName,
      areaOpacity
    } = this.props;

    var dataset = series(this.props);
    var that = this;

    return (
      <g>
        {
          dataset.map((area, i) => {
            return (
              <path
                className={`${areaClassName} area`}
                fill={area.color}
                d={that._setAxes(area.data)}
                style={area.style}
                key={i}
                />
            )
          })
        }
      </g>
    );
  }

  _setAxes (data) {
    const {
      height,
      margins,
      xScaleSet,
      yScaleSet,
      pointAlign
    } = this.props;

    var area = D3Shape.area()
      .x(getXPointAlignAccessor(data, xScaleSet, pointAlign))
      .y0((d) => {
        var domain = yScaleSet.domain();

        if (domain[0] * domain[1] < 0) {
          return yScaleSet(0);
        } else if (((domain[0] * domain[1]) >= 0) && (domain[0] >= 0)){
          return yScaleSet.range()[0];
        } else if (((domain[0] * domain[1]) >= 0) && (domain[0] < 0)){
          return yScaleSet.range()[1];
        }
      })
      .y1((d) => { return yScaleSet(d.y) });

    return area.call(this, data)
  }

  render() {
    var area = this._mkArea();

    return (
      <g>
        {area}
      </g>
    )
  }
}
