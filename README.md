window.VanillaRangeSlider = function(element, options) {
  this.options = {
    min: options.min || 0,
    max: options.max || 100,
    step: options.step || 1,
    values: options.values || [this.options?.min || 0, this.options?.max || 100],
    onChange: options.onChange || function() {},
    onSlideEnd: options.onSlideEnd || function() {}
  };

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

  this.activeHandle = null;
  this.values = [
    this.options.values[0] || this.options.min,
    this.options.values[1] || this.options.max
  ];
  this.trackWidth = this.track.offsetWidth;
  this.init();
};

window.VanillaRangeSlider.prototype = {
  init: function() {
    this.updatePositions();
    this.addEventListeners();
    var self = this;
    window.addEventListener('resize', function() {
      self.trackWidth = self.track.offsetWidth;
      self.updatePositions();
    });
  },

  addEventListeners: function() {
    var self = this;
    function handleMouseDown(e, handle) {
      e.preventDefault ? e.preventDefault() : (e.returnValue = false); 
      self.activeHandle = handle;
      self.handles[handle].classList.add('active');
      
      document.addEventListener('mousemove', self.handleMouseMove);
      document.addEventListener('touchmove', self.handleMouseMove);
      document.addEventListener('mouseup', self.handleMouseUp);
      document.addEventListener('touchend', self.handleMouseUp);
    }

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

    var self = this;
    this.handleMouseMove = function(e) {
      if (!self.activeHandle) return;
      
      e.preventDefault ? e.preventDefault() : (e.returnValue = false);
      
      var rect = self.track.getBoundingClientRect();
      var clientX = e.clientX || (e.touches && e.touches[0].clientX);
      var x = clientX - rect.left;
      
      x = Math.max(0, Math.min(x, self.trackWidth));
      
      var percentage = x / self.trackWidth;
      var value = self.options.min + percentage * (self.options.max - self.options.min);
      value = self.getSteppedValue(value);
      
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
    
    this.track.addEventListener('click', function(e) {
      var rect = self.track.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var percentage = x / self.trackWidth;
      var value = self.options.min + percentage * (self.options.max - self.options.min);
      value = self.getSteppedValue(value);
      
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
    var leftPercent = ((this.values[0] - this.options.min) / range) * 100;
    var rightPercent = ((this.values[1] - this.options.min) / range) * 100;
    
    this.handles.left.style.left = leftPercent + '%';
    this.handles.right.style.left = rightPercent + '%';
    
    this.fill.style.left = leftPercent + '%';
    this.fill.style.width = (rightPercent - leftPercent) + '%';
    
    if (this.tooltips.left) this.tooltips.left.textContent = this.values[0];
    if (this.tooltips.right) this.tooltips.right.textContent = this.values[1];
    if (this.tooltips.left) this.tooltips.left.style.left = leftPercent + '%';
    if (this.tooltips.right) this.tooltips.right.style.left = rightPercent + '%';
  },

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

function setupVanillaRangeSlider(chart) {
  if (sliderInitialized) return;
  
  var sliderElement = document.getElementById('rangeSlider');
  if (!sliderElement) return;
  
  var minimum = findMin(series.data.x, series2.data.x);
  var maximum = findMax(series.data.x, series2.data.x);
  var range = maximum - minimum;
  var initialMin = Math.round(minimum + range * 0.2);
  var initialMax = Math.round(maximum - range * 0.2);
  
  var slider = new VanillaRangeSlider(sliderElement, {
    min: minimum,
    max: maximum,
    step: 1,
    values: [initialMin, initialMax],
    onChange: function(values) {
      updateChartZoom(values[0], values[1]);
    },
    onSlideEnd: function(values) {
      updateChartZoom(values[0], values[1]);
    }
  });
  sliderInitialized = true;
  updateChartZoom(initialMin, initialMax);
  window.zoomSlider = slider;
}

function updateChartZoom(min, max) {
  if (!Chart1) return;
  
  var maximum = findMax(series.data.x, series2.data.x);
  Chart1.axes.bottom.setMinMax(min, max);
  Chart1.axes.top.setMinMax(min, max);
  Chart1.draw();
}



















-------------------------------------------------------------------------------------------------------------------------------------------------------------------
<div class="slider-container" style="clear: both; padding: 10px 0; width: 100%;" data-bind="visible: showZoomSlider">
            <div class="row sliderCenter">
              <div class="col-md-10">
                <div id="rangeSlider" class="vanilla-range-slider">
                  <div class="range-track">
                    <div class="range-track-fill"></div>
                  </div>
                  <div class="range-handle range-handle-left" data-handle="left"></div>
                  <div class="range-handle range-handle-right" data-handle="right"></div>
                  <div class="range-tooltips">
                    <div class="range-tooltip range-tooltip-left"></div>
                    <div class="range-tooltip range-tooltip-right"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>


-----------------------------------------------------------------------------------------------------------------------------------------------------------------


.vanilla-range-slider {
  position: relative;
  width: 100%;
  height: 10px;
  margin: 20px 0;
}

.range-track {
  position: absolute;
  width: 100%;
  height: 6px;
  background-color: #ddd;
  border-radius: 3px;
  top: 50%;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%); 
  transform: translateY(-50%);
}

.range-track-fill {
  position: absolute;
  height: 100%;
  background-color: #1c588d;
  border-radius: 3px;
  left: 0; 
  width: 0; 
}

.range-handle {
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: #fff;
  border: 2px solid #1c588d;
  border-radius: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%); 
  transform: translate(-50%, -50%);
  cursor: pointer;
  z-index: 2;
  -webkit-transition: box-shadow 0.2s;
  transition: box-shadow 0.2s;
}

.range-handle:hover, .range-handle.active {
  -webkit-box-shadow: 0 0 0 5px rgba(2, 117, 216, 0.2);
  box-shadow: 0 0 0 5px rgba(2, 117, 216, 0.2);
}

.range-tooltips {
  position: absolute;
  width: 100%;
  height: 0;
  top: -25px;
}

.range-tooltip {
  position: absolute;
  background-color: #1c588d;
  color: white;
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 3px;
  -webkit-transform: translateX(-50%);
  -ms-transform: translateX(-50%); 
  transform: translateX(-50%);
  white-space: nowrap;
}

.range-tooltip:after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #1c588d transparent transparent transparent;
}

.dark-theme .range-track {
  background-color: #495057;
}

.dark-theme .range-track-fill {
  background-color: #1c588d;
}

.dark-theme .range-handle {
  background-color: #343a40;
  border-color: #1c588d;
}

.dark-theme .range-tooltip {
  background-color: #1c588d;
}

.dark-theme .range-tooltip:after {
  border-color: #1c588d transparent transparent transparent;
}
