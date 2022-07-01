"use strict";

exports.__esModule = true;
exports.useRecorder = useRecorder;

require("core-js/modules/es.array.includes.js");

require("core-js/modules/es.array.concat.js");

require("core-js/modules/es.string.includes.js");

var _keyObserver = require("./keyObserver");

var _utils = require("./utils");

var _event = require("../helpers/dom/event");

var _browser = require("../helpers/browser");

var MODIFIER_KEYS = ['meta', 'alt', 'shift', 'control'];
var modifierKeysObserver = (0, _keyObserver.createKeysObserver)();
/* eslint-disable jsdoc/require-description-complete-sentence */

/**
 * A key recorder, used for tracking key events.
 *
 * @param {EventTarget} ownerWindow A starting `window` element
 * @param {Function} handleEvent A condition on which event is handled.
 * @param {Function} beforeKeyDown A hook fired before the `keydown` event is handled.
 * @param {Function} afterKeyDown A hook fired after the `keydown` event is handled
 * @param {Function} callback `KeyEvent`'s listener's callback function
 * @returns {object}
 */

function useRecorder(ownerWindow, handleEvent, beforeKeyDown, afterKeyDown, callback) {
  /**
   * Check if a pressed key is tracked or not.
   *
   * @param {string} pressedKey A pressed key
   * @returns {boolean}
   */
  var isModifierKey = function isModifierKey(pressedKey) {
    return MODIFIER_KEYS.includes(pressedKey);
  };
  /**
   * Get every pressed modifier key from the performed `KeyboardEvent`.
   *
   * @private
   * @param {KeyboardEvent} event The event object.
   * @param {boolean} [mergeMetaKeys=false] If `true,` the function will return the "control" and "meta"
   *                                        modifiers keys as the "control/meta" name. This allows creating
   *                                        keyboard shortcuts with modifier key that trigger the shortcut
   *                                        actions depend on the OS keyboard layout (the Meta key for macOS
   *                                        and Control for non macOS system).
   * @returns {string[]}
   */


  var getPressedModifierKeys = function getPressedModifierKeys(event) {
    var mergeMetaKeys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var pressedModifierKeys = [];

    if (event.altKey) {
      pressedModifierKeys.push('alt');
    }

    if (mergeMetaKeys && (event.ctrlKey || event.metaKey)) {
      pressedModifierKeys.push('control/meta');
    } else {
      if (event.ctrlKey) {
        pressedModifierKeys.push('control');
      }

      if (event.metaKey) {
        pressedModifierKeys.push('meta');
      }
    }

    if (event.shiftKey) {
      pressedModifierKeys.push('shift');
    }

    return pressedModifierKeys;
  };
  /**
   * `KeyboardEvent`'s callback function
   *
   * @private
   * @param {KeyboardEvent} event The event object
   */


  var onkeydown = function onkeydown(event) {
    if (handleEvent(event) === false) {
      return;
    }

    var result = beforeKeyDown(event);

    if (result === false || (0, _event.isImmediatePropagationStopped)(event)) {
      return;
    }

    var pressedKey = (0, _utils.normalizeEventKey)(event.key);
    var extraModifierKeys = [];

    if (isModifierKey(pressedKey)) {
      modifierKeysObserver.press(pressedKey);
    } else {
      extraModifierKeys = getPressedModifierKeys(event);
    }

    var pressedKeys = [pressedKey].concat(extraModifierKeys);
    var isExecutionCancelled = callback(event, pressedKeys);

    if (!isExecutionCancelled && ((0, _browser.isMacOS)() && extraModifierKeys.includes('meta') || !(0, _browser.isMacOS)() && extraModifierKeys.includes('control'))) {
      // Trigger the callback for the virtual OS-dependent "control/meta" key
      callback(event, [pressedKey].concat(getPressedModifierKeys(event, true)));
    }

    afterKeyDown(event);
  };
  /**
   * `KeyboardEvent`'s callback function
   *
   * @private
   * @param {KeyboardEvent} event The event object
   */


  var onkeyup = function onkeyup(event) {
    if (handleEvent(event) === false) {
      return;
    }

    var pressedKey = (0, _utils.normalizeEventKey)(event.key);

    if (isModifierKey(pressedKey) === false) {
      return;
    }

    modifierKeysObserver.release(pressedKey);
  };
  /**
   * `FocusEvent`'s callback function
   *
   * @private
   */


  var onblur = function onblur() {
    modifierKeysObserver.releaseAll();
  };
  /**
   * Add event listeners to the starting window and its parents' windows.
   */


  var mount = function mount() {
    var eventTarget = ownerWindow;

    while (eventTarget) {
      eventTarget.addEventListener('keydown', onkeydown);
      eventTarget.addEventListener('keyup', onkeyup);
      eventTarget.addEventListener('blur', onblur);
      eventTarget = eventTarget.frameElement;
    }
  };
  /**
   * Remove event listeners from the starting window and its parents' windows.
   */


  var unmount = function unmount() {
    var eventTarget = ownerWindow;

    while (eventTarget) {
      eventTarget.removeEventListener('keydown', onkeydown);
      eventTarget.removeEventListener('keyup', onkeyup);
      eventTarget.removeEventListener('blur', onblur);
      eventTarget = eventTarget.frameElement;
    }
  };

  return {
    mount: mount,
    unmount: unmount,
    isPressed: function isPressed(key) {
      return modifierKeysObserver.isPressed(key);
    }
  };
}