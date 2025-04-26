function SeriesModel(id, indicator, data, horizAxis, vertAxis) {
  var self = this;
  self.id = id;
  self.indicator = indicator;
  self.enabled = ko.observable(true);
  self.visible = ko.observable(true);
  self.data = data;
  self.horizAxis = horizAxis;
  self.vertAxis = vertAxis;
  self.teeChartSeries = null;
  self.upperThreshold = ko.observable(null);
  self.lowerThreshold = ko.observable(null);
  self.thresholdEnabled = ko.observable(true);
  self.thresholdLinesAdded = false;
  self.upperThresholdSeries = null;
  self.lowerThresholdSeries = null;
  self.crossingThreshold = ko.observable(false);
}

var Chart1;
var series;
var series2;
var upperThresholdSeries1;
var upperThresholdSeries2;
var lowerThresholdSeries1;
var lowerThresholdSeries2;
var sliderInitialized = false;
var upperThreshold = [];
var lowerThreshold = [];
var upperThreshold2 = [];
var lowerThreshold2 = [];
var tooltipPointer;

var statistics = [
  { label: "Min", val: "min" },
  { label: "Max", val: "max" },
  { label: "Setpoint", val: "setPointData" },
  { label: "Spread", val: "spreadData" },
  { label: "Range", val: "rangeData" },
  { label: "Average", val: "averageData" },
];

function initChart() {
  changeBackgroundToDark();
  dualAxisChart1(profileData.profileData.length)
}

function changeBackgroundToDark() {
  document.body.style.backgroundColor = "#303030";
  document.body.style.color = "#fff";

  var chartContainer = document.getElementById("chartCanvas").parentElement;
  if (chartContainer) {
    chartContainer.style.backgroundColor = "#303030";
  }
}

