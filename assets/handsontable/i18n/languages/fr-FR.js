"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.weak-map.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

exports.__esModule = true;
exports.default = void 0;

var C = _interopRequireWildcard(require("../constants"));

var _dictionary;

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var dictionary = (_dictionary = {
  languageCode: 'fr-FR'
}, _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_ROW_ABOVE, 'Insérer une ligne en haut'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_ROW_BELOW, 'Insérer une ligne en bas'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_INSERT_LEFT, 'Insérer une colonne à gauche'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_INSERT_RIGHT, 'Insérer une colonne à droite'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_REMOVE_ROW, ['Supprimer une ligne', 'Supprimer les lignes']), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_REMOVE_COLUMN, ['Supprimer une colonne', 'Supprimer les colonnes']), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_UNDO, 'Annuler'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_REDO, 'Rétablir'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_READ_ONLY, 'Lecture seule'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_CLEAR_COLUMN, 'Effacer la colonne'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_ALIGNMENT, 'Alignement'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_ALIGNMENT_LEFT, 'Gauche'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_ALIGNMENT_CENTER, 'Centre'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_ALIGNMENT_RIGHT, 'Droite'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_ALIGNMENT_JUSTIFY, 'Justifié'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_ALIGNMENT_TOP, 'En haut'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_ALIGNMENT_MIDDLE, 'Au milieu'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_ALIGNMENT_BOTTOM, 'En bas'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_FREEZE_COLUMN, 'Figer la colonne'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_UNFREEZE_COLUMN, 'Libérer la colonne'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_BORDERS, 'Bordures'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_BORDERS_TOP, 'Supérieure'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_BORDERS_RIGHT, 'Droite'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_BORDERS_BOTTOM, 'Inférieure'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_BORDERS_LEFT, 'Gauche'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_REMOVE_BORDERS, 'Pas de bordure'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_ADD_COMMENT, 'Ajouter commentaire'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_EDIT_COMMENT, 'Modifier commentaire'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_REMOVE_COMMENT, 'Supprimer commentaire'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_READ_ONLY_COMMENT, 'Commentaire en lecture seule'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_MERGE_CELLS, 'Fusionner les cellules'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_UNMERGE_CELLS, 'Séparer les cellules'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_COPY, 'Copier'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_CUT, 'Couper'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_NESTED_ROWS_INSERT_CHILD, 'Insérer une sous-ligne'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_NESTED_ROWS_DETACH_CHILD, 'Détacher de la ligne précédente'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_HIDE_COLUMN, ['Masquer colonne', 'Masquer les colonnes']), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_SHOW_COLUMN, ['Afficher colonne', 'Afficher les colonnes']), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_HIDE_ROW, ['Masquer ligne', 'Masquer les lignes']), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_SHOW_ROW, ['Afficher ligne', 'Afficher les lignes']), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_NONE, 'Aucun'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_EMPTY, 'Est vide'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_NOT_EMPTY, 'N\'est pas vide'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_EQUAL, 'Egal à'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_NOT_EQUAL, 'Est différent de'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_BEGINS_WITH, 'Commence par'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_ENDS_WITH, 'Finit par'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_CONTAINS, 'Contient'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_NOT_CONTAIN, 'Ne contient pas'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_GREATER_THAN, 'Supérieur à'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_GREATER_THAN_OR_EQUAL, 'Supérieur ou égal à'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_LESS_THAN, 'Inférieur à'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_LESS_THAN_OR_EQUAL, 'Inférieur ou égal à'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_BETWEEN, 'Est compris entre'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_NOT_BETWEEN, 'N\'est pas compris entre'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_AFTER, 'Après le'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_BEFORE, 'Avant le'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_TODAY, 'Aujourd\'hui'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_TOMORROW, 'Demain'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_YESTERDAY, 'Hier'), _defineProperty(_dictionary, C.FILTERS_VALUES_BLANK_CELLS, 'Cellules vides'), _defineProperty(_dictionary, C.FILTERS_DIVS_FILTER_BY_CONDITION, 'Filtrer par conditions'), _defineProperty(_dictionary, C.FILTERS_DIVS_FILTER_BY_VALUE, 'Filtrer par valeurs'), _defineProperty(_dictionary, C.FILTERS_LABELS_CONJUNCTION, 'Et'), _defineProperty(_dictionary, C.FILTERS_LABELS_DISJUNCTION, 'Ou'), _defineProperty(_dictionary, C.FILTERS_BUTTONS_SELECT_ALL, 'Tout sélectionner'), _defineProperty(_dictionary, C.FILTERS_BUTTONS_CLEAR, 'Effacer la sélection'), _defineProperty(_dictionary, C.FILTERS_BUTTONS_OK, 'OK'), _defineProperty(_dictionary, C.FILTERS_BUTTONS_CANCEL, 'Annuler'), _defineProperty(_dictionary, C.FILTERS_BUTTONS_PLACEHOLDER_SEARCH, 'Chercher'), _defineProperty(_dictionary, C.FILTERS_BUTTONS_PLACEHOLDER_VALUE, 'Valeur'), _defineProperty(_dictionary, C.FILTERS_BUTTONS_PLACEHOLDER_SECOND_VALUE, 'Valeur de remplacement'), _dictionary);
var _default = dictionary;
exports.default = _default;