/* CSS for the custom dropdown */
.custom-dropdown {
  position: relative;
  display: inline-block;
}

.custom-dropdown-toggle {
  cursor: pointer;
  background: transparent;
}

.custom-dropdown-menu {
  position: absolute;
  right: 0;
  top: 100%;
  display: none;
  min-width: 160px;
  background-color: #fff;
  border: 1px solid rgba(0,0,0,.15);
  border-radius: 4px;
  box-shadow: 0 6px 12px rgba(0,0,0,.175);
  z-index: 1000;
  max-height: 150px;
  overflow-y: auto;
  padding: 5px 0;
}

/* Class to show the dropdown when active */
.custom-dropdown-menu.show {
  display: block;
}

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

/* HTML replacement:
<div class="custom-dropdown" style="display: inline-block; margin-left: 5px;">
  <button class="btn btn-transperent custom-dropdown-toggle" type="button" id="chartDropdown">
    <span class="fa-solid fa-chart-simple" aria-hidden="true"></span>
    <span class="caret"></span>
  </button>
  
  <ul class="custom-dropdown-menu" id="chartDropdownMenu" data-bind="foreach: $root.visibleSeries" style="max-height: 150px; overflow-y: auto;">
    <li>
      <label style="display: block; padding: 3px 10px; margin: 0; white-space: nowrap;">
        <input type="checkbox" data-bind="event:{ change: $root.onFreezClick}, css: 'btnActive'" style="margin-right: 5px;" />
        <span data-bind="text: name,style: { color: id == 1 ? 'orange' : 'green' }"></span>
      </label>
    </li>
  </ul>
</div> */

