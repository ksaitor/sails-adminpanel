"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es.object.set-prototype-of.js");

require("core-js/modules/es.object.get-prototype-of.js");

require("core-js/modules/es.reflect.construct.js");

require("core-js/modules/es.reflect.get.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.regexp.exec.js");

exports.__esModule = true;
exports.PLUGIN_PRIORITY = exports.PLUGIN_KEY = exports.AutoColumnSize = void 0;

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.weak-map.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.array.slice.js");

require("core-js/modules/web.timers.js");

require("core-js/modules/es.array.from.js");

require("core-js/modules/es.set.js");

var _base = require("../base");

var _array = require("../../helpers/array");

var _feature = require("../../helpers/feature");

var _ghostTable = _interopRequireDefault(require("../../utils/ghostTable"));

var _pluginHooks = _interopRequireDefault(require("../../pluginHooks"));

var _object = require("../../helpers/object");

var _number = require("../../helpers/number");

var _samplesGenerator = _interopRequireDefault(require("../../utils/samplesGenerator"));

var _string = require("../../helpers/string");

var _src = require("../../3rdparty/walkontable/src");

var _translations = require("../../translations");

var _mixed = require("../../helpers/mixed");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

_pluginHooks.default.getSingleton().register('modifyAutoColumnSizeSeed');

var PLUGIN_KEY = 'autoColumnSize';
exports.PLUGIN_KEY = PLUGIN_KEY;
var PLUGIN_PRIORITY = 10;
exports.PLUGIN_PRIORITY = PLUGIN_PRIORITY;
var privatePool = new WeakMap();
var COLUMN_SIZE_MAP_NAME = 'autoColumnSize';
/* eslint-disable jsdoc/require-description-complete-sentence */

/**
 * @plugin AutoColumnSize
 * @class AutoColumnSize
 *
 * @description
 * This plugin allows to set column widths based on their widest cells.
 *
 * By default, the plugin is declared as `undefined`, which makes it enabled (same as if it was declared as `true`).
 * Enabling this plugin may decrease the overall table performance, as it needs to calculate the widths of all cells to
 * resize the columns accordingly.
 * If you experience problems with the performance, try turning this feature off and declaring the column widths manually.
 *
 * Column width calculations are divided into sync and async part. Each of this parts has their own advantages and
 * disadvantages. Synchronous calculations are faster but they block the browser UI, while the slower asynchronous
 * operations don't block the browser UI.
 *
 * To configure the sync/async distribution, you can pass an absolute value (number of columns) or a percentage value to a config object:
 *
 * ```js
 * // as a number (300 columns in sync, rest async)
 * autoColumnSize: {syncLimit: 300},.
 *
 * // as a string (percent)
 * autoColumnSize: {syncLimit: '40%'},
 * ```
 *
 * The plugin uses {@link GhostTable} and {@link SamplesGenerator} for calculations.
 * First, {@link SamplesGenerator} prepares samples of data with its coordinates.
 * Next {@link GhostTable} uses coordinates to get cells' renderers and append all to the DOM through DocumentFragment.
 *
 * Sampling accepts additional options:
 * - *samplingRatio* - Defines how many samples for the same length will be used to calculate. Default is `3`.
 *
 * ```js
 *   autoColumnSize: {
 *     samplingRatio: 10,
 *   }
 * ```
 *
 * - *allowSampleDuplicates* - Defines if duplicated values might be used in sampling. Default is `false`.
 *
 * ```js
 *   autoColumnSize: {
 *     allowSampleDuplicates: true,
 *   }
 * ```
 *
 * To configure this plugin see {@link Options#autoColumnSize}.
 *
 * @example
 *
 * ```js
 * const hot = new Handsontable(document.getElementById('example'), {
 *   data: getData(),
 *   autoColumnSize: true
 * });
 * // Access to plugin instance:
 * const plugin = hot.getPlugin('autoColumnSize');
 *
 * plugin.getColumnWidth(4);
 *
 * if (plugin.isEnabled()) {
 *   // code...
 * }
 * ```
 */

/* eslint-enable jsdoc/require-description-complete-sentence */

