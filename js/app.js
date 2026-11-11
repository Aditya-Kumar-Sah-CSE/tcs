/**
 * TCS 30-Day Preparation Tracker - Main Application Controller
 * Handles routing, view rendering, user interactions, gamification, persistence,
 * Living Nature environment synchronization, Soundscapes, and Mock CBT Tests.
 */

(function () {
  'use strict';

  // Application State
  var state = {
    data: null,
    currentRoute: 'dashboard',
    routeParam: null,
    filterPhase: 'all',
    practiceCategoryFilter: 'all',
    practiceSearchQuery: '',
    codingFilterTopic: 'all',
    codingFilterDifficulty: 'all',
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
    topNavLinks: document.getElementById('topNavLinks'),
    navDayText: document.getElementById('navDayText'),
    btnSoundToggle: document.getElementById('btnSoundToggle'),
    soundIcon: document.getElementById('soundIcon'),
    btnEnvToggle: document.getElementById('btnEnvToggle'),
    envNavText: document.getElementById('envNavText'),
    envNavIcon: document.getElementById('envNavIcon'),
    envFloatingWidget: document.getElementById('envFloatingWidget'),
    envFloatingPill: document.getElementById('envFloatingPill'),
    floatingPillText: document.getElementById('floatingPillText'),
    envControlPanel: document.getElementById('envControlPanel'),
    btnCloseEnvPanel: document.getElementById('btnCloseEnvPanel'),
    seasonPresetGrid: document.getElementById('seasonPresetGrid'),
    intensityBtnGroup: document.getElementById('intensityBtnGroup'),
    intensityText: document.getElementById('intensityText'),
    btnToggleAudioInside: document.getElementById('btnToggleAudioInside'),
    audioStatusText: document.getElementById('audioStatusText'),
    soundVolumeSlider: document.getElementById('soundVolumeSlider'),
    soundTypeSelect: document.getElementById('soundTypeSelect'),
    chkEnvAnimation: document.getElementById('chkEnvAnimation'),
    chkReducedMotion: document.getElementById('chkReducedMotion'),
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

    if (!elements.toastContainer) return;
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
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var pieces = [];
    var colors = ['#6c5ce7', '#00cec9', '#fd79a8', '#fdcb6e', '#00b894', '#e17055'];

    for (var i = 0; i < 90; i++) {
      pieces.push({
        x: Math.random() * canvas.width,
        y: -20 - Math.random() * 200,
        size: 5 + Math.random() * 8,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 4,
        vy: 2 + Math.random() * 5,
        rot: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 12
      });
    }

    var start = Date.now();
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      var now = Date.now();
      var elapsed = now - start;

      for (var p = 0; p < pieces.length; p++) {
        var piece = pieces[p];
        piece.x += piece.vx;
        piece.y += piece.vy;
        piece.rot += piece.rotSpeed;

        ctx.save();
        ctx.translate(piece.x, piece.y);
        ctx.rotate((piece.rot * Math.PI) / 180);
        ctx.fillStyle = piece.color;
        ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size * 0.6);
        ctx.restore();
      }

      if (elapsed < 3500) {
        requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }

    animate();
  }

  // ============================================================
  // Modal System
  // ============================================================

  function openModal(title, bodyHtml, footerHtml) {
    if (!elements.modal || !elements.modalOverlay) return;
    var html = '';
    html += '<div class="modal-header">';
    html += '  <h3 class="modal-title">' + title + '</h3>';
    html += '  <button class="modal-close-btn" id="modalCloseBtn" aria-label="Close modal">&times;</button>';
    html += '</div>';
    html += '<div class="modal-body">' + bodyHtml + '</div>';
    if (footerHtml) {
      html += '<div class="modal-footer">' + footerHtml + '</div>';
    }

    elements.modal.innerHTML = html;
    elements.modalOverlay.classList.add('active');
    elements.modalOverlay.setAttribute('aria-hidden', 'false');

    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons({ root: elements.modal });
    }
  }

  function closeModal() {
    if (!elements.modalOverlay) return;
    elements.modalOverlay.classList.remove('active');
    elements.modalOverlay.setAttribute('aria-hidden', 'true');
  }

  // ============================================================
  // Statistics and Calculations
  // ============================================================

  function computeStats() {
    var plan = window.STUDY_PLAN || [];
    var tasksObj = state.data.tasks || {};
    var totalTasks = 0;
    var completedTasks = 0;

    var categoryStats = {
      quant: { total: 0, done: 0, questionsTotal: 0, questionsDone: 0 },
      reasoning: { total: 0, done: 0, questionsTotal: 0, questionsDone: 0 },
      english: { total: 0, done: 0, questionsTotal: 0, questionsDone: 0 },
      coding: { total: 0, done: 0, problemsTotal: 0, problemsDone: 0 }
    };

    var weekProgress = [
      { week: 1, title: 'Week 1: Foundation', start: 1, end: 7, total: 0, done: 0 },
      { week: 2, title: 'Week 2: Advanced Quant', start: 8, end: 14, total: 0, done: 0 },
      { week: 3, title: 'Week 3: Reasoning & Verbal', start: 15, end: 21, total: 0, done: 0 },
      { week: 4, title: 'Week 4: Coding & Mock', start: 22, end: 30, total: 0, done: 0 }
    ];

    var dailyStatus = [];
    var completedDaysCount = 0;

    for (var i = 0; i < plan.length; i++) {
      var day = plan[i];
      var dTotal = 0;
      var dDone = 0;
      var dayTasks = day.tasks || [];

      for (var j = 0; j < dayTasks.length; j++) {
        var t = dayTasks[j];
        totalTasks++;
        dTotal++;

        var isDone = !!tasksObj[t.id];
        if (isDone) {
          completedTasks++;
          dDone++;
        }

        var cat = t.category || 'quant';
        if (categoryStats[cat]) {
          categoryStats[cat].total++;
          if (isDone) categoryStats[cat].done++;

          if (t.type === 'practice') {
            var targetCount = t.target || 20;
            if (cat === 'quant') {
              categoryStats.quant.questionsTotal += targetCount;
              if (isDone) categoryStats.quant.questionsDone += targetCount;
            } else if (cat === 'reasoning') {
              categoryStats.reasoning.questionsTotal += targetCount;
              if (isDone) categoryStats.reasoning.questionsDone += targetCount;
            } else if (cat === 'english') {
              categoryStats.english.questionsTotal += targetCount;
              if (isDone) categoryStats.english.questionsDone += targetCount;
            }
          } else if (t.type === 'coding' || cat === 'coding') {
            categoryStats.coding.problemsTotal += (t.target || 1);
            if (isDone) categoryStats.coding.problemsDone += (t.target || 1);
          }
        }

        // Week aggregation
        for (var w = 0; w < weekProgress.length; w++) {
          if (day.day >= weekProgress[w].start && day.day <= weekProgress[w].end) {
            weekProgress[w].total++;
            if (isDone) weekProgress[w].done++;
            break;
          }
        }
      }

      var isDayComplete = dTotal > 0 && dDone === dTotal;
      if (isDayComplete) completedDaysCount++;

      dailyStatus.push({
        day: day.day,
        title: day.title,
        total: dTotal,
        done: dDone,
        isCompleted: isDayComplete,
        isCurrent: day.day === state.data.currentDay,
        percentage: dTotal > 0 ? Math.round((dDone / dTotal) * 100) : 0
      });
    }

    // Include custom logged coding problems
    if (Array.isArray(state.data.codingProblems)) {
      var solvedProblems = state.data.codingProblems.filter(function (p) {
        return p.status === 'Solved';
      }).length;
      categoryStats.coding.problemsDone = Math.max(categoryStats.coding.problemsDone, solvedProblems);
      categoryStats.coding.problemsTotal = Math.max(categoryStats.coding.problemsTotal, state.data.codingProblems.length);
    }

    var overallPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    return {
      totalTasks: totalTasks,
      completedTasks: completedTasks,
      overallPercentage: overallPercentage,
      completedDaysCount: completedDaysCount,
      categoryStats: categoryStats,
      weekProgress: weekProgress,
      dailyStatus: dailyStatus
    };
  }

  function getUpcomingTask() {
    var plan = window.STUDY_PLAN || [];
    var tasksObj = state.data.tasks || {};
    var currentDay = state.data.currentDay || 1;

    // Check today first
    var todayData = plan.find(function (d) { return d.day === currentDay; });
    if (todayData && todayData.tasks) {
      for (var i = 0; i < todayData.tasks.length; i++) {
        var t = todayData.tasks[i];
        if (!tasksObj[t.id]) {
          return { day: todayData.day, dayTitle: todayData.title, task: t };
        }
      }
    }

    // Check subsequent days
    for (var d = 0; d < plan.length; d++) {
      var day = plan[d];
      if (day.day < currentDay) continue;
      if (!day.tasks) continue;
      for (var j = 0; j < day.tasks.length; j++) {
        var tk = day.tasks[j];
        if (!tasksObj[tk.id]) {
          return { day: day.day, dayTitle: day.title, task: tk };
        }
      }
    }

    return null;
  }

  // ============================================================
  // UI Updates: Sidebar & Top Navbar
  // ============================================================

  function updateSidebarXP() {
    if (!state.data) return;
    var xpInfo = window.Rewards.getLevel(state.data.xp);

    if (elements.sidebarLevelTitle) elements.sidebarLevelTitle.textContent = xpInfo.title;
    if (elements.sidebarLevelNum) elements.sidebarLevelNum.textContent = 'Lvl ' + xpInfo.level;
    if (elements.sidebarXPText) elements.sidebarXPText.textContent = xpInfo.currentXP + ' / ' + xpInfo.nextLevelXP + ' XP';
    if (elements.sidebarXPBar) elements.sidebarXPBar.style.width = xpInfo.percentage + '%';
    if (elements.navDayText) elements.navDayText.textContent = 'Day ' + (state.data.currentDay || 1) + ' / 30';

    // Update Living Nature nav pill and widget
    if (window.Environment) {
      var envStatus = window.Environment.getStatus();
      var seasonCapitalized = envStatus.effectiveSeason.charAt(0).toUpperCase() + envStatus.effectiveSeason.slice(1);
      if (elements.envNavText) elements.envNavText.textContent = seasonCapitalized;
      if (elements.floatingPillText) elements.floatingPillText.textContent = 'Living Nature: ' + seasonCapitalized;
      if (elements.envNavIcon) {
        var iconMap = {
          auto: 'clock',
          spring: 'flower-2',
          summer: 'sun',
          monsoon: 'cloud-rain',
          autumn: 'wind',
          winter: 'snowflake',
          mountain: 'mountain',
          jungle: 'leaf',
          night: 'moon'
        };
        var iconName = iconMap[envStatus.season] || iconMap[envStatus.effectiveSeason] || 'trees';
        elements.envNavIcon.setAttribute('data-lucide', iconName);
      }
      if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
      }
    }
  }

  function setActiveNavLinks(activeRoute) {
    // 1. Sidebar Nav
    if (elements.sidebarNav) {
      var sideItems = elements.sidebarNav.querySelectorAll('.nav-item');
      for (var i = 0; i < sideItems.length; i++) {
        var item = sideItems[i];
        var page = item.getAttribute('data-page');
        if (page === activeRoute || (page === 'roadmap' && activeRoute === 'day')) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      }
    }

    // 2. Top Nav Links
    if (elements.topNavLinks) {
      var topItems = elements.topNavLinks.querySelectorAll('.top-nav-item');
      for (var j = 0; j < topItems.length; j++) {
        var tItem = topItems[j];
        var tPage = tItem.getAttribute('data-page');
        if (tPage === activeRoute || (tPage === 'roadmap' && activeRoute === 'day')) {
          tItem.classList.add('active');
        } else {
          tItem.classList.remove('active');
        }
      }
    }
  }

  // ============================================================
  // View 1: Main Dashboard (#dashboard)
  // ============================================================

  function renderDashboard() {
    var stats = computeStats();
    var upcoming = getUpcomingTask();
    var currentDay = state.data.currentDay || 1;
    var daysRemaining = Math.max(0, 30 - currentDay);
    var plan = window.STUDY_PLAN || [];
    var todayPlan = plan.find(function (d) { return d.day === currentDay; }) || plan[0];

    var html = '';
    html += '<div class="dashboard-page page-enter">';

    // 1. Hero Section with Living Nature Greeting
    html += '  <div class="card mb-lg dashboard-hero-card">';
    html += '    <div class="hero-content-row flex-between">';
    html += '      <div class="hero-left-info">';
    html += '        <div class="hero-day-pill mb-xs">';
    html += '          <span class="badge badge-accent"><i data-lucide="sparkles" class="icon-inline"></i> Challenge Day ' + currentDay + ' of 30</span>';
    html += '          <span class="text-xs text-muted ml-sm">' + daysRemaining + ' Days Remaining</span>';
    html += '        </div>';
    html += '        <h1 class="hero-title">Your 30-Day Journey Starts Here</h1>';
    html += '        <p class="hero-subtitle text-muted mt-xs">Curated topic-wise video lectures, direct IndiaBIX questions, and verified GFG coding challenges.</p>';
    html += '        <div class="hero-actions-row mt-md">';
    html += '          <a href="#today" class="btn btn-primary"><i data-lucide="play-circle"></i> Continue Day ' + currentDay + '</a>';
    html += '          <a href="#mock" class="btn btn-secondary"><i data-lucide="timer"></i> Practice Mock Test</a>';
    html += '        </div>';
    html += '      </div>';

    // Circular Animated Progress Ring
    var radius = 54;
    var circumference = 2 * Math.PI * radius;
    var strokeDashoffset = circumference - (stats.overallPercentage / 100) * circumference;

    html += '      <div class="hero-progress-ring-wrap text-center">';
    html += '        <div class="circular-progress-svg-box">';
    html += '          <svg class="circular-svg" width="140" height="140" viewBox="0 0 140 140">';
    html += '            <circle class="circle-bg" cx="70" cy="70" r="' + radius + '"></circle>';
    html += '            <circle class="circle-progress" cx="70" cy="70" r="' + radius + '" style="stroke-dasharray: ' + circumference + '; stroke-dashoffset: ' + strokeDashoffset + ';"></circle>';
    html += '          </svg>';
    html += '          <div class="circle-inner-text">';
    html += '            <span class="circle-pct">' + stats.overallPercentage + '%</span>';
    html += '            <span class="circle-lbl">Completed</span>';
    html += '          </div>';
    html += '        </div>';
    html += '        <div class="text-xs text-muted mt-xs">' + stats.completedTasks + ' / ' + stats.totalTasks + ' Tasks Done</div>';
    html += '      </div>';

    html += '    </div>';
    html += '  </div>';

    // 2. Metrics & Progress Grid
    html += '  <div class="stats-grid mb-lg">';

    // Card 1: Completed Days
    html += '    <div class="stat-card">';
    html += '      <div class="stat-icon-wrap quant"><i data-lucide="calendar"></i></div>';
    html += '      <div class="stat-content">';
    html += '        <span class="stat-label">Days Finished</span>';
    html += '        <span class="stat-value">' + stats.completedDaysCount + ' <span class="stat-total">/ 30</span></span>';
    html += '      </div>';
    html += '    </div>';

    // Card 2: Current Streak
    var streakVal = (state.data.streak && state.data.streak.current) || 0;
    html += '    <div class="stat-card">';
    html += '      <div class="stat-icon-wrap streak"><i data-lucide="flame"></i></div>';
    html += '      <div class="stat-content">';
    html += '        <span class="stat-label">Daily Streak</span>';
    html += '        <span class="stat-value">' + streakVal + ' <span class="stat-total">days</span></span>';
    html += '      </div>';
    html += '    </div>';

    // Card 3: Study Hours
    var hoursVal = state.data.studyHours || 0;
    html += '    <div class="stat-card">';
    html += '      <div class="stat-icon-wrap reasoning"><i data-lucide="clock"></i></div>';
    html += '      <div class="stat-content">';
    html += '        <span class="stat-label">Total Study Time</span>';
    html += '        <span class="stat-value">' + hoursVal + ' <span class="stat-total">hours</span></span>';
    html += '      </div>';
    html += '    </div>';

    // Card 4: Coding Problems Solved
    html += '    <div class="stat-card">';
    html += '      <div class="stat-icon-wrap coding"><i data-lucide="code"></i></div>';
    html += '      <div class="stat-content">';
    html += '        <span class="stat-label">Coding Solved</span>';
    html += '        <span class="stat-value">' + stats.categoryStats.coding.problemsDone + ' <span class="stat-total">probs</span></span>';
    html += '      </div>';
    html += '    </div>';

    html += '  </div>';

    // 3. Subject-Wise Progress Breakdown
    html += '  <div class="card mb-lg">';
    html += '    <div class="card-header">';
    html += '      <h2 class="card-title"><i data-lucide="pie-chart"></i> Subject Progress Breakdown</h2>';
    html += '    </div>';
    html += '    <div class="subject-progress-grid">';

    var cats = [
      { id: 'quant', label: 'Quantitative Aptitude', done: stats.categoryStats.quant.done, total: stats.categoryStats.quant.total, color: '#6c5ce7' },
      { id: 'reasoning', label: 'Reasoning Ability', done: stats.categoryStats.reasoning.done, total: stats.categoryStats.reasoning.total, color: '#00cec9' },
      { id: 'english', label: 'Verbal Ability', done: stats.categoryStats.english.done, total: stats.categoryStats.english.total, color: '#fd79a8' },
      { id: 'coding', label: 'Hands-on Coding', done: stats.categoryStats.coding.problemsDone, total: Math.max(stats.categoryStats.coding.problemsTotal, 30), color: '#fdcb6e' }
    ];

    for (var c = 0; c < cats.length; c++) {
      var catItem = cats[c];
      var catPct = catItem.total > 0 ? Math.round((catItem.done / catItem.total) * 100) : 0;
      html += '      <div class="subject-progress-item">';
      html += '        <div class="flex-between mb-xs text-xs">';
      html += '          <span class="fw-600">' + catItem.label + '</span>';
      html += '          <span class="text-muted">' + catItem.done + ' / ' + catItem.total + ' (' + catPct + '%)</span>';
      html += '        </div>';
      html += '        <div class="progress-bar mini-bar">';
      html += '          <div class="progress-fill" style="width: ' + catPct + '%; background-color: ' + catItem.color + ';"></div>';
      html += '        </div>';
      html += '      </div>';
    }

    html += '    </div>';
    html += '  </div>';

    // 4. Today's Plan Summary Card
    html += '  <div class="card mb-lg">';
    html += '    <div class="card-header flex-between">';
    html += '      <h2 class="card-title"><i data-lucide="calendar-check"></i> Today\'s Focus: Day ' + currentDay + '</h2>';
    html += '      <a href="#today" class="btn btn-sm btn-secondary">Open Full Day Plan <i data-lucide="arrow-right"></i></a>';
    html += '    </div>';
    html += '    <div class="today-summary-box">';
    html += '      <div class="today-topic-title fw-600">' + escapeHtml(todayPlan.title) + '</div>';
    if (todayPlan.learningObjectives) {
      html += '      <div class="today-obj-text text-xs text-muted mt-xs"><i data-lucide="target" class="icon-inline"></i> ' + escapeHtml(todayPlan.learningObjectives) + '</div>';
    }

    var todayTasks = todayPlan.tasks || [];
    var tasksObj = state.data.tasks || {};
    html += '      <div class="today-tasks-preview-list mt-md">';
    for (var t = 0; t < Math.min(todayTasks.length, 5); t++) {
      var tk = todayTasks[t];
      var isDone = !!tasksObj[tk.id];
      html += '        <div class="mini-task-row flex-between text-xs py-xs ' + (isDone ? 'text-muted strike' : '') + '">';
      html += '          <span><i data-lucide="' + (isDone ? 'check-circle' : 'circle') + '" class="icon-inline ' + (isDone ? 'text-success' : '') + '"></i> ' + escapeHtml(tk.title) + '</span>';
      html += '          <span class="badge badge-' + tk.category + '">' + tk.category + '</span>';
      html += '        </div>';
    }
    if (todayTasks.length > 5) {
      html += '        <div class="text-xs text-muted mt-xs">+ ' + (todayTasks.length - 5) + ' more practice tasks for today...</div>';
    }
    html += '      </div>';

    html += '    </div>';
    html += '  </div>';

    // 5. 30-Day Milestone Overview Dots Grid
    html += '  <div class="card mb-lg">';
    html += '    <div class="card-header flex-between">';
    html += '      <h2 class="card-title"><i data-lucide="grid"></i> 30-Day Journey Overview</h2>';
    html += '      <span class="text-xs text-muted">Click any day to study</span>';
    html += '    </div>';
    html += '    <div class="daily-status-grid">';
    for (var d = 0; d < stats.dailyStatus.length; d++) {
      var dItem = stats.dailyStatus[d];
      var dotClass = 'day-dot-pending';
      if (dItem.isCompleted) dotClass = 'day-dot-complete';
      else if (dItem.done > 0) dotClass = 'day-dot-partial';
      if (dItem.isCurrent) dotClass += ' day-dot-current';

      html += '      <a href="#day/' + dItem.day + '" class="day-status-dot ' + dotClass + '" title="Day ' + dItem.day + ': ' + escapeHtml(dItem.title) + ' (' + dItem.done + '/' + dItem.total + ' tasks)">';
      html += '        <span class="dot-num">D' + dItem.day + '</span>';
      html += '        <span class="dot-pct">' + dItem.percentage + '%</span>';
      html += '      </a>';
    }
    html += '    </div>';
    html += '  </div>';

    html += '</div>';

    elements.mainContent.innerHTML = html;
  }

  // ============================================================
  // View 2: 30-Day Journey Roadmap (#roadmap)
  // ============================================================

  function renderRoadmap() {
    var plan = window.STUDY_PLAN || [];
    var tasksObj = state.data.tasks || {};

    var weeks = [
      { id: 'w1', week: 1, label: 'Week 1: Foundation & Numbers (Days 1–7)', start: 1, end: 7, phase: 'foundation' },
      { id: 'w2', week: 2, label: 'Week 2: Advanced Quantitative Aptitude (Days 8–14)', start: 8, end: 14, phase: 'intermediate' },
      { id: 'w3', week: 3, label: 'Week 3: Reasoning & Verbal Mastery (Days 15–21)', start: 15, end: 21, phase: 'advanced' },
      { id: 'w4', week: 4, label: 'Week 4: Coding, Mock Tests & Final Revision (Days 22–30)', start: 22, end: 30, phase: 'final' }
    ];

    var html = '';
    html += '<div class="roadmap-page page-enter">';

    html += '  <div class="page-header flex-between mb-lg">';
    html += '    <div>';
    html += '      <h1 class="page-title"><i data-lucide="map" class="title-icon"></i> 30-Day TCS Journey Roadmap</h1>';
    html += '      <p class="page-subtitle">Grouped into 4 focused study phases. Each milestone includes verified video lectures, IndiaBIX practice, and coding challenges.</p>';
    html += '    </div>';
    html += '    <div class="header-actions">';
    html += '      <a href="#today" class="btn btn-primary"><i data-lucide="calendar"></i> Jump to Day ' + state.data.currentDay + '</a>';
    html += '    </div>';
    html += '  </div>';

    // Phase Filter Buttons
    html += '  <div class="phase-filters mb-lg">';
    var allFilterActive = state.filterPhase === 'all' ? 'active' : '';
    html += '    <button class="btn btn-sm btn-filter ' + allFilterActive + '" data-phase="all">All 30 Days</button>';
    for (var w = 0; w < weeks.length; w++) {
      var wk = weeks[w];
      var isActive = state.filterPhase === wk.phase ? 'active' : '';
      html += '    <button class="btn btn-sm btn-filter ' + isActive + '" data-phase="' + wk.phase + '">Week ' + wk.week + '</button>';
    }
    html += '  </div>';

    // Journey Weeks Grid
    for (var wkIdx = 0; wkIdx < weeks.length; wkIdx++) {
      var weekDef = weeks[wkIdx];
      if (state.filterPhase !== 'all' && state.filterPhase !== weekDef.phase) {
        continue;
      }

      html += '  <div class="journey-week-container">';
      html += '    <div class="journey-week-header flex-between">';
      html += '      <div class="journey-week-title"><i data-lucide="milestone"></i> ' + weekDef.label + '</div>';
      html += '      <span class="badge phase-tag-' + weekDef.phase + '">' + weekDef.phase.toUpperCase() + '</span>';
      html += '    </div>';

      html += '    <div class="roadmap-grid mb-lg">';

      for (var d = 0; d < plan.length; d++) {
        var day = plan[d];
        if (day.day < weekDef.start || day.day > weekDef.end) continue;

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

        html += '      <div class="' + cardClasses.join(' ') + '" data-day="' + day.day + '">';
        html += '        <div class="day-card-header">';
        html += '          <div class="day-badge-wrap">';
        html += '            <span class="day-number-tag">Day ' + day.day + '</span>';
        html += '            <span class="phase-badge phase-tag-' + day.phase + '">' + day.phaseLabel + '</span>';
        html += '          </div>';

        if (isComplete) {
          html += '          <span class="day-status-pill completed-pill"><i data-lucide="check"></i> Done</span>';
        } else if (isCurrent) {
          html += '          <span class="day-status-pill current-pill"><i data-lucide="clock"></i> Active</span>';
        } else {
          html += '          <span class="day-status-pill pending-pill">' + pct + '%</span>';
        }
        html += '        </div>';

        html += '        <h3 class="day-card-title">' + escapeHtml(day.title) + '</h3>';

        if (day.learningObjectives) {
          html += '        <p class="day-card-desc text-xs text-muted mt-xs line-clamp-2">' + escapeHtml(day.learningObjectives) + '</p>';
        }

        // Progress bar
        html += '        <div class="day-card-progress mt-sm">';
        html += '          <div class="progress-bar mini-bar">';
        html += '            <div class="progress-fill" style="width: ' + pct + '%;"></div>';
        html += '          </div>';
        html += '          <div class="day-progress-meta mt-xs text-xs text-muted flex-between">';
        html += '            <span>' + dDone + ' / ' + dTotal + ' tasks</span>';
        html += '            <span>' + pct + '%</span>';
        html += '          </div>';
        html += '        </div>';

        // Categories preview
        html += '        <div class="day-card-categories mt-sm">';
        var seenCats = {};
        for (var tc = 0; tc < dayTasks.length; tc++) {
          var cName = dayTasks[tc].category;
          if (!seenCats[cName]) {
            seenCats[cName] = true;
            html += '          <span class="task-category ' + cName + '">' + cName + '</span>';
          }
        }
        html += '        </div>';

        html += '      </div>';
      }

      html += '    </div>';
      html += '  </div>';
    }

    html += '</div>';
    elements.mainContent.innerHTML = html;
  }

  // ============================================================
  // View 3: Today's Tasks (#today)
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
    var isRevisionDone = !!(state.data.revisions && state.data.revisions[dayNumber]);

    var html = '';
    html += '<div class="day-detail-page page-enter">';

    // Header
    html += '  <div class="day-detail-header mb-lg flex-between">';
    html += '    <div>';
    html += '      <div class="day-meta-row mb-xs">';
    html += '        <a href="#roadmap" class="back-link"><i data-lucide="arrow-left"></i> 30-Day Journey</a>';
    html += '        <span class="meta-sep">•</span>';
    html += '        <span class="phase-badge phase-tag-' + day.phase + '">' + day.phaseLabel + '</span>';
    if (dayNumber === state.data.currentDay) {
      html += '        <span class="badge badge-accent">Today\'s Focus</span>';
    }
    html += '      </div>';
    html += '      <h1 class="page-title">Day ' + day.day + ': ' + escapeHtml(day.title) + '</h1>';
    html += '    </div>';

    // Actions
    html += '    <div class="day-detail-actions flex gap-sm">';
    if (dayNumber > 1) {
      html += '      <a href="#day/' + (dayNumber - 1) + '" class="btn btn-secondary btn-sm" title="Previous Day"><i data-lucide="chevron-left"></i> Day ' + (dayNumber - 1) + '</a>';
    }
    if (dayNumber < 30) {
      html += '      <a href="#day/' + (dayNumber + 1) + '" class="btn btn-secondary btn-sm" title="Next Day">Day ' + (dayNumber + 1) + ' <i data-lucide="chevron-right"></i></a>';
    }
    if (dayNumber !== state.data.currentDay) {
      html += '      <button class="btn btn-sm btn-secondary" id="btnSetCurrentDay" data-day="' + dayNumber + '"><i data-lucide="bookmark"></i> Set Active</button>';
    }
    html += '    </div>';
    html += '  </div>';

    // Motivational Quote
    if (isTodayView) {
      html += '  <div class="quote-card mb-lg">';
      html += '    <i data-lucide="quote" class="quote-icon"></i>';
      html += '    <div class="quote-text-wrap">';
      html += '      <p class="quote-text">"' + getRandomQuote() + '"</p>';
      html += '      <span class="quote-sub">Stay consistent. Every problem solved brings you closer to your TCS dream offer.</span>';
      html += '    </div>';
      html += '  </div>';
    }

    // Learning Objectives Banner
    if (day.learningObjectives) {
      html += '  <div class="card mb-lg">';
      html += '    <div class="flex gap-md items-center">';
      html += '      <div class="stat-icon-wrap reasoning"><i data-lucide="target"></i></div>';
      html += '      <div>';
      html += '        <div class="fw-600 text-sm">Key Learning Focus for Day ' + dayNumber + '</div>';
      html += '        <div class="text-xs text-muted mt-xs">' + escapeHtml(day.learningObjectives) + '</div>';
      html += '      </div>';
      html += '    </div>';
      html += '  </div>';
    }

    // Progress Bar Card
    html += '  <div class="card mb-lg">';
    html += '    <div class="day-progress-row flex-between">';
    html += '      <div class="progress-left-info">';
    html += '        <span class="progress-title-text fw-600">' + dDone + ' of ' + dTotal + ' Tasks Completed</span>';
    html += '        <span class="progress-pct-badge ' + (isComplete ? 'text-success' : '') + ' ml-sm">' + pct + '% Complete</span>';
    html += '      </div>';
    html += '      <div class="progress-right-actions flex gap-sm">';
    if (isComplete) {
      html += '        <span class="status-badge-complete text-success"><i data-lucide="check-circle-2"></i> Day Completed!</span>';
    } else {
      html += '        <button class="btn btn-sm btn-primary" id="btnMarkDayComplete" data-day="' + dayNumber + '" ' + (allMandatoryDone ? '' : 'disabled') + '>';
      html += '          <i data-lucide="check"></i> Mark Day Complete (+50 XP)';
      html += '        </button>';
    }
    html += '        <button class="btn btn-sm btn-danger btn-icon" id="btnResetDay" data-day="' + dayNumber + '" title="Reset progress">';
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
    html += '      <h2 class="card-title"><i data-lucide="list-checks"></i> Day ' + dayNumber + ' Tasks (' + dTotal + ')</h2>';
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
      if (isChecked) html += '          <i data-lucide="check"></i>';
      html += '        </div>';

      // Task Info
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
        html += '          <div class="task-description text-xs text-muted mt-xs">' + escapeHtml(task.description) + '</div>';
      }
      html += '        </div>';

      // Action Link
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

        html += '          <a href="' + escapeHtml(task.link) + '" target="_blank" rel="noopener noreferrer" class="task-link">';
        html += '            <i data-lucide="' + linkIcon + '"></i> ' + linkLabel;
        html += '          </a>';
      }
      html += '        </div>';

      html += '      </div>';
    }

    html += '    </div>';
    html += '  </div>';

    // Revision Tracking Card
    html += '  <div class="card mb-lg">';
    html += '    <div class="card-header flex-between">';
    html += '      <h2 class="card-title"><i data-lucide="rotate-ccw"></i> Daily Revision & Error Notebook</h2>';
    html += '      <label class="toggle-control-label">';
    html += '        <input type="checkbox" id="chkDayRevision" data-day="' + dayNumber + '" ' + (isRevisionDone ? 'checked' : '') + '>';
    html += '        <span class="fw-600 ' + (isRevisionDone ? 'text-success' : '') + '">Mark Day ' + dayNumber + ' Revised</span>';
    html += '      </label>';
    html += '    </div>';
    html += '    <div class="card-body">';
    html += '      <p class="text-xs text-muted mb-sm">Record tricky question shortcuts, formulas, or syntax errors. Auto-saves to LocalStorage.</p>';
    html += '      <textarea class="textarea" id="dayNotesTextarea" data-day="' + dayNumber + '" placeholder="e.g. Divisibility rule for 7, speed conversions (multiply by 5/18), two-pointer edge cases..." rows="4">' + escapeHtml(savedNotes) + '</textarea>';
    html += '      <div class="notes-footer mt-xs text-xs text-muted" id="notesStatusText">Auto-saved to LocalStorage</div>';
    html += '    </div>';
    html += '  </div>';

    html += '</div>';
    elements.mainContent.innerHTML = html;
  }

  // ============================================================
  // View 5: Practice Hub (#practice)
  // ============================================================

  function renderPracticeHub() {
    var catalog = window.PRACTICE_CATALOG || [];
    var html = '';
    html += '<div class="practice-hub-page page-enter">';

    html += '  <div class="page-header flex-between mb-lg">';
    html += '    <div>';
    html += '      <h1 class="page-title"><i data-lucide="book-open" class="title-icon"></i> Practice Hub</h1>';
    html += '      <p class="page-subtitle">Categorized IndiaBIX exercise sets for Quantitative Aptitude, Reasoning, and Verbal Ability.</p>';
    html += '    </div>';
    html += '  </div>';

    // Category Filter Pills
    html += '  <div class="phase-filters mb-lg">';
    var cats = [
      { id: 'all', label: 'All Topics' },
      { id: 'quant', label: 'Numerical Ability' },
      { id: 'reasoning', label: 'Reasoning Ability' },
      { id: 'english', label: 'Verbal Ability' }
    ];
    for (var c = 0; c < cats.length; c++) {
      var activeClass = state.practiceCategoryFilter === cats[c].id ? 'active' : '';
      html += '    <button class="btn btn-sm btn-filter ' + activeClass + '" data-practice-cat="' + cats[c].id + '">' + cats[c].label + '</button>';
    }
    html += '  </div>';

    // Topic Cards Grid
    html += '  <div class="practice-catalog-grid">';
    for (var i = 0; i < catalog.length; i++) {
      var catGroup = catalog[i];
      if (state.practiceCategoryFilter !== 'all' && state.practiceCategoryFilter !== catGroup.category) {
        continue;
      }

      for (var t = 0; t < catGroup.topics.length; t++) {
        var top = catGroup.topics[t];
        html += '    <div class="card practice-topic-card">';
        html += '      <div>';
        html += '        <div class="flex-between mb-xs">';
        html += '          <span class="badge badge-' + catGroup.category + '">' + catGroup.categoryLabel + '</span>';
        html += '          <span class="difficulty-badge ' + top.difficulty.toLowerCase() + '">' + top.difficulty + '</span>';
        html += '        </div>';
        html += '        <h3 class="practice-topic-name mt-xs">' + escapeHtml(top.name) + '</h3>';
        html += '        <div class="text-xs text-muted mt-xs">';
        html += '          <span><i data-lucide="help-circle" class="icon-inline"></i> ' + top.questionsCount + ' Questions</span> • ';
        html += '          <span><i data-lucide="clock" class="icon-inline"></i> ' + top.timeEst + '</span>';
        html += '        </div>';
        html += '      </div>';
        html += '      <a href="' + escapeHtml(top.link) + '" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-block btn-sm mt-md">';
        html += '        <i data-lucide="external-link"></i> Practice on IndiaBIX';
        html += '      </a>';
        html += '    </div>';
      }
    }
    html += '  </div>';

    html += '</div>';
    elements.mainContent.innerHTML = html;
  }

  // ============================================================
  // View 6: Coding Lab (#coding)
  // ============================================================

  function renderCodingTracker() {
    var html = window.Tracker.renderTracker(state.data);
    elements.mainContent.innerHTML = html;
  }

  // ============================================================
  // View 7: Mock Tests (#mock)
  // ============================================================

  function renderMockTests() {
    if (window.MockTest && typeof window.MockTest.render === 'function') {
      window.MockTest.render();
    }
  }

  // ============================================================
  // View 8: Progress & Analytics (#progress)
  // ============================================================

  function renderProgress() {
    var stats = computeStats();
    var streak = (state.data.streak && state.data.streak.current) || 0;
    var bestStreak = (state.data.streak && state.data.streak.best) || 0;
    var studyHours = state.data.studyHours || 0;

    var html = '';
    html += '<div class="progress-analytics-page page-enter">';

    html += '  <div class="page-header mb-lg">';
    html += '    <h1 class="page-title"><i data-lucide="bar-chart-2" class="title-icon"></i> Performance Analytics</h1>';
    html += '    <p class="page-subtitle">Track study activity, accuracy trends, and subject-wise completion trajectory.</p>';
    html += '  </div>';

    // Stats Hero Grid
    html += '  <div class="stats-grid mb-lg">';
    html += '    <div class="stat-card">';
    html += '      <div class="stat-icon-wrap quant"><i data-lucide="check-circle"></i></div>';
    html += '      <div class="stat-content">';
    html += '        <span class="stat-label">Overall Completion</span>';
    html += '        <span class="stat-value">' + stats.overallPercentage + '%</span>';
    html += '      </div>';
    html += '    </div>';

    html += '    <div class="stat-card">';
    html += '      <div class="stat-icon-wrap streak"><i data-lucide="flame"></i></div>';
    html += '      <div class="stat-content">';
    html += '        <span class="stat-label">Streak (Current / Best)</span>';
    html += '        <span class="stat-value">' + streak + ' <span class="stat-total">/ ' + bestStreak + ' d</span></span>';
    html += '      </div>';
    html += '    </div>';

    html += '    <div class="stat-card">';
    html += '      <div class="stat-icon-wrap reasoning"><i data-lucide="clock"></i></div>';
    html += '      <div class="stat-content">';
    html += '        <span class="stat-label">Total Hours</span>';
    html += '        <span class="stat-value">' + studyHours + ' <span class="stat-total">hrs</span></span>';
    html += '      </div>';
    html += '    </div>';

    html += '    <div class="stat-card">';
    html += '      <div class="stat-icon-wrap coding"><i data-lucide="award"></i></div>';
    html += '      <div class="stat-content">';
    html += '        <span class="stat-label">Total XP</span>';
    html += '        <span class="stat-value">' + state.data.xp + ' <span class="stat-total">XP</span></span>';
    html += '      </div>';
    html += '    </div>';
    html += '  </div>';

    // Responsive 4-Week Milestone Completion Grid
    html += '  <div class="card mb-lg">';
    html += '    <div class="card-header flex-between">';
    html += '      <h2 class="card-title"><i data-lucide="activity"></i> 4-Week Milestone Completion</h2>';
    html += '      <span class="text-xs text-muted">Weekly task targets and syllabus coverage</span>';
    html += '    </div>';
    html += '    <div class="milestone-bars-grid">';

    var weekNames = ['Foundation', 'Concept Core', 'Advanced', 'Mock Mastery'];
    for (var w = 0; w < stats.weekProgress.length; w++) {
      var weekItem = stats.weekProgress[w];
      var wPct = weekItem.total > 0 ? Math.round((weekItem.done / weekItem.total) * 100) : 0;
      var wFill = Math.max(6, wPct);
      html += '      <div class="milestone-col">';
      html += '        <div class="milestone-track">';
      html += '          <div class="milestone-fill" style="height: ' + wFill + '%;"></div>';
      html += '        </div>';
      html += '        <div class="milestone-pct">' + wPct + '%</div>';
      html += '        <div class="milestone-title">Week ' + (w + 1) + '</div>';
      html += '        <div class="milestone-desc text-xs text-muted">' + (weekNames[w] || 'Phase') + ' (' + weekItem.done + '/' + weekItem.total + ')</div>';
      html += '      </div>';
    }

    html += '    </div>';
    html += '  </div>';

    // Weak Topics and Revision Checklist
    var notesObj = state.data.notes || {};
    var noteDays = Object.keys(notesObj).filter(function (k) { return notesObj[k] && notesObj[k].trim().length > 0; });

    html += '  <div class="card mb-lg">';
    html += '    <div class="card-header">';
    html += '      <h2 class="card-title"><i data-lucide="edit-3"></i> Days with Personal Formula / Error Notes (' + noteDays.length + ')</h2>';
    html += '    </div>';
    if (noteDays.length === 0) {
      html += '    <p class="text-xs text-muted">No notes written yet. Open any day study page to record tricky questions or formulas!</p>';
    } else {
      html += '    <div class="notes-summary-list">';
      for (var n = 0; n < noteDays.length; n++) {
        var dayK = noteDays[n];
        html += '      <div class="mini-note-item p-sm mb-xs card">';
        html += '        <div class="flex-between text-xs mb-xs"><strong>Day ' + dayK + ' Notes:</strong><a href="#day/' + dayK + '" class="text-accent">Open Day</a></div>';
        html += '        <div class="text-xs text-muted truncate">' + escapeHtml(notesObj[dayK]) + '</div>';
        html += '      </div>';
      }
      html += '    </div>';
    }
    html += '  </div>';

    html += '</div>';
    elements.mainContent.innerHTML = html;
  }

  // ============================================================
  // View 9: Achievements (#achievements)
  // ============================================================

  function renderAchievements() {
    var achievements = (typeof window.ACHIEVEMENTS !== 'undefined') ? window.ACHIEVEMENTS : [];
    var earned = state.data.earnedAchievements || [];

    var html = '';
    html += '<div class="achievements-page page-enter">';
    html += '  <div class="page-header mb-lg">';
    html += '    <h1 class="page-title"><i data-lucide="trophy" class="title-icon"></i> Trophies & Milestones</h1>';
    html += '    <p class="page-subtitle">Earn XP and unlock badges by staying consistent on your 30-day journey.</p>';
    html += '  </div>';

    html += '  <div class="achievements-grid">';
    for (var i = 0; i < achievements.length; i++) {
      var ach = achievements[i];
      var isEarned = earned.indexOf(ach.id) !== -1;
      var cardClass = 'achievement-card ' + (isEarned ? 'earned' : 'locked');

      html += '    <div class="' + cardClass + '">';
      html += '      <div class="ach-icon-wrap">';
      html += '        <i data-lucide="' + ach.icon + '"></i>';
      html += '      </div>';
      html += '      <div class="ach-info">';
      html += '        <div class="ach-title-row">';
      html += '          <span class="ach-title">' + escapeHtml(ach.title) + '</span>';
      html += '          <span class="ach-xp-tag">+' + ach.xp + ' XP</span>';
      html += '        </div>';
      html += '        <p class="ach-desc">' + escapeHtml(ach.description) + '</p>';
      html += '        <div class="ach-status-badge mt-xs">';
      if (isEarned) {
        html += '          <span class="text-success text-xs"><i data-lucide="check-circle-2" class="icon-inline"></i> Unlocked</span>';
      } else {
        html += '          <span class="text-muted text-xs"><i data-lucide="lock" class="icon-inline"></i> Locked</span>';
      }
      html += '        </div>';
      html += '      </div>';
      html += '    </div>';
    }
    html += '  </div>';

    html += '</div>';
    elements.mainContent.innerHTML = html;
  }

  // ============================================================
  // View 10: Settings (#settings)
  // ============================================================

  function renderSettings() {
    var env = state.data.environment || {};
    var soundConfig = (window.Soundscape && window.Soundscape.getConfig) ? window.Soundscape.getConfig() : { enabled: false, volume: 0.35, soundType: 'auto' };
    var isSoundOn = !!soundConfig.enabled;
    var currentVol = Math.round((soundConfig.volume !== undefined ? soundConfig.volume : 0.35) * 100);
    var curIntensity = env.intensity || 'medium';

    var html = '';
    html += '<div class="settings-page page-enter">';

    html += '  <div class="page-header mb-lg">';
    html += '    <h1 class="page-title"><i data-lucide="settings" class="title-icon"></i> Application Preferences</h1>';
    html += '    <p class="page-subtitle">Customize theme appearance, Living Nature environment, ambient soundscapes, and study progress data.</p>';
    html += '  </div>';

    // Top Row: 2-Column Grid (Theme + Soundscape)
    html += '  <div class="settings-top-grid mb-lg">';

    // Card 1: Appearance Theme
    html += '    <div class="card settings-card">';
    html += '      <div class="card-header">';
    html += '        <h2 class="card-title"><i data-lucide="palette"></i> Appearance Theme</h2>';
    html += '      </div>';
    html += '      <p class="text-xs text-muted mb-md">Select between deep luminous dark mode or vibrant sunny daylight mode.</p>';
    html += '      <div class="theme-switch-group">';
    html += '        <button class="theme-opt-btn ' + (state.data.theme === 'dark' ? 'active' : '') + '" id="btnThemeDark">';
    html += '          <i data-lucide="moon"></i>';
    html += '          <span class="theme-opt-title">Dark Theme</span>';
    html += '          <span class="theme-opt-sub">Deep nature night sky (Default)</span>';
    html += '        </button>';
    html += '        <button class="theme-opt-btn ' + (state.data.theme === 'light' ? 'active' : '') + '" id="btnThemeLight">';
    html += '          <i data-lucide="sun"></i>';
    html += '          <span class="theme-opt-title">Light Theme</span>';
    html += '          <span class="theme-opt-sub">Crisp daylight atmosphere</span>';
    html += '        </button>';
    html += '      </div>';
    html += '    </div>';

    // Card 2: Ambient Soundscape
    html += '    <div class="card settings-card">';
    html += '      <div class="card-header flex-between">';
    html += '        <h2 class="card-title"><i data-lucide="headphones"></i> Ambient Soundscape</h2>';
    html += '        <button class="btn btn-sm ' + (isSoundOn ? 'btn-primary' : 'btn-secondary') + '" id="btnSoundSettingsToggle">';
    html += '          <i data-lucide="' + (isSoundOn ? 'volume-2' : 'volume-x') + '"></i>';
    html += '          <span>' + (isSoundOn ? 'Playing' : 'Muted') + '</span>';
    html += '        </button>';
    html += '      </div>';
    html += '      <p class="text-xs text-muted mb-md">Procedural Web Audio API soundscape (rain, forest breeze, stream, birds, crickets).</p>';
    html += '      <div class="sound-controls-box">';
    html += '        <div class="flex-between text-xs mb-xs">';
    html += '          <span class="text-muted">Master Volume</span>';
    html += '          <span class="fw-600" id="soundVolPctText">' + currentVol + '%</span>';
    html += '        </div>';
    html += '        <div class="flex-between gap-sm mb-md">';
    html += '          <i data-lucide="volume-1" class="text-muted text-xs"></i>';
    html += '          <input type="range" min="0" max="100" value="' + currentVol + '" class="slider" id="settingsVolumeSlider" style="flex:1;">';
    html += '          <i data-lucide="volume-2" class="text-muted text-xs"></i>';
    html += '        </div>';
    html += '        <div class="sound-select-row">';
    html += '          <label class="text-xs text-muted mb-xs block">Audio Track</label>';
    html += '          <select class="input select-sm" id="settingsSoundTypeSelect">';
    html += '            <option value="auto"' + (soundConfig.soundType === 'auto' ? ' selected' : '') + '>Auto (Matches Active Season)</option>';
    html += '            <option value="rain"' + (soundConfig.soundType === 'rain' ? ' selected' : '') + '>Gentle Rain & Droplets</option>';
    html += '            <option value="breeze"' + (soundConfig.soundType === 'breeze' ? ' selected' : '') + '>Forest Breeze</option>';
    html += '            <option value="stream"' + (soundConfig.soundType === 'stream' ? ' selected' : '') + '>Babbling Mountain Stream</option>';
    html += '            <option value="birds"' + (soundConfig.soundType === 'birds' ? ' selected' : '') + '>Morning Forest Birds</option>';
    html += '            <option value="crickets"' + (soundConfig.soundType === 'crickets' ? ' selected' : '') + '>Night Sky Crickets</option>';
    html += '          </select>';
    html += '        </div>';
    html += '      </div>';
    html += '    </div>';

    html += '  </div>'; // End settings top grid

    // Living Nature Environment Card
    html += '  <div class="card mb-lg">';
    html += '    <div class="card-header flex-between">';
    html += '      <div>';
    html += '        <h2 class="card-title"><i data-lucide="trees"></i> Living Nature Environment</h2>';
    html += '        <p class="text-xs text-muted mt-xs">Select your season backdrop or let Auto transition with sunrise and sunset.</p>';
    html += '      </div>';
    html += '      <div class="intensity-btn-group" id="settingsIntensityGroup">';
    html += '        <button class="btn btn-xs intensity-btn ' + (curIntensity === 'low' ? 'active' : 'btn-secondary') + '" data-intensity="low">Subtle</button>';
    html += '        <button class="btn btn-xs intensity-btn ' + (curIntensity === 'medium' ? 'active' : 'btn-secondary') + '" data-intensity="medium">Balanced</button>';
    html += '        <button class="btn btn-xs intensity-btn ' + (curIntensity === 'high' ? 'active' : 'btn-secondary') + '" data-intensity="high">Vivid</button>';
    html += '      </div>';
    html += '    </div>';
    html += '    <div class="season-preset-grid mb-md">';

    var presets = [
      { id: 'auto', label: 'Auto (Time)', icon: 'clock' },
      { id: 'spring', label: 'Spring', icon: 'flower-2' },
      { id: 'summer', label: 'Summer', icon: 'sun' },
      { id: 'monsoon', label: 'Monsoon', icon: 'cloud-rain' },
      { id: 'autumn', label: 'Autumn', icon: 'wind' },
      { id: 'winter', label: 'Winter', icon: 'snowflake' },
      { id: 'mountain', label: 'Mountain', icon: 'mountain' },
      { id: 'jungle', label: 'Jungle', icon: 'leaf' },
      { id: 'night', label: 'Night Sky', icon: 'moon' }
    ];
    for (var p = 0; p < presets.length; p++) {
      var pr = presets[p];
      var isAct = (env.season || 'auto') === pr.id ? 'active' : '';
      html += '      <button class="preset-btn ' + isAct + '" data-season="' + pr.id + '"><i data-lucide="' + pr.icon + '"></i> ' + pr.label + '</button>';
    }
    html += '    </div>';
    html += '  </div>';

    // Data Export & Reset Card
    html += '  <div class="card mb-lg">';
    html += '    <div class="card-header">';
    html += '      <h2 class="card-title"><i data-lucide="database"></i> Data Backup & Recovery</h2>';
    html += '    </div>';
    html += '    <p class="text-xs text-muted mb-md">Backup your completed study tasks, mock test records, notes, and XP progress to a JSON file.</p>';
    html += '    <div class="flex flex-wrap gap-md">';
    html += '      <button class="btn btn-secondary" id="btnExportJSON"><i data-lucide="download"></i> Export Progress (JSON)</button>';
    html += '      <label class="btn btn-secondary" style="margin: 0; cursor: pointer;">';
    html += '        <i data-lucide="upload"></i> Import Progress';
    html += '        <input type="file" id="fileImportJSON" accept=".json" style="display: none;">';
    html += '      </label>';
    html += '      <button class="btn btn-danger" id="btnResetAllData"><i data-lucide="trash-2"></i> Reset Tracker Data</button>';
    html += '    </div>';
    html += '  </div>';

    html += '</div>';
    elements.mainContent.innerHTML = html;
  }

  // ============================================================
  // Route Handling & Router
  // ============================================================

  function handleRoute() {
    var hash = window.location.hash || '#dashboard';
    var cleanHash = hash.replace(/^#\/?/, '');
    var parts = cleanHash.split('/');
    var route = parts[0] || 'dashboard';
    var param = parts[1] || null;

    state.currentRoute = route;
    state.routeParam = param;

    setActiveNavLinks(route);

    if (route === 'dashboard') {
      renderDashboard();
    } else if (route === 'roadmap') {
      renderRoadmap();
    } else if (route === 'today') {
      renderToday();
    } else if (route === 'day') {
      renderDayDetail(param || state.data.currentDay, false);
    } else if (route === 'practice') {
      renderPracticeHub();
    } else if (route === 'coding') {
      renderCodingTracker();
    } else if (route === 'mock') {
      renderMockTests();
    } else if (route === 'progress') {
      renderProgress();
    } else if (route === 'achievements') {
      renderAchievements();
    } else if (route === 'settings') {
      renderSettings();
    } else {
      renderDashboard();
    }

    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }

    window.scrollTo(0, 0);
  }

  // ============================================================
  // Task Toggle & XP Handlers
  // ============================================================

  function handleTaskToggle(taskId, dayNum) {
    if (!state.data) return;
    state.data.tasks = state.data.tasks || {};
    var isDone = !state.data.tasks[taskId];
    state.data.tasks[taskId] = isDone;

    if (isDone) {
      window.Rewards.addXP(25, taskId, state.data);
      showToast('Task completed! +25 XP', 'success');

      if (state.data._newAchievements && state.data._newAchievements.length > 0) {
        for (var a = 0; a < state.data._newAchievements.length; a++) {
          var ach = state.data._newAchievements[a];
          showToast('Achievement Unlocked: ' + ach.title + '! +' + ach.xp + ' XP', 'success', 5000);
          fireConfetti();
        }
        delete state.data._newAchievements;
      }
    } else {
      window.Rewards.removeXP(25, taskId, state.data);
      showToast('Task unchecked', 'info');
    }

    window.Rewards.updateStreak(state.data);
    window.Storage.save(state.data);
    updateSidebarXP();
    handleRoute();
  }

  // ============================================================
  // Event Delegation & Setup
  // ============================================================

  function setupEventListeners() {
    // 1. External Links Click Delegation
    document.addEventListener('click', function (e) {
      var extLink = e.target.closest('a[target="_blank"]');
      if (extLink) {
        return;
      }

      // Checkbox click
      var checkbox = e.target.closest('.task-checkbox');
      if (checkbox) {
        e.stopPropagation();
        var taskId = checkbox.getAttribute('data-task-id');
        var taskItem = checkbox.closest('.task-item');
        var dayNum = taskItem ? taskItem.getAttribute('data-day') : state.data.currentDay;
        handleTaskToggle(taskId, dayNum);
        return;
      }

      // Day card click in roadmap
      var dayCard = e.target.closest('.day-card');
      if (dayCard && !e.target.closest('a') && !e.target.closest('button')) {
        var dayN = dayCard.getAttribute('data-day');
        if (dayN) {
          window.location.hash = '#day/' + dayN;
          return;
        }
      }

      // Phase Filter in roadmap
      var filterBtn = e.target.closest('.btn-filter');
      if (filterBtn && filterBtn.hasAttribute('data-phase')) {
        state.filterPhase = filterBtn.getAttribute('data-phase');
        renderRoadmap();
        if (window.lucide) window.lucide.createIcons();
        return;
      }

      // Practice Category filter
      if (filterBtn && filterBtn.hasAttribute('data-practice-cat')) {
        state.practiceCategoryFilter = filterBtn.getAttribute('data-practice-cat');
        renderPracticeHub();
        if (window.lucide) window.lucide.createIcons();
        return;
      }

      // Set Active Challenge Day
      var btnSetDay = e.target.closest('#btnSetCurrentDay');
      if (btnSetDay) {
        var newCur = parseInt(btnSetDay.getAttribute('data-day'), 10);
        state.data.currentDay = newCur;
        window.Storage.save(state.data);
        showToast('Active challenge day set to Day ' + newCur, 'success');
        updateSidebarXP();
        handleRoute();
        return;
      }

      // Mark Day Complete (+50 XP)
      var btnMarkDone = e.target.closest('#btnMarkDayComplete');
      if (btnMarkDone) {
        var markDay = parseInt(btnMarkDone.getAttribute('data-day'), 10);
        window.Rewards.addXP(50, 'day_comp_' + markDay, state.data);
        showToast('Day ' + markDay + ' Completed! +50 XP awarded', 'success');
        fireConfetti();
        window.Storage.save(state.data);
        updateSidebarXP();
        handleRoute();
        return;
      }

      // Reset Day
      var btnReset = e.target.closest('#btnResetDay');
      if (btnReset) {
        var rDay = parseInt(btnReset.getAttribute('data-day'), 10);
        if (confirm('Reset all tasks for Day ' + rDay + '?')) {
          var plan = window.STUDY_PLAN || [];
          var dayObj = plan.find(function (d) { return d.day === rDay; });
          if (dayObj && dayObj.tasks) {
            for (var t = 0; t < dayObj.tasks.length; t++) {
              delete state.data.tasks[dayObj.tasks[t].id];
            }
          }
          window.Storage.save(state.data);
          showToast('Day ' + rDay + ' progress reset', 'info');
          handleRoute();
        }
        return;
      }

      // Modal Close
      if (e.target.closest('#modalCloseBtn') || e.target === elements.modalOverlay) {
        closeModal();
        return;
      }

      // Theme toggle buttons
      if (e.target.closest('#btnThemeDark')) {
        state.data.theme = 'dark';
        document.documentElement.setAttribute('data-theme', 'dark');
        window.Storage.save(state.data);
        handleRoute();
        return;
      }
      if (e.target.closest('#btnThemeLight')) {
        state.data.theme = 'light';
        document.documentElement.setAttribute('data-theme', 'light');
        window.Storage.save(state.data);
        handleRoute();
        return;
      }

      // Season Preset Buttons
      var presetBtn = e.target.closest('.preset-btn');
      if (presetBtn) {
        var season = presetBtn.getAttribute('data-season');
        state.data.environment = state.data.environment || {};
        state.data.environment.season = season;
        if (window.Environment) window.Environment.setSeason(season);
        window.Storage.save(state.data);
        updateSidebarXP();
        showToast('Environment changed to ' + season, 'info');

        var allPresets = document.querySelectorAll('.preset-btn');
        allPresets.forEach(function (b) {
          if (b.getAttribute('data-season') === season) b.classList.add('active');
          else b.classList.remove('active');
        });
        return;
      }

      // Weather Intensity buttons
      var intBtn = e.target.closest('.intensity-btn');
      if (intBtn) {
        var intensity = intBtn.getAttribute('data-intensity');
        state.data.environment = state.data.environment || {};
        state.data.environment.intensity = intensity;
        if (window.Environment) window.Environment.setIntensity(intensity);
        if (elements.intensityText) elements.intensityText.textContent = intensity.charAt(0).toUpperCase() + intensity.slice(1);
        window.Storage.save(state.data);

        var allInts = document.querySelectorAll('.intensity-btn');
        allInts.forEach(function (b) {
          if (b.getAttribute('data-intensity') === intensity) b.classList.add('active');
          else b.classList.remove('active');
        });
        return;
      }

      // Top Nav Sound Toggle, Drawer Sound Toggle, or Settings Sound Toggle
      if (e.target.closest('#btnSoundToggle') || e.target.closest('#btnToggleAudioInside') || e.target.closest('#btnSoundSettingsToggle')) {
        if (window.Soundscape) {
          var isPlaying = window.Soundscape.toggle(state.data.environment.season);
          state.data.environment.sound = isPlaying;
          window.Storage.save(state.data);

          if (elements.btnSoundToggle) {
            if (isPlaying) elements.btnSoundToggle.classList.add('sound-active');
            else elements.btnSoundToggle.classList.remove('sound-active');
          }
          if (elements.soundIcon) {
            elements.soundIcon.setAttribute('data-lucide', isPlaying ? 'volume-2' : 'volume-x');
          }
          if (elements.audioStatusText) {
            elements.audioStatusText.textContent = isPlaying ? 'ON' : 'OFF';
          }
          var btnSetToggle = document.getElementById('btnSoundSettingsToggle');
          if (btnSetToggle) {
            if (isPlaying) {
              btnSetToggle.className = 'btn btn-sm btn-primary';
              btnSetToggle.innerHTML = '<i data-lucide="volume-2"></i><span>Playing</span>';
            } else {
              btnSetToggle.className = 'btn btn-sm btn-secondary';
              btnSetToggle.innerHTML = '<i data-lucide="volume-x"></i><span>Muted</span>';
            }
          }
          if (window.lucide) window.lucide.createIcons();
          showToast('Ambient Sound ' + (isPlaying ? 'Enabled' : 'Muted'), 'info');
        }
        return;
      }

      // Floating Environment Pill toggle
      if (e.target.closest('#envFloatingPill') || e.target.closest('#btnEnvToggle')) {
        if (elements.envControlPanel) {
          var isShown = elements.envControlPanel.classList.toggle('show');
          if (elements.envFloatingPill) elements.envFloatingPill.classList.toggle('open', isShown);
        }
        return;
      }

      // Close Environment Panel
      if (e.target.closest('#btnCloseEnvPanel')) {
        if (elements.envControlPanel) {
          elements.envControlPanel.classList.remove('show');
          if (elements.envFloatingPill) elements.envFloatingPill.classList.remove('open');
        }
        return;
      }

      // CBT Mock Test: Start Test
      var startMockBtn = e.target.closest('.btn-start-mock');
      if (startMockBtn) {
        var testId = startMockBtn.getAttribute('data-test-id');
        var bank = window.TCS_MOCK_TESTS || [];
        var testObj = bank.find(function (t) { return t.id === testId; });
        if (testObj && window.MockTest) {
          window.MockTest.startTest(testObj);
        }
        return;
      }

      // CBT Option selection
      var optItem = e.target.closest('.cbt-option-item');
      if (optItem) {
        var oIdx = parseInt(optItem.getAttribute('data-option-idx'), 10);
        if (window.MockTest) window.MockTest.selectOption(oIdx);
        return;
      }

      // CBT Actions
      if (e.target.closest('#btnClearMockResponse')) {
        if (window.MockTest) window.MockTest.clearResponse();
        return;
      }
      if (e.target.closest('#btnMarkMockReview')) {
        if (window.MockTest) window.MockTest.markForReview();
        return;
      }
      if (e.target.closest('#btnSaveNextMockQ')) {
        if (window.MockTest) window.MockTest.saveAndNext();
        return;
      }
      if (e.target.closest('#btnPrevMockQ')) {
        if (window.MockTest) window.MockTest.prevQuestion();
        return;
      }
      var palBtn = e.target.closest('.palette-btn');
      if (palBtn) {
        var qJump = parseInt(palBtn.getAttribute('data-jump-idx'), 10);
        if (window.MockTest) window.MockTest.jumpToQuestion(qJump);
        return;
      }
      if (e.target.closest('#btnSubmitMockTest')) {
        if (window.MockTest) window.MockTest.submitTest(false);
        return;
      }
      if (e.target.closest('#btnExitMockResult')) {
        if (window.MockTest) window.MockTest.exitTest();
        return;
      }
      if (e.target.closest('#btnRetakeMockTest')) {
        if (window.MockTest && window.TCS_MOCK_TESTS) {
          window.MockTest.startTest(window.TCS_MOCK_TESTS[0]);
        }
        return;
      }

      // Export JSON
      if (e.target.closest('#btnExportJSON')) {
        var jsonStr = window.Storage.exportJSON();
        var blob = new Blob([jsonStr], { type: 'application/json' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'tcs_preparation_tracker_' + new Date().toISOString().split('T')[0] + '.json';
        a.click();
        URL.revokeObjectURL(url);
        showToast('Progress exported successfully', 'success');
        return;
      }

      // Reset All Data
      if (e.target.closest('#btnResetAllData')) {
        if (confirm('CAUTION: This will reset all your tasks, streak, study hours, and notes. Continue?')) {
          state.data = window.Storage.reset();
          showToast('All progress reset to defaults', 'warning');
          updateSidebarXP();
          handleRoute();
        }
        return;
      }
    });

    // Notes Autosave Debounce
    var notesDebounce = null;
    document.addEventListener('input', function (e) {
      if (e.target && e.target.id === 'dayNotesTextarea') {
        var dayN = e.target.getAttribute('data-day');
        var val = e.target.value;
        state.data.notes = state.data.notes || {};
        state.data.notes[dayN] = val;

        var statusEl = document.getElementById('notesStatusText');
        if (statusEl) statusEl.textContent = 'Saving...';

        clearTimeout(notesDebounce);
        notesDebounce = setTimeout(function () {
          window.Storage.save(state.data);
          if (statusEl) statusEl.textContent = 'Saved to LocalStorage';
        }, 500);
      }

      // Volume slider change (Drawer & Settings)
      if (e.target && (e.target.id === 'soundVolumeSlider' || e.target.id === 'settingsVolumeSlider')) {
        var vol = e.target.value / 100;
        if (window.Soundscape) window.Soundscape.setVolume(vol);
        state.data.environment.soundVolume = vol;
        window.Storage.save(state.data);

        var volText = document.getElementById('soundVolPctText');
        if (volText) volText.textContent = Math.round(e.target.value) + '%';
        var otherSlider = document.getElementById(e.target.id === 'soundVolumeSlider' ? 'settingsVolumeSlider' : 'soundVolumeSlider');
        if (otherSlider) otherSlider.value = e.target.value;
      }
    });

    // Sound Type Select change (Drawer & Settings)
    document.addEventListener('change', function (e) {
      if (e.target && (e.target.id === 'soundTypeSelect' || e.target.id === 'settingsSoundTypeSelect')) {
        var st = e.target.value;
        state.data.environment.soundType = st;
        if (window.Soundscape && window.Soundscape.isPlaying()) {
          window.Soundscape.start(st, state.data.environment.season);
        }
        window.Storage.save(state.data);

        var otherSelect = document.getElementById(e.target.id === 'soundTypeSelect' ? 'settingsSoundTypeSelect' : 'soundTypeSelect');
        if (otherSelect) otherSelect.value = st;
      }

      // Animation Toggle
      if (e.target && e.target.id === 'chkEnvAnimation') {
        var anim = e.target.checked;
        state.data.environment.animation = anim;
        if (window.Environment) window.Environment.setAnimation(anim);
        window.Storage.save(state.data);
      }

      // Reduced Motion Toggle
      if (e.target && e.target.id === 'chkReducedMotion') {
        var rm = e.target.checked;
        state.data.environment.reducedMotion = rm;
        if (window.Environment) window.Environment.setReducedMotion(rm);
        window.Storage.save(state.data);
      }

      // Revision Checkbox toggle
      if (e.target && e.target.id === 'chkDayRevision') {
        var rDay = e.target.getAttribute('data-day');
        state.data.revisions = state.data.revisions || {};
        state.data.revisions[rDay] = e.target.checked;
        window.Storage.save(state.data);
        showToast('Day ' + rDay + ' revision status updated', 'success');
      }

      // Import JSON file
      if (e.target && e.target.id === 'fileImportJSON') {
        var file = e.target.files[0];
        if (file) {
          var reader = new FileReader();
          reader.onload = function (evt) {
            try {
              state.data = window.Storage.importJSON(evt.target.result);
              showToast('Progress imported successfully!', 'success');
              updateSidebarXP();
              handleRoute();
            } catch (err) {
              showToast('Failed to import JSON: ' + err.message, 'danger');
            }
          };
          reader.readAsText(file);
        }
      }
    });

    // Mobile Hamburger Toggle
    if (elements.mobileMenuBtn) {
      elements.mobileMenuBtn.addEventListener('click', function () {
        if (elements.sidebar) elements.sidebar.classList.toggle('active');
        if (elements.sidebarBackdrop) elements.sidebarBackdrop.classList.toggle('active');
      });
    }

    if (elements.sidebarNav) {
      elements.sidebarNav.addEventListener('click', function (e) {
        if (e.target.closest('.nav-item')) {
          if (elements.sidebar) elements.sidebar.classList.remove('active');
          if (elements.sidebarBackdrop) elements.sidebarBackdrop.classList.remove('active');
        }
      });
    }

    if (elements.sidebarBackdrop) {
      elements.sidebarBackdrop.addEventListener('click', function () {
        if (elements.sidebar) elements.sidebar.classList.remove('active');
        if (elements.sidebarBackdrop) elements.sidebarBackdrop.classList.remove('active');
      });
    }

    if (elements.sidebarToggle) {
      elements.sidebarToggle.addEventListener('click', function () {
        if (elements.sidebar) elements.sidebar.classList.toggle('collapsed');
      });
    }
  }

  // ============================================================
  // Global App Interface & Initialization
  // ============================================================

  window.App = {
    getState: function () {
      return state.data;
    },
    renderPage: function (route) {
      window.location.hash = '#' + route;
    },
    saveMockResult: function (result) {
      state.data.mockTests = state.data.mockTests || [];
      state.data.mockTests.unshift(result);
      window.Rewards.addXP(100, 'mock_' + Date.now(), state.data);
      window.Storage.save(state.data);
      showToast('Mock Test submitted! +100 XP awarded', 'success');
      updateSidebarXP();
    }
  };

  function init() {
    // 1. Load LocalStorage
    state.data = window.Storage.load();

    // 2. Set Theme attribute on <html>
    document.documentElement.setAttribute('data-theme', state.data.theme || 'dark');

    // 3. Initialize Living Nature Environment Engine
    if (window.Environment) {
      window.Environment.init(state.data.environment);
    }

    // 4. Setup listeners and routing
    setupEventListeners();
    window.addEventListener('hashchange', handleRoute);

    // 5. Initial Render
    updateSidebarXP();
    handleRoute();
  }

  // Start app on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
