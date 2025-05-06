<!-- Replace your current dropdown HTML with this -->
<div class="custom-dropdown" style="display: inline-block; margin-left: 5px;">
  <button class="btn btn-transperent custom-dropdown-toggle" type="button">
    <span class="fa-solid fa-chart-simple" aria-hidden="true"></span>
    <span class="caret"></span>
  </button>
  
  <ul class="custom-dropdown-menu" data-bind="foreach: $root.visibleSeries" style="max-height: 150px; overflow-y: auto;">
    <li>
      <label style="display: block; padding: 3px 10px; margin: 0; white-space: nowrap;">
        <input type="checkbox" data-bind="event:{ change: $root.onFreezClick}, css: 'btnActive'" style="margin-right: 5px;" />
        <span data-bind="text: name,style: { color: id == 1 ? 'orange' : 'green' }"></span>
      </label>
    </li>
  </ul>
</div>


-------------------------------------------------------------------------------------------------------------------------------

/* CSS-only dropdown solution that works in IE11 */
.custom-dropdown {
  position: relative;
  display: inline-block;
}

.custom-dropdown-toggle {
  cursor: pointer;
  background: transparent;
  border: none;
  padding: 6px 12px;
}

.custom-dropdown-menu {
  display: none;
  position: absolute;
  right: 0;
  top: 100%;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 6px 12px rgba(0,0,0,.175);
  z-index: 1000;
  min-width: 160px;
  max-height: 150px;
  overflow-y: auto;
  padding: 5px 0;
}

/* This is the key part for IE11 compatibility */
.custom-dropdown:hover .custom-dropdown-menu {
  display: block;
}

/* Additional styling for menu items */
.custom-dropdown-menu li {
  list-style: none;
}

.custom-dropdown-menu label {
  display: block;
  padding: 3px 10px;
  margin: 0;
  white-space: nowrap;
  cursor: pointer;
}

.custom-dropdown-menu label:hover {
  background-color: #f5f5f5;
}

/* Help with z-index in IE11 */
.custom-dropdown {
  z-index: 999;
}

/* Ensure checkboxes are visible in IE11 */
.custom-dropdown-menu input[type="checkbox"] {
  margin-right: 5px;
  vertical-align: middle;
}
