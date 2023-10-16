import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PrecipitationsService } from '../shared/services/precipitations.service';
import * as d3 from 'd3';

const CHART_MARGIN = 1.0; // em units
const X_AXIS_THICKNESS = 3.0; // em units
const Y_AXIS_THICKNESS = 3.0; // em units
const CHART_HEIGHT = 20; // em units

@Component({
  selector: 'app-precipitation-trend',
  templateUrl: './precipitation-trend.component.html',
  styleUrls: ['./precipitation-trend.component.css']
})
export class PrecipitationTrendComponent implements OnInit {

  @ViewChild('chart') chartContainer!: ElementRef;

  times: string[] = [];
  temperatures: string[] = [];
  points: any;
  connectionError: boolean;
  connectionErrorMessage: any;

  chartSvg: any;
  xAxis: any;
  yAxis: any;
  plotArea: any;
  lineFunction: any;
  xScale: any;
  yScale: any;
  trendPath: any;
  chartDefaultFontSize: any;
  chartSvgWidth: any;
  chartSvgHeight: any;
  chartMargin: any;
  xAxisHeight: any;
  yAxisWidth: any;
  plotAreaHeight: any;
  plotAreaWidth: any;


  constructor(
    private precipitationsService: PrecipitationsService
  ) {
    this.connectionError = false;
   }

  ngOnInit(): void {
    this.connectionError = false;
  }

  ngAfterViewInit() {
    this.initializeChart(); 
    this.plot();
    // make the chart responsive
    window.addEventListener('resize', () => {
      this.initializeChart();
      this.plot();
    });
  }

  /**
   * Build static part of the chart
   */
  initializeChart() {

    // DOM references
    this.chartSvg = d3.select(this.chartContainer.nativeElement).select('svg');
    this.xAxis = d3.select(this.chartContainer.nativeElement).select('#xaxis');
    this.yAxis = d3.select(this.chartContainer.nativeElement).select('#yaxis');
    this.plotArea = d3.select(this.chartContainer.nativeElement).select('#plotarea');
    this.trendPath = d3.select(this.chartContainer.nativeElement).select('#trendpath');

    // layout
    this.chartDefaultFontSize = 16;
    this.chartSvg
        .attr('height', this.chartDefaultFontSize * CHART_HEIGHT);
    // calculate sizes dynamically
    this.chartSvgWidth = this.chartSvg.property('clientWidth'); //    this is thesize of the entire svg object
    this.chartSvgHeight = this.chartSvg.property('clientHeight'); //  including margins, axes, etc.
   
    this.chartMargin = this.chartDefaultFontSize * CHART_MARGIN; 
    this.xAxisHeight =  this.chartDefaultFontSize * X_AXIS_THICKNESS; 
    this.yAxisWidth =  this.chartDefaultFontSize * Y_AXIS_THICKNESS;
    this.plotAreaWidth = this.chartSvgWidth - (2 * this.chartMargin) - this.yAxisWidth;
    this.plotAreaHeight = this.chartSvgHeight - (2 * this.chartMargin) - this.xAxisHeight;

    // define the line function
    this.lineFunction = d3.line<{ x: any, y: number}>()
                          .x(function(d) { return d.x })
                          .y(function(d) { return d.y });
  }

  plot() {
    this.precipitationsService.getData().subscribe({
      next: (data: any) => {
        this.times = data.hourly.time;
        this.temperatures = data.hourly.precipitation_probability;
        

        // update scales
        const minTemp = d3.min(this.temperatures);
        const maxTemp = d3.max(this.temperatures);

        this.xScale = d3.scaleTime()
        .domain([new Date(this.times[0]), new Date(this.times[this.times.length-1]) ])
        .range([this.chartMargin + this.yAxisWidth, this.chartMargin + this.yAxisWidth + this.plotAreaWidth ]);
        this.yScale = d3.scaleLinear()
        .domain([ Number(minTemp), Number(maxTemp) ])
        .range([this.plotAreaHeight + this.chartMargin, this.chartMargin ]); // leave a small margin for y

        // draw axes with updated scales
        let xTicks = this.plotAreaWidth /
        (5 * this.chartDefaultFontSize);
        this.xAxis
        .attr("transform", "translate(0, " + (this.plotAreaHeight + this.chartMargin) + ")")
        .call(
          d3.axisBottom(this.xScale)
            .ticks(xTicks)
        );

        let yTicks = 5;
        this.yAxis
        .attr("transform", "translate(" + (this.chartMargin + this.yAxisWidth) + ", 0)")
        .call(
          d3.axisLeft(this.yScale)
            .ticks(yTicks)          
        );

        // draw trend
        this.points = this.times.map((v: any, i: number) => {
          return {x: this.xScale(new Date(v)), y: this.yScale(this.temperatures[i])}
        });
        this.trendPath
        .attr('d', this.lineFunction(this.points));

      },
      error: (e) => {
        this.connectionError = true;
        this.connectionErrorMessage = JSON.stringify(e.message);
      }
    });

    
  }

}