function dualAxisChart1(pointParameterCount) {
  var ctx = document.getElementById("chartCanvas");
  ctx.width = ctx.parentElement.clientWidth;
  ctx.height = 300;

  Chart1 = new Tee.Chart(ctx);
  Chart1.title.visible = false;
  Chart1.zoom.enabled = false;
  Chart1.scroll.enabled = false;

  Chart1.panel.transparent = false;
  Chart1.panel.format.fill = "#303030";
  Chart1.panel.format.gradient.visible = false;

  Chart1.walls.visible = true;
  Chart1.walls.back.visible = true;
  Chart1.walls.back.format.fill = "#303030";
  Chart1.walls.back.format.stroke.fill = "#505050";
  Chart1.walls.back.format.stroke.size = 1;
  Chart1.walls.back.format.gradient.visible = false;
  Chart1.walls.back.format.shadow.visible = false;

  if (Chart1.plot) {
    Chart1.plot.format.fill = "#303030";
  }

  Chart1.axes.left.grid.format.stroke.fill = "#505050";
  Chart1.axes.bottom.grid.format.stroke.fill = "#505050";
  Chart1.axes.right.grid.format.stroke.fill = "#505050";
  Chart1.axes.top.grid.format.stroke.fill = "#505050";

  Chart1.axes.left.labels.format.fill = "#FFFFFF";
  Chart1.axes.right.labels.format.fill = "#FFFFFF";
  Chart1.axes.top.labels.format.fill = "#FFFFFF";
  Chart1.axes.bottom.labels.format.fill = "#FFFFFF";

  Chart1.axes.left.labels.format.font.fill = "#FFFFFF";
  Chart1.axes.right.labels.format.font.fill = "#FFFFFF";
  Chart1.axes.top.labels.format.font.fill = "#FFFFFF";
  Chart1.axes.bottom.labels.format.font.fill = "#FFFFFF";

  Chart1.originalColors = {
    series1: "orange",
    series2: "green",
  };

  Chart1.thresholdColor = "red";

  if (pointParameterCount >= 1) {
    series = Chart1.addSeries(new Tee.Line());
    series.data.x = [];
    series.data.values = [];
    series.horizAxis = "bottom";
    series.vertAxis = "left";
    series.format.stroke.fill = Chart1.originalColors.series1;
    series.format.point = { visible: true, fill: "orange", size: 2 };
  }

  if (pointParameterCount == 2) {
    series2 = Chart1.addSeries(new Tee.Line());
    series2.data.x = [];
    series2.data.values = [];
    series2.horizAxis = "top";
    series2.vertAxis = "right";
    series2.format.stroke.fill = Chart1.originalColors.series2;
    series2.format.point = { visible: true, fill: "green", size: 2 };
  }

  Chart1.axes.left.minorTicks.visible = true;
  Chart1.axes.top.minorTicks.visible = true;
  Chart1.axes.right.minorTicks.visible = true;
  Chart1.axes.bottom.minorTicks.visible = true;

  Chart1.axes.left.innerTicks.visible = true;
  Chart1.axes.top.innerTicks.visible = true;
  Chart1.axes.right.innerTicks.visible = true;
  Chart1.axes.bottom.innerTicks.visible = true;

  Chart1.axes.left.title.text = "Left Axis";
  Chart1.axes.top.title.text = "Top Axis";
  Chart1.legend.visible = false;
  Chart1.axes.left.automatic = false;
  Chart1.axes.right.automatic = false;
  Chart1.axes.left.setMinMax(0, 100);
  Chart1.axes.right.setMinMax(0, 200);

  Chart1.thresholds = {
    series1: { upper: null, lower: null },
    series2: { upper: null, lower: null },
  };

  if (
    intervals &&
    intervals.length > 0 &&
    intervals[0].series &&
    intervals[0].series.length > 0
  ) {
    Chart1.thresholds.series1.upper = intervals[0].series[0].upperBound;
    Chart1.thresholds.series1.lower = intervals[0].series[0].lowerBound;
    upperThresholdSeries1 = Chart1.addSeries(new Tee.Line());
    upperThresholdSeries1.data.values = upperThreshold;
    upperThresholdSeries1.data.x = series.data.x;
    upperThresholdSeries1.format.stroke.fill = Chart1.thresholdColor;
    upperThresholdSeries1.format.stroke.size = 1;
    upperThresholdSeries1.format.stroke.dash = [2, 2];
    upperThresholdSeries1.vertAxis = "left";
    upperThresholdSeries1.horizAxis = "bottom";
    upperThresholdSeries1.visible = false;

    lowerThresholdSeries1 = Chart1.addSeries(new Tee.Line());
    lowerThresholdSeries1.data.values = lowerThreshold;
    lowerThresholdSeries1.data.x = series.data.x;
    lowerThresholdSeries1.format.stroke.fill = Chart1.thresholdColor;
    lowerThresholdSeries1.format.stroke.size = 1;
    lowerThresholdSeries1.format.stroke.dash = [2, 2];
    lowerThresholdSeries1.vertAxis = "left";
    lowerThresholdSeries1.horizAxis = "bottom";
    lowerThresholdSeries1.visible = false;
  }

  if (
    pointParameterCount == 2 &&
    intervals &&
    intervals.length > 0 &&
    intervals[0].series2 &&
    intervals[0].series2.length > 0
  ) {
    Chart1.thresholds.series2.upper = intervals[0].series2[0].upperBound;
    Chart1.thresholds.series2.lower = intervals[0].series2[0].lowerBound;

    upperThresholdSeries2 = Chart1.addSeries(new Tee.Line());
    upperThresholdSeries2.data.values = upperThreshold2;
    upperThresholdSeries2.data.x = series2.data.x;
    upperThresholdSeries2.format.stroke.fill = Chart1.thresholdColor;
    upperThresholdSeries2.format.stroke.size = 1;
    upperThresholdSeries2.format.stroke.dash = [2, 2];
    upperThresholdSeries2.vertAxis = "right";
    upperThresholdSeries2.horizAxis = "top";
    upperThresholdSeries2.visible = false;

    lowerThresholdSeries2 = Chart1.addSeries(new Tee.Line());
    lowerThresholdSeries2.data.values = lowerThreshold2;
    lowerThresholdSeries2.data.x = series2.data.x;
    lowerThresholdSeries2.format.stroke.fill = Chart1.thresholdColor;
    lowerThresholdSeries2.format.stroke.size = 1;
    lowerThresholdSeries2.format.stroke.dash = [2, 2];
    lowerThresholdSeries2.vertAxis = "right";
    lowerThresholdSeries2.horizAxis = "top";
    lowerThresholdSeries2.visible = false;
  }

  tooltipPointer1 = Chart1.addSeries(new Tee.PointXY());
  tooltipPointer1.data.x = [];
  tooltipPointer1.data.values = [];
  tooltipPointer1.format.fill = "red";
  tooltipPointer1.format.stroke.fill = "white";
  tooltipPointer1.format.stroke.size = 2;
  tooltipPointer1.pointer.width = 8;
  tooltipPointer1.pointer.height = 8;
  tooltipPointer1.horizAxis = "bottom";
  tooltipPointer1.vertAxis = "left";
  tooltipPointer1.visible = false;

  tooltipPointer2 = Chart1.addSeries(new Tee.PointXY());
  tooltipPointer2.data.x = [];
  tooltipPointer2.data.values = [];
  tooltipPointer2.format.fill = "red";
  tooltipPointer2.format.stroke.fill = "white";
  tooltipPointer2.format.stroke.size = 2;
  tooltipPointer2.pointer.width = 8;
  tooltipPointer2.pointer.height = 8;
  tooltipPointer2.horizAxis = "top";
  tooltipPointer2.vertAxis = "right";
  tooltipPointer2.visible = false;

  Chart1.draw();
  resize(Chart1, 800);
}

function updateSeriesColors(freezSeries1, freezSeries2) {
  if (
    series &&
    series.data.values.length > 0 &&
    Chart1.thresholds &&
    Chart1.thresholds.series1
  ) {
    var thresholdExceeded = false;
    var upper = Chart1.thresholds.series1.upper;
    var lower = Chart1.thresholds.series1.lower;

    if (upper !== null && lower !== null) {
      for (var i = 0; i < series.data.values.length; i++) {
        var value = series.data.values[i];
        if (value > upper || value < lower) {
          thresholdExceeded = true;
          break;
        }
      }
    }
    if (freezSeries1 == true) {
      series.format.stroke.fill = "gray";
      series.format.stroke.dash = [3, 3];
    } else {
      series.format.stroke.fill = thresholdExceeded
        ? Chart1.thresholdColor
        : Chart1.originalColors.series1;
    }
  }
  if (
    series2 &&
    series2.data.values.length > 0 &&
    Chart1.thresholds &&
    Chart1.thresholds.series2
  ) {
    var thresholdExceeded = false;
    var upper = Chart1.thresholds.series2.upper;
    var lower = Chart1.thresholds.series2.lower;

    if (upper !== null && lower !== null) {
      for (var i = 0; i < series2.data.values.length; i++) {
        var value = series2.data.values[i];
        if (value > upper || value < lower) {
          thresholdExceeded = true;
          break;
        }
      }
    }
    if (freezSeries2 == true) {
      series2.format.stroke.fill = "gray";
      series2.format.stroke.dash = [3, 3];
    } else {
      series2.format.stroke.fill = thresholdExceeded
        ? Chart1.thresholdColor
        : Chart1.originalColors.series2;
    }
  }
}

