/**
 * Highcharts plugin for adjustable chart height in response to legend height
 */
(function (H) {
    H.wrap(H.Legend.prototype, 'render', function (proceed) {
        var chart = this.chart;

        proceed.call(this);

        if (!chart.container.attributes['height-adapted-to-legend'] && this.options.adjustChartSize && this.options.verticalAlign === 'bottom') {
            chart.chartHeight += this.legendHeight;
            chart.marginBottom += this.legendHeight;
            chart.container.style.height = chart.container.firstChild.style.height = chart.chartHeight + 'px';

            chart.container.setAttribute('height-adapted-to-legend', true);

            this.group.attr({
                translateY: this.group.attr('translateY') + this.legendHeight
            });
        }
    });

}(Highcharts));