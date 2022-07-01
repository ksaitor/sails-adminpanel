var _dictionary;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @preserve
 * Authors: Handsoncode
 * Last updated: Nov 15, 2017
 *
 * Description: Definition file for English - United States language-country.
 */
import Handsontable from "../index";
var C = Handsontable.languages.dictionaryKeys;
var dictionary = (_dictionary = {
  languageCode: 'en-US'
}, _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_NO_ITEMS, 'No available options'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_ROW_ABOVE, 'Insert row above'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_ROW_BELOW, 'Insert row below'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_INSERT_LEFT, 'Insert column left'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_INSERT_RIGHT, 'Insert column right'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_REMOVE_ROW, ['Remove row', 'Remove rows']), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_REMOVE_COLUMN, ['Remove column', 'Remove columns']), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_UNDO, 'Undo'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_REDO, 'Redo'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_READ_ONLY, 'Read only'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_CLEAR_COLUMN, 'Clear column'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_ALIGNMENT, 'Alignment'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_ALIGNMENT_LEFT, 'Left'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_ALIGNMENT_CENTER, 'Center'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_ALIGNMENT_RIGHT, 'Right'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_ALIGNMENT_JUSTIFY, 'Justify'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_ALIGNMENT_TOP, 'Top'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_ALIGNMENT_MIDDLE, 'Middle'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_ALIGNMENT_BOTTOM, 'Bottom'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_FREEZE_COLUMN, 'Freeze column'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_UNFREEZE_COLUMN, 'Unfreeze column'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_BORDERS, 'Borders'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_BORDERS_TOP, 'Top'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_BORDERS_RIGHT, 'Right'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_BORDERS_BOTTOM, 'Bottom'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_BORDERS_LEFT, 'Left'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_REMOVE_BORDERS, 'Remove border(s)'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_ADD_COMMENT, 'Add comment'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_EDIT_COMMENT, 'Edit comment'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_REMOVE_COMMENT, 'Delete comment'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_READ_ONLY_COMMENT, 'Read-only comment'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_MERGE_CELLS, 'Merge cells'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_UNMERGE_CELLS, 'Unmerge cells'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_COPY, 'Copy'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_CUT, 'Cut'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_NESTED_ROWS_INSERT_CHILD, 'Insert child row'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_NESTED_ROWS_DETACH_CHILD, 'Detach from parent'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_HIDE_COLUMN, ['Hide column', 'Hide columns']), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_SHOW_COLUMN, ['Show column', 'Show columns']), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_HIDE_ROW, ['Hide row', 'Hide rows']), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_SHOW_ROW, ['Show row', 'Show rows']), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_NONE, 'None'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_EMPTY, 'Is empty'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_NOT_EMPTY, 'Is not empty'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_EQUAL, 'Is equal to'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_NOT_EQUAL, 'Is not equal to'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_BEGINS_WITH, 'Begins with'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_ENDS_WITH, 'Ends with'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_CONTAINS, 'Contains'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_NOT_CONTAIN, 'Does not contain'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_GREATER_THAN, 'Greater than'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_GREATER_THAN_OR_EQUAL, 'Greater than or equal to'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_LESS_THAN, 'Less than'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_LESS_THAN_OR_EQUAL, 'Less than or equal to'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_BETWEEN, 'Is between'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_NOT_BETWEEN, 'Is not between'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_AFTER, 'After'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_BEFORE, 'Before'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_TODAY, 'Today'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_TOMORROW, 'Tomorrow'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_YESTERDAY, 'Yesterday'), _defineProperty(_dictionary, C.FILTERS_VALUES_BLANK_CELLS, 'Blank cells'), _defineProperty(_dictionary, C.FILTERS_DIVS_FILTER_BY_CONDITION, 'Filter by condition'), _defineProperty(_dictionary, C.FILTERS_DIVS_FILTER_BY_VALUE, 'Filter by value'), _defineProperty(_dictionary, C.FILTERS_LABELS_CONJUNCTION, 'And'), _defineProperty(_dictionary, C.FILTERS_LABELS_DISJUNCTION, 'Or'), _defineProperty(_dictionary, C.FILTERS_BUTTONS_SELECT_ALL, 'Select all'), _defineProperty(_dictionary, C.FILTERS_BUTTONS_CLEAR, 'Clear'), _defineProperty(_dictionary, C.FILTERS_BUTTONS_OK, 'OK'), _defineProperty(_dictionary, C.FILTERS_BUTTONS_CANCEL, 'Cancel'), _defineProperty(_dictionary, C.FILTERS_BUTTONS_PLACEHOLDER_SEARCH, 'Search'), _defineProperty(_dictionary, C.FILTERS_BUTTONS_PLACEHOLDER_VALUE, 'Value'), _defineProperty(_dictionary, C.FILTERS_BUTTONS_PLACEHOLDER_SECOND_VALUE, 'Second value'), _dictionary);
Handsontable.languages.registerLanguageDictionary(dictionary);
export default dictionary;
