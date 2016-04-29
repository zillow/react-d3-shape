# @zillow/react-d3-shape

[![Dependency Status](https://gemnasium.com/react-d3/react-d3-shape.svg)](https://gemnasium.com/react-d3/react-d3-shape)

react-d3 basic shapes, shapes that we support:

- Line
- Area
- AreaStack
- BarGroupHorizontal
- BarGroup
- BarStackHorizontal
- BarStack
- BarHorizontal
- Bar
- Pie
- Scatter

## Fork Alert!

This is a fork of [react-d3/react-d3-shape](https://github.com/react-d3/react-d3-shape), containing additional options and features including:

- Area and line point alignment options

**Contributors**, please do not adjust code style so the original project and this fork can more easily share updates from each other.

This fork is based on v0.2.15 of the original project. The first version of this fork was v0.3.0.

## Install

```
npm install --save react-d3-shape
```

## Quick example

#### Building Line Chart, with Area Chart and Scatter Plot

- Line Chart with Area chart

```js
<div>
  <Chart
    width= {this.state.width}
    height= {this.state.height}
    data= {generalChartData}
    chartSeries= {this.state.series}
    x= {x}
    >
    <Line
      chartSeries= {this.state.series}
    />
    <Area
      chartSeries= {this.state.series2}
    />
    <Scatter
      chartSeries= {this.state.series2}
    <Xaxis/>
    <Yaxis/>
    <Xgrid/>
    <Ygrid/>
  </Chart>
</div>

```

## Develop

```
$ sudo npm i
$ node devServer.js
```

and open `localhost:5000/example`

Build production `js`, `min.js` code

```
$ npm run prod
```

## License

Apache 2.0
