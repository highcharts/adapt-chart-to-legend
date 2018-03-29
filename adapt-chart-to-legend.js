/**
 * Highcharts plugin for adjustable chart height in response to legend height
 *
 * Author:        Torstein Honsi
 * Version:       1.0.7
 * Last revision: 2016-12-15
 */
(function (factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory;
  } else {
    factory(Highcharts);
  }
}(function (Highcharts) {
  (function (H) {
    H.wrap(H.Legend.prototype, 'render', function (proceed) {
      var chart = this.chart,
        translateY,
        addedHeight;

      proceed.call(this);

      if (this.options.adjustChartSize) { // #7

        addedHeight = this.legendHeight;
        if (!chart.originalChartHeight) {
          chart.originalChartHeight = chart.chartHeight;
        }

        if (this.options.align === 'left' || this.options.align === 'right') {
          addedHeight = Math.max(this.group.translateY + this.legendHeight - chart.originalChartHeight, 0);

          // Move the legend down
        } else if (this.options.verticalAlign === 'bottom') {
          translateY = this.group.attr('translateY') + this.legendHeight;
          this.group.attr('translateY', translateY);
          if (this.group.alignAttr) {
            this.group.alignAttr.translateY = translateY;
          }
        }
        if (addedHeight) {
          //   // Adapt chart metrics
          chart.chartHeight = chart.originalChartHeight + addedHeight;
          chart.marginBottom += addedHeight;

          //   // Set the DOM element heights
          chart.container.style.height = chart.chartHeight + 'px';
          chart.renderer.boxWrapper.attr('height', chart.chartHeight); // #7

          var boxedElement = chart.renderer.box.clientWidth ? chart.renderer.box /*IE*/ : chart.renderer.box.parentElement /*FF*/ ;
          var viewBox = "0 0 " + boxedElement.clientWidth + " " + boxedElement.clientHeight;
          chart.renderer.boxWrapper.attr('viewBox', viewBox);
        }
        this.positionCheckboxes();
      }
    });
  }(Highcharts));
}));