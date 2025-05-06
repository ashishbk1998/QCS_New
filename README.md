@font-face {
  font-family: "qcs-icons";
  src: url("~/assets/fonts/honeywell/icons/qcs-icons.eot?jmiv8g");
  src: url("~/assets/fonts/honeywell/icons/qcs-icons.eot?jmiv8g#iefix")
      format("embedded-opentype"),
    url("~/assets/fonts/honeywell/icons/qcs-icons.woff?jmiv8g") format("woff"),
    url("~/assets/fonts/honeywell/icons/qcs-icons.svg?jmiv8g#qcs-icons")
      format("svg");
  font-weight: normal;
  font-style: normal;
  font-display: block;
}

@font-face {
  font-family: "qcs-display-flip-icons";
  src: url("~/assets/fonts/honeywell/icons/qcs-display-flip-icons.eot?mppyyr");
  src: url("~/assets/fonts/honeywell/icons/qcs-display-flip-icons.eot?mppyyr#iefix")
      format("embedded-opentype"),
    url("~/assets/fonts/honeywell/icons/qcs-display-flip-icons.woff?mppyyr")
      format("woff"),
    url("~/assets/fonts/honeywell/icons/qcs-display-flip-icons.svg?mppyyr#qcs-display-flip-icons")
      format("svg");
  font-weight: normal;
  font-style: normal;
  font-display: block;
}

.svg-icon {
  display: inline-block;
  background-repeat: no-repeat;
  background-image: url("~/assets/fonts/honeywell/icons/qcs-icons-sprite.svg");
  filter: invert(1);
  transform: scale(0.7);
}

