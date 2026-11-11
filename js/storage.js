/**
 * Storage Manager for TCS 30-Day Preparation Tracker
 * Handles localStorage persistence, data migration, import, and export.
 * Supports Environment preferences, Mock Tests, Practice stats, and Revisions.
 */

(function () {
  'use strict';

  var STORAGE_KEY = 'tcs_tracker_data';

  var DEFAULT_STATE = {
    tasks: {},
    notes: {},
    revisions: {},
    xp: 0,
    earnedAchievements: [],
    streak: {
      current: 0,
      best: 0,
      lastDate: null
    },
    studyHours: 0,
    currentDay: 1,
    theme: 'dark',
    dailyTarget: 6,
    codingProblems: [],
    xpLog: [],
    environment: {
      season: 'auto',       // auto | spring | summer | monsoon | autumn | winter | mountain | jungle | night
      intensity: 'medium',  // low | medium | high
      animation: true,
      sound: false,
      soundVolume: 0.35,
      soundType: 'auto',    // auto | rain | breeze | stream | birds | crickets
      reducedMotion: false
    },
    mockTests: [],
    practiceStats: {}
  };

  /**
   * Clone a JavaScript object deeply
   */
  function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  /**
   * Merge saved data with default state to ensure all fields exist
   */
  function sanitize(data) {
    if (!data || typeof data !== 'object') {
      return clone(DEFAULT_STATE);
    }

    var result = clone(DEFAULT_STATE);

    if (data.tasks && typeof data.tasks === 'object' && !Array.isArray(data.tasks)) {
      result.tasks = data.tasks;
    }
    if (data.notes && typeof data.notes === 'object' && !Array.isArray(data.notes)) {
      result.notes = data.notes;
    }
    if (data.revisions && typeof data.revisions === 'object' && !Array.isArray(data.revisions)) {
      result.revisions = data.revisions;
    }
    if (typeof data.xp === 'number' && !isNaN(data.xp)) {
      result.xp = Math.max(0, data.xp);
    }
    if (Array.isArray(data.earnedAchievements)) {
      result.earnedAchievements = data.earnedAchievements;
    }
    if (data.streak && typeof data.streak === 'object') {
      result.streak.current = typeof data.streak.current === 'number' ? Math.max(0, data.streak.current) : 0;
      result.streak.best = typeof data.streak.best === 'number' ? Math.max(0, data.streak.best) : result.streak.current;
      result.streak.lastDate = typeof data.streak.lastDate === 'string' ? data.streak.lastDate : null;
    }
    if (typeof data.studyHours === 'number' && !isNaN(data.studyHours)) {
      result.studyHours = Math.max(0, data.studyHours);
    }
    if (typeof data.currentDay === 'number' && data.currentDay >= 1 && data.currentDay <= 30) {
      result.currentDay = data.currentDay;
    }
    if (data.theme === 'light' || data.theme === 'dark') {
      result.theme = data.theme;
    }
    if (typeof data.dailyTarget === 'number' && data.dailyTarget > 0) {
      result.dailyTarget = data.dailyTarget;
    }
    if (Array.isArray(data.codingProblems)) {
      result.codingProblems = data.codingProblems;
    }
    if (Array.isArray(data.xpLog)) {
      result.xpLog = data.xpLog;
    }

    // Environment settings
    if (data.environment && typeof data.environment === 'object') {
      result.environment.season = typeof data.environment.season === 'string' ? data.environment.season : DEFAULT_STATE.environment.season;
      result.environment.intensity = typeof data.environment.intensity === 'string' ? data.environment.intensity : DEFAULT_STATE.environment.intensity;
      result.environment.animation = typeof data.environment.animation === 'boolean' ? data.environment.animation : true;
      result.environment.sound = typeof data.environment.sound === 'boolean' ? data.environment.sound : false;
      result.environment.soundVolume = typeof data.environment.soundVolume === 'number' ? Math.min(1, Math.max(0, data.environment.soundVolume)) : 0.35;
      result.environment.soundType = typeof data.environment.soundType === 'string' ? data.environment.soundType : 'auto';
      result.environment.reducedMotion = typeof data.environment.reducedMotion === 'boolean' ? data.environment.reducedMotion : false;
    }

    // Mock tests history
    if (Array.isArray(data.mockTests)) {
      result.mockTests = data.mockTests;
    }

    // Practice stats
    if (data.practiceStats && typeof data.practiceStats === 'object') {
      result.practiceStats = data.practiceStats;
    }

    return result;
  }

  var StorageManager = {
    /**
     * Load data from localStorage or fallback to default
     */
    load: function () {
      try {
        var raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) {
          var initial = clone(DEFAULT_STATE);
          this.save(initial);
          return initial;
        }
        var parsed = JSON.parse(raw);
        return sanitize(parsed);
      } catch (err) {
        console.warn('Storage.load failed, using default state:', err);
        return clone(DEFAULT_STATE);
      }
    },

    /**
     * Save data to localStorage
     */
    save: function (data) {
      try {
        var sanitized = sanitize(data);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitized));
        return true;
      } catch (err) {
        console.error('Storage.save failed:', err);
        return false;
      }
    },

    /**
     * Export current data as a formatted JSON string
     */
    exportJSON: function () {
      var data = this.load();
      return JSON.stringify(data, null, 2);
    },

    /**
     * Import JSON string, validate, persist and return parsed object
     */
    importJSON: function (jsonStr) {
      try {
        var parsed = JSON.parse(jsonStr);
        if (!parsed || typeof parsed !== 'object') {
          throw new Error('Invalid JSON data format');
        }
        var sanitized = sanitize(parsed);
        this.save(sanitized);
        return sanitized;
      } catch (err) {
        console.error('Storage.importJSON error:', err);
        throw err;
      }
    },

    /**
     * Reset tracker data back to initial defaults
     */
    reset: function () {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) {
        // Ignore removal error
      }
      var clean = clone(DEFAULT_STATE);
      this.save(clean);
      return clean;
    },

    /**
     * Get default state object copy
     */
    getDefaultState: function () {
      return clone(DEFAULT_STATE);
    }
  };

  window.Storage = StorageManager;
})();
