/**
 * Coding Problem Tracker Module
 * Manages problem logging, difficulty/topic classification, and statistics.
 */

(function () {
  'use strict';

  var DEFAULT_TOPICS = [
    'Arrays',
    'Strings',
    'Hashing',
    'Two Pointers',
    'Sliding Window',
    'Binary Search',
    'Sorting',
    'Recursion',
    'Linked List',
    'Stack',
    'Queue',
    'Trees',
    'Dynamic Programming',
    'Greedy',
    'Graphs',
    'Mathematics',
    'Bit Manipulation',
    'DBMS / SQL'
  ];

  var TrackerManager = {
    /**
     * Add a problem to codingProblems array
     */
    addProblem: function (data, problem) {
      if (!data) return data;
      data.codingProblems = data.codingProblems || [];

      var newProblem = {
        id: problem.id || ('prob_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4)),
        name: (problem.name || 'Untitled Problem').trim(),
        topic: problem.topic || 'Arrays',
        difficulty: problem.difficulty || 'Easy',
        url: (problem.url || '').trim(),
        status: problem.status || 'Solved', // Solved | Attempted | Pending
        timeTaken: problem.timeTaken || '20m',
        dateAdded: problem.dateAdded || new Date().toISOString().split('T')[0]
      };

      data.codingProblems.unshift(newProblem);

      if (window.Rewards && typeof window.Rewards.checkAchievements === 'function') {
        window.Rewards.checkAchievements(data);
      }

      return data;
    },

    /**
     * Update an existing problem by ID or index
     */
    updateProblem: function (data, indexOrId, updates) {
      if (!data || !data.codingProblems) return data;

      var targetIndex = -1;
      if (typeof indexOrId === 'number' && indexOrId >= 0 && indexOrId < data.codingProblems.length) {
        targetIndex = indexOrId;
      } else {
        targetIndex = data.codingProblems.findIndex(function (p) {
          return p.id === indexOrId;
        });
      }

      if (targetIndex !== -1) {
        var existing = data.codingProblems[targetIndex];
        var merged = Object.assign({}, existing, updates);
        data.codingProblems[targetIndex] = merged;

        if (window.Rewards && typeof window.Rewards.checkAchievements === 'function') {
          window.Rewards.checkAchievements(data);
        }
      }

      return data;
    },

    /**
     * Delete a problem by ID or index
     */
    deleteProblem: function (data, indexOrId) {
      if (!data || !data.codingProblems) return data;

      var targetIndex = -1;
      if (typeof indexOrId === 'number' && indexOrId >= 0 && indexOrId < data.codingProblems.length) {
        targetIndex = indexOrId;
      } else {
        targetIndex = data.codingProblems.findIndex(function (p) {
          return p.id === indexOrId;
        });
      }

      if (targetIndex !== -1) {
        data.codingProblems.splice(targetIndex, 1);
      }

      return data;
    },

    /**
     * Compute statistics for coding problems
     */
    getStats: function (data) {
      var problems = (data && data.codingProblems) || [];
      var total = problems.length;
      var solved = 0;
      var attempted = 0;
      var pending = 0;
      var byTopic = {};
      var byDifficulty = {
        Easy: { total: 0, solved: 0 },
        Medium: { total: 0, solved: 0 },
        Hard: { total: 0, solved: 0 }
      };

      for (var i = 0; i < problems.length; i++) {
        var p = problems[i];
        if (p.status === 'Solved') solved++;
        else if (p.status === 'Attempted') attempted++;
        else pending++;

        // Topic breakdown
        var topic = p.topic || 'Other';
        if (!byTopic[topic]) {
          byTopic[topic] = { total: 0, solved: 0 };
        }
        byTopic[topic].total++;
        if (p.status === 'Solved') {
          byTopic[topic].solved++;
        }

        // Difficulty breakdown
        var diff = p.difficulty || 'Easy';
        if (!byDifficulty[diff]) {
          byDifficulty[diff] = { total: 0, solved: 0 };
        }
        byDifficulty[diff].total++;
        if (p.status === 'Solved') {
          byDifficulty[diff].solved++;
        }
      }

      return {
        total: total,
        solved: solved,
        attempted: attempted,
        pending: pending,
        byTopic: byTopic,
        byDifficulty: byDifficulty
      };
    },

    /**
     * Render the Coding Tracker view HTML
     */
    renderTracker: function (data) {
      var stats = this.getStats(data);
      var problems = (data && data.codingProblems) || [];

      var solveRate = stats.total > 0 ? Math.round((stats.solved / stats.total) * 100) : 0;

      // Extract unique topics for filter dropdown
      var usedTopics = {};
      DEFAULT_TOPICS.forEach(function (t) { usedTopics[t] = true; });
      problems.forEach(function (p) { if (p.topic) usedTopics[p.topic] = true; });
      var topicOptionsHtml = Object.keys(usedTopics).sort().map(function (top) {
        return '<option value="' + top + '">' + top + '</option>';
      }).join('');

      var html = '';
      html += '<div class="page-container coding-page animate-fade-in">';
      
      // Page Header
      html += '  <div class="page-header flex-between">';
      html += '    <div>';
      html += '      <h1 class="page-title"><i data-lucide="code-2" class="title-icon"></i> Coding Problem Tracker</h1>';
      html += '      <p class="page-subtitle">Track DSA problems for TCS NQT, Digital, and Prime coding rounds.</p>';
      html += '    </div>';
      html += '    <div class="header-actions">';
      html += '      <button class="btn btn-primary" id="btnOpenAddProblemModal">';
      html += '        <i data-lucide="plus-circle"></i> Add Problem';
      html += '      </button>';
      html += '    </div>';
      html += '  </div>';

      // Stat Cards
      html += '  <div class="stats-grid mb-6">';
      
      // Total Problems
      html += '    <div class="stat-card stat-total">';
      html += '      <div class="stat-icon-wrap"><i data-lucide="terminal"></i></div>';
      html += '      <div class="stat-info">';
      html += '        <span class="stat-label">Total Logged</span>';
      html += '        <span class="stat-value">' + stats.total + '</span>';
      html += '      </div>';
      html += '    </div>';

      // Solved
      html += '    <div class="stat-card stat-solved">';
      html += '      <div class="stat-icon-wrap"><i data-lucide="check-circle-2"></i></div>';
      html += '      <div class="stat-info">';
      html += '        <span class="stat-label">Solved (' + solveRate + '%)</span>';
      html += '        <span class="stat-value text-success">' + stats.solved + '</span>';
      html += '      </div>';
      html += '    </div>';

      // Easy / Medium / Hard Breakdown
      html += '    <div class="stat-card stat-breakdown">';
      html += '      <div class="stat-icon-wrap"><i data-lucide="bar-chart-2"></i></div>';
      html += '      <div class="stat-info w-full">';
      html += '        <span class="stat-label">Difficulty Split</span>';
      html += '        <div class="difficulty-split-pills">';
      html += '          <span class="diff-pill diff-easy">E: ' + stats.byDifficulty.Easy.solved + '/' + stats.byDifficulty.Easy.total + '</span>';
      html += '          <span class="diff-pill diff-medium">M: ' + stats.byDifficulty.Medium.solved + '/' + stats.byDifficulty.Medium.total + '</span>';
      html += '          <span class="diff-pill diff-hard">H: ' + stats.byDifficulty.Hard.solved + '/' + stats.byDifficulty.Hard.total + '</span>';
      html += '        </div>';
      html += '      </div>';
      html += '    </div>';

      // Pending / In Progress
      html += '    <div class="stat-card stat-pending">';
      html += '      <div class="stat-icon-wrap"><i data-lucide="clock"></i></div>';
      html += '      <div class="stat-info">';
      html += '        <span class="stat-label">Attempted / Pending</span>';
      html += '        <span class="stat-value text-warning">' + (stats.attempted + stats.pending) + '</span>';
      html += '      </div>';
      html += '    </div>';

      html += '  </div>'; // End stats grid

      // Filters and Search Bar
      html += '  <div class="card filter-bar-card mb-6">';
      html += '    <div class="filter-bar">';
      html += '      <div class="search-input-wrapper">';
      html += '        <i data-lucide="search" class="search-icon"></i>';
      html += '        <input type="text" id="codingSearchInput" class="input search-input" placeholder="Search by problem name or topic...">';
      html += '      </div>';
      html += '      <div class="filter-selects">';
      html += '        <select id="codingStatusFilter" class="select">';
      html += '          <option value="all">All Statuses</option>';
      html += '          <option value="Solved">Solved</option>';
      html += '          <option value="Attempted">Attempted</option>';
      html += '          <option value="Pending">Pending</option>';
      html += '        </select>';
      html += '        <select id="codingDifficultyFilter" class="select">';
      html += '          <option value="all">All Difficulties</option>';
      html += '          <option value="Easy">Easy</option>';
      html += '          <option value="Medium">Medium</option>';
      html += '          <option value="Hard">Hard</option>';
      html += '        </select>';
      html += '        <select id="codingTopicFilter" class="select">';
      html += '          <option value="all">All Topics</option>';
      html += topicOptionsHtml;
      html += '        </select>';
      html += '      </div>';
      html += '    </div>';
      html += '  </div>';

      // Problems List / Table
      html += '  <div class="card table-card">';
      html += '    <div class="table-responsive">';
      html += '      <table class="data-table" id="codingTable">';
      html += '        <thead>';
      html += '          <tr>';
      html += '            <th style="width: 130px;">Status</th>';
      html += '            <th>Problem Name</th>';
      html += '            <th>Topic</th>';
      html += '            <th>Difficulty</th>';
      html += '            <th>Time</th>';
      html += '            <th>Date</th>';
      html += '            <th style="text-align: right;">Actions</th>';
      html += '          </tr>';
      html += '        </thead>';
      html += '        <tbody id="codingTableBody">';

      if (problems.length === 0) {
        html += '        <tr class="empty-row">';
        html += '          <td colspan="7" class="text-center py-12">';
        html += '            <div class="empty-state">';
        html += '              <i data-lucide="code" class="empty-icon"></i>';
        html += '              <h3>No coding problems logged yet</h3>';
        html += '              <p class="text-secondary">Track problems you solve on LeetCode, HackerRank, or GFG to boost your interview readiness.</p>';
        html += '              <button class="btn btn-primary mt-4" id="btnEmptyAddProblem">';
        html += '                <i data-lucide="plus"></i> Add Your First Problem';
        html += '              </button>';
        html += '            </div>';
        html += '          </td>';
        html += '        </tr>';
      } else {
        for (var pIdx = 0; pIdx < problems.length; pIdx++) {
          var item = problems[pIdx];
          var statusClass = item.status === 'Solved' ? 'badge-success' : (item.status === 'Attempted' ? 'badge-warning' : 'badge-secondary');
          var diffClass = item.difficulty === 'Easy' ? 'diff-easy' : (item.difficulty === 'Medium' ? 'diff-medium' : 'diff-hard');

          html += '      <tr class="problem-row" data-id="' + item.id + '" data-name="' + (item.name || '').toLowerCase() + '" data-topic="' + (item.topic || '') + '" data-difficulty="' + (item.difficulty || '') + '" data-status="' + (item.status || '') + '">';
          
          // Status cell with clickable status cycler
          html += '        <td>';
          html += '          <button class="badge ' + statusClass + ' status-cycle-btn" data-action="cycle-status" data-id="' + item.id + '" title="Click to cycle status">';
          html += item.status;
          html += '          </button>';
          html += '        </td>';

          // Name and external link
          html += '        <td>';
          html += '          <div class="problem-name-cell">';
          if (item.url) {
            html += '            <a href="' + item.url + '" target="_blank" rel="noopener" class="problem-link">';
            html += item.name;
            html += '              <i data-lucide="external-link" class="link-icon"></i>';
            html += '            </a>';
          } else {
            html += '            <span class="problem-name-text">' + item.name + '</span>';
          }
          html += '          </div>';
          html += '        </td>';

          // Topic
          html += '        <td><span class="tag-topic">' + (item.topic || 'General') + '</span></td>';

          // Difficulty
          html += '        <td><span class="diff-badge ' + diffClass + '">' + item.difficulty + '</span></td>';

          // Time taken
          html += '        <td class="text-secondary">' + (item.timeTaken || '-') + '</td>';

          // Date added
          html += '        <td class="text-secondary">' + (item.dateAdded || '-') + '</td>';

          // Actions
          html += '        <td style="text-align: right;">';
          html += '          <div class="table-actions">';
          html += '            <button class="icon-btn btn-delete-problem" data-action="delete-problem" data-id="' + item.id + '" title="Delete Problem">';
          html += '              <i data-lucide="trash-2"></i>';
          html += '            </button>';
          html += '          </div>';
          html += '        </td>';

          html += '      </tr>';
        }
      }

      html += '        </tbody>';
      html += '      </table>';
      html += '    </div>';
      html += '  </div>';

      html += '</div>'; // End page container

      return html;
    }
  };

  window.Tracker = TrackerManager;
})();
