/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 54);
/******/ })
/************************************************************************/
/******/ ({

/***/ 54:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _http = __webpack_require__(8);

var _http2 = _interopRequireDefault(_http);

var _question = __webpack_require__(55);

var _question2 = _interopRequireDefault(_question);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.$Vue = window.$Vue || Vue;
window.$Vuex = window.$Vuex || Vuex;

var $ = window.jQuery;

/**
 * Init app.
 *
 * @since 3.0.0
 */
$(document).ready(function () {
    window.LP_Question_Store = new $Vuex.Store((0, _question2.default)(lp_question_editor));

    (0, _http2.default)({ ns: 'LPQuestionEditorRequest', store: LP_Question_Store });

    setTimeout(function () {
        window.LP_Question_Editor = new $Vue({
            el: '#admin-editor-lp_question',
            template: '<lp-question-editor></lp-question-editor>'
        });
    }, 100);
});

/***/ }),

/***/ 55:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _question = __webpack_require__(56);

var _question2 = _interopRequireDefault(_question);

var _question3 = __webpack_require__(57);

var _question4 = _interopRequireDefault(_question3);

var _question5 = __webpack_require__(58);

var _question6 = _interopRequireDefault(_question5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var $ = window.jQuery;
var Question = function Question(data) {
    var state = $.extend({
        status: 'successful',
        countCurrentRequest: 0,
        i18n: $.extend({}, data.i18n)
    }, data.root);

    return {
        state: state,
        getters: _question2.default,
        mutations: _question4.default,
        actions: _question6.default
    };
};

exports.default = Question;

/***/ }),

/***/ 56:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var Question = {
    id: function id(state) {
        return state.id;
    },
    type: function type(state) {
        return state.type;
    },
    code: function code(state) {
        return Date.now();
    },

    autoDraft: function autoDraft(state) {
        return state.auto_draft;
    },
    answers: function answers(state) {
        return Object.values(state.answers) || [];
    },
    settings: function settings(state) {
        return state.setting;
    },
    types: function types(state) {
        return state.questionTypes || [];
    },
    numberCorrect: function numberCorrect(state) {
        var correct = 0;
        Object.keys(state.answers).forEach(function (key) {
            if (state.answers[key].is_true === 'yes') {
                correct += 1;
            }
        });
        return correct;
    },
    status: function status(state) {
        return state.status;
    },
    currentRequest: function currentRequest(state) {
        return state.countCurrentRequest || 0;
    },
    action: function action(state) {
        return state.action;
    },
    nonce: function nonce(state) {
        return state.nonce;
    },
    externalComponent: function externalComponent(state) {
        return state.externalComponent || [];
    },
    state: function state(_state) {
        return _state;
    },
    i18n: function i18n(state) {
        return state.i18n;
    }
};

exports.default = Question;

/***/ }),

/***/ 57:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var Question = {

    'UPDATE_STATUS': function UPDATE_STATUS(state, status) {
        state.status = status;
    },

    'UPDATE_AUTO_DRAFT_STATUS': function UPDATE_AUTO_DRAFT_STATUS(state, status) {
        state.auto_draft = status;
    },

    'CHANGE_QUESTION_TYPE': function CHANGE_QUESTION_TYPE(state, question) {
        state.answers = question.answers;
        state.type = question.type;
    },

    'SET_ANSWERS': function SET_ANSWERS(state, answers) {
        state.answers = answers;
    },

    'DELETE_ANSWER': function DELETE_ANSWER(state, id) {
        for (var i = 0, n = state.answers.length; i < n; i++) {
            if (state.answers[i].question_answer_id == id) {
                state.answers[i].question_answer_id = LP.uniqueId();
                break;
            }
        }
    },
    'ADD_NEW_ANSWER': function ADD_NEW_ANSWER(state, answer) {
        state.answers.push(answer);
    },
    'UPDATE_ANSWERS': function UPDATE_ANSWERS(state, answers) {
        state.answers = answers;
    },

    'INCREASE_NUMBER_REQUEST': function INCREASE_NUMBER_REQUEST(state) {
        state.countCurrentRequest++;
    },

    'DECREASE_NUMBER_REQUEST': function DECREASE_NUMBER_REQUEST(state) {
        state.countCurrentRequest--;
    }
};

exports.default = Question;

/***/ }),

