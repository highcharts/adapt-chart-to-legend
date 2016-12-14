/**
 * Highcharts plugin for adjustable chart height in response to legend height
 *
 * Author:        Torstein Honsi
 * Version:       1.0.4
 * Last revision: 2016-06-03
 */
(function (H) {
    H.wrap(H.Legend.prototype, 'render', function (proceed) {
        var chart = this.chart, 
            translateY;

        proceed.call(this);

        if (this.options.adjustChartSize) { // #7

            if (!chart.originalChartHeight) {
                chart.originalChartHeight = chart.chartHeight;
            }

            // Adapt chart metrics
            chart.chartHeight = chart.originalChartHeight + this.legendHeight;
            chart.marginBottom += this.legendHeight;

            // Set the DOM element heights
            chart.container.style.height = chart.chartHeight + 'px';
            chart.renderer.boxWrapper.attr('height', chart.chartHeight); // #7

            // Move the legend down
            if (this.options.verticalAlign === 'bottom') {
                translateY = this.group.attr('translateY') + this.legendHeight;
                this.group.attr('translateY',  translateY);
                if (this.group.alignAttr) {
                    this.group.alignAttr.translateY = translateY;
                }
            }

            this.positionCheckboxes();
        }
    });

}(Highcharts));