[class^="icon-"],
[class*=" icon-"] {
  /* use !important to prevent issues with browser extensions that change fonts */
  font-family: "qcs-icons" !important;
  speak: never;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;

  /* Better Font Rendering =========== */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

[class^="user-display-flip-"],
[class*=" user-display-flip-"] {
  /* use !important to prevent issues with browser extensions that change fonts */
  font-family: "qcs-display-flip-icons" !important;
  speak: never;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;

  /* Better Font Rendering =========== */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/*
Section : for new added styles
*/
.theme-default-light {
  .icon-scan {
    /* background-image: url("../../../images/icons/scanning.svg")*/
    background: url("~/assets/images/icons/scanning-dark.svg") no-repeat;
  }
  .icon-scanner-control {
    /* background-image: url("../../../images/icons/scanning.svg")*/
    background: url("~/assets/images/icons/scn-maint-dark.svg") no-repeat;
  }
  .icon-offsheet {
    /* background-image: url("../../../images/icons/scanning.svg")*/
    background: url("~/assets/images/icons/scn-offsheet-dark.svg") no-repeat;
  }
  .hw-logo {
    background: url("~/assets/images/logos/hw-logo-dark.svg") no-repeat;
    background-position: left center;
  }
}
.theme-default {
  .icon-scan {
    /* background-image: url("../../../images/icons/scanning.svg")*/
    background: url("~/assets/images/icons/scanning.svg") no-repeat;
  }
  .icon-scanner-control {
    /* background-image: url("../../../images/icons/scanning.svg")*/
    background: url("~/assets/images/icons/scn-maint.svg") no-repeat;
  }
  .icon-offsheet {
    /* background-image: url("../../../images/icons/scanning.svg")*/
    background: url("~/assets/images/icons/scn-offsheet.svg") no-repeat;
  }
  .hw-logo {
    background: url("~/assets/images/logos/hw-logo.svg") no-repeat;
    background-position: left center;
  }
}

.icon-doublearrow-up:before {
  content: "\e974";
  transform: rotate(270deg);
  display: inline-block;
}
.icon-doublearrow-right:before {
  content: "\e974";
}
.icon-doublearrow-down:before {
  content: "\e974";
  transform: rotate(90deg);
  display: inline-block;
}
.icon-doublearrow-left:before {
  content: "\e974";
  transform: rotate(180deg);
  display: inline-block;
}
.icon-arrowwithborder-up:before {
  content: "\e975";
  transform: rotate(270deg);
  display: inline-block;
}
.icon-arrowwithborder-right:before {
  content: "\e975";
}
.icon-arrowwithborder-down:before {
  content: "\e975";
  transform: rotate(90deg);
  display: inline-block;
}
.icon-arrowwithborder-left:before {
  content: "\e975";
  transform: rotate(180deg);
  display: inline-block;
}

.icon-abort:before {
  content: "\e900";
}
.icon-alert-triangle:before {
  content: "\e901";
}
.icon-bar-graph:before {
  content: "\e902";
}
.icon-bend-limit .path1:before {
  content: "\e903";
  color: rgb(0, 0, 0);
}
.icon-bend-limit .path2:before {
  content: "\e904";
  margin-left: -1em;
  color: rgb(0, 0, 0);
}
.icon-bend-limit .path3:before {
  content: "\e905";
  margin-left: -1em;
  color: rgb(0, 0, 0);
  opacity: 0.7;
}
.icon-color-map:before {
  content: "\e906";
}
.icon-config:before {
  content: "\e907";
}
.icon-copy:before {
  content: "\e908";
}
.icon-different-edit:before {
  content: "\e909";
}
.icon-edit-blue:before {
  content: "\e90a";
}
.icon-edit:before {
  content: "\e90b";
}
.icon-line-graph:before {
  content: "\e90c";
}
.icon-moon:before {
  content: "\f191";
}
.icon-restore:before {
  content: "\e90e";
}
.icon-scale-v2:before {
  content: "\e90f";
}
.icon-shutdown:before {
  content: "\e910";
}
.icon-stats:before {
  content: "\e911";
}
.icon-sun:before {
  content: "\3124";
}
.icon-zoom-in:before {
  content: "\e913";
}
.icon-zoom-out:before {
  content: "\e914";
}

.icon-loading:before {
  content: "\e915";
}
/*.icon-uniE901:before {
  content: "\e916";
}
.icon-uniE902:before {
  content: "\e917";
}
.icon-uniE903:before {
  content: "\e918";
}
.icon-uniE904:before {
  content: "\e919";
} */
.icon-range:before {
  content: "\e91a";
}
.icon-offline:before {
  content: "\e91b";
}
.icon-scanning:before {
  content: "\e91c";
}
.icon-maintenance:before {
  content: "\e91d";
}
.icon-offsheet-2:before {
  content: "\e91e";
}
.icon-grid:before {
  content: "\e91f";
}
.icon-history:before {
  content: "\e920";
}
.icon-hybrid:before {
  content: "\e921";
}
.icon-cursor:before {
  content: "\e922";
}
.icon-analysis:before {
  content: "\e923";
}
.icon-diagnostic:before {
  content: "\e924";
}
.icon-monitoring:before {
  content: "\e925";
}
.icon-pinned:before {
  content: "\e926";
}
.icon-recipe:before {
  content: "\e927";
}
/* .icon-unie913:before {
  content: "\e928";
}
.icon-unie914:before {
  content: "\e929";
}
.icon-unie915:before {
  content: "\e92a";
}
.icon-unie916:before {
  content: "\e92b";
}
.icon-unie917:before {
  content: "\e92c";
}
.icon-unie918:before {
  content: "\e92d";
}
.icon-unie919:before {
  content: "\e92e";
}
.icon-unie91A:before {
  content: "\e92f";
}
.icon-unie91B:before {
  content: "\e930";
}
.icon-unie91C:before {
  content: "\e931";
}
.icon-uniE91D:before {
  content: "\e932";
}
.icon-uniE91E:before {
  content: "\e933";
} */
.icon-checkbox:before {
  content: "\e934";
}
.icon-banned:before {
  content: "\e935";
}
.icon-history:before {
  content: "\e936";
}
.icon-sort:before {
  content: "\e937";
}
.icon-selectedcheck1:before {
  content: "\e938";
}
.icon-critical:before {
  content: "\e939";
}
.icon-dashed-circle:before {
  content: "\e93a";
}
.icon-h-ellipsis:before {
  content: "\e93b";
}
.icon-hidden:before {
  content: "\e93c";
}
.icon-important:before {
  content: "\e93d";
}
.icon-information:before {
  content: "\e93e";
}
.icon-no-data:before {
  content: "\e93f";
}
.icon-resize:before {
  content: "\e940";
}
.icon-status-filled:before {
  content: "\e941";
}
.icon-okay:before {
  content: "\e942";
}
.icon-success:before {
  content: "\e943";
}
.icon-tooltip:before {
  content: "\e944";
}
.icon-v-ellipsis:before {
  content: "\e945";
}
.icon-zoom-out:before {
  content: "\e946";
}
.icon-acm:before {
  content: "\e947";
}
.icon-add:before {
  content: "\e948";
}
.icon-alarm:before {
  content: "\e949";
}
.icon-calendar:before {
  content: "\e94a";
}
.icon-caret-down:before {
  content: "\e94b";
}
.icon-caret-left:before {
  content: "\e94c";
}
.icon-caret-right:before {
  content: "\e94d";
}
.icon-caret-up:before {
  content: "\e94e";
}
.icon-close:before {
  content: "\e94f";
}
.icon-dashboard:before {
  content: "\e950";
}
.icon-data-display:before {
  content: "\e951";
}
.icon-dual-profile:before {
  content: "\e952";
}
.icon-dual-trend:before {
  content: "\e953";
}
.icon-event:before {
  content: "\e954";
}
.icon-filter:before {
  content: "\e955";
}
.icon-freeze:before {
  content: "\e956";
}
.icon-help:before {
  content: "\e957";
}
.icon-high-resolution-profile:before {
  content: "\e958";
}
.icon-home:before {
  content: "\e959";
}
.icon-limit-alert:before {
  content: "\e95a";
}
.icon-menu:before {
  content: "\e95b";
}
.icon-mis:before {
  content: "\e95c";
}
.icon-multi-profile:before {
  content: "\e95d";
}
.icon-multi-trend:before {
  content: "\e95e";
}

.icon-play:before {
  content: "\e961";
}
.icon-print:before {
  content: "\e962";
}
.icon-profile:before {
  content: "\e963";
}
.icon-quality-summary:before {
  content: "\e964";
}
.icon-radioactive:before {
  content: "\e965";
}
.icon-recipe-change:before {
  content: "\e966";
}
.icon-scale:before {
  content: "\e967";
}
.icon-alarm-filled:before {
  content: "\e968";
}
.icon-search:before {
  content: "\e969";
}
.icon-setting:before {
  content: "\e96a";
}
.icon-sort-unsorted:before {
  content: "\e96b";
}
.icon-stop:before {
  content: "\e96c";
}
.icon-system-status:before {
  content: "\e96d";
}
.icon-table:before {
  content: "\e96e";
}
.icon-status:before {
  content: "\e96f";
}
.icon-alarm-filled-blinking:before {
  content: "\e970";
}
.icon-alarm-line-blinking:before {
  content: "\e971";
}
.icon-alarm-line:before {
  content: "\e972";
}
.icon-download:before {
  content: "\e973";
}
.icon-doublearrow:before {
  content: "\e974";
}
.icon-arrowwithborder:before {
  content: "\e975";
}

// User display flip icons
// .user-display-flip-off:before {
//   content: "\e976";
// }

.user-display-flip-on {
  .path1:before {
    content: "\e976";
  }

  .path2:before {
    content: "\e977";
    margin-left: -1em;
  }

  .path3:before {
    content: "\e978";
    margin-left: -1em;
  }

  .path4:before {
    content: "\e979";
    margin-left: -1em;
  }
}

.user-display-flip-off {
  .path1:before {
    content: "\e97b";
  }

  .path2:before {
    content: "\e97c";
    margin-left: -1em;
  }

  .path3:before {
    content: "\e97d";
    margin-left: -1em;
  }

  .path4:before {
    content: "\e97e";
    margin-left: -1em;
  }
}
