/**
 * TCS NQT Interactive Mock Test Simulation Engine
 * Full CBT (Computer Based Test) simulation with countdown timer, question palette,
 * section navigation, score calculation, accuracy analytics, and detailed explanations.
 */

(function () {
  'use strict';

  var currentTest = null;
  var currentQuestionIdx = 0;
  var timerInterval = null;
  var timeRemainingSec = 0;
  var totalTestTimeSec = 0;
  var userResponses = {}; // { questionId: { selectedOption: index, status: 'answered'|'marked'|'unanswered' } }
  var testCompleted = false;
  var testResult = null;

  function formatTime(seconds) {
    var m = Math.floor(seconds / 60);
    var s = seconds % 60;
    return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
  }

  var MockTestEngine = {
    /**
     * Start a mock test session
     */
    startTest: function (testDef) {
      if (!testDef || !Array.isArray(testDef.questions) || testDef.questions.length === 0) {
        console.error('Invalid test definition');
        return;
      }

      currentTest = testDef;
      currentQuestionIdx = 0;
      totalTestTimeSec = (testDef.durationMinutes || 25) * 60;
      timeRemainingSec = totalTestTimeSec;
      userResponses = {};
      testCompleted = false;
      testResult = null;

      for (var i = 0; i < testDef.questions.length; i++) {
        userResponses[testDef.questions[i].id] = {
          selectedOption: null,
          status: 'unanswered'
        };
      }

      if (timerInterval) clearInterval(timerInterval);
      timerInterval = setInterval(function () {
        timeRemainingSec--;
        var timerEl = document.getElementById('mockTimerDisplay');
        if (timerEl) {
          timerEl.textContent = formatTime(timeRemainingSec);
          if (timeRemainingSec <= 300) {
            timerEl.classList.add('timer-warning');
          }
        }

        if (timeRemainingSec <= 0) {
          clearInterval(timerInterval);
          MockTestEngine.submitTest(true);
        }
      }, 1000);

      this.render();
    },

    /**
     * Answer or select option for current question
     */
    selectOption: function (optionIndex) {
      if (testCompleted || !currentTest) return;
      var q = currentTest.questions[currentQuestionIdx];
      if (!userResponses[q.id]) {
        userResponses[q.id] = { selectedOption: null, status: 'unanswered' };
      }
      userResponses[q.id].selectedOption = optionIndex;
      userResponses[q.id].status = 'answered';
      this.render();
    },

    /**
     * Clear selected option for current question
     */
    clearResponse: function () {
      if (testCompleted || !currentTest) return;
      var q = currentTest.questions[currentQuestionIdx];
      userResponses[q.id].selectedOption = null;
      userResponses[q.id].status = 'unanswered';
      this.render();
    },

    /**
     * Mark current question for review
     */
    markForReview: function () {
      if (testCompleted || !currentTest) return;
      var q = currentTest.questions[currentQuestionIdx];
      userResponses[q.id].status = 'marked';
      this.nextQuestion();
    },

    /**
     * Save response and jump to next question
     */
    saveAndNext: function () {
      if (testCompleted || !currentTest) return;
      var q = currentTest.questions[currentQuestionIdx];
      if (userResponses[q.id].selectedOption !== null && userResponses[q.id].status !== 'marked') {
        userResponses[q.id].status = 'answered';
      }
      this.nextQuestion();
    },

    /**
     * Jump to next question
     */
    nextQuestion: function () {
      if (currentQuestionIdx < currentTest.questions.length - 1) {
        currentQuestionIdx++;
        this.render();
      } else {
        this.render();
      }
    },

    /**
     * Jump to previous question
     */
    prevQuestion: function () {
      if (currentQuestionIdx > 0) {
        currentQuestionIdx--;
        this.render();
      }
    },

    /**
     * Jump to specific question index
     */
    jumpToQuestion: function (idx) {
      if (idx >= 0 && idx < currentTest.questions.length) {
        currentQuestionIdx = idx;
        this.render();
      }
    },

    /**
     * Submit test and calculate final scores
     */
    submitTest: function (isAutoSubmit) {
      if (!currentTest || testCompleted) return;

      if (!isAutoSubmit) {
        if (!confirm('Are you sure you want to finish and submit the test?')) {
          return;
        }
      }

      if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
      }

      testCompleted = true;
      var timeSpentSec = totalTestTimeSec - Math.max(0, timeRemainingSec);

      var totalQs = currentTest.questions.length;
      var correctCount = 0;
      var incorrectCount = 0;
      var unattemptedCount = 0;

      for (var i = 0; i < totalQs; i++) {
        var q = currentTest.questions[i];
        var resp = userResponses[q.id];
        if (resp && resp.selectedOption !== null) {
          if (resp.selectedOption === q.correctAnswer) {
            correctCount++;
          } else {
            incorrectCount++;
          }
        } else {
          unattemptedCount++;
        }
      }

      var attempted = correctCount + incorrectCount;
      var accuracy = attempted > 0 ? Math.round((correctCount / attempted) * 100) : 0;
      var percentage = Math.round((correctCount / totalQs) * 100);

      testResult = {
        testId: currentTest.id,
        testTitle: currentTest.title,
        date: new Date().toISOString(),
        totalQuestions: totalQs,
        correctCount: correctCount,
        incorrectCount: incorrectCount,
        unattemptedCount: unattemptedCount,
        score: correctCount,
        percentage: percentage,
        accuracy: accuracy,
        timeSpentSec: timeSpentSec
      };

      // Save to application LocalStorage state
      if (window.App && typeof window.App.saveMockResult === 'function') {
        window.App.saveMockResult(testResult);
      }

      this.render();
    },

    /**
     * Exit test and return to mock test catalog
     */
    exitTest: function () {
      if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
      }
      currentTest = null;
      testCompleted = false;
      testResult = null;
      if (window.App && typeof window.App.renderPage === 'function') {
        window.App.renderPage('mock');
      }
    },

    /**
     * Render the active mock test UI
     */
    render: function () {
      var container = document.getElementById('mainContent');
      if (!container) return;

      if (!currentTest) {
        // Render Catalog screen
        this.renderCatalog(container);
        return;
      }

      if (testCompleted && testResult) {
        // Render Results screen
        this.renderResults(container);
        return;
      }

      // Render Active Test CBT screen
      this.renderTestInterface(container);
    },

    /**
     * Render Mock Test Catalog Screen
     */
    renderCatalog: function (container) {
      var bank = (window.TCS_MOCK_TESTS || []);
      var html = '';
      html += '<div class="mock-catalog-page page-enter">';
      html += '  <div class="page-header flex-between mb-lg">';
      html += '    <div>';
      html += '      <h1 class="page-title"><i data-lucide="timer" class="title-icon"></i> TCS NQT Mock Test Assessment</h1>';
      html += '      <p class="page-subtitle">Real exam-style simulation with sectional countdown timer, question palette, and instant score analysis.</p>';
      html += '    </div>';
      html += '  </div>';

      html += '  <div class="mock-grid mb-xl">';
      for (var i = 0; i < bank.length; i++) {
        var test = bank[i];
        html += '    <div class="card mock-test-card">';
        html += '      <div class="mock-card-header">';
        html += '        <span class="badge badge-' + test.category + '">' + test.categoryLabel + '</span>';
        html += '        <span class="text-xs text-muted"><i data-lucide="clock" class="icon-inline"></i> ' + test.durationMinutes + ' Mins</span>';
        html += '      </div>';
        html += '      <h3 class="mock-card-title mt-sm">' + test.title + '</h3>';
        html += '      <p class="mock-card-desc text-xs text-muted mt-xs">' + test.description + '</p>';
        html += '      <div class="mock-meta-row mt-md flex-between text-xs">';
        html += '        <span><i data-lucide="help-circle" class="icon-inline"></i> ' + test.questions.length + ' Questions</span>';
        html += '        <span><i data-lucide="award" class="icon-inline"></i> +100 XP</span>';
        html += '      </div>';
        html += '      <button class="btn btn-primary btn-block mt-md btn-start-mock" data-test-id="' + test.id + '">';
        html += '        <i data-lucide="play"></i> Start Test';
        html += '      </button>';
        html += '    </div>';
      }
      html += '  </div>';

      // Mock Test History Section
      var history = (window.App && window.App.getState && window.App.getState().mockTests) || [];
      if (history.length > 0) {
        html += '  <div class="card mb-lg">';
        html += '    <div class="card-header">';
        html += '      <h2 class="card-title"><i data-lucide="history"></i> Past Test Attempts (' + history.length + ')</h2>';
        html += '    </div>';
        html += '    <div class="table-responsive">';
        html += '      <table class="table">';
        html += '        <thead><tr><th>Test Name</th><th>Date</th><th>Score</th><th>Accuracy</th><th>Time Spent</th></tr></thead>';
        html += '        <tbody>';
        for (var h = 0; h < history.length; h++) {
          var item = history[h];
          html += '        <tr>';
          html += '          <td><strong>' + item.testTitle + '</strong></td>';
          html += '          <td class="text-xs text-muted">' + (item.date ? item.date.split('T')[0] : 'Recently') + '</td>';
          html += '          <td><span class="badge badge-accent">' + item.score + ' / ' + item.totalQuestions + ' (' + item.percentage + '%)</span></td>';
          html += '          <td>' + item.accuracy + '%</td>';
          html += '          <td>' + formatTime(item.timeSpentSec || 0) + '</td>';
          html += '        </tr>';
        }
        html += '        </tbody>';
        html += '      </table>';
        html += '    </div>';
        html += '  </div>';
      }

      html += '</div>';
      container.innerHTML = html;
      if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
      }
    },

    /**
     * Render CBT Exam Interface
     */
    renderTestInterface: function (container) {
      var q = currentTest.questions[currentQuestionIdx];
      var resp = userResponses[q.id] || { selectedOption: null, status: 'unanswered' };
      var totalQs = currentTest.questions.length;

      var html = '';
      html += '<div class="cbt-exam-container page-enter">';

      // Sticky Exam Header
      html += '  <div class="cbt-header card mb-md">';
      html += '    <div class="flex-between">';
      html += '      <div>';
      html += '        <h2 class="cbt-title">' + currentTest.title + '</h2>';
      html += '        <span class="text-xs text-muted">Question ' + (currentQuestionIdx + 1) + ' of ' + totalQs + '</span>';
      html += '      </div>';
      html += '      <div class="cbt-timer-wrap">';
      html += '        <span class="timer-label"><i data-lucide="clock"></i> Time Left:</span>';
      html += '        <span class="timer-value" id="mockTimerDisplay">' + formatTime(timeRemainingSec) + '</span>';
      html += '      </div>';
      html += '      <button class="btn btn-sm btn-danger" id="btnSubmitMockTest"><i data-lucide="check-square"></i> Submit Test</button>';
      html += '    </div>';
      html += '  </div>';

      // Layout: Left Question Area (70%) + Right Navigator Palette (30%)
      html += '  <div class="cbt-body-layout">';

      // Left: Question Panel
      html += '    <div class="cbt-question-panel card">';
      html += '      <div class="cbt-q-header flex-between mb-sm">';
      html += '        <span class="badge badge-accent">Q' + (currentQuestionIdx + 1) + '</span>';
      html += '        <span class="text-xs text-muted">Marks: +1, No Negative</span>';
      html += '      </div>';

      html += '      <div class="cbt-q-text mb-lg">' + q.question + '</div>';

      // Options List
      html += '      <div class="cbt-options-list mb-lg">';
      for (var o = 0; o < q.options.length; o++) {
        var opt = q.options[o];
        var isSelected = resp.selectedOption === o;
        html += '        <div class="cbt-option-item ' + (isSelected ? 'selected' : '') + '" data-option-idx="' + o + '">';
        html += '          <div class="option-radio-circle ' + (isSelected ? 'checked' : '') + '"></div>';
        html += '          <span class="option-letter">' + String.fromCharCode(65 + o) + '.</span>';
        html += '          <span class="option-text">' + opt + '</span>';
        html += '        </div>';
      }
      html += '      </div>';

      // CBT Navigation Actions
      html += '      <div class="cbt-actions-bar flex-between pt-md">';
      html += '        <div class="btn-group-left">';
      if (currentQuestionIdx > 0) {
        html += '          <button class="btn btn-secondary btn-sm" id="btnPrevMockQ"><i data-lucide="chevron-left"></i> Previous</button>';
      }
      html += '          <button class="btn btn-secondary btn-sm" id="btnClearMockResponse"><i data-lucide="rotate-ccw"></i> Clear Response</button>';
      html += '        </div>';
      html += '        <div class="btn-group-right">';
      html += '          <button class="btn btn-warning btn-sm" id="btnMarkMockReview"><i data-lucide="bookmark"></i> Mark for Review</button>';
      html += '          <button class="btn btn-primary btn-sm" id="btnSaveNextMockQ">Save & Next <i data-lucide="chevron-right"></i></button>';
      html += '        </div>';
      html += '      </div>';

      html += '    </div>'; // End cbt-question-panel

      // Right: Question Navigator Palette
      html += '    <div class="cbt-palette-panel card">';
      html += '      <h3 class="card-title mb-sm"><i data-lucide="grid"></i> Question Palette</h3>';

      // Status Legend
      html += '      <div class="palette-legend mb-md text-xs">';
      html += '        <div class="legend-item"><span class="legend-dot dot-answered"></span> Answered</div>';
      html += '        <div class="legend-item"><span class="legend-dot dot-marked"></span> Marked</div>';
      html += '        <div class="legend-item"><span class="legend-dot dot-unanswered"></span> Not Answered</div>';
      html += '      </div>';

      // Grid of Questions
      html += '      <div class="palette-grid">';
      for (var p = 0; p < totalQs; p++) {
        var pQ = currentTest.questions[p];
        var pResp = userResponses[pQ.id] || { selectedOption: null, status: 'unanswered' };
        var pClass = 'palette-btn';
        if (pResp.status === 'answered') pClass += ' answered';
        else if (pResp.status === 'marked') pClass += ' marked';
        if (p === currentQuestionIdx) pClass += ' current';

        html += '        <button class="' + pClass + '" data-jump-idx="' + p + '">' + (p + 1) + '</button>';
      }
      html += '      </div>';

      html += '    </div>'; // End cbt-palette-panel

      html += '  </div>'; // End cbt-body-layout
      html += '</div>';

      container.innerHTML = html;
      if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
      }
    },

    /**
     * Render Test Results and Answer Review Screen
     */
    renderResults: function (container) {
      var r = testResult;
      var html = '';
      html += '<div class="mock-results-page page-enter">';

      // Results Hero Card
      html += '  <div class="card mb-lg text-center p-xl result-hero-card">';
      html += '    <div class="result-trophy-wrap mb-md">';
      html += '      <i data-lucide="award" class="result-trophy-icon"></i>';
      html += '    </div>';
      html += '    <h1 class="result-title">Assessment Completed!</h1>';
      html += '    <p class="result-subtitle text-muted mb-lg">' + r.testTitle + '</p>';

      html += '    <div class="result-stats-row mb-lg">';
      html += '      <div class="result-stat-box">';
      html += '        <span class="stat-big text-accent">' + r.score + ' / ' + r.totalQuestions + '</span>';
      html += '        <span class="stat-label">Total Score</span>';
      html += '      </div>';
      html += '      <div class="result-stat-box">';
      html += '        <span class="stat-big ' + (r.percentage >= 70 ? 'text-success' : 'text-warning') + '">' + r.percentage + '%</span>';
      html += '        <span class="stat-label">Score Percentage</span>';
      html += '      </div>';
      html += '      <div class="result-stat-box">';
      html += '        <span class="stat-big text-primary">' + r.accuracy + '%</span>';
      html += '        <span class="stat-label">Accuracy</span>';
      html += '      </div>';
      html += '      <div class="result-stat-box">';
      html += '        <span class="stat-big">' + formatTime(r.timeSpentSec) + '</span>';
      html += '        <span class="stat-label">Time Spent</span>';
      html += '      </div>';
      html += '    </div>';

      html += '    <div class="result-actions flex-center gap-md">';
      html += '      <button class="btn btn-secondary" id="btnExitMockResult"><i data-lucide="arrow-left"></i> Back to Mock Tests</button>';
      html += '      <button class="btn btn-primary" id="btnRetakeMockTest"><i data-lucide="rotate-ccw"></i> Retake Test</button>';
      html += '    </div>';
      html += '  </div>';

      // Answer Review Section
      html += '  <div class="card mb-lg">';
      html += '    <div class="card-header flex-between">';
      html += '      <h2 class="card-title"><i data-lucide="check-circle-2"></i> Detailed Answer Key & Explanations</h2>';
      html += '      <span class="text-xs text-muted">' + r.correctCount + ' Correct • ' + r.incorrectCount + ' Incorrect • ' + r.unattemptedCount + ' Skipped</span>';
      html += '    </div>';

      html += '    <div class="review-questions-list">';
      for (var i = 0; i < currentTest.questions.length; i++) {
        var q = currentTest.questions[i];
        var resp = userResponses[q.id];
        var userChoice = resp ? resp.selectedOption : null;
        var isCorrect = userChoice === q.correctAnswer;
        var isSkipped = userChoice === null;

        var statusClass = isSkipped ? 'skipped' : (isCorrect ? 'correct' : 'incorrect');

        html += '      <div class="review-q-item ' + statusClass + ' mb-md p-md">';
        html += '        <div class="review-q-header flex-between mb-xs">';
        html += '          <strong>Q' + (i + 1) + '. ' + q.question + '</strong>';
        if (isCorrect) {
          html += '          <span class="badge badge-success"><i data-lucide="check"></i> Correct (+1)</span>';
        } else if (isSkipped) {
          html += '          <span class="badge badge-muted">Skipped (0)</span>';
        } else {
          html += '          <span class="badge badge-danger"><i data-lucide="x"></i> Incorrect (0)</span>';
        }
        html += '        </div>';

        // Options comparison
        html += '        <div class="review-options-grid mt-sm text-xs">';
        for (var o = 0; o < q.options.length; o++) {
          var isThisUser = userChoice === o;
          var isThisCorrect = q.correctAnswer === o;
          var optClass = 'review-opt';
          if (isThisCorrect) optClass += ' opt-correct';
          if (isThisUser && !isThisCorrect) optClass += ' opt-user-incorrect';

          html += '          <div class="' + optClass + '">';
          html += '            <span>' + String.fromCharCode(65 + o) + '. ' + q.options[o] + '</span>';
          if (isThisCorrect) html += ' <strong class="text-success">(Correct Answer)</strong>';
          if (isThisUser && !isThisCorrect) html += ' <strong class="text-danger">(Your Answer)</strong>';
          html += '          </div>';
        }
        html += '        </div>';

        if (q.explanation) {
          html += '        <div class="review-explanation mt-sm text-xs">';
          html += '          <i data-lucide="info" class="icon-inline"></i> <strong>Explanation:</strong> ' + q.explanation;
          html += '        </div>';
        }

        html += '      </div>';
      }
      html += '    </div>';

      html += '  </div>';
      html += '</div>';

      container.innerHTML = html;
      if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
      }
    }
  };

  window.MockTest = MockTestEngine;
})();