/***/ 58:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var Question = {

    changeQuestionType: function changeQuestionType(context, payload) {
        LP.Request({
            type: 'change-question-type',
            question_type: payload.type,
            draft_question: context.getters.autoDraft ? JSON.stringify(payload.question) : ''
        }).then(function (response) {
            var result = response.body;

            if (result.success) {
                context.commit('UPDATE_AUTO_DRAFT_STATUS', false);
                context.commit('CHANGE_QUESTION_TYPE', result.data);
            }
        });
    },

    updateAnswersOrder: function updateAnswersOrder(context, order) {
        LP.Request({
            type: 'sort-answer',
            order: order
        }).then(function (response) {
            var result = response.body;
            if (result.success) {
                // context.commit('SET_ANSWERS', result.data);
            }
        });
    },

    updateAnswerTitle: function updateAnswerTitle(context, answer) {
        if (typeof answer.question_answer_id == 'undefined') {
            return;
        }
        answer = JSON.stringify(answer);
        LP.Request({
            type: 'update-answer-title',
            answer: answer
        });
    },

    updateCorrectAnswer: function updateCorrectAnswer(context, correct) {
        LP.Request({
            type: 'change-correct',
            correct: JSON.stringify(correct)
        }).then(function (response) {
            var result = response.body;
            if (result.success) {
                context.commit('UPDATE_ANSWERS', result.data);
                context.commit('UPDATE_AUTO_DRAFT_STATUS', false);
            }
        });
    },

    deleteAnswer: function deleteAnswer(context, payload) {

        context.commit('DELETE_ANSWER', payload.id);
        LP.Request({
            type: 'delete-answer',
            answer_id: payload.id
        }).then(function (response) {
            var result = response.body;

            if (result.success) {
                context.commit('SET_ANSWERS', result.data);
            } else {
                // notice error
            }
        });
    },

    newAnswer: function newAnswer(context, data) {
        context.commit('ADD_NEW_ANSWER', data.answer);
        LP.Request({
            type: 'new-answer'
        }).then(function (response) {
            var result = response.body;

            if (result.success) {
                context.commit('UPDATE_ANSWERS', result.data);
            } else {
                // notice error
            }
        });
    },

    newRequest: function newRequest(context) {
        context.commit('INCREASE_NUMBER_REQUEST');
        context.commit('UPDATE_STATUS', 'loading');

        window.onbeforeunload = function () {
            return '';
        };
    },

    requestCompleted: function requestCompleted(context, status) {
        context.commit('DECREASE_NUMBER_REQUEST');

        if (context.getters.currentRequest === 0) {
            context.commit('UPDATE_STATUS', status);
            window.onbeforeunload = null;
        }
    }
};

exports.default = Question;

/***/ }),

/***/ 8:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = HTTP;
function HTTP(options) {
    var $ = window.jQuery;
    var $VueHTTP = Vue.http;

    options = $.extend({
        ns: 'LPRequest',
        store: false
    }, options || {});

    var $publishingAction = null;

    LP.Request = function (payload) {
        $publishingAction = $('#publishing-action');

        payload['id'] = options.store.getters.id;
        payload['nonce'] = options.store.getters.nonce;
        payload['lp-ajax'] = options.store.getters.action;
        payload['code'] = options.store.getters.code;

        $publishingAction.find('#publish').addClass('disabled');
        $publishingAction.find('.spinner').addClass('is-active');
        $publishingAction.addClass('code-' + payload['code']);

        return $VueHTTP.post(options.store.getters.urlAjax, payload, {
            emulateJSON: true,
            params: {
                namespace: options.ns,
                code: payload['code']
            }
        });
    };

    $VueHTTP.interceptors.push(function (request, next) {
        if (request.params['namespace'] !== options.ns) {
            next();
            return;
        }

        options.store.dispatch('newRequest');

        next(function (response) {
            if (!jQuery.isPlainObject(response.body)) {
                response.body = LP.parseJSON(response.body);
            }

            var body = response.body;
            var result = body.success || false;

            if (result) {
                options.store.dispatch('requestCompleted', 'successful');
            } else {
                options.store.dispatch('requestCompleted', 'failed');
            }
            $publishingAction.removeClass('code-' + request.params.code);
            if (!$publishingAction.attr('class')) {
                $publishingAction.find('#publish').removeClass('disabled');
                $publishingAction.find('.spinner').removeClass('is-active');
            }
        });
    });
}

/***/ })

/******/ });
//# sourceMappingURL=question.js.map