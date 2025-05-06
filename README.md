/**
 * Vanilla Range Slider - IE11 Compatible
 * A lightweight, customizable slider implementation with no dependencies
 */

// Define VanillaRangeSlider in the global scope
window.VanillaRangeSlider = function(element, options) {
  options = options || {};
  
  // Default options
  this.options = {
    min: typeof options.min !== 'undefined' ? options.min : 0,
    max: typeof options.max !== 'undefined' ? options.max : 100,
    step: typeof options.step !== 'undefined' ? options.step : 1,
    onChange: typeof options.onChange === 'function' ? options.onChange : function() {},
    onSlideEnd: typeof options.onSlideEnd === 'function' ? options.onSlideEnd : function() {}
  };
  
  // Handle the values property separately to ensure we have valid defaults
  var defaultMin = this.options.min;
  var defaultMax = this.options.max;
  this.options.values = options.values || [defaultMin, defaultMax];

  // Elements
  this.element = element;
  this.track = element.querySelector('.range-track');
  this.fill = element.querySelector('.range-track-fill');
  this.handles = {
    left: element.querySelector('.range-handle-left'),
    right: element.querySelector('.range-handle-right')
  };
  this.tooltips = {
    left: element.querySelector('.range-tooltip-left'),
    right: element.querySelector('.range-tooltip-right')
  };

  // State
  this.activeHandle = null;
  this.values = [
    this.options.values[0],
    this.options.values[1]
  ];
  this.trackWidth = this.track.offsetWidth;
  
  // Initialize
  this.init();
};

// Prototype methods
window.VanillaRangeSlider.prototype = {
  init: function() {
    // Set initial positions
    this.updatePositions();
    
    // Event listeners
    this.addEventListeners();
    
    // Update handle positions on window resize
    var self = this;
    window.addEventListener('resize', function() {
      self.trackWidth = self.track.offsetWidth;
      self.updatePositions();
    });
  },

  addEventListeners: function() {
    var self = this;
    
    // Handle mouse/touch events for both handles
    function handleMouseDown(e, handle) {
      if (e.preventDefault) {
        e.preventDefault();
      } else {
        e.returnValue = false; // For IE
      }
      
      self.activeHandle = handle;
      self.handles[handle].classList.add('active');
      
      document.addEventListener('mousemove', self.handleMouseMove);
      document.addEventListener('touchmove', self.handleMouseMove);
      document.addEventListener('mouseup', self.handleMouseUp);
      document.addEventListener('touchend', self.handleMouseUp);
    }

    // For IE11 compatibility - need to use function reference
    function leftHandleMouseDown(e) {
      handleMouseDown(e, 'left');
    }
    
    function rightHandleMouseDown(e) {
      handleMouseDown(e, 'right');
    }

    this.handles.left.addEventListener('mousedown', leftHandleMouseDown);
    this.handles.left.addEventListener('touchstart', leftHandleMouseDown);
    this.handles.right.addEventListener('mousedown', rightHandleMouseDown);
    this.handles.right.addEventListener('touchstart', rightHandleMouseDown);

    // Bind methods to this instance
    var self = this;
    this.handleMouseMove = function(e) {
      if (!self.activeHandle) return;
      
      if (e.preventDefault) {
        e.preventDefault();
      } else {
        e.returnValue = false; // For IE
      }
      
      var rect = self.track.getBoundingClientRect();
      var clientX = e.clientX;
      if (!clientX && e.touches && e.touches.length) {
        clientX = e.touches[0].clientX;
      }
      
      var x = clientX - rect.left;
      
      // Constrain to track boundaries
      x = Math.max(0, Math.min(x, self.trackWidth));
      
      var percentage = x / self.trackWidth;
      var value = self.options.min + percentage * (self.options.max - self.options.min);
      value = self.getSteppedValue(value);
      
      // Update value based on active handle
      if (self.activeHandle === 'left') {
        self.values[0] = Math.min(value, self.values[1]);
      } else {
        self.values[1] = Math.max(value, self.values[0]);
      }
      
      self.updatePositions();
      self.options.onChange(self.values);
    };

    this.handleMouseUp = function() {
      if (!self.activeHandle) return;
      
      self.handles[self.activeHandle].classList.remove('active');
      self.activeHandle = null;
      
      document.removeEventListener('mousemove', self.handleMouseMove);
      document.removeEventListener('touchmove', self.handleMouseMove);
      document.removeEventListener('mouseup', self.handleMouseUp);
      document.removeEventListener('touchend', self.handleMouseUp);
      
      self.options.onSlideEnd(self.values);
    };
    
    // Track click event
    this.track.addEventListener('click', function(e) {
      var rect = self.track.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var percentage = x / self.trackWidth;
      var value = self.options.min + percentage * (self.options.max - self.options.min);
      value = self.getSteppedValue(value);
      
      // Find closest handle
      var leftDistance = Math.abs(self.values[0] - value);
      var rightDistance = Math.abs(self.values[1] - value);
      
      if (leftDistance <= rightDistance) {
        self.values[0] = self.getSteppedValue(value);
      } else {
        self.values[1] = self.getSteppedValue(value);
      }
      
      self.updatePositions();
      self.options.onChange(self.values);
      self.options.onSlideEnd(self.values);
    });
  },

  getSteppedValue: function(value) {
    var step = this.options.step;
    return Math.round(value / step) * step;
  },

  updatePositions: function() {
    var range = this.options.max - this.options.min;
    
    // Calculate percentages
    var leftPercent = ((this.values[0] - this.options.min) / range) * 100;
    var rightPercent = ((this.values[1] - this.options.min) / range) * 100;
    
    // Update handle positions - use left property directly for IE11
    this.handles.left.style.left = leftPercent + '%';
    this.handles.right.style.left = rightPercent + '%';
    
    // Update fill bar - use left and width properties directly for IE11
    this.fill.style.left = leftPercent + '%';
    this.fill.style.width = (rightPercent - leftPercent) + '%';
    
    // Update tooltips
    if (this.tooltips.left) {
      this.tooltips.left.textContent = this.values[0];
      this.tooltips.left.style.left = leftPercent + '%';
    }
    
    if (this.tooltips.right) {
      this.tooltips.right.textContent = this.values[1];
      this.tooltips.right.style.left = rightPercent + '%';
    }
  },

  // Public methods
  setValues: function(values) {
    this.values = [
      Math.max(this.options.min, Math.min(this.options.max, values[0])),
      Math.max(this.options.min, Math.min(this.options.max, values[1]))
    ];
    this.updatePositions();
  },
  
  getValues: function() {
    return [this.values[0], this.values[1]];
  },
  
  update: function(options) {
    if (options) {
      for (var key in options) {
        if (options.hasOwnProperty(key)) {
          this.options[key] = options[key];
        }
      }
    }
    this.updatePositions();
  }
};

