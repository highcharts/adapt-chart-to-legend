/**
 * Highcharts plugin for adjustable chart height in response to legend height
 *
 * Author:        Torstein Honsi
 * Version:       1.0.3
 * Last revision: 2016-03-10
 */
(function (H) {
    H.wrap(H.Legend.prototype, 'render', function (proceed) {
        var chart = this.chart, 
            translateY;

        proceed.call(this);

        if (this.options.adjustChartSize && !chart.renderer.forExport) { // #7
            
            // Adapt chart metrics
            chart.chartHeight += this.legendHeight;
            chart.marginBottom += this.legendHeight;
            chart.container.style.height = chart.container.firstChild.style.height = chart.chartHeight + 'px';

            // Move the legend down
            if (this.options.verticalAlign === 'bottom') {
                translateY = this.group.attr('translateY') + this.legendHeight;
                this.group.attr('translateY',  translateY);
                this.group.alignAttr.translateY = translateY;
            }

            this.positionCheckboxes();
        }
    });

}(Highcharts));