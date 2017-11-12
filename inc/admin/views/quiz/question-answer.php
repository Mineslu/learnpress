<?php
/**
 * Question answers template.
 *
 * @since 3.0.0
 */

learn_press_admin_view( 'quiz/question-answer-option' );

?>

<script type="text/x-template" id="tmpl-lp-quiz-question-answers">
    <div class="quiz-question-data">
        <div class="lp-list-questions">
            <table class="lp-list-options">
                <thead>
                <tr>
                    <th class="lp-column-heading lp-column-heading-sort"></th>
                    <th class="lp-column-heading lp-column-heading-order"></th>
                    <th class="lp-column-heading lp-column-heading-answer_text"><?php esc_html_e( 'Answer Text', 'learnpress' ); ?></th>
                    <th class="lp-column-heading lp-column-heading-answer_correct"><?php esc_html_e( 'Is Correct?', 'learnpress' ); ?></th>
                    <th class="lp-column-heading lp-column-heading-actions"></th>
                </tr>
                </thead>
                <draggable :list="question.answers" :element="'tbody'" @end="sort">
                    <lp-quiz-question-answer-option v-for="(answer, index) in question.answers"
                                                    :question="question" :answer="answer" :index="index" :key="index"
                                                    @changeCorrect="changeCorrect"></lp-quiz-question-answer-option>
                </draggable>
            </table>
        </div>
        <p class="question-button-actions" v-if="addableAnswer">
            <button class="button add-question-option-button" type="button"
                    @click="newAnswer"><?php esc_html_e( 'Add option', 'learnpress' ); ?></button>
        </p>
    </div>
</script>

<script type="text/javascript">
    (function (Vue, $store) {
        Vue.component('lp-quiz-question-answers', {
            template: '#tmpl-lp-quiz-question-answers',
            props: ['question'],
            computed: {
                // addable answer option
                addableAnswer: function () {
                    return !(String(this.question.type.key) === 'true_or_false');
                }
            },
            methods: {
                // new answer option
                newAnswer: function () {
                    $store.dispatch('lqs/newQuestionAnswer', this.question.id);
                },
                // sort answer options
                sort: function () {
                    var order = [];

                    this.question.answers.forEach(function (option, index) {
                        order.push(parseInt(option.question_answer_id));
                    });

                    $store.dispatch('lqs/updateQuestionAnswersOrder', {
                        question_id: this.question.id,
                        order: order
                    });
                },
                changeCorrect: function (correct) {
                    $store.dispatch('lqs/updateQuestionCorrectAnswer', {
                        question_id: this.question.id,
                        correct: correct
                    });
                }
            }
        })
    })(Vue, LP_Quiz_Store);
</script>
