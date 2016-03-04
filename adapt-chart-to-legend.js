/**
 * Highcharts plugin for adjustable chart height in response to legend height
 */
(function (H) {
    H.wrap(H.Legend.prototype, 'render', function (proceed) {
        var chart = this.chart, 
            translateY;

        proceed.call(this);

        if (this.options.adjustChartSize && this.options.verticalAlign === 'bottom') {
            
            // Adapt chart metrics
            chart.chartHeight += this.legendHeight;
            chart.marginBottom += this.legendHeight;
            chart.container.style.height = chart.container.firstChild.style.height = chart.chartHeight + 'px';

            // Move the legend down
            translateY = this.group.attr('translateY') + this.legendHeight;
            this.group.attr('translateY',  translateY);
            this.group.alignAttr.translateY = translateY;

            this.positionCheckboxes();
        }
    });

}(Highcharts));