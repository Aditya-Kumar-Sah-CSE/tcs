/**
 * TCS 30-Day Preparation Tracker - Main Application Controller
 * Handles routing, view rendering, user interactions, gamification, and persistence.
 */

(function () {
  'use strict';

  // Application State
  var state = {
    data: null,
    currentRoute: 'dashboard',
    routeParam: null,
    filterPhase: 'all',
    codingFilterTopic: 'all',
    codingSearchQuery: ''
  };

  // DOM Elements cache
  var elements = {
    mainContent: document.getElementById('mainContent'),
    sidebar: document.getElementById('sidebar'),
    sidebarToggle: document.getElementById('sidebarToggle'),
    mobileMenuBtn: document.getElementById('mobileMenuBtn'),
    sidebarBackdrop: document.getElementById('sidebarBackdrop'),
    sidebarNav: document.getElementById('sidebarNav'),
    sidebarLevelTitle: document.getElementById('sidebarLevelTitle'),
    sidebarLevelNum: document.getElementById('sidebarLevelNum'),
    sidebarXPText: document.getElementById('sidebarXPText'),
    sidebarXPBar: document.getElementById('sidebarXPBar'),
    modalOverlay: document.getElementById('modalOverlay'),
    modal: document.getElementById('modal'),
    toastContainer: document.getElementById('toastContainer'),
    confettiCanvas: document.getElementById('confettiCanvas')
  };

  // ============================================================
  // Utility Functions
  // ============================================================

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function getRandomQuote() {
    if (typeof MOTIVATIONAL_QUOTES !== 'undefined' && MOTIVATIONAL_QUOTES.length > 0) {
      var idx = Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length);
      return MOTIVATIONAL_QUOTES[idx];
    }
    return "Consistency is what transforms average into excellence.";
  }

  // ============================================================
  // Toast Notification System
  // ============================================================

  function showToast(message, type, duration) {
    type = type || 'info';
    duration = duration || 3200;

    var toast = document.createElement('div');
    toast.className = 'toast toast-' + type;

    var iconName = 'info';
    if (type === 'success') iconName = 'check-circle';
    if (type === 'warning') iconName = 'alert-triangle';
    if (type === 'danger' || type === 'error') iconName = 'alert-circle';

    toast.innerHTML = '<i data-lucide="' + iconName + '" class="toast-icon"></i>' +
                      '<span class="toast-msg">' + escapeHtml(message) + '</span>';

    elements.toastContainer.appendChild(toast);
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons({ root: toast });
    }

    setTimeout(function () {
      toast.classList.add('toast-exit');
      setTimeout(function () {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, duration);
  }

  // ============================================================
  // Confetti Animation System
  // ============================================================

  function fireConfetti() {
    var canvas = elements.confettiCanvas;
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var width = (canvas.width = window.innerWidth);
    var height = (canvas.height = window.innerHeight);

    var particles = [];
    var colors = ['#6c5ce7', '#00cec9', '#fd79a8', '#fdcb6e', '#00b894', '#0984e3', '#e17055'];

    for (var i = 0; i < 90; i++) {
      particles.push({
        x: width / 2,
        y: height / 2 + 50,
        vx: (Math.random() - 0.5) * 18,
        vy: (Math.random() - 0.8) * 18,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 12,
        alpha: 1
      });
    }

    var animId;
    function render() {
      ctx.clearRect(0, 0, width, height);
      var alive = false;

      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.45; // gravity
        p.rotation += p.rotSpeed;
        p.alpha -= 0.012;

        if (p.alpha > 0) {
          alive = true;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
          ctx.restore();
        }
      }

      if (alive) {
        animId = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, width, height);
        cancelAnimationFrame(animId);
      }
    }

    render();
  }

  // ============================================================
  // Modal System
  // ============================================================

  function openModal(contentHtml) {
    elements.modal.innerHTML = contentHtml;
    elements.modalOverlay.classList.add('active');
    elements.modalOverlay.setAttribute('aria-hidden', 'false');
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons({ root: elements.modal });
    }
  }

  function closeModal() {
    elements.modalOverlay.classList.remove('active');
    elements.modalOverlay.setAttribute('aria-hidden', 'true');
    elements.modal.innerHTML = '';
  }

  // ============================================================
  // Theme Management
  // ============================================================

  function applyTheme(theme) {
    var root = document.documentElement;
    theme = theme === 'light' ? 'light' : 'dark';
    root.setAttribute('data-theme', theme);
    state.data.theme = theme;
    window.Storage.save(state.data);
  }

  function toggleTheme() {
    var newTheme = state.data.theme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    showToast('Switched to ' + (newTheme === 'dark' ? 'Dark' : 'Light') + ' Mode', 'info', 1800);
    renderApp();
  }

  // ============================================================
  // Calculation & Progress Helpers
  // ============================================================

  function getCalculatedStats() {
    var plan = window.STUDY_PLAN || [];
    var tasksObj = state.data.tasks || {};
    var totalTasks = 0;
    var completedTasks = 0;
    var completedDaysCount = 0;
    var aptitudeSolvedCount = 0;
    var codingSolvedCount = 0;

    var weekProgress = [
      { week: 1, title: 'Week 1: Foundation', start: 1, end: 7, total: 0, done: 0 },
      { week: 2, title: 'Week 2: Intermediate', start: 8, end: 14, total: 0, done: 0 },
      { week: 3, title: 'Week 3: Advanced', start: 15, end: 21, total: 0, done: 0 },
      { week: 4, title: 'Week 4: Final Prep', start: 22, end: 30, total: 0, done: 0 }
    ];

    var dailyStatus = [];

    for (var i = 0; i < plan.length; i++) {
      var day = plan[i];
      var dNum = day.day;
      var dTotal = 0;
      var dDone = 0;

      for (var t = 0; t < day.tasks.length; t++) {
        var task = day.tasks[t];
        totalTasks++;
        dTotal++;

        // Track per-week
        for (var w = 0; w < weekProgress.length; w++) {
          if (dNum >= weekProgress[w].start && dNum <= weekProgress[w].end) {
            weekProgress[w].total++;
            if (tasksObj[task.id]) {
              weekProgress[w].done++;
            }
            break;
          }
        }

        if (tasksObj[task.id]) {
          completedTasks++;
          dDone++;

          if (task.category === 'quant' || task.category === 'reasoning') {
            if (task.type === 'practice') {
              aptitudeSolvedCount += (task.target || 15);
            }
          }
          if (task.category === 'coding' || task.type === 'coding') {
            codingSolvedCount += (task.target || 1);
          }
        }
      }

      var isDayComplete = dTotal > 0 && dDone === dTotal;
      if (isDayComplete) completedDaysCount++;

      dailyStatus.push({
        day: dNum,
        title: day.title,
        total: dTotal,
        done: dDone,
        percentage: dTotal > 0 ? Math.round((dDone / dTotal) * 100) : 0,
        isCompleted: isDayComplete,
        isCurrent: dNum === state.data.currentDay
      });
    }

    // Coding problems added via coding tracker
    if (Array.isArray(state.data.codingProblems)) {
      var extraCoding = state.data.codingProblems.filter(function (p) {
        return p.status === 'Solved';
      }).length;
      codingSolvedCount = Math.max(codingSolvedCount, extraCoding);
    }

    var overallPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    return {
      totalTasks: totalTasks,
      completedTasks: completedTasks,
      overallPercentage: overallPercentage,
      completedDaysCount: completedDaysCount,
      aptitudeSolvedCount: aptitudeSolvedCount,
      codingSolvedCount: codingSolvedCount,
      weekProgress: weekProgress,
      dailyStatus: dailyStatus
    };
  }

  function getNextUpcomingTask() {
    var plan = window.STUDY_PLAN || [];
    var tasksObj = state.data.tasks || {};

    // First search in currentDay onwards
    for (var d = state.data.currentDay; d <= 30; d++) {
      var day = plan.find(function (item) { return item.day === d; });
      if (day && day.tasks) {
        for (var t = 0; t < day.tasks.length; t++) {
          var task = day.tasks[t];
          if (task.mandatory && !tasksObj[task.id]) {
            return { dayNumber: d, task: task };
          }
        }
      }
    }

    // Fallback: search from Day 1
    for (var d2 = 1; d2 <= 30; d2++) {
      var day2 = plan.find(function (item) { return item.day === d2; });
      if (day2 && day2.tasks) {
        for (var t2 = 0; t2 < day2.tasks.length; t2++) {
          var task2 = day2.tasks[t2];
          if (task2.mandatory && !tasksObj[task2.id]) {
            return { dayNumber: d2, task: task2 };
          }
        }
      }
    }

    return null;
  }

  // ============================================================
  // Sidebar Updates
  // ============================================================

  function updateSidebarState() {
    var levelInfo = window.Rewards.getLevel(state.data.xp);
    if (elements.sidebarLevelTitle) elements.sidebarLevelTitle.textContent = levelInfo.title;
    if (elements.sidebarLevelNum) elements.sidebarLevelNum.textContent = 'Lvl ' + levelInfo.level;
    if (elements.sidebarXPText) elements.sidebarXPText.textContent = levelInfo.currentXP + ' / ' + levelInfo.nextLevelXP + ' XP';
    if (elements.sidebarXPBar) elements.sidebarXPBar.style.width = levelInfo.percentage + '%';

    // Highlight current active route in sidebar
    var navLinks = elements.sidebarNav.querySelectorAll('.nav-item');
    navLinks.forEach(function (link) {
      var page = link.getAttribute('data-page');
      if (page === state.currentRoute || (state.currentRoute === 'day' && page === 'roadmap')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // ============================================================
  // View 1: Dashboard
  // ============================================================

  function renderDashboard() {
    var stats = getCalculatedStats();
    var streak = (state.data.streak && state.data.streak.current) || 0;
    var hours = state.data.studyHours || 0;
    var nextTaskInfo = getNextUpcomingTask();

    // Circumference for circular progress ring (radius = 52)
    var r = 52;
    var circumference = 2 * Math.PI * r;
    var strokeDashoffset = circumference - (stats.overallPercentage / 100) * circumference;

    var html = '';
    html += '<div class="dashboard-page page-enter">';

    // Top Welcome Banner
    html += '  <div class="card card-hero mb-lg">';
    html += '    <div class="hero-content">';
    html += '      <div class="hero-badge"><i data-lucide="sparkles"></i> 30-Day TCS NQT Fast-Track</div>';
    html += '      <h1 class="hero-title">TCS 30-Day Preparation Tracker</h1>';
    html += '      <p class="hero-sub">Master Quantitative Aptitude, Logical Reasoning, Verbal Ability & Coding with structured daily milestones.</p>';
    html += '      <div class="hero-actions">';
    html += '        <a href="#today" class="btn btn-primary"><i data-lucide="play-circle"></i> Continue Today (Day ' + state.data.currentDay + ')</a>';
    html += '        <a href="#roadmap" class="btn btn-secondary"><i data-lucide="map"></i> View Roadmap</a>';
    html += '      </div>';
    html += '    </div>';
    html += '  </div>';

    // Key Stats Grid (7 key indicators)
    html += '  <div class="stats-grid mb-lg">';

    // 1. Current Day
    html += '    <div class="stat-card stat-day" title="Your current study schedule day">';
    html += '      <div class="stat-icon-wrap"><i data-lucide="calendar"></i></div>';
    html += '      <div class="stat-info">';
    html += '        <span class="stat-label">Current Day</span>';
    html += '        <span class="stat-value">Day ' + state.data.currentDay + ' <span class="stat-sub">/ 30</span></span>';
    html += '      </div>';
    html += '    </div>';

    // 2. Overall Completion
    html += '    <div class="stat-card stat-progress" title="Overall challenge progress">';
    html += '      <div class="stat-icon-wrap"><i data-lucide="percent"></i></div>';
    html += '      <div class="stat-info">';
    html += '        <span class="stat-label">Completion</span>';
    html += '        <span class="stat-value">' + stats.overallPercentage + '%</span>';
    html += '      </div>';
    html += '    </div>';

    // 3. Tasks Done
    html += '    <div class="stat-card stat-tasks" title="Total completed tasks">';
    html += '      <div class="stat-icon-wrap"><i data-lucide="check-square"></i></div>';
    html += '      <div class="stat-info">';
    html += '        <span class="stat-label">Tasks Done</span>';
    html += '        <span class="stat-value">' + stats.completedTasks + ' <span class="stat-sub">/ ' + stats.totalTasks + '</span></span>';
    html += '      </div>';
    html += '    </div>';

    // 4. Current Streak
    html += '    <div class="stat-card stat-streak" title="Daily study streak">';
    html += '      <div class="stat-icon-wrap" style="color: #e17055;"><i data-lucide="flame"></i></div>';
    html += '      <div class="stat-info">';
    html += '        <span class="stat-label">Active Streak</span>';
    html += '        <span class="stat-value">' + streak + ' <span class="stat-sub">days</span></span>';
    html += '      </div>';
    html += '    </div>';

    // 5. Total Study Hours
    html += '    <div class="stat-card stat-hours" title="Total hours studied">';
    html += '      <div class="stat-icon-wrap" style="color: #00cec9;"><i data-lucide="clock"></i></div>';
    html += '      <div class="stat-info">';
    html += '        <span class="stat-label">Study Hours</span>';
    html += '        <span class="stat-value">' + hours + ' <span class="stat-sub">hrs</span></span>';
    html += '      </div>';
    html += '    </div>';

    // 6. Coding Problems Solved
    html += '    <div class="stat-card stat-coding" title="Coding problems solved">';
    html += '      <div class="stat-icon-wrap" style="color: #fdcb6e;"><i data-lucide="code-2"></i></div>';
    html += '      <div class="stat-info">';
    html += '        <span class="stat-label">Coding Solved</span>';
    html += '        <span class="stat-value">' + stats.codingSolvedCount + '</span>';
    html += '      </div>';
    html += '    </div>';

    // 7. Aptitude Questions Solved
    html += '    <div class="stat-card stat-aptitude" title="Estimated aptitude questions solved">';
    html += '      <div class="stat-icon-wrap" style="color: #a29bfe;"><i data-lucide="calculator"></i></div>';
    html += '      <div class="stat-info">';
    html += '        <span class="stat-label">Aptitude Solved</span>';
    html += '        <span class="stat-value">' + stats.aptitudeSolvedCount + '+</span>';
    html += '      </div>';
    html += '    </div>';

    html += '  </div>'; // End stats-grid

    // Two-Column Section: Circular Progress Ring & Next Upcoming Task
    html += '  <div class="dashboard-middle-grid mb-lg">';

    // Animated Circular Progress Ring Card
    html += '    <div class="card circular-progress-card">';
    html += '      <div class="card-header">';
    html += '        <h2 class="card-title"><i data-lucide="pie-chart"></i> Challenge Velocity</h2>';
    html += '      </div>';
    html += '      <div class="circular-progress-wrap">';
    html += '        <div class="progress-ring-container">';
    html += '          <div class="progress-ring">';
    html += '            <svg width="130" height="130" viewBox="0 0 130 130">';
    html += '              <defs>';
    html += '                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">';
    html += '                  <stop offset="0%" stop-color="#6c5ce7"/>';
    html += '                  <stop offset="50%" stop-color="#8c7ae6"/>';
    html += '                  <stop offset="100%" stop-color="#00cec9"/>';
    html += '                </linearGradient>';
    html += '              </defs>';
    html += '              <circle class="progress-ring-bg" cx="65" cy="65" r="' + r + '"></circle>';
    html += '              <circle class="progress-ring-fill" cx="65" cy="65" r="' + r + '" ';
    html += '                stroke-dasharray="' + circumference + '" ';
    html += '                stroke-dashoffset="' + strokeDashoffset + '"></circle>';
    html += '            </svg>';
    html += '            <div class="progress-ring-text">' + stats.overallPercentage + '%</div>';
    html += '          </div>';
    html += '        </div>';
    html += '        <div class="ring-details">';
    html += '          <div class="ring-stat-item">';
    html += '            <span class="ring-label">Days Fully Conquered</span>';
    html += '            <span class="ring-val">' + stats.completedDaysCount + ' / 30 Days</span>';
    html += '          </div>';
    html += '          <div class="ring-stat-item">';
    html += '            <span class="ring-label">Curriculum Tasks Completed</span>';
    html += '            <span class="ring-val">' + stats.completedTasks + ' / ' + stats.totalTasks + ' Tasks</span>';
    html += '          </div>';
    html += '          <div class="ring-stat-item">';
    html += '            <span class="ring-label">Current Level</span>';
    html += '            <span class="ring-val text-accent">' + window.Rewards.getLevel(state.data.xp).title + ' (' + state.data.xp + ' XP)</span>';
    html += '          </div>';
    html += '        </div>';
    html += '      </div>';
    html += '    </div>';

    // Next Upcoming Task Card
    html += '    <div class="card next-task-card">';
    html += '      <div class="card-header">';
    html += '        <h2 class="card-title"><i data-lucide="compass"></i> Next Recommended Action</h2>';
    html += '      </div>';
    html += '      <div class="card-body">';
    if (nextTaskInfo) {
      var nTask = nextTaskInfo.task;
      html += '        <div class="next-task-box">';
      html += '          <div class="next-task-badge-row">';
      html += '            <span class="badge badge-primary">Day ' + nextTaskInfo.dayNumber + '</span>';
      html += '            <span class="task-category ' + nTask.category + '">' + nTask.category + '</span>';
      html += '            <span class="badge">' + nTask.type + '</span>';
      html += '          </div>';
      html += '          <h3 class="next-task-title">' + escapeHtml(nTask.title) + '</h3>';
      if (nTask.description) {
        html += '          <p class="next-task-desc">' + escapeHtml(nTask.description) + '</p>';
      }
      html += '          <div class="next-task-actions mt-md">';
      if (nTask.link) {
        html += '            <a href="' + escapeHtml(nTask.link) + '" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">';
        html += '              <i data-lucide="external-link"></i> Open Material';
        html += '            </a>';
      }
      html += '            <a href="#day/' + nextTaskInfo.dayNumber + '" class="btn btn-secondary btn-sm">';
      html += '              <i data-lucide="arrow-right"></i> Go to Day ' + nextTaskInfo.dayNumber;
      html += '            </a>';
      html += '          </div>';
      html += '        </div>';
    } else {
      html += '        <div class="text-center p-md">';
      html += '          <i data-lucide="award" style="width: 48px; height: 48px; color: #00cec9; margin-bottom: 8px;"></i>';
      html += '          <h3>All Tasks Completed!</h3>';
      html += '          <p class="text-muted">You have finished every task in the 30-day curriculum! Outstanding work!</p>';
      html += '        </div>';
    }
    html += '      </div>';
    html += '    </div>';

    html += '  </div>'; // End dashboard-middle-grid

    // Weekly Progress Breakdown
    html += '  <div class="card mb-lg">';
    html += '    <div class="card-header">';
    html += '      <h2 class="card-title"><i data-lucide="bar-chart-2"></i> Weekly Progress Milestones</h2>';
    html += '    </div>';
    html += '    <div class="weekly-progress-grid">';
    for (var w = 0; w < stats.weekProgress.length; w++) {
      var week = stats.weekProgress[w];
      var wPercent = week.total > 0 ? Math.round((week.done / week.total) * 100) : 0;
      html += '      <div class="week-stat-card">';
      html += '        <div class="week-header-row">';
      html += '          <span class="week-title-text">' + week.title + '</span>';
      html += '          <span class="week-percent-text">' + wPercent + '%</span>';
      html += '        </div>';
      html += '        <div class="progress-bar mini-bar mt-sm">';
      html += '          <div class="progress-fill" style="width: ' + wPercent + '%;"></div>';
      html += '        </div>';
      html += '        <div class="week-footer-text mt-sm text-xs text-muted">';
      html += '          ' + week.done + ' of ' + week.total + ' tasks completed (Days ' + week.start + '-' + week.end + ')';
      html += '        </div>';
      html += '      </div>';
    }
    html += '    </div>';
    html += '  </div>';

    // Daily Completion Status Dots Grid (30 days interactive overview)
    html += '  <div class="card mb-lg">';
    html += '    <div class="card-header flex-between">';
    html += '      <h2 class="card-title"><i data-lucide="grid"></i> 30-Day Completion Map</h2>';
    html += '      <span class="text-sm text-muted">Click any day to inspect</span>';
    html += '    </div>';
    html += '    <div class="daily-status-grid">';
    for (var d = 0; d < stats.dailyStatus.length; d++) {
      var dayItem = stats.dailyStatus[d];
      var statusClass = 'day-dot-pending';
      if (dayItem.isCompleted) {
        statusClass = 'day-dot-complete';
      } else if (dayItem.done > 0) {
        statusClass = 'day-dot-partial';
      }
      if (dayItem.isCurrent) {
        statusClass += ' day-dot-current';
      }

      html += '      <a href="#day/' + dayItem.day + '" class="day-status-dot ' + statusClass + '" title="Day ' + dayItem.day + ': ' + dayItem.title + ' (' + dayItem.done + '/' + dayItem.total + ')">';
      html += '        <span class="dot-num">D' + dayItem.day + '</span>';
      html += '        <span class="dot-pct">' + dayItem.percentage + '%</span>';
      html += '      </a>';
    }
    html += '    </div>';
    html += '  </div>';

    html += '</div>'; // End dashboard-page

    elements.mainContent.innerHTML = html;
  }

  // ============================================================
  // View 2: 30-Day Roadmap
  // ============================================================

  function renderRoadmap() {
    var plan = window.STUDY_PLAN || [];
    var tasksObj = state.data.tasks || {};

    var phases = [
      { id: 'all', label: 'All 30 Days' },
      { id: 'foundation', label: 'Foundation (Days 1–7)' },
      { id: 'intermediate', label: 'Intermediate (Days 8–14)' },
      { id: 'advanced', label: 'Advanced (Days 15–21)' },
      { id: 'final', label: 'Final Prep (Days 22–30)' }
    ];

    var html = '';
    html += '<div class="roadmap-page page-enter">';

    // Header
    html += '  <div class="page-header flex-between">';
    html += '    <div>';
    html += '      <h1 class="page-title"><i data-lucide="map" class="title-icon"></i> 30-Day TCS Roadmap</h1>';
    html += '      <p class="page-subtitle">Curated curriculum covering Aptitude, Reasoning, Verbal & Coding.</p>';
    html += '    </div>';
    html += '    <div class="header-actions">';
    html += '      <a href="#today" class="btn btn-primary"><i data-lucide="calendar"></i> Go to Day ' + state.data.currentDay + '</a>';
    html += '    </div>';
    html += '  </div>';

    // Phase Filter Buttons
    html += '  <div class="phase-filters mb-lg">';
    for (var p = 0; p < phases.length; p++) {
      var phase = phases[p];
      var activeClass = state.filterPhase === phase.id ? 'active' : '';
      html += '    <button class="btn btn-sm btn-filter ' + activeClass + '" data-phase="' + phase.id + '">';
      html += '      ' + phase.label;
      html += '    </button>';
    }
    html += '  </div>';

    // Days Grid
    html += '  <div class="roadmap-grid">';
    for (var i = 0; i < plan.length; i++) {
      var day = plan[i];

      if (state.filterPhase !== 'all' && day.phase !== state.filterPhase) {
        continue;
      }

      var dayTasks = day.tasks || [];
      var dTotal = dayTasks.length;
      var dDone = 0;

      for (var t = 0; t < dayTasks.length; t++) {
        if (tasksObj[dayTasks[t].id]) dDone++;
      }

      var isComplete = dTotal > 0 && dDone === dTotal;
      var isCurrent = day.day === state.data.currentDay;
      var pct = dTotal > 0 ? Math.round((dDone / dTotal) * 100) : 0;

      var cardClasses = ['day-card', 'phase-' + day.phase];
      if (isComplete) cardClasses.push('completed');
      if (isCurrent) cardClasses.push('current');

      html += '    <div class="' + cardClasses.join(' ') + '" data-day="' + day.day + '">';
      html += '      <div class="day-card-header">';
      html += '        <div class="day-badge-wrap">';
      html += '          <span class="day-number-tag">Day ' + day.day + '</span>';
      html += '          <span class="phase-badge phase-tag-' + day.phase + '">' + day.phaseLabel + '</span>';
      html += '        </div>';

      if (isComplete) {
        html += '        <span class="day-status-pill completed-pill"><i data-lucide="check"></i> Done</span>';
      } else if (isCurrent) {
        html += '        <span class="day-status-pill current-pill"><i data-lucide="clock"></i> Active</span>';
      } else {
        html += '        <span class="day-status-pill pending-pill">' + pct + '%</span>';
      }
      html += '      </div>';

      html += '      <h3 class="day-card-title">' + escapeHtml(day.title) + '</h3>';

      // Task count and progress bar
      html += '      <div class="day-card-progress mt-sm">';
      html += '        <div class="progress-bar mini-bar">';
      html += '          <div class="progress-fill" style="width: ' + pct + '%;"></div>';
      html += '        </div>';
      html += '        <div class="day-progress-meta mt-xs">';
      html += '          <span>' + dDone + ' of ' + dTotal + ' tasks</span>';
      html += '          <span>' + pct + '%</span>';
      html += '        </div>';
      html += '      </div>';

      // Quick Categories Preview
      html += '      <div class="day-card-categories mt-sm">';
      var seenCats = {};
      for (var tc = 0; tc < dayTasks.length; tc++) {
        var cat = dayTasks[tc].category;
        if (!seenCats[cat]) {
          seenCats[cat] = true;
          html += '        <span class="task-category ' + cat + '">' + cat + '</span>';
        }
      }
      html += '      </div>';

      html += '    </div>';
    }
    html += '  </div>';

    html += '</div>';

    elements.mainContent.innerHTML = html;
  }

  // ============================================================
  // View 3: Today's Tasks
  // ============================================================

  function renderToday() {
    renderDayDetail(state.data.currentDay, true);
  }

  // ============================================================
  // View 4: Day Detail (#day/N)
  // ============================================================

  function renderDayDetail(dayNumber, isTodayView) {
    dayNumber = parseInt(dayNumber, 10);
    if (isNaN(dayNumber) || dayNumber < 1) dayNumber = 1;
    if (dayNumber > 30) dayNumber = 30;

    var plan = window.STUDY_PLAN || [];
    var day = plan.find(function (d) { return d.day === dayNumber; });

    if (!day) {
      elements.mainContent.innerHTML = '<div class="p-lg"><h2>Day not found</h2><a href="#roadmap" class="btn btn-primary mt-md">Back to Roadmap</a></div>';
      return;
    }

    var tasksObj = state.data.tasks || {};
    var dayTasks = day.tasks || [];
    var dTotal = dayTasks.length;
    var dDone = 0;
    var allMandatoryDone = true;

    for (var i = 0; i < dayTasks.length; i++) {
      var t = dayTasks[i];
      if (tasksObj[t.id]) {
        dDone++;
      } else if (t.mandatory) {
        allMandatoryDone = false;
      }
    }

    var isComplete = dTotal > 0 && dDone === dTotal;
    var pct = dTotal > 0 ? Math.round((dDone / dTotal) * 100) : 0;
    var savedNotes = (state.data.notes && state.data.notes[dayNumber]) || '';

    var html = '';
    html += '<div class="day-detail-page page-enter">';

    // Top Header
    html += '  <div class="day-detail-header mb-lg">';
    html += '    <div>';
    html += '      <div class="day-meta-row mb-xs">';
    html += '        <a href="#roadmap" class="back-link"><i data-lucide="arrow-left"></i> Roadmap</a>';
    html += '        <span class="meta-sep">•</span>';
    html += '        <span class="phase-badge phase-tag-' + day.phase + '">' + day.phaseLabel + '</span>';
    if (dayNumber === state.data.currentDay) {
      html += '        <span class="badge badge-accent">Today\'s Focus</span>';
    }
    html += '      </div>';
    html += '      <h1 class="page-title">Day ' + day.day + ': ' + escapeHtml(day.title) + '</h1>';
    html += '    </div>';

    // Actions (Set as Active Day, Prev/Next day buttons)
    html += '    <div class="day-detail-actions">';
    if (dayNumber > 1) {
      html += '      <a href="#day/' + (dayNumber - 1) + '" class="btn btn-secondary btn-sm" title="Previous Day"><i data-lucide="chevron-left"></i> Day ' + (dayNumber - 1) + '</a>';
    }
    if (dayNumber < 30) {
      html += '      <a href="#day/' + (dayNumber + 1) + '" class="btn btn-secondary btn-sm" title="Next Day">Day ' + (dayNumber + 1) + ' <i data-lucide="chevron-right"></i></a>';
    }
    if (dayNumber !== state.data.currentDay) {
      html += '      <button class="btn btn-sm btn-secondary" id="btnSetCurrentDay" data-day="' + dayNumber + '" title="Set this day as your current challenge day">';
      html += '        <i data-lucide="bookmark"></i> Set Active';
      html += '      </button>';
    }
    html += '    </div>';
    html += '  </div>';

    // Motivational Quote Banner (shown especially in Today view)
    if (isTodayView) {
      html += '  <div class="quote-card mb-lg">';
      html += '    <i data-lucide="quote" class="quote-icon"></i>';
      html += '    <div class="quote-text-wrap">';
      html += '      <p class="quote-text">"' + getRandomQuote() + '"</p>';
      html += '      <span class="quote-sub">Stay consistent. Every question practiced is one step closer to TCS.</span>';
      html += '    </div>';
      html += '  </div>';
    }

    // Day Progress Banner
    html += '  <div class="card mb-lg">';
    html += '    <div class="day-progress-row">';
    html += '      <div class="progress-left-info">';
    html += '        <span class="progress-title-text">' + dDone + ' of ' + dTotal + ' Tasks Completed</span>';
    html += '        <span class="progress-pct-badge ' + (isComplete ? 'text-success' : '') + '">' + pct + '% Complete</span>';
    html += '      </div>';
    html += '      <div class="progress-right-actions">';
    if (isComplete) {
      html += '        <span class="status-badge-complete"><i data-lucide="check-circle-2"></i> Day Completed!</span>';
    } else {
      html += '        <button class="btn btn-sm btn-primary" id="btnMarkDayComplete" data-day="' + dayNumber + '" ' + (allMandatoryDone ? '' : 'disabled') + '>';
      html += '          <i data-lucide="check"></i> Mark Day Complete (+50 XP)';
      html += '        </button>';
    }
    html += '        <button class="btn btn-sm btn-danger btn-icon" id="btnResetDay" data-day="' + dayNumber + '" title="Reset this day\'s progress">';
    html += '          <i data-lucide="rotate-ccw"></i>';
    html += '        </button>';
    html += '      </div>';
    html += '    </div>';
    html += '    <div class="progress-bar mt-md">';
    html += '      <div class="progress-fill" style="width: ' + pct + '%;"></div>';
    html += '    </div>';
    html += '  </div>';

    // Tasks List
    html += '  <div class="card mb-lg">';
    html += '    <div class="card-header flex-between">';
    html += '      <h2 class="card-title"><i data-lucide="list-checks"></i> Day ' + dayNumber + ' Tasks</h2>';
    html += '      <span class="text-xs text-muted">Click checkbox when finished to earn XP</span>';
    html += '    </div>';
    html += '    <div class="task-list">';

    for (var tIdx = 0; tIdx < dayTasks.length; tIdx++) {
      var task = dayTasks[tIdx];
      var isChecked = !!tasksObj[task.id];
      var itemClass = 'task-item';
      if (isChecked) itemClass += ' completed';

      html += '      <div class="' + itemClass + '" data-task-id="' + task.id + '" data-day="' + dayNumber + '">';

      // Custom Checkbox
      html += '        <div class="task-checkbox ' + (isChecked ? 'checked' : '') + '" data-task-id="' + task.id + '" role="checkbox" aria-checked="' + isChecked + '" tabindex="0">';
      if (isChecked) {
        html += '          <i data-lucide="check"></i>';
      }
      html += '        </div>';

      // Task Main Info
      html += '        <div class="task-info">';
      html += '          <div class="task-title-row">';
      html += '            <span class="task-title">' + escapeHtml(task.title) + '</span>';
      html += '            <span class="task-category ' + task.category + '">' + task.category + '</span>';
      if (task.difficulty) {
        html += '            <span class="difficulty-badge ' + task.difficulty.toLowerCase() + '">' + task.difficulty + '</span>';
      }
      if (task.duration) {
        html += '            <span class="task-target-pill"><i data-lucide="clock" class="icon-inline"></i> ' + task.duration + '</span>';
      }
      if (task.target && !task.difficulty) {
        html += '            <span class="task-target-pill">' + task.target + ' ' + (task.category === 'coding' ? 'Problems' : 'Questions') + '</span>';
      }
      html += '          </div>';
      if (task.description) {
        html += '          <div class="task-description">' + escapeHtml(task.description) + '</div>';
      }
      html += '        </div>';

      // Task Action Link
      html += '        <div class="task-actions">';
      if (task.link) {
        var linkLabel = 'Open Resource';
        var linkIcon = 'external-link';
        if (task.type === 'lecture') {
          linkLabel = 'Watch Video';
          linkIcon = 'play-circle';
        } else if (task.type === 'practice') {
          linkLabel = task.difficulty ? 'Solve Question' : 'Practice Topic';
          linkIcon = 'file-text';
        } else if (task.type === 'coding') {
          linkLabel = 'Solve on GFG';
          linkIcon = 'code-2';
        } else if (task.type === 'mock') {
          linkLabel = 'Start Mock';
          linkIcon = 'play';
        }

        html += '          <a href="' + escapeHtml(task.link) + '" target="_blank" rel="noopener noreferrer" class="task-link" data-url="' + escapeHtml(task.link) + '">';
        html += '            <i data-lucide="' + linkIcon + '"></i> ' + linkLabel;
        html += '          </a>';
      }
      html += '        </div>';

      html += '      </div>'; // End task-item
    }

    html += '    </div>'; // End task-list
    html += '  </div>';

    // Daily Notes & Formula Book Section
    html += '  <div class="card mb-lg">';
    html += '    <div class="card-header">';
    html += '      <h2 class="card-title"><i data-lucide="file-edit"></i> Day ' + dayNumber + ' Personal Notes & Formulas</h2>';
    html += '    </div>';
    html += '    <div class="card-body">';
    html += '      <p class="text-xs text-muted mb-sm">Write down tricky question formulas, shortcuts, or weak spots. Notes automatically autosave.</p>';
    html += '      <textarea class="textarea" id="dayNotesTextarea" data-day="' + dayNumber + '" placeholder="e.g. Divisibility rule for 7, speed conversions (multiply by 5/18), two-pointer edge cases..." rows="4">' + escapeHtml(savedNotes) + '</textarea>';
    html += '      <div class="notes-footer mt-xs text-xs text-muted" id="notesStatusText">Auto-saved to LocalStorage</div>';
    html += '    </div>';
    html += '  </div>';

    html += '</div>'; // End day-detail-page

    elements.mainContent.innerHTML = html;
  }

  // ============================================================
  // View 5: Coding Tracker
  // ============================================================

  function renderCodingTracker() {
    var html = window.Tracker.renderTracker(state.data);
    elements.mainContent.innerHTML = html;
  }

  // ============================================================
  // View 6: Achievements
  // ============================================================

  function renderAchievements() {
    var achievements = (typeof window.ACHIEVEMENTS !== 'undefined') ? window.ACHIEVEMENTS : [];
    var earnedIds = state.data.earnedAchievements || [];
    var levelInfo = window.Rewards.getLevel(state.data.xp);

    var html = '';
    html += '<div class="achievements-page page-enter">';

    // Header
    html += '  <div class="page-header flex-between">';
    html += '    <div>';
    html += '      <h1 class="page-title"><i data-lucide="trophy" class="title-icon"></i> Achievements & Levels</h1>';
    html += '      <p class="page-subtitle">Earn XP by completing tasks, conquering days, and keeping your study streak alive.</p>';
    html += '    </div>';
    html += '    <div class="header-actions">';
    html += '      <div class="xp-badge-large"><i data-lucide="zap"></i> ' + state.data.xp + ' Total XP</div>';
    html += '    </div>';
    html += '  </div>';

    // Level Summary Hero Card
    html += '  <div class="card level-hero-card mb-lg">';
    html += '    <div class="level-hero-left">';
    html += '      <div class="level-crown-badge"><i data-lucide="crown"></i></div>';
    html += '      <div>';
    html += '        <div class="level-title-large">' + levelInfo.title + '</div>';
    html += '        <div class="level-num-sub">Level ' + levelInfo.level + ' Preparation Master</div>';
    html += '      </div>';
    html += '    </div>';
    html += '    <div class="level-hero-right">';
    html += '      <div class="level-xp-progress-meta">';
    html += '        <span>Progress to Level ' + (levelInfo.level + 1) + '</span>';
    html += '        <span>' + levelInfo.currentXP + ' / ' + levelInfo.nextLevelXP + ' XP (' + levelInfo.percentage + '%)</span>';
    html += '      </div>';
    html += '      <div class="progress-bar mt-xs">';
    html += '        <div class="progress-fill" style="width: ' + levelInfo.percentage + '%;"></div>';
    html += '      </div>';
    html += '    </div>';
    html += '  </div>';

    // Achievements Grid
    html += '  <div class="achievements-grid">';
    for (var i = 0; i < achievements.length; i++) {
      var ach = achievements[i];
      var isEarned = earnedIds.indexOf(ach.id) !== -1;
      var cardClass = 'achievement-card';
      if (isEarned) cardClass += ' earned';

      html += '    <div class="' + cardClass + '">';
      html += '      <div class="achievement-icon-wrap">';
      html += '        <i data-lucide="' + ach.icon + '" class="achievement-icon"></i>';
      html += '      </div>';
      html += '      <h3 class="achievement-title">' + escapeHtml(ach.title) + '</h3>';
      html += '      <p class="achievement-desc">' + escapeHtml(ach.description) + '</p>';
      html += '      <div class="achievement-footer mt-md">';
      html += '        <span class="achievement-xp-badge">+' + ach.xp + ' XP</span>';
      if (isEarned) {
        html += '        <span class="achievement-status text-success"><i data-lucide="check"></i> Unlocked</span>';
      } else {
        html += '        <span class="achievement-status text-muted"><i data-lucide="lock"></i> Locked</span>';
      }
      html += '      </div>';
      html += '    </div>';
    }
    html += '  </div>';

    html += '</div>';

    elements.mainContent.innerHTML = html;
  }

  // ============================================================
  // View 7: Settings
  // ============================================================

  function renderSettings() {
    var theme = state.data.theme || 'dark';
    var target = state.data.dailyTarget || 6;
    var hours = state.data.studyHours || 0;
    var currentDay = state.data.currentDay || 1;

    var html = '';
    html += '<div class="settings-page page-enter">';

    // Header
    html += '  <div class="page-header">';
    html += '    <h1 class="page-title"><i data-lucide="settings" class="title-icon"></i> Settings & Preferences</h1>';
    html += '    <p class="page-subtitle">Configure your theme, study targets, export or restore your preparation progress.</p>';
    html += '  </div>';

    // Appearance Section
    html += '  <div class="card settings-section mb-lg">';
    html += '    <h2 class="card-title mb-md"><i data-lucide="palette"></i> Appearance & Theme</h2>';
    html += '    <div class="settings-row flex-between">';
    html += '      <div>';
    html += '        <div class="setting-name">Visual Theme</div>';
    html += '        <div class="setting-desc">Switch between modern Linear-inspired dark mode and clean light mode.</div>';
    html += '      </div>';
    html += '      <div>';
    html += '        <button class="btn btn-secondary" id="btnToggleTheme">';
    html += '          <i data-lucide="' + (theme === 'dark' ? 'sun' : 'moon') + '"></i> ' + (theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
    html += '        </button>';
    html += '      </div>';
    html += '    </div>';
    html += '  </div>';

    // Study Target & Active Day Section
    html += '  <div class="card settings-section mb-lg">';
    html += '    <h2 class="card-title mb-md"><i data-lucide="target"></i> Study Target & Active Day</h2>';

    // Daily Study Hours Target
    html += '    <div class="settings-row flex-between mb-md">';
    html += '      <div>';
    html += '        <div class="setting-name">Daily Study Target</div>';
    html += '        <div class="setting-desc">Aim for dedicated study hours every day for peak retention.</div>';
    html += '      </div>';
    html += '      <div class="flex items-center gap-sm">';
    html += '        <input type="number" class="input" id="inputDailyTarget" min="1" max="16" value="' + target + '" style="width: 80px; text-align: center;">';
    html += '        <span>hours / day</span>';
    html += '      </div>';
    html += '    </div>';

    // Jump to Active Day
    html += '    <div class="settings-row flex-between mb-md">';
    html += '      <div>';
    html += '        <div class="setting-name">Current Active Day (1–30)</div>';
    html += '        <div class="setting-desc">Set which day of the 30-day challenge is currently active.</div>';
    html += '      </div>';
    html += '      <div>';
    html += '        <select class="input" id="selectActiveDay" style="width: 140px;">';
    for (var d = 1; d <= 30; d++) {
      html += '          <option value="' + d + '" ' + (d === currentDay ? 'selected' : '') + '>Day ' + d + '</option>';
    }
    html += '        </select>';
    html += '      </div>';
    html += '    </div>';

    // Log Study Hours
    html += '    <div class="settings-row flex-between">';
    html += '      <div>';
    html += '        <div class="setting-name">Total Study Hours Logged</div>';
    html += '        <div class="setting-desc">Currently: <strong>' + hours + ' hours</strong> recorded. Quick add study time:</div>';
    html += '      </div>';
    html += '      <div class="flex items-center gap-sm">';
    html += '        <button class="btn btn-secondary btn-sm" id="btnAddOneHour">+1 Hour</button>';
    html += '        <button class="btn btn-secondary btn-sm" id="btnAddTwoHours">+2 Hours</button>';
    html += '      </div>';
    html += '    </div>';

    html += '  </div>';

    // Data Management (Import / Export / Reset)
    html += '  <div class="card settings-section mb-lg">';
    html += '    <h2 class="card-title mb-md"><i data-lucide="database"></i> Data Management (LocalStorage)</h2>';

    // Export
    html += '    <div class="settings-row flex-between mb-md">';
    html += '      <div>';
    html += '        <div class="setting-name">Export Progress JSON</div>';
    html += '        <div class="setting-desc">Download a backup file of your task progress, notes, streak, and XP.</div>';
    html += '      </div>';
    html += '      <div>';
    html += '        <button class="btn btn-secondary" id="btnExportJSON">';
    html += '          <i data-lucide="download"></i> Export Progress';
    html += '        </button>';
    html += '      </div>';
    html += '    </div>';

    // Import
    html += '    <div class="settings-row flex-between mb-md">';
    html += '      <div>';
    html += '        <div class="setting-name">Import Progress JSON</div>';
    html += '        <div class="setting-desc">Restore your tracker data from a previously exported backup file.</div>';
    html += '      </div>';
    html += '      <div>';
    html += '        <input type="file" id="importFileInput" accept=".json" style="display: none;">';
    html += '        <button class="btn btn-secondary" id="btnTriggerImport">';
    html += '          <i data-lucide="upload"></i> Import Backup';
    html += '        </button>';
    html += '      </div>';
    html += '    </div>';

    // Reset All
    html += '    <div class="settings-row flex-between">';
    html += '      <div>';
    html += '        <div class="setting-name text-danger">Reset All Progress</div>';
    html += '        <div class="setting-desc">Clears all task checkmarks, notes, and XP. This cannot be undone.</div>';
    html += '      </div>';
    html += '      <div>';
    html += '        <button class="btn btn-danger" id="btnResetAll">';
    html += '          <i data-lucide="trash-2"></i> Reset Everything';
    html += '        </button>';
    html += '      </div>';
    html += '    </div>';

    html += '  </div>';

    html += '</div>';

    elements.mainContent.innerHTML = html;
  }

  // ============================================================
  // Router
  // ============================================================

  function route() {
    var hash = window.location.hash.slice(1).trim();
    if (!hash) hash = 'dashboard';

    var parts = hash.split('/');
    var page = parts[0];
    var param = parts[1] || null;

    state.currentRoute = page;
    state.routeParam = param;

    renderApp();
  }

  function renderApp() {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    switch (state.currentRoute) {
      case 'dashboard':
        renderDashboard();
        break;
      case 'roadmap':
        renderRoadmap();
        break;
      case 'today':
        renderToday();
        break;
      case 'day':
        renderDayDetail(state.routeParam || state.data.currentDay);
        break;
      case 'coding':
        renderCodingTracker();
        break;
      case 'achievements':
        renderAchievements();
        break;
      case 'settings':
        renderSettings();
        break;
      default:
        renderDashboard();
        break;
    }

    updateSidebarState();

    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  }

  // ============================================================
  // Event Delegation & Interaction Handlers
  // ============================================================

  function handleTaskToggle(taskId, dayNumber) {
    if (!taskId) return;
    state.data.tasks = state.data.tasks || {};

    var wasCompleted = !!state.data.tasks[taskId];
    var isNowCompleted = !wasCompleted;

    if (isNowCompleted) {
      state.data.tasks[taskId] = true;
      // Award 10 XP for task completion
      state.data = window.Rewards.addXP(10, taskId, state.data);
      // Update streak
      state.data = window.Rewards.updateStreak(state.data);
      showToast('+10 XP Earned! Task completed', 'success', 2000);
    } else {
      delete state.data.tasks[taskId];
      // Deduct 10 XP on unchecking
      state.data = window.Rewards.removeXP(10, taskId, state.data);
      showToast('Task marked incomplete', 'info', 1500);
    }

    // Check newly earned achievements
    var achResult = window.Rewards.checkAchievements(state.data);
    state.data = achResult.data;
    if (achResult.newAchievements && achResult.newAchievements.length > 0) {
      for (var a = 0; a < achResult.newAchievements.length; a++) {
        var unAch = achResult.newAchievements[a];
        showToast('🏆 Achievement Unlocked: ' + unAch.title + ' (+' + unAch.xp + ' XP)', 'success', 4000);
        fireConfetti();
      }
    }

    window.Storage.save(state.data);
    renderApp();
  }

  function handleMarkDayComplete(dayNumber) {
    dayNumber = parseInt(dayNumber, 10);
    var plan = window.STUDY_PLAN || [];
    var day = plan.find(function (d) { return d.day === dayNumber; });
    if (!day) return;

    var tasksObj = state.data.tasks || {};
    var allMandatory = true;

    for (var i = 0; i < day.tasks.length; i++) {
      var t = day.tasks[i];
      if (t.mandatory && !tasksObj[t.id]) {
        allMandatory = false;
        break;
      }
    }

    if (!allMandatory) {
      showToast('Complete all mandatory tasks for Day ' + dayNumber + ' first!', 'warning');
      return;
    }

    // Award bonus 50 XP for day completion
    var dayBonusKey = 'day_complete_bonus_' + dayNumber;
    state.data = window.Rewards.addXP(50, dayBonusKey, state.data);
    state.data = window.Rewards.updateStreak(state.data);

    // If this was current day, automatically suggest advancing to next day
    if (dayNumber === state.data.currentDay && dayNumber < 30) {
      state.data.currentDay = dayNumber + 1;
      showToast('Day ' + dayNumber + ' Complete! +50 XP! Advanced to Day ' + (dayNumber + 1), 'success', 4000);
    } else {
      showToast('Day ' + dayNumber + ' Complete! +50 XP!', 'success', 4000);
    }

    fireConfetti();
    window.Storage.save(state.data);
    renderApp();
  }

  function handleResetDay(dayNumber) {
    dayNumber = parseInt(dayNumber, 10);
    var plan = window.STUDY_PLAN || [];
    var day = plan.find(function (d) { return d.day === dayNumber; });
    if (!day) return;

    var modalHtml = '';
    modalHtml += '<div class="p-md text-center">';
    modalHtml += '  <i data-lucide="alert-triangle" style="width: 48px; height: 48px; color: #d63031; margin-bottom: 12px;"></i>';
    modalHtml += '  <h3 class="modal-title mb-sm">Reset Day ' + dayNumber + '?</h3>';
    modalHtml += '  <p class="text-sm text-muted mb-lg">This will uncheck all tasks for Day ' + dayNumber + ' and remove the associated XP. Notes will be preserved.</p>';
    modalHtml += '  <div class="flex justify-between gap-md">';
    modalHtml += '    <button class="btn btn-secondary w-full" id="btnCancelModal">Cancel</button>';
    modalHtml += '    <button class="btn btn-danger w-full" id="btnConfirmResetDay" data-day="' + dayNumber + '">Yes, Reset Day</button>';
    modalHtml += '  </div>';
    modalHtml += '</div>';

    openModal(modalHtml);
  }

  function executeResetDay(dayNumber) {
    var plan = window.STUDY_PLAN || [];
    var day = plan.find(function (d) { return d.day === dayNumber; });
    if (!day) return;

    for (var i = 0; i < day.tasks.length; i++) {
      var t = day.tasks[i];
      if (state.data.tasks[t.id]) {
        delete state.data.tasks[t.id];
        state.data = window.Rewards.removeXP(10, t.id, state.data);
      }
    }

    // Remove day complete bonus if any
    var dayBonusKey = 'day_complete_bonus_' + dayNumber;
    state.data = window.Rewards.removeXP(50, dayBonusKey, state.data);

    window.Storage.save(state.data);
    closeModal();
    showToast('Day ' + dayNumber + ' progress has been reset.', 'info');
    renderApp();
  }

  function handleResetAll() {
    var modalHtml = '';
    modalHtml += '<div class="p-md text-center">';
    modalHtml += '  <i data-lucide="alert-octagon" style="width: 52px; height: 52px; color: #d63031; margin-bottom: 12px;"></i>';
    modalHtml += '  <h3 class="modal-title mb-sm">Reset All Preparation Progress?</h3>';
    modalHtml += '  <p class="text-sm text-muted mb-md">This will erase all completed tasks, XP, achievements, streaks, and logged coding problems.</p>';
    modalHtml += '  <p class="text-xs text-muted mb-lg">Tip: Export a backup first if you want to keep your current progress.</p>';
    modalHtml += '  <div class="flex justify-between gap-md">';
    modalHtml += '    <button class="btn btn-secondary w-full" id="btnCancelModal">Cancel</button>';
    modalHtml += '    <button class="btn btn-danger w-full" id="btnConfirmResetAll">Yes, Reset Everything</button>';
    modalHtml += '  </div>';
    modalHtml += '</div>';

    openModal(modalHtml);
  }

  function executeResetAll() {
    state.data = window.Storage.reset();
    closeModal();
    showToast('All progress has been reset to defaults.', 'info');
    window.location.hash = '#dashboard';
    renderApp();
  }

  // Coding Tracker Add Modal
  function openAddProblemModal() {
    var topics = [
      'Arrays', 'Strings', 'Hashing', 'Two Pointers', 'Sliding Window',
      'Binary Search', 'Sorting', 'Recursion', 'Linked List', 'Stack',
      'Queue', 'Trees', 'Dynamic Programming', 'Greedy', 'Graphs',
      'Mathematics', 'Bit Manipulation', 'DBMS / SQL'
    ];

    var modalHtml = '';
    modalHtml += '<div class="p-md">';
    modalHtml += '  <div class="flex-between mb-md">';
    modalHtml += '    <h3 class="modal-title"><i data-lucide="code-2"></i> Log New Problem</h3>';
    modalHtml += '    <button class="modal-close-btn" id="btnCancelModal">&times;</button>';
    modalHtml += '  </div>';
    modalHtml += '  <form id="formAddProblem">';
    modalHtml += '    <div class="form-group mb-sm">';
    modalHtml += '      <label class="form-label">Problem Name *</label>';
    modalHtml += '      <input type="text" class="input w-full" id="inputProbName" placeholder="e.g. Two Sum / Longest Substring" required>';
    modalHtml += '    </div>';
    modalHtml += '    <div class="form-group mb-sm">';
    modalHtml += '      <label class="form-label">Topic</label>';
    modalHtml += '      <select class="input w-full" id="selectProbTopic">';
    for (var i = 0; i < topics.length; i++) {
      modalHtml += '        <option value="' + topics[i] + '">' + topics[i] + '</option>';
    }
    modalHtml += '      </select>';
    modalHtml += '    </div>';
    modalHtml += '    <div class="form-row mb-sm flex gap-md">';
    modalHtml += '      <div class="w-full">';
    modalHtml += '        <label class="form-label">Difficulty</label>';
    modalHtml += '        <select class="input w-full" id="selectProbDiff">';
    modalHtml += '          <option value="Easy">Easy</option>';
    modalHtml += '          <option value="Medium" selected>Medium</option>';
    modalHtml += '          <option value="Hard">Hard</option>';
    modalHtml += '        </select>';
    modalHtml += '      </div>';
    modalHtml += '      <div class="w-full">';
    modalHtml += '        <label class="form-label">Status</label>';
    modalHtml += '        <select class="input w-full" id="selectProbStatus">';
    modalHtml += '          <option value="Solved" selected>Solved</option>';
    modalHtml += '          <option value="Attempted">Attempted</option>';
    modalHtml += '          <option value="Pending">Pending</option>';
    modalHtml += '        </select>';
    modalHtml += '      </div>';
    modalHtml += '    </div>';
    modalHtml += '    <div class="form-row mb-sm flex gap-md">';
    modalHtml += '      <div class="w-full">';
    modalHtml += '        <label class="form-label">Problem URL</label>';
    modalHtml += '        <input type="url" class="input w-full" id="inputProbUrl" placeholder="https://leetcode.com/problems/...">';
    modalHtml += '      </div>';
    modalHtml += '      <div style="width: 120px;">';
    modalHtml += '        <label class="form-label">Time Taken</label>';
    modalHtml += '        <input type="text" class="input w-full" id="inputProbTime" placeholder="20m" value="25m">';
    modalHtml += '      </div>';
    modalHtml += '    </div>';
    modalHtml += '    <div class="modal-actions mt-md flex justify-between gap-md">';
    modalHtml += '      <button type="button" class="btn btn-secondary w-full" id="btnCancelModal">Cancel</button>';
    modalHtml += '      <button type="submit" class="btn btn-primary w-full">Save Problem</button>';
    modalHtml += '    </div>';
    modalHtml += '  </form>';
    modalHtml += '</div>';

    openModal(modalHtml);
  }

  // ============================================================
  // Global Event Listeners Setup
  // ============================================================

  function setupGlobalListeners() {
    // Hash change router
    window.addEventListener('hashchange', route);

    // Sidebar Toggles
    if (elements.sidebarToggle) {
      elements.sidebarToggle.addEventListener('click', function () {
        elements.sidebar.classList.toggle('collapsed');
      });
    }

    if (elements.mobileMenuBtn) {
      elements.mobileMenuBtn.addEventListener('click', function () {
        elements.sidebar.classList.toggle('open');
        elements.sidebarBackdrop.classList.toggle('active');
      });
    }

    if (elements.sidebarBackdrop) {
      elements.sidebarBackdrop.addEventListener('click', function () {
        elements.sidebar.classList.remove('open');
        elements.sidebarBackdrop.classList.remove('active');
      });
    }

    // Modal Overlay backdrop click & Escape key
    elements.modalOverlay.addEventListener('click', function (e) {
      if (e.target === elements.modalOverlay) {
        closeModal();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && elements.modalOverlay.classList.contains('active')) {
        closeModal();
      }
    });

    // Main Content Click Delegation
    elements.mainContent.addEventListener('click', function (e) {
      // Allow external links (YouTube, IndiaBix, GFG) to open directly in default browser (Brave)
      var extLink = e.target.closest('a[target="_blank"]');
      if (extLink) {
        e.stopPropagation();
        return;
      }

      // 1. Task Checkbox Click
      var checkbox = e.target.closest('.task-checkbox');
      if (checkbox) {
        e.stopPropagation();
        var taskId = checkbox.getAttribute('data-task-id');
        var taskItem = checkbox.closest('.task-item');
        var dayNum = taskItem ? taskItem.getAttribute('data-day') : state.data.currentDay;
        handleTaskToggle(taskId, dayNum);
        return;
      }

      // 2. Day card in Roadmap click
      var dayCard = e.target.closest('.day-card');
      if (dayCard && !e.target.closest('a') && !e.target.closest('button')) {
        var dayNumCard = dayCard.getAttribute('data-day');
        if (dayNumCard) {
          window.location.hash = '#day/' + dayNumCard;
          return;
        }
      }

      // 3. Phase Filter button in Roadmap
      var filterBtn = e.target.closest('.btn-filter');
      if (filterBtn) {
        var phase = filterBtn.getAttribute('data-phase');
        state.filterPhase = phase;
        renderRoadmap();
        if (window.lucide && typeof window.lucide.createIcons === 'function') {
          window.lucide.createIcons();
        }
        return;
      }

      // 4. Set as Active Day button
      var btnSetDay = e.target.closest('#btnSetCurrentDay');
      if (btnSetDay) {
        var newCurrent = parseInt(btnSetDay.getAttribute('data-day'), 10);
        state.data.currentDay = newCurrent;
        window.Storage.save(state.data);
        showToast('Active challenge day set to Day ' + newCurrent, 'success');
        renderApp();
        return;
      }

      // 5. Mark Day Complete button
      var btnMarkDone = e.target.closest('#btnMarkDayComplete');
      if (btnMarkDone) {
        var markDay = btnMarkDone.getAttribute('data-day');
        handleMarkDayComplete(markDay);
        return;
      }

      // 6. Reset Day button
      var btnResetD = e.target.closest('#btnResetDay');
      if (btnResetD) {
        var resetDayNum = btnResetD.getAttribute('data-day');
        handleResetDay(resetDayNum);
        return;
      }

      // 7. Theme toggle in Settings
      var btnTheme = e.target.closest('#btnToggleTheme');
      if (btnTheme) {
        toggleTheme();
        return;
      }

      // 8. Add +1h / +2h in Settings
      var btnAdd1 = e.target.closest('#btnAddOneHour');
      if (btnAdd1) {
        state.data.studyHours = (state.data.studyHours || 0) + 1;
        window.Storage.save(state.data);
        showToast('+1 Study hour logged! Total: ' + state.data.studyHours + 'h', 'success');
        renderApp();
        return;
      }

      var btnAdd2 = e.target.closest('#btnAddTwoHours');
      if (btnAdd2) {
        state.data.studyHours = (state.data.studyHours || 0) + 2;
        window.Storage.save(state.data);
        showToast('+2 Study hours logged! Total: ' + state.data.studyHours + 'h', 'success');
        renderApp();
        return;
      }

      // 9. Export JSON button
      var btnExport = e.target.closest('#btnExportJSON');
      if (btnExport) {
        var jsonStr = window.Storage.exportJSON();
        var blob = new Blob([jsonStr], { type: 'application/json' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        var nowStr = new Date().toISOString().split('T')[0];
        a.href = url;
        a.download = 'tcs_prep_progress_' + nowStr + '.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showToast('Progress exported successfully!', 'success');
        return;
      }

      // 10. Trigger Import file dialog
      var btnImport = e.target.closest('#btnTriggerImport');
      if (btnImport) {
        var fileInput = document.getElementById('importFileInput');
        if (fileInput) fileInput.click();
        return;
      }

      // 11. Reset All button in Settings
      var btnResetAllBtn = e.target.closest('#btnResetAll');
      if (btnResetAllBtn) {
        handleResetAll();
        return;
      }

      // 12. Coding Tracker: Open Add Modal
      var btnAddProb = e.target.closest('#btnOpenAddProblemModal');
      if (btnAddProb) {
        openAddProblemModal();
        return;
      }

      // 13. Coding Tracker: Delete problem
      var btnDelProb = e.target.closest('.btn-delete-problem');
      if (btnDelProb) {
        var probId = btnDelProb.getAttribute('data-id');
        state.data = window.Tracker.deleteProblem(state.data, probId);
        window.Storage.save(state.data);
        showToast('Problem deleted', 'info');
        renderApp();
        return;
      }

      // 14. Coding Tracker: Toggle problem status
      var btnStatusToggle = e.target.closest('.btn-toggle-status');
      if (btnStatusToggle) {
        var toggleId = btnStatusToggle.getAttribute('data-id');
        var currStatus = btnStatusToggle.getAttribute('data-status');
        var nextStatus = 'Solved';
        if (currStatus === 'Solved') nextStatus = 'Pending';
        else if (currStatus === 'Pending') nextStatus = 'Attempted';
        else nextStatus = 'Solved';

        state.data = window.Tracker.updateProblem(state.data, toggleId, { status: nextStatus });
        window.Storage.save(state.data);
        renderApp();
        return;
      }
    });

    // Notes auto-save with debounce
    var notesDebounceTimer = null;
    elements.mainContent.addEventListener('input', function (e) {
      if (e.target && e.target.id === 'dayNotesTextarea') {
        var day = e.target.getAttribute('data-day');
        var val = e.target.value;
        var statusEl = document.getElementById('notesStatusText');
        if (statusEl) statusEl.textContent = 'Saving...';

        clearTimeout(notesDebounceTimer);
        notesDebounceTimer = setTimeout(function () {
          state.data.notes = state.data.notes || {};
          state.data.notes[day] = val;
          window.Storage.save(state.data);
          if (statusEl) statusEl.textContent = 'Auto-saved to LocalStorage';
        }, 600);
      }

      // Daily study target input change
      if (e.target && e.target.id === 'inputDailyTarget') {
        var valNum = parseInt(e.target.value, 10);
        if (!isNaN(valNum) && valNum > 0) {
          state.data.dailyTarget = valNum;
          window.Storage.save(state.data);
        }
      }
    });

    // Change event for selects
    elements.mainContent.addEventListener('change', function (e) {
      if (e.target && e.target.id === 'selectActiveDay') {
        var dNum = parseInt(e.target.value, 10);
        state.data.currentDay = dNum;
        window.Storage.save(state.data);
        showToast('Active challenge day changed to Day ' + dNum, 'success');
        updateSidebarState();
      }

      // File input for import
      if (e.target && e.target.id === 'importFileInput') {
        var file = e.target.files && e.target.files[0];
        if (file) {
          var reader = new FileReader();
          reader.onload = function (readEvent) {
            try {
              var imported = window.Storage.importJSON(readEvent.target.result);
              state.data = imported;
              showToast('Progress restored successfully from file!', 'success', 3000);
              renderApp();
            } catch (err) {
              showToast('Error importing file: ' + err.message, 'danger', 4000);
            }
          };
          reader.readAsText(file);
        }
      }

      // Coding Tracker Topic Filter
      if (e.target && e.target.id === 'selectFilterTopic') {
        var selectedTopic = e.target.value;
        var tableRows = elements.mainContent.querySelectorAll('.coding-table tbody tr');
        tableRows.forEach(function (row) {
          var rowTopic = row.getAttribute('data-topic');
          if (selectedTopic === 'all' || rowTopic === selectedTopic) {
            row.style.display = '';
          } else {
            row.style.display = 'none';
          }
        });
      }
    });

    // Modal Click Delegation (Cancel / Submit)
    elements.modal.addEventListener('click', function (e) {
      if (e.target && (e.target.id === 'btnCancelModal' || e.target.closest('#btnCancelModal'))) {
        closeModal();
        return;
      }

      var confirmResetDayBtn = e.target.closest('#btnConfirmResetDay');
      if (confirmResetDayBtn) {
        var dNum = confirmResetDayBtn.getAttribute('data-day');
        executeResetDay(dNum);
        return;
      }

      var confirmResetAllBtn = e.target.closest('#btnConfirmResetAll');
      if (confirmResetAllBtn) {
        executeResetAll();
        return;
      }
    });

    // Modal Form Submission (Add Problem)
    elements.modal.addEventListener('submit', function (e) {
      if (e.target && e.target.id === 'formAddProblem') {
        e.preventDefault();
        var nameInput = document.getElementById('inputProbName');
        var topicSelect = document.getElementById('selectProbTopic');
        var diffSelect = document.getElementById('selectProbDiff');
        var statusSelect = document.getElementById('selectProbStatus');
        var urlInput = document.getElementById('inputProbUrl');
        var timeInput = document.getElementById('inputProbTime');

        var newProblem = {
          name: nameInput ? nameInput.value : 'Problem',
          topic: topicSelect ? topicSelect.value : 'Arrays',
          difficulty: diffSelect ? diffSelect.value : 'Medium',
          status: statusSelect ? statusSelect.value : 'Solved',
          url: urlInput ? urlInput.value : '',
          timeTaken: timeInput ? timeInput.value : '20m'
        };

        state.data = window.Tracker.addProblem(state.data, newProblem);
        window.Storage.save(state.data);
        closeModal();
        showToast('Problem added to Coding Tracker!', 'success');
        renderApp();
      }
    });
  }

  // ============================================================
  // Initialization
  // ============================================================

  function init() {
    // 1. Load data from LocalStorage
    state.data = window.Storage.load();

    // 2. Apply theme (defaults to dark)
    applyTheme(state.data.theme || 'dark');

    // 3. Update streak on initial session
    state.data = window.Rewards.updateStreak(state.data);
    window.Storage.save(state.data);

    // 4. Setup listeners
    setupGlobalListeners();

    // 5. Initial route
    route();

    // 6. Render icons
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  }

  // Start app on DOMContentLoaded or immediately if ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Export app namespace for debugging if needed
  window.App = {
    getState: function () { return state; },
    renderApp: renderApp,
    fireConfetti: fireConfetti,
    showToast: showToast
  };
})();