function setupBootstrapSlider(chart) {
  if (!chart) {
    console.warn("Chart not initialized yet, will setup slider later");
    return;
  }
  if (sliderInitialized) {
    return;
  }
  try {
    var minimum = findMin(series.data.x, series2.data.x);
    var maximum = findMax(series.data.x, series2.data.x);
    var range = - maximum - minimum;
    var defaultMin = Math.round(minimum + range * 0.2);
    var defaultMax = Math.round(minimum + range * 0.8);

    var slider = new Slider("#rangeSlider", {
      min: minimum,
      max: maximum,
      value: [defaultMin, defaultMax],
      step: Math.max(1, Math.floor(range / 100)),
      tooltip_split: true,
      tooltip: "always",
      range: true,
    });

    slider.on("slide", function (values) {
      var min = values[0];
      var max = values[1];

      if (chart.axes) {
        if (chart.axes.bottom) {
          chart.axes.bottom.setMinMax(min, max);
        }

        if (chart.axes.top) {
          chart.axes.top.setMinMax(min, max);
        }

        var element = document.body;
        var viewModelInstance = ko.dataFor(element);
        if (viewModelInstance) {
          viewModelInstance.sliderMinValue(min);
          viewModelInstance.sliderMaxValue(max);
        }
        chart.draw();
      }
    });
    sliderInitialized = true;
  } catch (e) {
    console.error("Error setting up bootstrap slider:", e);
  }
}

function calculateSliderBounds(profileData) {
  if (
    !profileData ||
    !profileData.profileData ||
    !isArray(profileData.profileData)
  ) {
    return { min: 0, max: 1000 };
  }
  var allXValues = [];
  for (var i = 0; i < profileData.profileData.length; i++) {
    var series = profileData.profileData[i];
    if (series && series.xValues && isArray(series.xValues)) {
      for (var j = 0; j < series.xValues.length; j++) {
        allXValues.push(series.xValues[j]);
      }
    }
  }
  if (allXValues.length === 0) {
    return { min: 0, max: 1000 };
  }
  var min = findMin(allXValues);
  var max = findMax(allXValues);
  return { min: min, max: max };
}

function isArray(obj) {
  return Object.prototype.toString.call(obj) === "[object Array]";
}

function statisticsComputedData(length) {
  var retArray = [];
  var i = 0;
  while (i < statistics.length) {
    var obj = {};
    if (length === 1) {
      obj["header"] = statistics[i].label;
      obj["series1"] = setDecimalPalaces(
        profileData.profileData[0][statistics[i].val]
      );
    } else {
      obj["header"] = statistics[i].label;
      obj["series1"] = setDecimalPalaces(
        profileData.profileData[0][statistics[i].val]
      );
      obj["series2"] = setDecimalPalaces(
        profileData.profileData[1][statistics[i].val]
      );
    }
    retArray.push(obj);
    i += 1;
  }
  return retArray;
}

function createLegends(profileData) {
  var legends = [];
  for (var i = 1; i <= profileData.length; i++) {
    legends.push({ id: i, name: "Series" + i });
  }
  return legends;
}

function findMin(array, array2) {
  if (!array || array.length === 0) return 0;
  var min = array[0];
  var min2 = array2[0];
  if (array2.length > 0) {
    var minimum = Math.min(min, min2)
    return minimum;
  } else {
    return min;
  }
}

function findMax(array, array2) {
  if (!array || array.length === 0) return 0;
  var max = array[array.length-1];
  var max2 = array2[array2.length-1];
  if (array2.length > 0) {
    var maximum = Math.min(max, max2)
    return maximum;
  } else {
    return max;
  }
}

ko.validation.rules.pattern.message = "Invalid.";
ko.validation.init(
  {
    decorateElement: true,
    registerExtenders: true,
    messagesOnModified: true,
    insertMessages: false,
    parseInputAttributes: true,
    messageTemplate: null,
    errorElementClass: "error",
    decorateInputElement: true,
    decorateElementOnModified: true, // class to decorate error element
    // errorMessageClass: 'validationMessage',
    allowHtmlMessages: false,
  },
  true
);



