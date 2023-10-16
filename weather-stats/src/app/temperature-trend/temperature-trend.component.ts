import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TemperaturesService } from '../shared/services/temperatures.service';
import * as d3 from 'd3';

const CHART_MARGIN = 1.0; // em units
const X_AXIS_THICKNESS = 3.0; // em units
const Y_AXIS_THICKNESS = 3.0; // em units
const CHART_HEIGHT = 20; // em units

const N_DAYS_MOVING_AVE = 5;

@Component({
  selector: 'app-temperature-trend',
  templateUrl: './temperature-trend.component.html',
  styleUrls: ['./temperature-trend.component.css']
})
export class TemperatureTrendComponent implements OnInit {

  @ViewChild('chart') chartContainer!: ElementRef;

  times: any[] = [];
  temperatures: number[] = [];
  aveTemperatures: number[] = [];
  points: any;
  avePoints: any;
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
  avePath: any;
  chartDefaultFontSize: any;
  chartSvgWidth: any;
  chartSvgHeight: any;
  chartMargin: any;
  xAxisHeight: any;
  yAxisWidth: any;
  plotAreaHeight: any;
  plotAreaWidth: any;


  constructor(
    private temperaturesService: TemperaturesService
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
    this.avePath = d3.select(this.chartContainer.nativeElement).select('#avepath');

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
    this.temperaturesService.getData().subscribe({
      next: (data: any) => {
        // prepare data
        this.times = data.hourly.time;
        this.temperatures = data.hourly.temperature_2m;
        // calculate moving averages
        let n_hours_average = N_DAYS_MOVING_AVE * 24;
        for (let i=0; i<this.temperatures.length; i++) {
          if (i < n_hours_average) {
            this.aveTemperatures[i] = this.temperatures.slice(0,i+1).reduce((acc, curr) => acc + curr, 0) / (i+1);
          }
          else {
            this.aveTemperatures[i] = this.temperatures.slice(i+1-n_hours_average,i+1).reduce((acc, curr) => acc + curr, 0) / (n_hours_average);
          }
        }
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

        // draw trends
        this.points = this.times.map((v: any, i: number) => {
          return {x: this.xScale(new Date(v)), y: this.yScale(this.temperatures[i])}
        });
        this.trendPath
        .attr('d', this.lineFunction(this.points));

        this.avePoints = this.times.map((v: any, i: number) => {
          return {x: this.xScale(new Date(v)), y: this.yScale(this.aveTemperatures[i])}
        });
        this.avePath
        .attr('d', this.lineFunction(this.avePoints));

      },
      error: (e) => {
        this.connectionError = true;
        this.connectionErrorMessage = JSON.stringify(e.message);
      }
    });

    
  }

}
