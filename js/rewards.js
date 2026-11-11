/**
 * Rewards, XP, Achievements, and Streak Engine
 * Manages gamification logic for TCS 30-Day Preparation Tracker
 */

(function () {
  'use strict';

  var LEVEL_TITLES = [
    'Beginner',
    'Learner',
    'Achiever',
    'Scholar',
    'Expert',
    'Master',
    'Champion',
    'Legend'
  ];

  var DEFAULT_ACHIEVEMENTS = [
    { id: 'first_task', title: 'First Step', description: 'Complete your first task', icon: 'footprints', xp: 10, condition: 'first_task' },
    { id: 'day_complete', title: 'Day Crusher', description: 'Complete all tasks in a day', icon: 'check-circle', xp: 50, condition: 'day_complete' },
    { id: 'week1', title: 'Week Warrior', description: 'Complete Week 1 (Days 1-7)', icon: 'shield', xp: 150, condition: 'week_complete_1' },
    { id: 'week2', title: 'Fortnight Fighter', description: 'Complete Week 2 (Days 8-14)', icon: 'sword', xp: 150, condition: 'week_complete_2' },
    { id: 'week3', title: 'Triple Threat', description: 'Complete Week 3 (Days 15-21)', icon: 'trophy', xp: 150, condition: 'week_complete_3' },
    { id: 'streak_3', title: 'On Fire', description: '3-day study streak', icon: 'flame', xp: 30, condition: 'streak_3' },
    { id: 'streak_7', title: 'Unstoppable', description: '7-day study streak', icon: 'zap', xp: 100, condition: 'streak_7' },
    { id: 'streak_14', title: 'Relentless', description: '14-day study streak', icon: 'star', xp: 200, condition: 'streak_14' },
    { id: 'streak_30', title: 'Legend', description: '30-day study streak', icon: 'crown', xp: 500, condition: 'streak_30' },
    { id: 'quant_50', title: 'Math Whiz', description: 'Solve 50+ quantitative questions', icon: 'calculator', xp: 75, condition: 'quant_50' },
    { id: 'coding_10', title: 'Code Ninja', description: 'Solve 10 coding problems', icon: 'code', xp: 75, condition: 'coding_10' },
    { id: 'coding_30', title: 'Code Master', description: 'Solve 30 coding problems', icon: 'terminal', xp: 200, condition: 'coding_30' },
    { id: 'all_done', title: 'Gold Champion', description: 'Complete all 30 days curriculum', icon: 'medal', xp: 1000, condition: 'all_complete' },
    { id: 'hours_10', title: 'Dedicated', description: 'Study 10+ hours total', icon: 'clock', xp: 50, condition: 'hours_10' },
    { id: 'hours_50', title: 'Scholar', description: 'Study 50+ hours total', icon: 'book-open', xp: 150, condition: 'hours_50' }
  ];

  function getAchievementsList() {
    if (typeof window !== 'undefined' && Array.isArray(window.ACHIEVEMENTS) && window.ACHIEVEMENTS.length > 0) {
      return window.ACHIEVEMENTS;
    }
    return DEFAULT_ACHIEVEMENTS;
  }

  function getStudyPlan() {
    if (typeof window !== 'undefined' && Array.isArray(window.STUDY_PLAN)) {
      return window.STUDY_PLAN;
    }
    return [];
  }

  function getLocalDateString() {
    var now = new Date();
    var year = now.getFullYear();
    var month = String(now.getMonth() + 1).padStart(2, '0');
    var day = String(now.getDate()).padStart(2, '0');
    return year + '-' + month + '-' + day;
  }

  function daysBetween(dateStrA, dateStrB) {
    if (!dateStrA || !dateStrB) return 9999;
    var a = new Date(dateStrA + 'T00:00:00');
    var b = new Date(dateStrB + 'T00:00:00');
    var diffMs = Math.abs(b - a);
    return Math.round(diffMs / (1000 * 60 * 60 * 24));
  }

  var RewardsEngine = {
    /**
     * Add XP, ensuring no duplicate XP for the same taskId in xpLog
     */
    addXP: function (amount, taskId, data) {
      if (!data) return data;
      data.xpLog = data.xpLog || [];
      data.xp = typeof data.xp === 'number' ? data.xp : 0;

      var pts = Number(amount) || 0;
      if (pts <= 0) return data;

      if (taskId) {
        if (data.xpLog.indexOf(taskId) !== -1) {
          // Already awarded XP for this taskId
          return data;
        }
        data.xpLog.push(taskId);
      }

      data.xp += pts;

      // Check achievements after gaining XP
      var checkResult = this.checkAchievements(data);
      data = checkResult.data;
      data._newAchievements = checkResult.newAchievements;

      return data;
    },

    /**
     * Remove XP when unchecking a task
     */
    removeXP: function (amount, taskId, data) {
      if (!data) return data;
      data.xpLog = data.xpLog || [];
      data.xp = typeof data.xp === 'number' ? data.xp : 0;

      var pts = Number(amount) || 0;
      if (pts <= 0) return data;

      if (taskId) {
        var idx = data.xpLog.indexOf(taskId);
        if (idx !== -1) {
          data.xpLog.splice(idx, 1);
          data.xp = Math.max(0, data.xp - pts);
        }
      } else {
        data.xp = Math.max(0, data.xp - pts);
      }

      return data;
    },

    /**
     * Calculate Level info from XP (Every 200 XP = 1 level)
     */
    getLevel: function (xp) {
      var safeXP = Math.max(0, Number(xp) || 0);
      var level = Math.floor(safeXP / 200) + 1;
      var titleIndex = Math.min(level - 1, LEVEL_TITLES.length - 1);
      var title = LEVEL_TITLES[titleIndex];
      var currentXP = safeXP % 200;
      var nextLevelXP = 200;
      var percentage = Math.min(100, Math.round((currentXP / nextLevelXP) * 100));

      return {
        level: level,
        title: title,
        currentXP: currentXP,
        nextLevelXP: nextLevelXP,
        totalXP: safeXP,
        percentage: percentage
      };
    },

    /**
     * Check if a specific day is completely completed
     */
    isDayCompleted: function (dayNumber, data) {
      var plan = getStudyPlan();
      var dayData = plan.find(function (d) { return d.day === dayNumber; });
      if (!dayData || !dayData.tasks || dayData.tasks.length === 0) return false;

      var tasksObj = data.tasks || {};
      for (var i = 0; i < dayData.tasks.length; i++) {
        var t = dayData.tasks[i];
        if (t.mandatory && !tasksObj[t.id]) {
          return false;
        }
      }
      return true;
    },

    /**
     * Check achievements and award newly unlocked ones
     */
    checkAchievements: function (data) {
      if (!data) return { data: data, newAchievements: [] };
      data.earnedAchievements = data.earnedAchievements || [];
      data.tasks = data.tasks || {};
      data.xp = data.xp || 0;

      var achievements = getAchievementsList();
      var newAchievements = [];
      var plan = getStudyPlan();

      var completedTaskKeys = Object.keys(data.tasks).filter(function (k) {
        return !!data.tasks[k];
      });
      var completedTaskCount = completedTaskKeys.length;

      // Calculate solved questions count in quant
      var quantQuestionsSolved = 0;
      var codingSolvedCount = 0;

      if (plan && plan.length > 0) {
        for (var d = 0; d < plan.length; d++) {
          var day = plan[d];
          if (!day.tasks) continue;
          for (var t = 0; t < day.tasks.length; t++) {
            var task = day.tasks[t];
            if (data.tasks[task.id]) {
              if (task.category === 'quant' && task.type === 'practice') {
                quantQuestionsSolved += (task.target || 20);
              }
              if (task.category === 'coding' || task.type === 'coding') {
                codingSolvedCount += (task.target || 1);
              }
            }
          }
        }
      }

      // Add coding problems from codingProblems tracker
      if (Array.isArray(data.codingProblems)) {
        var solvedInTracker = data.codingProblems.filter(function (p) {
          return p.status === 'Solved';
        }).length;
        codingSolvedCount = Math.max(codingSolvedCount, solvedInTracker);
      }

      var self = this;

      function checkDayRange(startDay, endDay) {
        for (var dayNum = startDay; dayNum <= endDay; dayNum++) {
          if (!self.isDayCompleted(dayNum, data)) {
            return false;
          }
        }
        return true;
      }

      var hasAnyDayComplete = false;
      for (var i = 1; i <= 30; i++) {
        if (self.isDayCompleted(i, data)) {
          hasAnyDayComplete = true;
          break;
        }
      }

      var currentStreak = (data.streak && data.streak.current) || 0;
      var bestStreak = (data.streak && data.streak.best) || 0;
      var activeStreakMax = Math.max(currentStreak, bestStreak);
      var studyHours = data.studyHours || 0;

      for (var a = 0; a < achievements.length; a++) {
        var ach = achievements[a];
        if (data.earnedAchievements.indexOf(ach.id) !== -1) {
          continue; // Already earned
        }

        var unlocked = false;
        var cond = ach.condition || ach.id;

        switch (cond) {
          case 'first_task':
            unlocked = completedTaskCount >= 1;
            break;
          case 'day_complete':
            unlocked = hasAnyDayComplete;
            break;
          case 'week_complete_1':
          case 'week1':
            unlocked = checkDayRange(1, 7);
            break;
          case 'week_complete_2':
          case 'week2':
            unlocked = checkDayRange(8, 14);
            break;
          case 'week_complete_3':
          case 'week3':
            unlocked = checkDayRange(15, 21);
            break;
          case 'streak_3':
            unlocked = activeStreakMax >= 3;
            break;
          case 'streak_7':
            unlocked = activeStreakMax >= 7;
            break;
          case 'streak_14':
            unlocked = activeStreakMax >= 14;
            break;
          case 'streak_30':
            unlocked = activeStreakMax >= 30;
            break;
          case 'quant_50':
            unlocked = quantQuestionsSolved >= 50;
            break;
          case 'coding_10':
            unlocked = codingSolvedCount >= 10;
            break;
          case 'coding_30':
            unlocked = codingSolvedCount >= 30;
            break;
          case 'all_complete':
          case 'all_done':
            unlocked = checkDayRange(1, 30);
            break;
          case 'hours_10':
            unlocked = studyHours >= 10;
            break;
          case 'hours_50':
            unlocked = studyHours >= 50;
            break;
          default:
            unlocked = false;
        }

        if (unlocked) {
          data.earnedAchievements.push(ach.id);
          var xpReward = Number(ach.xp) || 0;
          data.xp += xpReward;
          newAchievements.push(ach);
        }
      }

      return {
        data: data,
        newAchievements: newAchievements
      };
    },

    /**
     * Update study streak based on calendar date
     */
    updateStreak: function (data) {
      if (!data) return data;
      data.streak = data.streak || { current: 0, best: 0, lastDate: null };

      var today = getLocalDateString();
      var lastDate = data.streak.lastDate;

      if (!lastDate) {
        data.streak.current = 1;
        data.streak.lastDate = today;
      } else if (lastDate === today) {
        // Already logged today
        if (data.streak.current === 0) {
          data.streak.current = 1;
        }
      } else {
        var diff = daysBetween(lastDate, today);
        if (diff === 1) {
          data.streak.current = (data.streak.current || 0) + 1;
          data.streak.lastDate = today;
        } else {
          // Streak broken
          data.streak.current = 1;
          data.streak.lastDate = today;
        }
      }

      data.streak.best = Math.max(data.streak.best || 0, data.streak.current);

      var checkResult = this.checkAchievements(data);
      data = checkResult.data;
      data._newAchievements = checkResult.newAchievements;

      return data;
    },

    /**
     * Get current streak status details
     */
    getStreakStatus: function (data) {
      if (!data || !data.streak) {
        return { current: 0, best: 0, lastDate: null, isActive: false };
      }
      var today = getLocalDateString();
      var lastDate = data.streak.lastDate;
      var diff = daysBetween(lastDate, today);
      var isActive = (lastDate === today || diff <= 1);

      return {
        current: data.streak.current || 0,
        best: data.streak.best || 0,
        lastDate: lastDate,
        isActive: isActive
      };
    }
  };

  window.Rewards = RewardsEngine;
})();