function viewModel() {
  var self = this;
  // Table Data
  self.statisticsProfileData = ko.observableArray(profileData.profileData);
  self.statisticsComputedData = ko.observable();
  self.seriesCount = ko.observable(profileData.profileData.length);
  self.sliderMinValue = ko.observable();
  self.sliderMaxValue = ko.observable();
  self.seriesConfig = ko.observableArray([]);
  self.showZoomSlider = ko.observable(false);
  self.zoomEnabled = ko.observable(false);
  self.tooltipInitialized = false;
  // y-axis settings
  self.yaxisScaleList = ko.observableArray([
    { id: 1, name: "Auto" },
    { id: 2, name: "Manual" },
    { id: 3, name: "Span" },
  ]);
  self.min = ko.observable().extend({
    required: true,
  });
  self.max = ko.observable().extend({
    required: true,
  });
  self.range = ko.observable().extend({
    required: true,
  });
  self.selectedseries = ko.observable();
  self.selectedYaxisScale = ko.observable();
  self.yaxisSettingShow = ko.observable(false);
  self.yaxiFieldsDisabled = ko.observable(false);
  self.yaxisRangeFieldDisabled = ko.observable(false);
  self.errors = ko.validation.group(self);
  self.showRangeErrors = ko.observable(false);
  self.showMinMaxErrors = ko.observable(false);
  self.selectedFreezSeries = ko.observable();

  self.freezSeries1 = ko.observable(false);
  self.freezSeries2 = ko.observable(false);
  self.tooltipVisible = ko.observable(false);
  self.tooltipElement = null;
  self.currentPointIndex = ko.observable(0);
  self.totalPoints = ko.observable(0);

  self.prevPointDisabled = ko.computed(function () {
    return self.currentPointIndex() <= 0;
  });

  self.nextPointDisabled = ko.computed(function () {
    return self.currentPointIndex() >= self.totalPoints() - 1;
  });

  self.onFreezClick = function (data, event) {
    if (data.id == 1) {
      if (event.target.checked) {
        self.freezSeries1(true);
        series.format.stroke.fill = "gray";
        series.format.stroke.dash = [3, 3];
      } else {
        self.freezSeries1(false);
        series.format.stroke.fill = "green";
        series.format.stroke.dash = [0, 0];
      }
    }

    if (data.id == 2) {
      if (event.target.checked) {
        self.freezSeries2(true);
        series2.format.stroke.fill = "gray";
        series2.format.stroke.dash = [3, 3];
      } else {
        self.freezSeries2(false);
        series2.format.stroke.fill = "orange";
        series2.format.stroke.dash = [0, 0];
      }
    }

    Chart1.draw();
  };

  self.t = 1;
  self.series1Freez = false;
  self.series2Freez = false;

  self.generateRandomPoint = function () {
    if (!series && !series2) {
      clearInterval(self.intervalId);
      return;
    }
    if (series && !self.freezSeries1()) {
      series.data.x.push(self.t);
      series.data.values.push(Math.random() * 100);
      upperThreshold.push(intervals[0].series[0].upperBound);
      lowerThreshold.push(intervals[0].series[0].lowerBound);
      Chart1.series.items[0].horizAxis = "bottom";
      Chart1.getSeries(0).vertAxis = "left";
    }

    if (series2 && !self.freezSeries2()) {
      series2.data.x.push(self.t);
      series2.data.values.push(Math.random() * 100);
      upperThreshold2.push(intervals[0].series2[0].upperBound);
      lowerThreshold2.push(intervals[0].series2[0].lowerBound);
      Chart1.series.items[1].horizAxis = "top";
      Chart1.getSeries(1).vertAxis = "right";
    }

    self.t++;

    if (series && !self.freezSeries1()) {
      Chart1.axes.bottom.setMinMax(1, self.t);
    }
    if (series2 && !self.freezSeries2()) {
      Chart1.axes.top.setMinMax(1, self.t);
    }

    if ((series && !self.freezSeries1()) || (series2 && !self.freezSeries2())) {
      Chart1.draw();
    }

    updateSeriesColors(self.freezSeries1(), self.freezSeries2());

    if (!self.tooltipInitialized) {
      self.isStopped(true);
      self.createTooltip();
      if (series) {
        series.format.point.visible = true;
        series.format.point.size = 5;
      }
      if (series2) {
        series2.format.point.visible = true;
        series2.format.point.size = 5;
      }
      self.setupChartInteraction();
      self.tooltipInitialized = true;

      self.currentPointIndex(0);
      self.showTooltipForPoint(0);
    }
    self.updateTotalPoints();

    var navElement = document.querySelector(".tooltip-navigation");
    if (navElement) {
      var series1Active = series && !self.freezSeries1() && series.visible !== false;
      var series2Active = series2 && !self.freezSeries2() && series2.visible !== false;
      var onlyOneSeries = (series1Active && !series2Active) || (!series1Active && series2Active);
      navElement.style.display = onlyOneSeries ? "block" : "none";
    }
    if (self.tooltipElement && self.tooltipElement.style.display !== "none") {
      self.showTooltipForPoint(self.currentPointIndex());
    }
  };

  self.getActiveClass = function (id) {
    return self.selectedFreezSeries.id == id ? true : false;
  };

  self.canYaxisSave = ko.computed(function () {
    if (self.selectedYaxisScale() && self.selectedYaxisScale().id == 1) {
      return self.selectedseries() && self.selectedYaxisScale() ? true : false;
    } else if (self.selectedYaxisScale() && self.selectedYaxisScale().id == 2) {
      return self.selectedseries() &&
        self.selectedYaxisScale() &&
        self.min() ||
        self.max()
        ? true
        : false;
    } else {
      return self.selectedseries() && self.selectedYaxisScale() && self.range()
        ? true
        : false;
    }
  });

  self.yaxiSubmit = function () {
    self.errors.showAllMessages();
    if (self.selectedYaxisScale().id) {
      if (self.selectedYaxisScale().id == 2) {
        self.updateYaxisChart(
          self.selectedseries().id - 1,
          self.min(),
          self.max(),
          false
        );
      } else if (self.selectedYaxisScale().id == 3) {
        self.updateYaxisChart(
          self.selectedseries().id - 1,
          self.min(),
          self.max(),
          true
        );
      }
      self.yaxisSettingShow(false);
      self.onExpandIconActive(false);
      self.chartClass("col-lg-12 col-md-12 col-sm-12 col-xs-12");
      self.tableClass("");
      resize(Chart1, 1110);
    }
  };

  self.updateYaxisChart = function (yaxisPosition, min, max, range) {
    if (range) {
      if (yaxisPosition == 0) {
        Chart1.axes.left.automatic = false;
        Chart1.axes.left.minimum = Number(min);
        Chart1.axes.left.maximum = Number(min) + Number(self.range());
      } else {
        Chart1.axes.right.automatic = false;
        Chart1.axes.right.minimum = Number(min);
        Chart1.axes.right.maximum = Number(min) + Number(self.range());
      }
    } else {
      if (yaxisPosition == 0) {
        Chart1.axes.left.automatic = false;
        Chart1.axes.left.minimum = Number(min);
        Chart1.axes.left.maximum = Number(max);
      } else {
        Chart1.axes.right.automatic = false;
        Chart1.axes.right.minimum = Number(min);
        Chart1.axes.right.maximum = Number(max);
      }
    }
    Chart1.draw();
    self.setMinAndMaxYAxis1FromChart();
  };

  self.setMinAndMaxYAxis1FromChart = function () {
    if (self.selectedseries().id == 1) {
      var yaxis1 = Chart1.axes["left"];
      self.min(setDecimalPalaces(yaxis1.minimum));
      self.max(setDecimalPalaces(yaxis1.maximum));
    } else {
      var yaxis1 = Chart1.axes["right"];
      self.min(setDecimalPalaces(yaxis1.minimum));
      self.max(setDecimalPalaces(yaxis1.maximum));
    }
  };

  self.setMinAndMaxYAxisFromTable = function () {
    if (self.selectedseries().id == 1) {
      self.min(1);
      self.max(100);
    } else {
      self.min(1);
      self.max(200);
    }
  };

  self.selectedYaxisScaleChange = function (data, event) {
    // self.errors.showAllMessages();
    if (data.selectedYaxisScale().id == 2) {
      // Manual
      self.yaxisRangeFieldDisabled(false);
      self.yaxiFieldsDisabled(true);
      self.setMinAndMaxYAxis1FromChart();
      self.showRangeErrors(false);
      self.showMinMaxErrors(true);
    } else if (data.selectedYaxisScale().id == 1) {
      // Auto
      self.yaxiFieldsDisabled(false);
      self.yaxisRangeFieldDisabled(false);
      self.setMinAndMaxYAxisFromTable();
      self.showRangeErrors(false);
      self.showMinMaxErrors(false);
    } else {
      // Range
      self.yaxiFieldsDisabled(false);
      self.yaxisRangeFieldDisabled(true);
      self.setMinAndMaxYAxis1FromChart();
      self.showRangeErrors(true);
      self.showMinMaxErrors(false);
    }
  };

  self.selectedYaxisSeriesChange = function (data, event) {
    self.selectedYaxisScale(self.yaxisScaleList()[0]);
    self.yaxiFieldsDisabled(false);
    self.yaxisRangeFieldDisabled(false);
    self.setMinAndMaxYAxisFromTable();
  };

  self.seriesConfig = ko.observableArray([]);

  if (profileData && profileData.profileData) {
    for (var i = 0; i < profileData.profileData.length; i++) {
      var seriesData = profileData.profileData[i];
      var indicator = String.fromCharCode(65 + i); // 'A', 'B', etc.
      var horizAxis = i === 0 ? "bottom" : "top";
      var vertAxis = i === 0 ? "left" : "right";

      self.seriesConfig.push(
        new SeriesModel(i + 1, indicator, seriesData, horizAxis, vertAxis)
      );
    }
  }

  self.statisticsComputedData = ko.computed(function () {
    return statisticsComputedData(profileData.profileData.length);
  });

  self.visibleSeries = ko.observableArray(
    createLegends(profileData.profileData)
  );

  self.onSeriesClick = function (data, event) {
    self.toggleSeries(data);
    return true;
  };

  self.toggleSeries = function (seriesConfig) {
    if (ko.isObservable(seriesConfig.enabled)) {
      seriesConfig.enabled(!seriesConfig.enabled());
    } else {
      seriesConfig.enabled = !seriesConfig.enabled;
    }
    var series1Visible;
    var series2Visible;
    try {
      if (cancelSeries1 == true) {
        Chart1.series.items[0].visible = !Chart1.series.items[0].visible;
        series2Visible = Chart1.series.items[0].visible;
        upperThresholdSeries2.visible = series2Visible;
        lowerThresholdSeries2.visible = series2Visible;
        return;
      }
      if (seriesConfig.id == 1) {
        Chart1.series.items[0].visible = !Chart1.series.items[0].visible;
      } else {
        Chart1.series.items[1].visible = !Chart1.series.items[1].visible;
      }

      series1Visible = Chart1.series.items[0].visible;
      series2Visible = Chart1.series.items[1].visible;
      if (upperThresholdSeries1 && lowerThresholdSeries1) {
        upperThresholdSeries1.visible = series1Visible && !series2Visible;
        lowerThresholdSeries1.visible = series1Visible && !series2Visible;
      }

      if (upperThresholdSeries2 && lowerThresholdSeries2) {
        upperThresholdSeries2.visible = !series1Visible && series2Visible;
        lowerThresholdSeries2.visible = !series1Visible && series2Visible;
      }
    } catch (e) {
      console.error("Error in toggleSeries:", e);
    } finally {
      Chart1.draw();
    }
  };

  var cancelSeries1 = false;

  self.cancelSeries = function (seriesConfig, event) {
    if (event) {
      event.stopPropagation();
    }
    ko.isObservable(seriesConfig.visible)
      ? seriesConfig.visible(false)
      : (seriesConfig.visible = false);

    if (seriesConfig.id == 1) {
      if (tooltipPointer1) {
        Chart1.removeSeries(tooltipPointer1);
        tooltipPointer1 = null;
      }
      if (lowerThresholdSeries1) {
        Chart1.removeSeries(lowerThresholdSeries1);
        lowerThresholdSeries1 = null;
      }
      if (upperThresholdSeries1) {
        Chart1.removeSeries(upperThresholdSeries1);
        upperThresholdSeries1 = null;
      }
      if (series) {
        Chart1.removeSeries(series);
        series = null;
      }

      cancelSeries1 = true;

    } else {
      if (tooltipPointer2) {
        Chart1.removeSeries(tooltipPointer2);
        tooltipPointer2 = null;
      }
      if (lowerThresholdSeries2) {
        Chart1.removeSeries(lowerThresholdSeries2);
        lowerThresholdSeries2 = null;
      }
      if (upperThresholdSeries2) {
        Chart1.removeSeries(upperThresholdSeries2);
        upperThresholdSeries2 = null;
      }
      if (series2) {
        Chart1.removeSeries(series2);
        series2 = null;
      }
    }

    if (Chart1.series.items.length == 0) {
      // self.stop();
      if (self.tooltipElement) {
        self.tooltipElement.style.display = "none";
      }
      var navElement = document.querySelector(".tooltip-navigation");
      if (navElement) {
        navElement.style.display = "none";
      }
    }
    Chart1.draw();
  };

  self.toggleZoomSlider = function () {
    if (self.zoomEnabled) {
      self.showZoomSlider(!self.showZoomSlider());
      if (self.showZoomSlider()) {
        setTimeout(function () {
          if (!sliderInitialized && Chart1) {
            setupBootstrapSlider(Chart1);
          }
        }, 100);
      }
    }
  };

  self.updateChart = function () {
    dualAxisChart1(
      profileData.profileData.length,
      true
    );
  };

  self.updateData = function () {
    var newDat = [90, 50, 80, 70, 60];
    updateChart(newDat);
  };

  self.onSettingIconActive = ko.observable(false);
  self.onSettingShow = ko.observable(false);
  self.onTableIconActive = ko.observable(true);
  self.onTableShow = ko.observable(true);
  self.onExpandIconActive = ko.observable(false);
  self.isExpanded = ko.observable(false);

  self.chartClass = ko.observable("col-lg-9 col-md-9 col-sm-9 col-xs-9");
  self.tableClass = ko.observable("col-lg-3 col-md-3 col-sm-3 col-xs-3");

  self.onTableIconClick = function () {
    self.onTableShow(!self.onTableShow());
    self.onTableIconActive(!self.onTableIconActive());
    self.yaxisSettingShow(false);
    self.onExpandIconActive(false);
    if (self.onTableIconActive()) {
      self.chartClass("col-lg-9 col-md-9 col-sm-9 col-xs-9");
      self.tableClass("col-lg-3 col-md-3 col-sm-3 col-xs-3");
      resize(Chart1, 800);
    } else {
      self.chartClass("col-lg-12 col-md-12 col-sm-12 col-xs-12");
      self.tableClass("");
      resize(Chart1, 1110);
    }
  };

  self.onExpandIonClick = function () {
    self.onExpandIconActive(!self.onExpandIconActive());
    self.yaxisSettingShow(true);
    self.onTableShow(false);
    self.onTableIconActive(false);

    if (self.onExpandIconActive()) {
      self.chartClass("col-lg-9 col-md-9 col-sm-9 col-xs-9");
      self.tableClass("col-lg-3 col-md-3 col-sm-3 col-xs-3");
      resize(Chart1, 800);
    } else {
      self.chartClass("col-lg-12 col-md-12 col-sm-12 col-xs-12");
      self.tableClass("");
      resize(Chart1, 1110);
    }

    if (self.selectedseries().id == 1) {
      self.min(
        setDecimalPalaces(
          profileData.profileData[self.selectedseries().id - 1]["min"]
        )
      );
      self.max(
        setDecimalPalaces(
          profileData.profileData[self.selectedseries().id - 1]["max"]
        )
      );
    }

    if (self.selectedYaxisScale().id == 2) {
      // Manual
      self.yaxisRangeFieldDisabled(false);
      self.yaxiFieldsDisabled(true);
      self.setMinAndMaxYAxis1FromChart();
    } else if (self.selectedYaxisScale().id == 1) {
      // Auto
      self.yaxiFieldsDisabled(false);
      self.yaxisRangeFieldDisabled(false);
      self.setMinAndMaxYAxisFromTable();
    } else {
      // Range
      self.yaxiFieldsDisabled(false);
      self.yaxisRangeFieldDisabled(true);
      self.setMinAndMaxYAxis1FromChart();
    }
  };

  self.toggleExpand = function () {
    self.isExpanded(!self.isExpanded());
    setTimeout(function () {
      var ctx = document.getElementById("chartCanvas");
      var container = ctx.parentElement;
      ctx.width = container.clientWidth;
      ctx.height = container.clientHeight;
      self.updateChart();
    }, 100);
  };

  self.resizeGrid = function () {
    alert("Grid resized!");
  };

  self.intervalId = setInterval(self.generateRandomPoint, 1000);
  var range;
  var initialMin;
  var initialMax;

  self.stop = function () {
    clearInterval(self.intervalId);
    self.zoomEnabled(true);
    var minimum = findMin(series.data.x, series2.data.x);
    var maximum = findMax(series.data.x, series2.data.x);
    range = maximum - minimum;
    initialMin = Math.round(minimum + range * 0.2);
    initialMax = Math.round(minimum + range * 0.8);
    self.sliderMinValue(initialMin);
    self.sliderMaxValue(initialMax);
  };

  self.createTooltip = function () {
    if (!self.tooltipElement) {
      self.tooltipElement = document.createElement("div");
      self.tooltipElement.className = "custom-tooltip";
      document.body.appendChild(self.tooltipElement);
    }
  };

  self.setupChartInteraction = function () {
    var canvas = document.getElementById("chartCanvas");
    canvas.onclick = function (event) {
      var rect = canvas.getBoundingClientRect();
      var x = event.clientX - rect.left;
      var y = event.clientY - rect.top;
      var closestPoint = self.findClosestPoint(x, y);
      if (closestPoint) {
        self.showTooltipForPoint(closestPoint.index);
        if (tooltipPointer) {
          var seriesData = closestPoint.series.data;
          var xValue = seriesData.x && seriesData.x[closestPoint.index] ? seriesData.x[closestPoint.index] : closestPoint.index;
          var yValue = seriesData.values[closestPoint.index];

          tooltipPointer.data.x = [xValue];
          tooltipPointer.data.values = [yValue];
          tooltipPointer.horizAxis = closestPoint.seriesIndex === 0 ? "bottom" : "top";
          tooltipPointer.vertAxis = closestPoint.seriesIndex === 0 ? "left" : "right";
          tooltipPointer.visible = true;
        }
        self.showTooltipForPoint(closestPoint.index);
      }
    };
    canvas.onmousemove = function (event) {
      var rect = canvas.getBoundingClientRect();
      var x = event.clientX - rect.left;
      var y = event.clientY - rect.top;
      var closestPoint = self.findClosestPoint(x, y);
      if (closestPoint) {
        canvas.style.cursor = "pointer";
      } else {
        canvas.style.cursor = "default";
      }
    };
  };

  self.findClosestPoint = function (mouseX, mouseY) {
    if (!Chart1) return null;
    var closestDistance = Number.MAX_VALUE;
    var closestPoint = null;

    if (series && series.data && series.data.values && !self.freezSeries1()) {
      for (var i = 0; i < series.data.values.length; i++) {
        var xVal = series.data.x && series.data.x[i] ? series.data.x[i] : i;
        var yVal = series.data.values[i];
        var xAxis = Chart1.axes.bottom;
        var yAxis = Chart1.axes.left;
        var x = xAxis.calc(xVal);
        var y = yAxis.calc(yVal);
        var distance = Math.sqrt(Math.pow(mouseX - x, 2) + Math.pow(mouseY - y, 2));

        if (distance < closestDistance && distance < 20) {
          closestDistance = distance;
          closestPoint = {
            series: series,
            index: i,
            seriesIndex: 0,
            x: x,
            y: y
          };
        }
      }
    }

    if (series2 && series2.data && series2.data.values && !self.freezSeries2()) {
      for (var i = 0; i < series2.data.values.length; i++) {
        var xVal = series2.data.x && series2.data.x[i] ? series2.data.x[i] : i;
        var yVal = series2.data.values[i];
        var xAxis = Chart1.axes.top;
        var yAxis = Chart1.axes.right;
        var x = xAxis.calc(xVal);
        var y = yAxis.calc(yVal);
        var distance = Math.sqrt(Math.pow(mouseX - x, 2) + Math.pow(mouseY - y, 2));

        if (distance < closestDistance && distance < 20) {
          closestDistance = distance;
          closestPoint = {
            series: series2,
            index: i,
            seriesIndex: 1,
            x: x,
            y: y
          };
        }
      }
    }

    return closestPoint;
  };

  self.getLatestPointIndex = function () {
    var series1Length = series && series.data && series.data.values ? series.data.values.length : 0;
    var series2Length = series2 && series2.data && series2.data.values ? series2.data.values.length : 0;
    return Math.max(series1Length - 1, series2Length - 1);
  };

  self.showTooltipForPoint = function (index) {
    if (!Chart1 || !self.tooltipElement) return;

    var visibleSeriesCount = 0;
    var series1Active = false;
    var series2Active = false;

    if (series && Chart1.series.items.length > 0 &&
      Chart1.series.items[0].horizAxis === "bottom" &&
      Chart1.series.items[0].visible !== false &&
      !self.freezSeries1() &&
      Chart1.series.items[0].data &&
      Chart1.series.items[0].data.values &&
      index < Chart1.series.items[0].data.values.length) {
      series1Active = true;
      visibleSeriesCount++;
    }

    if (series2 && Chart1.series.items.length > 1 &&
      Chart1.series.items[1].horizAxis === "top" &&
      Chart1.series.items[1].visible !== false &&
      !self.freezSeries2() &&
      Chart1.series.items[1].data &&
      Chart1.series.items[1].data.values &&
      index < Chart1.series.items[1].data.values.length) {
      series2Active = true;
      visibleSeriesCount++;
    }

    if (visibleSeriesCount === 0) {
      self.tooltipElement.style.display = "none";
      return;
    }

    var tooltipContent = '<div style="font-weight:bold;margin-bottom:5px;">Point ' + (index + 1) + "</div>";
    var tooltipX = 0, tooltipY = 0;
    var primarySeries, primarySeriesIndex;

    if (tooltipPointer1) {
      tooltipPointer1.data.x = [];
      tooltipPointer1.data.values = [];
      tooltipPointer1.visible = false;
    }
    if (tooltipPointer2) {
      tooltipPointer2.data.x = [];
      tooltipPointer2.data.values = [];
      tooltipPointer2.visible = false;
    }

    if (series1Active) {
      var xValue1 = series.data.x && series.data.x.length > index ? series.data.x[index] : index;
      var yValue1 = series.data.values[index];

      tooltipContent += '<div class="tooltip-series-1">Series 1: ' + yValue1.toFixed(2) + "</div>";

      var x1 = Chart1.axes.bottom.calc(xValue1);
      var y1 = Chart1.axes.left.calc(yValue1);

      tooltipX = x1;
      tooltipY = y1;
      primarySeries = series;
      primarySeriesIndex = 0;

      if (tooltipPointer1) {
        tooltipPointer1.data.x = [xValue1];
        tooltipPointer1.data.values = [yValue1];
        tooltipPointer1.visible = true;
      }
    }

    if (series2Active) {
      var xValue2 = series2.data.x && series2.data.x.length > index ? series2.data.x[index] : index;
      var yValue2 = series2.data.values[index];

      tooltipContent += '<div class="tooltip-series-2">Series 2: ' + yValue2.toFixed(2) + "</div>";

      var x2 = Chart1.axes.top.calc(xValue2);
      var y2 = Chart1.axes.right.calc(yValue2);

      if (!series1Active) {
        tooltipX = x2;
        tooltipY = y2;
        primarySeries = series2;
        primarySeriesIndex = 1;
      }

      if (tooltipPointer2) {
        tooltipPointer2.data.x = [xValue2];
        tooltipPointer2.data.values = [yValue2];
        tooltipPointer2.visible = true;
      }
    }

    var canvas = document.getElementById("chartCanvas");
    var canvasRect = canvas.getBoundingClientRect();

    self.tooltipElement.innerHTML = tooltipContent;
    self.tooltipElement.style.left =
      Math.round(canvasRect.left + tooltipX + window.pageXOffset) + "px";
    self.tooltipElement.style.top =
      Math.round(canvasRect.top + tooltipY + window.pageYOffset - 60) + "px";
    self.tooltipElement.style.display = "block";
    self.updateSeriesHighlights(index);
    self.updateTotalPoints();
    var navElement = document.querySelector(".tooltip-navigation");
    if (navElement) {
      var onlyOneSeries =
        (series1Active && !series2Active) || (!series1Active && series2Active);
      navElement.style.display = onlyOneSeries ? "block" : "none";
    }
    self.currentPointIndex(index);
    Chart1.draw();
  };

  self.updateTotalPoints = function () {
    var series1Active =
      series &&
      series.data &&
      series.data.values &&
      !self.freezSeries1() &&
      series.visible !== false;
    var series2Active =
      series2 &&
      series2.data &&
      series2.data.values &&
      !self.freezSeries2() &&
      series2.visible !== false;

    var count = 0;
    if (series1Active && !series2Active) {
      count = series.data.values.length;
    } else if (!series1Active && series2Active) {
      count = series2.data.values.length;
    } else if (series1Active && series2Active) {
      count = Math.max(series.data.values.length, series2.data.values.length);
    }
    self.totalPoints(count);
  };

  self.updateSeriesHighlights = function (selectedIndex) {
    if (!Chart1) return;

    if (series && Chart1.series.items.length > 0) {
      var s1 = Chart1.series.items[0];
      s1.ongetpoint = function (index) {
        if (
          index === selectedIndex &&
          !self.freezSeries1() &&
          s1.visible !== false
        ) {
          return {
            fill: "red",
            stroke: "white",
            size: 8,
          };
        }
        return null;
      };
    }

    if (series2 && Chart1.series.items.length > 1) {
      var s2 = Chart1.series.items[1];
      s2.ongetpoint = function (index) {
        if (
          index === selectedIndex &&
          !self.freezSeries2() &&
          s2.visible !== false
        ) {
          return {
            fill: "red",
            stroke: "white",
            size: 8,
          };
        }
        return null;
      };
    }
  };

  self.navigatePreviousPoint = function () {
    if (self.currentPointIndex() > 0) {
      self.currentPointIndex(self.currentPointIndex() - 1);
      self.showTooltipForPoint(self.currentPointIndex());
    }
  };

  self.navigateNextPoint = function () {
    if (self.currentPointIndex() < self.totalPoints() - 1) {
      self.currentPointIndex(self.currentPointIndex() + 1);
      self.showTooltipForPoint(self.currentPointIndex());
    }
  };

  self.tooltipVisible = ko.observable(false);
  self.tooltipElement = null;
  self.currentPointIndex = ko.observable(0);
  self.totalPoints = ko.observable(0);
  self.isStopped = ko.observable(false);

  self.prevPointDisabled = ko.computed(function () {
    return self.currentPointIndex() <= 0;
  });

  self.nextPointDisabled = ko.computed(function () {
    return self.currentPointIndex() >= self.totalPoints() - 1;
  });

  if (self.counter == 2000) {
    clearInterval(self.intervalId);
  }
}

function setDecimalPalaces(num) {
  return num % 1 === 0 ? num : num.toFixed(3);
}

window.onload = function () {
  try {
    initChart();
    ko.applyBindings(new viewModel());
  } catch (e) {
    console.error("Error during initialization:", e);
  }
};