// Polyfill for Element.matches and Element.closest (for IE11)
(function() {
  if (!Element.prototype.matches) {
    Element.prototype.matches = 
      Element.prototype.msMatchesSelector || 
      Element.prototype.webkitMatchesSelector;
  }
  
  if (!Element.prototype.closest) {
    Element.prototype.closest = function(s) {
      var el = this;
      do {
        if (Element.prototype.matches.call(el, s)) return el;
        el = el.parentElement || el.parentNode;
      } while (el !== null && el.nodeType === 1);
      return null;
    };
  }
})();

/**
 * Modified setupVanillaRangeSlider function to work with your chart
 * Assumes the HTML is already in place
 */
function setupVanillaRangeSlider(chart) {
  if (sliderInitialized) return;
  
  var sliderElement = document.getElementById('rangeSlider');
  if (!sliderElement) return;
  
  // Calculate min, max, and initial values
  var minimum = findMin(series.data.x, series2.data.x);
  var maximum = findMax(series.data.x, series2.data.x);
  var range = maximum - minimum;
  var initialMin = Math.round(minimum + range * 0.2);
  var initialMax = Math.round(maximum - range * 0.2);
  
  // Initialize the vanilla range slider with your HTML
  var slider = new VanillaRangeSlider(sliderElement, {
    min: minimum,
    max: maximum,
    step: 1,
    values: [initialMin, initialMax],
    onChange: function(values) {
      // Update chart zoom while sliding
      updateChartZoom(values[0], values[1]);
    },
    onSlideEnd: function(values) {
      // Final update after slider movement ends
      updateChartZoom(values[0], values[1]);
    }
  });
  
  // Initialize the chart with the initial range
  sliderInitialized = true;
  updateChartZoom(initialMin, initialMax);
  
  // Make slider available globally for other functions
  window.zoomSlider = slider;
}

/**
 * Update the chart zoom range
 */
function updateChartZoom(min, max) {
  if (!Chart1) return;
  
  var maximum = findMax(series.data.x, series2.data.x);
  
  // Update chart axes
  Chart1.axes.bottom.setMinMax(min, max);
  Chart1.axes.top.setMinMax(min, max);
  
  // Update the information text
  var infoElement = document.querySelector('.slider-info');
  if (infoElement) {
    infoElement.textContent = 'Showing points ' + min + ' to ' + max + ' of ' + maximum;
  }
  
  // Redraw the chart
  Chart1.draw();
}