var AutoColumnSize = /*#__PURE__*/function (_BasePlugin) {
  _inherits(AutoColumnSize, _BasePlugin);

  var _super = _createSuper(AutoColumnSize);

  function AutoColumnSize(hotInstance) {
    var _this;

    _classCallCheck(this, AutoColumnSize);

    _this = _super.call(this, hotInstance);
    privatePool.set(_assertThisInitialized(_this), {
      /**
       * Cached column header names. It is used to diff current column headers with previous state and detect which
       * columns width should be updated.
       *
       * @private
       * @type {Array}
       */
      cachedColumnHeaders: []
    });
    /**
     * Instance of {@link GhostTable} for rows and columns size calculations.
     *
     * @private
     * @type {GhostTable}
     */

    _this.ghostTable = new _ghostTable.default(_this.hot);
    /**
     * Instance of {@link SamplesGenerator} for generating samples necessary for columns width calculations.
     *
     * @private
     * @type {SamplesGenerator}
     * @fires Hooks#modifyAutoColumnSizeSeed
     */

    _this.samplesGenerator = new _samplesGenerator.default(function (row, column) {
      var cellMeta = _this.hot.getCellMeta(row, column);

      var cellValue = '';

      if (!cellMeta.spanned) {
        cellValue = _this.hot.getDataAtCell(row, column);
      }

      var bundleSeed = '';

      if (_this.hot.hasHook('modifyAutoColumnSizeSeed')) {
        bundleSeed = _this.hot.runHooks('modifyAutoColumnSizeSeed', bundleSeed, cellMeta, cellValue);
      }

      return {
        value: cellValue,
        bundleSeed: bundleSeed
      };
    });
    /**
     * `true` only if the first calculation was performed.
     *
     * @private
     * @type {boolean}
     */

    _this.firstCalculation = true;
    /**
     * `true` if the size calculation is in progress.
     *
     * @type {boolean}
     */

    _this.inProgress = false;
    /**
     * Number of already measured columns (we already know their sizes).
     *
     * @type {number}
     */

    _this.measuredColumns = 0;
    /**
     * PhysicalIndexToValueMap to keep and track widths for physical column indexes.
     *
     * @private
     * @type {PhysicalIndexToValueMap}
     */

    _this.columnWidthsMap = new _translations.PhysicalIndexToValueMap();

    _this.hot.columnIndexMapper.registerMap(COLUMN_SIZE_MAP_NAME, _this.columnWidthsMap); // Leave the listener active to allow auto-sizing the columns when the plugin is disabled.
    // This is necessary for width recalculation for resize handler doubleclick (ManualColumnResize).


    _this.addHook('beforeColumnResize', function (size, column, isDblClick) {
      return _this.onBeforeColumnResize(size, column, isDblClick);
    });

    return _this;
  }
  /**
   * Checks if the plugin is enabled in the handsontable settings. This method is executed in {@link Hooks#beforeInit}
   * hook and if it returns `true` than the {@link #enablePlugin} method is called.
   *
   * @returns {boolean}
   */


  _createClass(AutoColumnSize, [{
    key: "isEnabled",
    value: function isEnabled() {
      return this.hot.getSettings()[PLUGIN_KEY] !== false && !this.hot.getSettings().colWidths;
    }
    /**
     * Enables the plugin functionality for this Handsontable instance.
     */

  }, {
    key: "enablePlugin",
    value: function enablePlugin() {
      var _this2 = this;

      if (this.enabled) {
        return;
      }

      var setting = this.hot.getSettings()[PLUGIN_KEY];

      if (setting && setting.useHeaders !== null && setting.useHeaders !== void 0) {
        this.ghostTable.setSetting('useHeaders', setting.useHeaders);
      }

      this.setSamplingOptions();
      this.addHook('afterLoadData', function () {
        return _this2.onAfterLoadData.apply(_this2, arguments);
      });
      this.addHook('beforeChangeRender', function (changes) {
        return _this2.onBeforeChange(changes);
      });
      this.addHook('afterFormulasValuesUpdate', function (changes) {
        return _this2.onAfterFormulasValuesUpdate(changes);
      });
      this.addHook('beforeViewRender', function (force) {
        return _this2.onBeforeViewRender(force);
      });
      this.addHook('modifyColWidth', function (width, col) {
        return _this2.getColumnWidth(col, width);
      });
      this.addHook('afterInit', function () {
        return _this2.onAfterInit();
      });

      _get(_getPrototypeOf(AutoColumnSize.prototype), "enablePlugin", this).call(this);
    }
    /**
     * Updates the plugin's state. This method is executed when {@link Core#updateSettings} is invoked.
     */

  }, {
    key: "updatePlugin",
    value: function updatePlugin() {
      var changedColumns = this.findColumnsWhereHeaderWasChanged();

      if (changedColumns.length) {
        this.clearCache(changedColumns);
        this.calculateVisibleColumnsWidth();
      }

      _get(_getPrototypeOf(AutoColumnSize.prototype), "updatePlugin", this).call(this);
    }
    /**
     * Disables the plugin functionality for this Handsontable instance.
     */

  }, {
    key: "disablePlugin",
    value: function disablePlugin() {
      var _this3 = this;

      _get(_getPrototypeOf(AutoColumnSize.prototype), "disablePlugin", this).call(this); // Leave the listener active to allow auto-sizing the columns when the plugin is disabled.
      // This is necessary for width recalculation for resize handler doubleclick (ManualColumnResize).


      this.addHook('beforeColumnResize', function (size, column, isDblClick) {
        return _this3.onBeforeColumnResize(size, column, isDblClick);
      });
    }
    /**
     * Calculates visible columns width.
     */

  }, {
    key: "calculateVisibleColumnsWidth",
    value: function calculateVisibleColumnsWidth() {
      var rowsCount = this.hot.countRows(); // Keep last column widths unchanged for situation when all rows was deleted or trimmed (pro #6)

      if (!rowsCount) {
        return;
      }

      var force = this.hot.renderCall;
      var firstVisibleColumn = this.getFirstVisibleColumn();
      var lastVisibleColumn = this.getLastVisibleColumn();

      if (firstVisibleColumn === -1 || lastVisibleColumn === -1) {
        return;
      }

      this.calculateColumnsWidth({
        from: firstVisibleColumn,
        to: lastVisibleColumn
      }, void 0, force);
    }
    /**
     * Calculates a columns width.
     *
     * @param {number|object} colRange Visual column index or an object with `from` and `to` visual indexes as a range.
     * @param {number|object} rowRange Visual row index or an object with `from` and `to` visual indexes as a range.
     * @param {boolean} [force=false] If `true` the calculation will be processed regardless of whether the width exists in the cache.
     */

  }, {
    key: "calculateColumnsWidth",
    value: function calculateColumnsWidth() {
      var _this4 = this;

      var colRange = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        from: 0,
        to: this.hot.countCols() - 1
      };
      var rowRange = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        from: 0,
        to: this.hot.countRows() - 1
      };
      var force = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      // eslint-disable-line max-len
      var columnsRange = typeof colRange === 'number' ? {
        from: colRange,
        to: colRange
      } : colRange;
      var rowsRange = typeof rowRange === 'number' ? {
        from: rowRange,
        to: rowRange
      } : rowRange;
      (0, _number.rangeEach)(columnsRange.from, columnsRange.to, function (visualColumn) {
        var physicalColumn = _this4.hot.toPhysicalColumn(visualColumn);

        if (physicalColumn === null) {
          physicalColumn = visualColumn;
        }

        if (force || _this4.columnWidthsMap.getValueAtIndex(physicalColumn) === null && !_this4.hot._getColWidthFromSettings(physicalColumn)) {
          var samples = _this4.samplesGenerator.generateColumnSamples(visualColumn, rowsRange);

          (0, _array.arrayEach)(samples, function (_ref) {
            var _ref2 = _slicedToArray(_ref, 2),
                column = _ref2[0],
                sample = _ref2[1];

            return _this4.ghostTable.addColumn(column, sample);
          });
        }
      });

      if (this.ghostTable.columns.length) {
        this.hot.batchExecution(function () {
          _this4.ghostTable.getWidths(function (visualColumn, width) {
            var physicalColumn = _this4.hot.toPhysicalColumn(visualColumn);

            _this4.columnWidthsMap.setValueAtIndex(physicalColumn, width);
          });
        }, true);
        this.measuredColumns = columnsRange.to + 1;
        this.ghostTable.clean();
      }
    }
    /**
     * Calculates all columns width. The calculated column will be cached in the {@link AutoColumnSize#widths} property.
     * To retrieve width for specified column use {@link AutoColumnSize#getColumnWidth} method.
     *
     * @param {object|number} rowRange Row index or an object with `from` and `to` properties which define row range.
     */

  }, {
    key: "calculateAllColumnsWidth",
    value: function calculateAllColumnsWidth() {
      var _this5 = this;

      var rowRange = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        from: 0,
        to: this.hot.countRows() - 1
      };
      var current = 0;
      var length = this.hot.countCols() - 1;
      var timer = null;
      this.inProgress = true;

      var loop = function loop() {
        // When hot was destroyed after calculating finished cancel frame
        if (!_this5.hot) {
          (0, _feature.cancelAnimationFrame)(timer);
          _this5.inProgress = false;
          return;
        }

        _this5.calculateColumnsWidth({
          from: current,
          to: Math.min(current + AutoColumnSize.CALCULATION_STEP, length)
        }, rowRange);

        current = current + AutoColumnSize.CALCULATION_STEP + 1;

        if (current < length) {
          timer = (0, _feature.requestAnimationFrame)(loop);
        } else {
          (0, _feature.cancelAnimationFrame)(timer);
          _this5.inProgress = false; // @TODO Should call once per render cycle, currently fired separately in different plugins

          _this5.hot.view.adjustElementsSize();
        }
      };

      var syncLimit = this.getSyncCalculationLimit(); // sync

      if (this.firstCalculation && syncLimit >= 0) {
        this.calculateColumnsWidth({
          from: 0,
          to: syncLimit
        }, rowRange);
        this.firstCalculation = false;
        current = syncLimit + 1;
      } // async


      if (current < length) {
        loop();
      } else {
        this.inProgress = false;
      }
    }
    /**
     * Sets the sampling options.
     *
     * @private
     */

  }, {
    key: "setSamplingOptions",
    value: function setSamplingOptions() {
      var setting = this.hot.getSettings()[PLUGIN_KEY];
      var samplingRatio = setting && (0, _object.hasOwnProperty)(setting, 'samplingRatio') ? setting.samplingRatio : void 0;
      var allowSampleDuplicates = setting && (0, _object.hasOwnProperty)(setting, 'allowSampleDuplicates') ? setting.allowSampleDuplicates : void 0;

      if (samplingRatio && !isNaN(samplingRatio)) {
        this.samplesGenerator.setSampleCount(parseInt(samplingRatio, 10));
      }

      if (allowSampleDuplicates) {
        this.samplesGenerator.setAllowDuplicates(allowSampleDuplicates);
      }
    }
    /**
     * Recalculates all columns width (overwrite cache values).
     */

  }, {
    key: "recalculateAllColumnsWidth",
    value: function recalculateAllColumnsWidth() {
      if (this.hot.view && this.hot.view._wt.wtTable.isVisible()) {
        this.clearCache();
        this.calculateAllColumnsWidth();
      }
    }
    /**
     * Gets value which tells how many columns should be calculated synchronously (rest of the columns will be calculated
     * asynchronously). The limit is calculated based on `syncLimit` set to `autoColumnSize` option (see {@link Options#autoColumnSize}).
     *
     * @returns {number}
     */

  }, {
    key: "getSyncCalculationLimit",
    value: function getSyncCalculationLimit() {
      var settings = this.hot.getSettings()[PLUGIN_KEY];
      /* eslint-disable no-bitwise */

      var limit = AutoColumnSize.SYNC_CALCULATION_LIMIT;
      var colsLimit = this.hot.countCols() - 1;

      if ((0, _object.isObject)(settings)) {
        limit = settings.syncLimit;

        if ((0, _string.isPercentValue)(limit)) {
          limit = (0, _number.valueAccordingPercent)(colsLimit, limit);
        } else {
          // Force to Number
          limit >>= 0;
        }
      }

      return Math.min(limit, colsLimit);
    }
    /**
     * Gets the calculated column width.
     *
     * @param {number} column Visual column index.
     * @param {number} [defaultWidth] Default column width. It will be picked up if no calculated width found.
     * @param {boolean} [keepMinimum=true] If `true` then returned value won't be smaller then 50 (default column width).
     * @returns {number}
     */

  }, {
    key: "getColumnWidth",
    value: function getColumnWidth(column) {
      var defaultWidth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : void 0;
      var keepMinimum = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var width = defaultWidth;

      if (width === void 0) {
        width = this.columnWidthsMap.getValueAtIndex(this.hot.toPhysicalColumn(column));

        if (keepMinimum && typeof width === 'number') {
          width = Math.max(width, _src.ViewportColumnsCalculator.DEFAULT_WIDTH);
        }
      }

      return width;
    }
    /**
     * Gets the first visible column.
     *
     * @returns {number} Returns visual column index, -1 if table is not rendered or if there are no columns to base the the calculations on.
     */

  }, {
    key: "getFirstVisibleColumn",
    value: function getFirstVisibleColumn() {
      var wot = this.hot.view._wt;

      if (wot.wtViewport.columnsVisibleCalculator) {
        // Fist fully visible column is stored as renderable index.
        var firstFullyVisibleColumn = wot.wtTable.getFirstVisibleColumn();

        if (firstFullyVisibleColumn !== -1) {
          return this.hot.columnIndexMapper.getVisualFromRenderableIndex(firstFullyVisibleColumn);
        }
      }

      if (wot.wtViewport.columnsRenderCalculator) {
        var firstRenderedColumn = wot.wtTable.getFirstRenderedColumn(); // There are no rendered column.

        if (firstRenderedColumn !== -1) {
          return this.hot.columnIndexMapper.getVisualFromRenderableIndex(firstRenderedColumn);
        }
      }

      return -1;
    }
    /**
     * Gets the last visible column.
     *
     * @returns {number} Returns visual column index or -1 if table is not rendered.
     */

  }, {
    key: "getLastVisibleColumn",
    value: function getLastVisibleColumn() {
      var wot = this.hot.view._wt;

      if (wot.wtViewport.columnsVisibleCalculator) {
        // Last fully visible column is stored as renderable index.
        var lastFullyVisibleColumn = wot.wtTable.getLastVisibleColumn();

        if (lastFullyVisibleColumn !== -1) {
          return this.hot.columnIndexMapper.getVisualFromRenderableIndex(lastFullyVisibleColumn);
        }
      }

      if (wot.wtViewport.columnsRenderCalculator) {
        // Last fully visible column is stored as renderable index.
        var lastRenderedColumn = wot.wtTable.getLastRenderedColumn(); // There are no rendered columns.

        if (lastRenderedColumn !== -1) {
          return this.hot.columnIndexMapper.getVisualFromRenderableIndex(lastRenderedColumn);
        }
      }

      return -1;
    }
    /**
     * Collects all columns which titles has been changed in comparison to the previous state.
     *
     * @private
     * @returns {Array} It returns an array of physical column indexes.
     */

  }, {
    key: "findColumnsWhereHeaderWasChanged",
    value: function findColumnsWhereHeaderWasChanged() {
      var columnHeaders = this.hot.getColHeader();

      var _privatePool$get = privatePool.get(this),
          cachedColumnHeaders = _privatePool$get.cachedColumnHeaders;

      var changedColumns = (0, _array.arrayReduce)(columnHeaders, function (acc, columnTitle, physicalColumn) {
        var cachedColumnsLength = cachedColumnHeaders.length;

        if (cachedColumnsLength - 1 < physicalColumn || cachedColumnHeaders[physicalColumn] !== columnTitle) {
          acc.push(physicalColumn);
        }

        if (cachedColumnsLength - 1 < physicalColumn) {
          cachedColumnHeaders.push(columnTitle);
        } else {
          cachedColumnHeaders[physicalColumn] = columnTitle;
        }

        return acc;
      }, []);
      return changedColumns;
    }
    /**
     * Clears cache of calculated column widths. If you want to clear only selected columns pass an array with their indexes.
     * Otherwise whole cache will be cleared.
     *
     * @param {number[]} [columns] List of physical column indexes to clear.
     */

  }, {
    key: "clearCache",
    value: function clearCache() {
      var _this6 = this;

      var columns = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      if (columns.length) {
        this.hot.batchExecution(function () {
          (0, _array.arrayEach)(columns, function (physicalIndex) {
            _this6.columnWidthsMap.setValueAtIndex(physicalIndex, null);
          });
        }, true);
      } else {
        this.columnWidthsMap.clear();
      }
    }
    /**
     * Checks if all widths were calculated. If not then return `true` (need recalculate).
     *
     * @returns {boolean}
     */

  }, {
    key: "isNeedRecalculate",
    value: function isNeedRecalculate() {
      return !!(0, _array.arrayFilter)(this.columnWidthsMap.getValues().slice(0, this.measuredColumns), function (item) {
        return item === null;
      }).length;
    }
    /**
     * On before view render listener.
     *
     * @private
     */

  }, {
    key: "onBeforeViewRender",
    value: function onBeforeViewRender() {
      this.calculateVisibleColumnsWidth();

      if (this.isNeedRecalculate() && !this.inProgress) {
        this.calculateAllColumnsWidth();
      }
    }
    /**
     * On after load data listener.
     *
     * @private
     */

  }, {
    key: "onAfterLoadData",
    value: function onAfterLoadData() {
      var _this7 = this;

      if (this.hot.view) {
        this.recalculateAllColumnsWidth();
      } else {
        // first load - initialization
        setTimeout(function () {
          if (_this7.hot) {
            _this7.recalculateAllColumnsWidth();
          }
        }, 0);
      }
    }
    /**
     * On before change listener.
     *
     * @private
     * @param {Array} changes An array of modified data.
     */

  }, {
    key: "onBeforeChange",
    value: function onBeforeChange(changes) {
      var _this8 = this;

      var changedColumns = (0, _array.arrayMap)(changes, function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            columnProperty = _ref4[1];

        return _this8.hot.toPhysicalColumn(_this8.hot.propToCol(columnProperty));
      });
      this.clearCache(Array.from(new Set(changedColumns)));
    }
    /**
     * On before column resize listener.
     *
     * @private
     * @param {number} size Calculated new column width.
     * @param {number} column Visual index of the resized column.
     * @param {boolean} isDblClick  Flag that determines whether there was a double-click.
     * @returns {number}
     */

  }, {
    key: "onBeforeColumnResize",
    value: function onBeforeColumnResize(size, column, isDblClick) {
      var newSize = size;

      if (isDblClick) {
        this.calculateColumnsWidth(column, void 0, true);
        newSize = this.getColumnWidth(column, void 0, false);
      }

      return newSize;
    }
    /**
     * On after Handsontable init fill plugin with all necessary values.
     *
     * @private
     */

  }, {
    key: "onAfterInit",
    value: function onAfterInit() {
      privatePool.get(this).cachedColumnHeaders = this.hot.getColHeader();
    }
    /**
     * After formulas values updated listener.
     *
     * @private
     * @param {Array} changes An array of modified data.
     */

  }, {
    key: "onAfterFormulasValuesUpdate",
    value: function onAfterFormulasValuesUpdate(changes) {
      var filteredChanges = (0, _array.arrayFilter)(changes, function (change) {
        var _change$address;

        return (0, _mixed.isDefined)((_change$address = change.address) === null || _change$address === void 0 ? void 0 : _change$address.col);
      });
      var changedColumns = (0, _array.arrayMap)(filteredChanges, function (change) {
        return change.address.col;
      });
      this.clearCache(Array.from(new Set(changedColumns)));
    }
    /**
     * Destroys the plugin instance.
     */

  }, {
    key: "destroy",
    value: function destroy() {
      this.ghostTable.clean();

      _get(_getPrototypeOf(AutoColumnSize.prototype), "destroy", this).call(this);
    }
  }], [{
    key: "PLUGIN_KEY",
    get: function get() {
      return PLUGIN_KEY;
    }
  }, {
    key: "PLUGIN_PRIORITY",
    get: function get() {
      return PLUGIN_PRIORITY;
    }
  }, {
    key: "SETTING_KEYS",
    get: function get() {
      return true;
    }
  }, {
    key: "CALCULATION_STEP",
    get: function get() {
      return 50;
    }
  }, {
    key: "SYNC_CALCULATION_LIMIT",
    get: function get() {
      return 50;
    }
  }]);

  return AutoColumnSize;
}(_base.BasePlugin);

exports.AutoColumnSize = AutoColumnSize;