// ============================================================
// TCS 30-Day Preparation Tracker - Data Layer
// ============================================================

const PLAYLISTS = {
  quant: 'https://www.youtube.com/playlist?list=PLMufDeLh5x2Aaig0ZieDTUsKSmvmz1RBN',
  reasoning: 'https://www.youtube.com/playlist?list=PLMufDeLh5x2DOOasdL69Fgi7gxJTv_Vfu',
  verbal: 'https://www.youtube.com/playlist?list=PLMufDeLh5x2BWYJy0ldl6vgrQ4nZm1Qap',
  coding: 'https://www.youtube.com/playlist?list=PLMufDeLh5x2ApQeIViNxGl3jSnSbobEd2',
  pyqs: 'https://www.youtube.com/playlist?list=PLMufDeLh5x2A7_klsrgfogBTtDr80OuL-'
};

const PRACTICE_LINKS = {
  indiabix: 'https://www.indiabix.com/',
  prepinsta: 'https://prepinsta.com/tcs/',
  gfg: 'https://www.geeksforgeeks.org/',
  hackerrank: 'https://www.hackerrank.com/domains/algorithms',
  leetcode: 'https://leetcode.com/problemset/',
  takeuforward: 'https://takeuforward.org/'
};

const MOTIVATIONAL_QUOTES = [
  "Success is the sum of small efforts repeated day in and day out.",
  "The secret of getting ahead is getting started.",
  "Don't watch the clock; do what it does. Keep going.",
  "It does not matter how slowly you go as long as you do not stop.",
  "Consistency is what transforms average into excellence.",
  "Hard work beats talent when talent doesn't work hard.",
  "The only way to do great work is to love what you do.",
  "Believe you can and you're halfway there.",
  "A little progress each day adds up to big results.",
  "Preparation is the key to success.",
  "Discipline is the bridge between goals and accomplishment.",
  "Your future is created by what you do today, not tomorrow.",
  "Push yourself, because no one else is going to do it for you.",
  "Dream big, start small, act now.",
  "Every expert was once a beginner.",
  "The pain you feel today will be the strength you feel tomorrow.",
  "Strive for progress, not perfection.",
  "Success doesn't come from what you do occasionally. It comes from what you do consistently."
];

// ============================================================
// 30-Day Study Plan
// ============================================================

const STUDY_PLAN = [

  // ===================== PHASE 1: FOUNDATION (Days 1-7) =====================

  // --- DAY 1 ---
  {
    day: 1,
    phase: 'foundation',
    phaseLabel: 'Foundation',
    title: 'Number System, Series & Arrays',
    tasks: [
      { id: 'd1_quant_lecture', type: 'lecture', category: 'quant', title: 'Quantitative Aptitude: Number System', description: 'Watch Number System lecture from Knowledge Gate', link: PLAYLISTS.quant, target: null, mandatory: true },
      { id: 'd1_quant_practice', type: 'practice', category: 'quant', title: 'Practice: Number System Questions', description: 'Solve 20 Number System questions on IndiaBix', link: PRACTICE_LINKS.indiabix, target: 20, mandatory: true },
      { id: 'd1_reasoning_lecture', type: 'lecture', category: 'reasoning', title: 'Logical Reasoning: Number Series', description: 'Watch Number Series lecture from Knowledge Gate', link: PLAYLISTS.reasoning, target: null, mandatory: true },
      { id: 'd1_reasoning_practice', type: 'practice', category: 'reasoning', title: 'Practice: Number Series Questions', description: 'Solve 15 Number Series questions on PrepInsta', link: PRACTICE_LINKS.prepinsta, target: 15, mandatory: true },
      { id: 'd1_english_lecture', type: 'lecture', category: 'english', title: 'Verbal Ability: Grammar Basics', description: 'Watch Grammar Basics lecture from Knowledge Gate', link: PLAYLISTS.verbal, target: null, mandatory: true },
      { id: 'd1_english_practice', type: 'practice', category: 'english', title: 'Practice: Grammar Basics Questions', description: 'Solve 10 Grammar Basics questions on IndiaBix', link: PRACTICE_LINKS.indiabix, target: 10, mandatory: true },
      { id: 'd1_coding_practice', type: 'coding', category: 'coding', title: 'Coding: Arrays - Solve 2 Problems', description: 'Solve 2 array problems on LeetCode / TakeUForward', link: PRACTICE_LINKS.leetcode, target: 2, mandatory: true },
      { id: 'd1_general_revision', type: 'revision', category: 'general', title: 'Daily Revision', description: 'Revise all topics covered today and make short notes', link: null, target: null, mandatory: true }
    ]
  },

  // --- DAY 2 ---
  {
    day: 2,
    phase: 'foundation',
    phaseLabel: 'Foundation',
    title: 'LCM & HCF, Coding-Decoding & Strings',
    tasks: [
      { id: 'd2_quant_lecture', type: 'lecture', category: 'quant', title: 'Quantitative Aptitude: LCM and HCF', description: 'Watch LCM and HCF lecture from Knowledge Gate', link: PLAYLISTS.quant, target: null, mandatory: true },
      { id: 'd2_quant_practice', type: 'practice', category: 'quant', title: 'Practice: LCM and HCF Questions', description: 'Solve 20 LCM and HCF questions on IndiaBix', link: PRACTICE_LINKS.indiabix, target: 20, mandatory: true },
      { id: 'd2_reasoning_lecture', type: 'lecture', category: 'reasoning', title: 'Logical Reasoning: Coding-Decoding', description: 'Watch Coding-Decoding lecture from Knowledge Gate', link: PLAYLISTS.reasoning, target: null, mandatory: true },
      { id: 'd2_reasoning_practice', type: 'practice', category: 'reasoning', title: 'Practice: Coding-Decoding Questions', description: 'Solve 15 Coding-Decoding questions on PrepInsta', link: PRACTICE_LINKS.prepinsta, target: 15, mandatory: true },
      { id: 'd2_english_lecture', type: 'lecture', category: 'english', title: 'Verbal Ability: Articles', description: 'Watch Articles lecture from Knowledge Gate', link: PLAYLISTS.verbal, target: null, mandatory: true },
      { id: 'd2_english_practice', type: 'practice', category: 'english', title: 'Practice: Articles Questions', description: 'Solve 10 Articles questions on IndiaBix', link: PRACTICE_LINKS.indiabix, target: 10, mandatory: true },
      { id: 'd2_coding_practice', type: 'coding', category: 'coding', title: 'Coding: Strings - Solve 2 Problems', description: 'Solve 2 string problems on LeetCode / TakeUForward', link: PRACTICE_LINKS.leetcode, target: 2, mandatory: true },
      { id: 'd2_general_revision', type: 'revision', category: 'general', title: 'Daily Revision', description: 'Revise all topics covered today and make short notes', link: null, target: null, mandatory: true }
    ]
  },

  // --- DAY 3 ---
  {
    day: 3,
    phase: 'foundation',
    phaseLabel: 'Foundation',
    title: 'Percentage, Blood Relations & Hashing',
    tasks: [
      { id: 'd3_quant_lecture', type: 'lecture', category: 'quant', title: 'Quantitative Aptitude: Percentage', description: 'Watch Percentage lecture from Knowledge Gate', link: PLAYLISTS.quant, target: null, mandatory: true },
      { id: 'd3_quant_practice', type: 'practice', category: 'quant', title: 'Practice: Percentage Questions', description: 'Solve 20 Percentage questions on IndiaBix', link: PRACTICE_LINKS.indiabix, target: 20, mandatory: true },
      { id: 'd3_reasoning_lecture', type: 'lecture', category: 'reasoning', title: 'Logical Reasoning: Blood Relations', description: 'Watch Blood Relations lecture from Knowledge Gate', link: PLAYLISTS.reasoning, target: null, mandatory: true },
      { id: 'd3_reasoning_practice', type: 'practice', category: 'reasoning', title: 'Practice: Blood Relations Questions', description: 'Solve 15 Blood Relations questions on PrepInsta', link: PRACTICE_LINKS.prepinsta, target: 15, mandatory: true },
      { id: 'd3_english_lecture', type: 'lecture', category: 'english', title: 'Verbal Ability: Prepositions', description: 'Watch Prepositions lecture from Knowledge Gate', link: PLAYLISTS.verbal, target: null, mandatory: true },
      { id: 'd3_english_practice', type: 'practice', category: 'english', title: 'Practice: Prepositions Questions', description: 'Solve 10 Prepositions questions on IndiaBix', link: PRACTICE_LINKS.indiabix, target: 10, mandatory: true },
      { id: 'd3_coding_practice', type: 'coding', category: 'coding', title: 'Coding: Hashing - Solve 2 Problems', description: 'Solve 2 hashing problems on LeetCode / TakeUForward', link: PRACTICE_LINKS.leetcode, target: 2, mandatory: true },
      { id: 'd3_general_revision', type: 'revision', category: 'general', title: 'Daily Revision', description: 'Revise all topics covered today and make short notes', link: null, target: null, mandatory: true }
    ]
  },

  // --- DAY 4 ---
  {
    day: 4,
    phase: 'foundation',
    phaseLabel: 'Foundation',
    title: 'Profit & Loss, Direction Sense & Two Pointers',
    tasks: [
      { id: 'd4_quant_lecture', type: 'lecture', category: 'quant', title: 'Quantitative Aptitude: Profit and Loss', description: 'Watch Profit and Loss lecture from Knowledge Gate', link: PLAYLISTS.quant, target: null, mandatory: true },
      { id: 'd4_quant_practice', type: 'practice', category: 'quant', title: 'Practice: Profit and Loss Questions', description: 'Solve 20 Profit and Loss questions on IndiaBix', link: PRACTICE_LINKS.indiabix, target: 20, mandatory: true },
      { id: 'd4_reasoning_lecture', type: 'lecture', category: 'reasoning', title: 'Logical Reasoning: Direction Sense', description: 'Watch Direction Sense lecture from Knowledge Gate', link: PLAYLISTS.reasoning, target: null, mandatory: true },
      { id: 'd4_reasoning_practice', type: 'practice', category: 'reasoning', title: 'Practice: Direction Sense Questions', description: 'Solve 15 Direction Sense questions on PrepInsta', link: PRACTICE_LINKS.prepinsta, target: 15, mandatory: true },
      { id: 'd4_english_lecture', type: 'lecture', category: 'english', title: 'Verbal Ability: Tenses', description: 'Watch Tenses lecture from Knowledge Gate', link: PLAYLISTS.verbal, target: null, mandatory: true },
      { id: 'd4_english_practice', type: 'practice', category: 'english', title: 'Practice: Tenses Questions', description: 'Solve 10 Tenses questions on IndiaBix', link: PRACTICE_LINKS.indiabix, target: 10, mandatory: true },
      { id: 'd4_coding_practice', type: 'coding', category: 'coding', title: 'Coding: Two Pointers - Solve 2 Problems', description: 'Solve 2 two pointer problems on LeetCode / TakeUForward', link: PRACTICE_LINKS.leetcode, target: 2, mandatory: true },
      { id: 'd4_general_revision', type: 'revision', category: 'general', title: 'Daily Revision', description: 'Revise all topics covered today and make short notes', link: null, target: null, mandatory: true }
    ]
  },

  // --- DAY 5 ---
  {
    day: 5,
    phase: 'foundation',
    phaseLabel: 'Foundation',
    title: 'Ratio & Proportion, Syllogism & Sliding Window',
    tasks: [
      { id: 'd5_quant_lecture', type: 'lecture', category: 'quant', title: 'Quantitative Aptitude: Ratio and Proportion', description: 'Watch Ratio and Proportion lecture from Knowledge Gate', link: PLAYLISTS.quant, target: null, mandatory: true },
      { id: 'd5_quant_practice', type: 'practice', category: 'quant', title: 'Practice: Ratio and Proportion Questions', description: 'Solve 20 Ratio and Proportion questions on IndiaBix', link: PRACTICE_LINKS.indiabix, target: 20, mandatory: true },
      { id: 'd5_reasoning_lecture', type: 'lecture', category: 'reasoning', title: 'Logical Reasoning: Syllogism', description: 'Watch Syllogism lecture from Knowledge Gate', link: PLAYLISTS.reasoning, target: null, mandatory: true },
      { id: 'd5_reasoning_practice', type: 'practice', category: 'reasoning', title: 'Practice: Syllogism Questions', description: 'Solve 15 Syllogism questions on PrepInsta', link: PRACTICE_LINKS.prepinsta, target: 15, mandatory: true },
      { id: 'd5_english_lecture', type: 'lecture', category: 'english', title: 'Verbal Ability: Error Spotting', description: 'Watch Error Spotting lecture from Knowledge Gate', link: PLAYLISTS.verbal, target: null, mandatory: true },
      { id: 'd5_english_practice', type: 'practice', category: 'english', title: 'Practice: Error Spotting Questions', description: 'Solve 10 Error Spotting questions on IndiaBix', link: PRACTICE_LINKS.indiabix, target: 10, mandatory: true },
      { id: 'd5_coding_practice', type: 'coding', category: 'coding', title: 'Coding: Sliding Window - Solve 2 Problems', description: 'Solve 2 sliding window problems on LeetCode / TakeUForward', link: PRACTICE_LINKS.leetcode, target: 2, mandatory: true },
      { id: 'd5_general_revision', type: 'revision', category: 'general', title: 'Daily Revision', description: 'Revise all topics covered today and make short notes', link: null, target: null, mandatory: true }
    ]
  },

  // --- DAY 6 ---
  {
    day: 6,
    phase: 'foundation',
    phaseLabel: 'Foundation',
    title: 'Average, Seating Arrangement & Binary Search',
    tasks: [
      { id: 'd6_quant_lecture', type: 'lecture', category: 'quant', title: 'Quantitative Aptitude: Average', description: 'Watch Average lecture from Knowledge Gate', link: PLAYLISTS.quant, target: null, mandatory: true },
      { id: 'd6_quant_practice', type: 'practice', category: 'quant', title: 'Practice: Average Questions', description: 'Solve 20 Average questions on IndiaBix', link: PRACTICE_LINKS.indiabix, target: 20, mandatory: true },
      { id: 'd6_reasoning_lecture', type: 'lecture', category: 'reasoning', title: 'Logical Reasoning: Seating Arrangement', description: 'Watch Seating Arrangement lecture from Knowledge Gate', link: PLAYLISTS.reasoning, target: null, mandatory: true },
      { id: 'd6_reasoning_practice', type: 'practice', category: 'reasoning', title: 'Practice: Seating Arrangement Questions', description: 'Solve 15 Seating Arrangement questions on PrepInsta', link: PRACTICE_LINKS.prepinsta, target: 15, mandatory: true },
      { id: 'd6_english_lecture', type: 'lecture', category: 'english', title: 'Verbal Ability: Vocabulary', description: 'Watch Vocabulary lecture from Knowledge Gate', link: PLAYLISTS.verbal, target: null, mandatory: true },
      { id: 'd6_english_practice', type: 'practice', category: 'english', title: 'Practice: Vocabulary Questions', description: 'Solve 10 Vocabulary questions on IndiaBix', link: PRACTICE_LINKS.indiabix, target: 10, mandatory: true },
      { id: 'd6_coding_practice', type: 'coding', category: 'coding', title: 'Coding: Binary Search - Solve 2 Problems', description: 'Solve 2 binary search problems on LeetCode / TakeUForward', link: PRACTICE_LINKS.leetcode, target: 2, mandatory: true },
      { id: 'd6_general_revision', type: 'revision', category: 'general', title: 'Daily Revision', description: 'Revise all topics covered today and make short notes', link: null, target: null, mandatory: true }
    ]
  },

  // --- DAY 7 (REVISION) ---
  {
    day: 7,
    phase: 'foundation',
    phaseLabel: 'Foundation',
    title: 'Week 1 Revision & Mock Test',
    tasks: [
      { id: 'd7_quant_mock', type: 'mock', category: 'quant', title: 'Weekly Aptitude Mock Test', description: 'Attempt a timed mock test covering Number System, LCM/HCF, Percentage, Profit & Loss, Ratio, Average', link: PRACTICE_LINKS.prepinsta, target: 30, mandatory: true },
      { id: 'd7_reasoning_mock', type: 'mock', category: 'reasoning', title: 'Weekly Reasoning Mock Test', description: 'Attempt a timed mock test covering Number Series, Coding-Decoding, Blood Relations, Direction, Syllogism, Seating', link: PRACTICE_LINKS.prepinsta, target: 20, mandatory: true },
      { id: 'd7_english_revision', type: 'revision', category: 'english', title: 'English Revision: Week 1 Topics', description: 'Revise Grammar Basics, Articles, Prepositions, Tenses, Error Spotting, Vocabulary', link: PLAYLISTS.verbal, target: null, mandatory: true },
      { id: 'd7_coding_practice_1', type: 'coding', category: 'coding', title: 'Timed Coding Problem 1', description: 'Solve a timed coding problem covering Arrays or Strings', link: PRACTICE_LINKS.hackerrank, target: 1, mandatory: true },
      { id: 'd7_coding_practice_2', type: 'coding', category: 'coding', title: 'Timed Coding Problem 2', description: 'Solve a timed coding problem covering Hashing or Two Pointers', link: PRACTICE_LINKS.hackerrank, target: 1, mandatory: true },
      { id: 'd7_quant_revision', type: 'revision', category: 'quant', title: 'Quant Revision: Week 1 Topics', description: 'Revise notes and formulas from Days 1-6 Quant topics', link: null, target: null, mandatory: true },
      { id: 'd7_reasoning_revision', type: 'revision', category: 'reasoning', title: 'Reasoning Revision: Week 1 Topics', description: 'Revise notes and shortcuts from Days 1-6 Reasoning topics', link: null, target: null, mandatory: true },
      { id: 'd7_general_revision', type: 'revision', category: 'general', title: 'Full Week 1 Revision', description: 'Review all mistakes from the week, update notes, and plan for Week 2', link: null, target: null, mandatory: true }
    ]
  },

  // ===================== PHASE 2: INTERMEDIATE (Days 8-14) =====================

  // --- DAY 8 ---
  {
    day: 8,
    phase: 'intermediate',
    phaseLabel: 'Intermediate',
    title: 'Time & Work, Data Sufficiency & Sorting',
    tasks: [
      { id: 'd8_quant_lecture', type: 'lecture', category: 'quant', title: 'Quantitative Aptitude: Time and Work', description: 'Watch Time and Work lecture from Knowledge Gate', link: PLAYLISTS.quant, target: null, mandatory: true },
      { id: 'd8_quant_practice', type: 'practice', category: 'quant', title: 'Practice: Time and Work Questions', description: 'Solve 20 Time and Work questions on IndiaBix', link: PRACTICE_LINKS.indiabix, target: 20, mandatory: true },
      { id: 'd8_reasoning_lecture', type: 'lecture', category: 'reasoning', title: 'Logical Reasoning: Data Sufficiency', description: 'Watch Data Sufficiency lecture from Knowledge Gate', link: PLAYLISTS.reasoning, target: null, mandatory: true },
      { id: 'd8_reasoning_practice', type: 'practice', category: 'reasoning', title: 'Practice: Data Sufficiency Questions', description: 'Solve 15 Data Sufficiency questions on PrepInsta', link: PRACTICE_LINKS.prepinsta, target: 15, mandatory: true },
      { id: 'd8_english_lecture', type: 'lecture', category: 'english', title: 'Verbal Ability: Sentence Correction', description: 'Watch Sentence Correction lecture from Knowledge Gate', link: PLAYLISTS.verbal, target: null, mandatory: true },
      { id: 'd8_english_practice', type: 'practice', category: 'english', title: 'Practice: Sentence Correction Questions', description: 'Solve 10 Sentence Correction questions on IndiaBix', link: PRACTICE_LINKS.indiabix, target: 10, mandatory: true },
      { id: 'd8_coding_practice', type: 'coding', category: 'coding', title: 'Coding: Sorting - Solve 3 Problems', description: 'Solve 3 sorting problems on LeetCode / GFG', link: PRACTICE_LINKS.leetcode, target: 3, mandatory: true },
      { id: 'd8_general_revision', type: 'revision', category: 'general', title: 'Daily Revision', description: 'Revise all topics covered today and make short notes', link: null, target: null, mandatory: true }
    ]
  },

  // --- DAY 9 ---
  {
    day: 9,
    phase: 'intermediate',
    phaseLabel: 'Intermediate',
    title: 'Pipes & Cisterns, Logical Deduction & Recursion',
    tasks: [
      { id: 'd9_quant_lecture', type: 'lecture', category: 'quant', title: 'Quantitative Aptitude: Pipes and Cisterns', description: 'Watch Pipes and Cisterns lecture from Knowledge Gate', link: PLAYLISTS.quant, target: null, mandatory: true },
      { id: 'd9_quant_practice', type: 'practice', category: 'quant', title: 'Practice: Pipes and Cisterns Questions', description: 'Solve 20 Pipes and Cisterns questions on IndiaBix', link: PRACTICE_LINKS.indiabix, target: 20, mandatory: true },
      { id: 'd9_reasoning_lecture', type: 'lecture', category: 'reasoning', title: 'Logical Reasoning: Logical Deduction', description: 'Watch Logical Deduction lecture from Knowledge Gate', link: PLAYLISTS.reasoning, target: null, mandatory: true },
      { id: 'd9_reasoning_practice', type: 'practice', category: 'reasoning', title: 'Practice: Logical Deduction Questions', description: 'Solve 15 Logical Deduction questions on PrepInsta', link: PRACTICE_LINKS.prepinsta, target: 15, mandatory: true },
      { id: 'd9_english_lecture', type: 'lecture', category: 'english', title: 'Verbal Ability: Para Jumbles', description: 'Watch Para Jumbles lecture from Knowledge Gate', link: PLAYLISTS.verbal, target: null, mandatory: true },
      { id: 'd9_english_practice', type: 'practice', category: 'english', title: 'Practice: Para Jumbles Questions', description: 'Solve 10 Para Jumbles questions on IndiaBix', link: PRACTICE_LINKS.indiabix, target: 10, mandatory: true },
      { id: 'd9_coding_practice', type: 'coding', category: 'coding', title: 'Coding: Recursion - Solve 3 Problems', description: 'Solve 3 recursion problems on LeetCode / GFG', link: PRACTICE_LINKS.leetcode, target: 3, mandatory: true },
      { id: 'd9_general_revision', type: 'revision', category: 'general', title: 'Daily Revision', description: 'Revise all topics covered today and make short notes', link: null, target: null, mandatory: true }
    ]
  },

  // --- DAY 10 ---
  {
    day: 10,
    phase: 'intermediate',
    phaseLabel: 'Intermediate',
    title: 'Speed Distance Time, Statement & Conclusion & Linked List',
    tasks: [
      { id: 'd10_quant_lecture', type: 'lecture', category: 'quant', title: 'Quantitative Aptitude: Speed Distance Time', description: 'Watch Speed Distance Time lecture from Knowledge Gate', link: PLAYLISTS.quant, target: null, mandatory: true },
      { id: 'd10_quant_practice', type: 'practice', category: 'quant', title: 'Practice: Speed Distance Time Questions', description: 'Solve 20 Speed Distance Time questions on IndiaBix', link: PRACTICE_LINKS.indiabix, target: 20, mandatory: true },
      { id: 'd10_reasoning_lecture', type: 'lecture', category: 'reasoning', title: 'Logical Reasoning: Statement and Conclusion', description: 'Watch Statement and Conclusion lecture from Knowledge Gate', link: PLAYLISTS.reasoning, target: null, mandatory: true },
      { id: 'd10_reasoning_practice', type: 'practice', category: 'reasoning', title: 'Practice: Statement and Conclusion Questions', description: 'Solve 15 Statement and Conclusion questions on PrepInsta', link: PRACTICE_LINKS.prepinsta, target: 15, mandatory: true },
      { id: 'd10_english_lecture', type: 'lecture', category: 'english', title: 'Verbal Ability: Reading Comprehension', description: 'Watch Reading Comprehension lecture from Knowledge Gate', link: PLAYLISTS.verbal, target: null, mandatory: true },
      { id: 'd10_english_practice', type: 'practice', category: 'english', title: 'Practice: Reading Comprehension Questions', description: 'Solve 10 Reading Comprehension questions on IndiaBix', link: PRACTICE_LINKS.indiabix, target: 10, mandatory: true },
      { id: 'd10_coding_practice', type: 'coding', category: 'coding', title: 'Coding: Linked List - Solve 3 Problems', description: 'Solve 3 linked list problems on LeetCode / GFG', link: PRACTICE_LINKS.leetcode, target: 3, mandatory: true },
      { id: 'd10_general_revision', type: 'revision', category: 'general', title: 'Daily Revision', description: 'Revise all topics covered today and make short notes', link: null, target: null, mandatory: true }
    ]
  },

  // --- DAY 11 ---
  {
    day: 11,
    phase: 'intermediate',
    phaseLabel: 'Intermediate',
    title: 'Simple Interest, Puzzles & Stack',
    tasks: [
      { id: 'd11_quant_lecture', type: 'lecture', category: 'quant', title: 'Quantitative Aptitude: Simple Interest', description: 'Watch Simple Interest lecture from Knowledge Gate', link: PLAYLISTS.quant, target: null, mandatory: true },
      { id: 'd11_quant_practice', type: 'practice', category: 'quant', title: 'Practice: Simple Interest Questions', description: 'Solve 20 Simple Interest questions on IndiaBix', link: PRACTICE_LINKS.indiabix, target: 20, mandatory: true },
      { id: 'd11_reasoning_lecture', type: 'lecture', category: 'reasoning', title: 'Logical Reasoning: Puzzles', description: 'Watch Puzzles lecture from Knowledge Gate', link: PLAYLISTS.reasoning, target: null, mandatory: true },
      { id: 'd11_reasoning_practice', type: 'practice', category: 'reasoning', title: 'Practice: Puzzles Questions', description: 'Solve 15 Puzzles questions on PrepInsta', link: PRACTICE_LINKS.prepinsta, target: 15, mandatory: true },
      { id: 'd11_english_lecture', type: 'lecture', category: 'english', title: 'Verbal Ability: Synonyms and Antonyms', description: 'Watch Synonyms and Antonyms lecture from Knowledge Gate', link: PLAYLISTS.verbal, target: null, mandatory: true },
      { id: 'd11_english_practice', type: 'practice', category: 'english', title: 'Practice: Synonyms and Antonyms Questions', description: 'Solve 10 Synonyms and Antonyms questions on IndiaBix', link: PRACTICE_LINKS.indiabix, target: 10, mandatory: true },
      { id: 'd11_coding_practice', type: 'coding', category: 'coding', title: 'Coding: Stack - Solve 3 Problems', description: 'Solve 3 stack problems on LeetCode / GFG', link: PRACTICE_LINKS.leetcode, target: 3, mandatory: true },
      { id: 'd11_general_revision', type: 'revision', category: 'general', title: 'Daily Revision', description: 'Revise all topics covered today and make short notes', link: null, target: null, mandatory: true }
    ]
  },

  // --- DAY 12 ---
  {
    day: 12,
    phase: 'intermediate',
    phaseLabel: 'Intermediate',
    title: 'Compound Interest, Data Interpretation & Queue',
    tasks: [
      { id: 'd12_quant_lecture', type: 'lecture', category: 'quant', title: 'Quantitative Aptitude: Compound Interest', description: 'Watch Compound Interest lecture from Knowledge Gate', link: PLAYLISTS.quant, target: null, mandatory: true },
      { id: 'd12_quant_practice', type: 'practice', category: 'quant', title: 'Practice: Compound Interest Questions', description: 'Solve 20 Compound Interest questions on IndiaBix', link: PRACTICE_LINKS.indiabix, target: 20, mandatory: true },
      { id: 'd12_reasoning_lecture', type: 'lecture', category: 'reasoning', title: 'Logical Reasoning: Data Interpretation', description: 'Watch Data Interpretation lecture from Knowledge Gate', link: PLAYLISTS.reasoning, target: null, mandatory: true },
      { id: 'd12_reasoning_practice', type: 'practice', category: 'reasoning', title: 'Practice: Data Interpretation Questions', description: 'Solve 15 Data Interpretation questions on PrepInsta', link: PRACTICE_LINKS.prepinsta, target: 15, mandatory: true },
      { id: 'd12_english_lecture', type: 'lecture', category: 'english', title: 'Verbal Ability: Cloze Test', description: 'Watch Cloze Test lecture from Knowledge Gate', link: PLAYLISTS.verbal, target: null, mandatory: true },
      { id: 'd12_english_practice', type: 'practice', category: 'english', title: 'Practice: Cloze Test Questions', description: 'Solve 10 Cloze Test questions on IndiaBix', link: PRACTICE_LINKS.indiabix, target: 10, mandatory: true },
      { id: 'd12_coding_practice', type: 'coding', category: 'coding', title: 'Coding: Queue - Solve 3 Problems', description: 'Solve 3 queue problems on LeetCode / GFG', link: PRACTICE_LINKS.leetcode, target: 3, mandatory: true },
      { id: 'd12_general_revision', type: 'revision', category: 'general', title: 'Daily Revision', description: 'Revise all topics covered today and make short notes', link: null, target: null, mandatory: true }
    ]
  },

  // --- DAY 13 ---
  {
    day: 13,
    phase: 'intermediate',
    phaseLabel: 'Intermediate',
    title: 'P&C, Advanced Reasoning & Trees',
    tasks: [
      { id: 'd13_quant_lecture', type: 'lecture', category: 'quant', title: 'Quantitative Aptitude: Permutation and Combination', description: 'Watch Permutation and Combination lecture from Knowledge Gate', link: PLAYLISTS.quant, target: null, mandatory: true },
      { id: 'd13_quant_practice', type: 'practice', category: 'quant', title: 'Practice: Permutation and Combination Questions', description: 'Solve 20 Permutation and Combination questions on IndiaBix', link: PRACTICE_LINKS.indiabix, target: 20, mandatory: true },
      { id: 'd13_reasoning_lecture', type: 'lecture', category: 'reasoning', title: 'Logical Reasoning: Advanced Reasoning', description: 'Watch Advanced Reasoning lecture from Knowledge Gate', link: PLAYLISTS.reasoning, target: null, mandatory: true },
      { id: 'd13_reasoning_practice', type: 'practice', category: 'reasoning', title: 'Practice: Advanced Reasoning Questions', description: 'Solve 15 Advanced Reasoning questions on PrepInsta', link: PRACTICE_LINKS.prepinsta, target: 15, mandatory: true },
      { id: 'd13_english_lecture', type: 'lecture', category: 'english', title: 'Verbal Ability: Sentence Completion', description: 'Watch Sentence Completion lecture from Knowledge Gate', link: PLAYLISTS.verbal, target: null, mandatory: true },
      { id: 'd13_english_practice', type: 'practice', category: 'english', title: 'Practice: Sentence Completion Questions', description: 'Solve 10 Sentence Completion questions on IndiaBix', link: PRACTICE_LINKS.indiabix, target: 10, mandatory: true },
      { id: 'd13_coding_practice', type: 'coding', category: 'coding', title: 'Coding: Trees - Solve 3 Problems', description: 'Solve 3 tree problems on LeetCode / GFG', link: PRACTICE_LINKS.leetcode, target: 3, mandatory: true },
      { id: 'd13_general_revision', type: 'revision', category: 'general', title: 'Daily Revision', description: 'Revise all topics covered today and make short notes', link: null, target: null, mandatory: true }
    ]
  },

  // --- DAY 14 (REVISION) ---
  {
    day: 14,
    phase: 'intermediate',
    phaseLabel: 'Intermediate',
    title: 'Week 2 Revision & Full Mock Test',
    tasks: [
      { id: 'd14_quant_mock', type: 'mock', category: 'quant', title: 'Full Aptitude Mock Test', description: 'Timed mock covering all Quant topics from Days 1-13', link: PRACTICE_LINKS.prepinsta, target: 40, mandatory: true },
      { id: 'd14_reasoning_mock', type: 'mock', category: 'reasoning', title: 'Full Reasoning Mock Test', description: 'Timed mock covering all Reasoning topics from Days 1-13', link: PRACTICE_LINKS.prepinsta, target: 30, mandatory: true },
      { id: 'd14_english_mock', type: 'mock', category: 'english', title: 'Full English Mock Test', description: 'Timed mock covering all Verbal Ability topics from Days 1-13', link: PRACTICE_LINKS.prepinsta, target: 20, mandatory: true },
      { id: 'd14_coding_mock', type: 'mock', category: 'coding', title: 'Coding Assessment', description: 'Solve 3 timed coding problems covering sorting, recursion, linked list, stack, queue, trees', link: PRACTICE_LINKS.hackerrank, target: 3, mandatory: true },
      { id: 'd14_quant_revision', type: 'revision', category: 'quant', title: 'Quant Revision: Week 2 Topics', description: 'Revise Time & Work, Pipes, Speed-Distance-Time, SI, CI, P&C', link: null, target: null, mandatory: true },
      { id: 'd14_reasoning_revision', type: 'revision', category: 'reasoning', title: 'Reasoning Revision: Week 2 Topics', description: 'Revise Data Sufficiency, Logical Deduction, Statement & Conclusion, Puzzles, DI, Advanced', link: null, target: null, mandatory: true },
      { id: 'd14_english_revision', type: 'revision', category: 'english', title: 'English Revision: Week 2 Topics', description: 'Revise Sentence Correction, Para Jumbles, RC, Synonyms/Antonyms, Cloze Test, Sentence Completion', link: null, target: null, mandatory: true },
      { id: 'd14_general_revision', type: 'revision', category: 'general', title: 'Full Week 2 Revision', description: 'Analyze mock test results, identify weak areas, update notes, and plan for Week 3', link: null, target: null, mandatory: true }
    ]
  },

  // ===================== PHASE 3: ADVANCED (Days 15-21) =====================

  // --- DAY 15 ---
  {
    day: 15,
    phase: 'advanced',
    phaseLabel: 'Advanced',
    title: 'Advanced Arithmetic, Complex Puzzles & Arrays+Math',
    tasks: [
      { id: 'd15_quant_lecture', type: 'lecture', category: 'quant', title: 'Quantitative Aptitude: Advanced Arithmetic', description: 'Watch Advanced Arithmetic lecture from Knowledge Gate', link: PLAYLISTS.quant, target: null, mandatory: true },
      { id: 'd15_quant_practice', type: 'practice', category: 'quant', title: 'Practice: Advanced Arithmetic Questions', description: 'Solve 25 Advanced Arithmetic questions on IndiaBix / GFG', link: PRACTICE_LINKS.indiabix, target: 25, mandatory: true },
      { id: 'd15_reasoning_lecture', type: 'lecture', category: 'reasoning', title: 'Logical Reasoning: Complex Puzzles', description: 'Watch Complex Puzzles lecture from Knowledge Gate', link: PLAYLISTS.reasoning, target: null, mandatory: true },
      { id: 'd15_reasoning_practice', type: 'practice', category: 'reasoning', title: 'Practice: Complex Puzzles Questions', description: 'Solve 20 Complex Puzzles questions on PrepInsta', link: PRACTICE_LINKS.prepinsta, target: 20, mandatory: true },
      { id: 'd15_english_lecture', type: 'lecture', category: 'english', title: 'Verbal Ability: Advanced Grammar', description: 'Watch Advanced Grammar lecture from Knowledge Gate', link: PLAYLISTS.verbal, target: null, mandatory: true },
      { id: 'd15_english_practice', type: 'practice', category: 'english', title: 'Practice: Advanced Grammar Questions', description: 'Solve 10 Advanced Grammar questions on IndiaBix', link: PRACTICE_LINKS.indiabix, target: 10, mandatory: true },
      { id: 'd15_coding_practice', type: 'coding', category: 'coding', title: 'Coding: Arrays + Mathematics - Solve 4 Problems', description: 'Solve 4 problems combining arrays and mathematical logic on LeetCode', link: PRACTICE_LINKS.leetcode, target: 4, mandatory: true },
      { id: 'd15_general_revision', type: 'revision', category: 'general', title: 'Daily Revision', description: 'Revise all topics covered today and make short notes', link: null, target: null, mandatory: true }
    ]
  },

  // --- DAY 16 ---
  {
    day: 16,
    phase: 'advanced',
    phaseLabel: 'Advanced',
    title: 'Advanced DI, Data Sufficiency Adv & Strings+Hashing',
    tasks: [
      { id: 'd16_quant_lecture', type: 'lecture', category: 'quant', title: 'Quantitative Aptitude: Advanced DI', description: 'Watch Advanced Data Interpretation lecture from Knowledge Gate', link: PLAYLISTS.quant, target: null, mandatory: true },
      { id: 'd16_quant_practice', type: 'practice', category: 'quant', title: 'Practice: Advanced DI Questions', description: 'Solve 25 Advanced DI questions on IndiaBix / GFG', link: PRACTICE_LINKS.gfg, target: 25, mandatory: true },
      { id: 'd16_reasoning_lecture', type: 'lecture', category: 'reasoning', title: 'Logical Reasoning: Data Sufficiency Advanced', description: 'Watch Data Sufficiency Advanced lecture from Knowledge Gate', link: PLAYLISTS.reasoning, target: null, mandatory: true },
      { id: 'd16_reasoning_practice', type: 'practice', category: 'reasoning', title: 'Practice: Data Sufficiency Advanced Questions', description: 'Solve 20 Data Sufficiency Advanced questions on PrepInsta', link: PRACTICE_LINKS.prepinsta, target: 20, mandatory: true },
      { id: 'd16_english_lecture', type: 'lecture', category: 'english', title: 'Verbal Ability: Advanced RC', description: 'Watch Advanced Reading Comprehension lecture from Knowledge Gate', link: PLAYLISTS.verbal, target: null, mandatory: true },
      { id: 'd16_english_practice', type: 'practice', category: 'english', title: 'Practice: Advanced RC Questions', description: 'Solve 10 Advanced RC questions on IndiaBix', link: PRACTICE_LINKS.indiabix, target: 10, mandatory: true },
      { id: 'd16_coding_practice', type: 'coding', category: 'coding', title: 'Coding: Strings + Hashing - Solve 4 Problems', description: 'Solve 4 problems combining strings and hashing on LeetCode', link: PRACTICE_LINKS.leetcode, target: 4, mandatory: true },
      { id: 'd16_general_revision', type: 'revision', category: 'general', title: 'Daily Revision', description: 'Revise all topics covered today and make short notes', link: null, target: null, mandatory: true }
    ]
  },

  // --- DAY 17 ---
  {
    day: 17,
    phase: 'advanced',
    phaseLabel: 'Advanced',
    title: 'Probability, Logical Deduction Adv & Greedy',
    tasks: [
      { id: 'd17_quant_lecture', type: 'lecture', category: 'quant', title: 'Quantitative Aptitude: Probability', description: 'Watch Probability lecture from Knowledge Gate', link: PLAYLISTS.quant, target: null, mandatory: true },
      { id: 'd17_quant_practice', type: 'practice', category: 'quant', title: 'Practice: Probability Questions', description: 'Solve 25 Probability questions on IndiaBix / GFG', link: PRACTICE_LINKS.indiabix, target: 25, mandatory: true },
      { id: 'd17_reasoning_lecture', type: 'lecture', category: 'reasoning', title: 'Logical Reasoning: Logical Deduction Advanced', description: 'Watch Logical Deduction Advanced lecture from Knowledge Gate', link: PLAYLISTS.reasoning, target: null, mandatory: true },
      { id: 'd17_reasoning_practice', type: 'practice', category: 'reasoning', title: 'Practice: Logical Deduction Advanced Questions', description: 'Solve 20 Logical Deduction Advanced questions on PrepInsta', link: PRACTICE_LINKS.prepinsta, target: 20, mandatory: true },
      { id: 'd17_english_lecture', type: 'lecture', category: 'english', title: 'Verbal Ability: Verbal Reasoning', description: 'Watch Verbal Reasoning lecture from Knowledge Gate', link: PLAYLISTS.verbal, target: null, mandatory: true },
      { id: 'd17_english_practice', type: 'practice', category: 'english', title: 'Practice: Verbal Reasoning Questions', description: 'Solve 10 Verbal Reasoning questions on IndiaBix', link: PRACTICE_LINKS.indiabix, target: 10, mandatory: true },
      { id: 'd17_coding_practice', type: 'coding', category: 'coding', title: 'Coding: Greedy - Solve 4 Problems', description: 'Solve 4 greedy algorithm problems on LeetCode / TakeUForward', link: PRACTICE_LINKS.takeuforward, target: 4, mandatory: true },
      { id: 'd17_general_revision', type: 'revision', category: 'general', title: 'Daily Revision', description: 'Revise all topics covered today and make short notes', link: null, target: null, mandatory: true }
    ]
  },

  // --- DAY 18 ---
  {
    day: 18,
    phase: 'advanced',
    phaseLabel: 'Advanced',
    title: 'P&C Advanced, Arrangement & Binary Search Adv',
    tasks: [
      { id: 'd18_quant_lecture', type: 'lecture', category: 'quant', title: 'Quantitative Aptitude: P&C Advanced', description: 'Watch Permutation & Combination Advanced lecture from Knowledge Gate', link: PLAYLISTS.quant, target: null, mandatory: true },
      { id: 'd18_quant_practice', type: 'practice', category: 'quant', title: 'Practice: P&C Advanced Questions', description: 'Solve 25 P&C Advanced questions on IndiaBix / GFG', link: PRACTICE_LINKS.gfg, target: 25, mandatory: true },
      { id: 'd18_reasoning_lecture', type: 'lecture', category: 'reasoning', title: 'Logical Reasoning: Arrangement Problems', description: 'Watch Arrangement Problems lecture from Knowledge Gate', link: PLAYLISTS.reasoning, target: null, mandatory: true },
      { id: 'd18_reasoning_practice', type: 'practice', category: 'reasoning', title: 'Practice: Arrangement Problems Questions', description: 'Solve 20 Arrangement Problems questions on PrepInsta', link: PRACTICE_LINKS.prepinsta, target: 20, mandatory: true },
      { id: 'd18_english_lecture', type: 'lecture', category: 'english', title: 'Verbal Ability: Critical Reasoning', description: 'Watch Critical Reasoning lecture from Knowledge Gate', link: PLAYLISTS.verbal, target: null, mandatory: true },
      { id: 'd18_english_practice', type: 'practice', category: 'english', title: 'Practice: Critical Reasoning Questions', description: 'Solve 10 Critical Reasoning questions on IndiaBix', link: PRACTICE_LINKS.indiabix, target: 10, mandatory: true },
      { id: 'd18_coding_practice', type: 'coding', category: 'coding', title: 'Coding: Binary Search Advanced - Solve 4 Problems', description: 'Solve 4 advanced binary search problems on LeetCode / TakeUForward', link: PRACTICE_LINKS.leetcode, target: 4, mandatory: true },
      { id: 'd18_general_revision', type: 'revision', category: 'general', title: 'Daily Revision', description: 'Revise all topics covered today and make short notes', link: null, target: null, mandatory: true }
    ]
  },

  // --- DAY 19 ---
  {
    day: 19,
    phase: 'advanced',
    phaseLabel: 'Advanced',
    title: 'Number Theory, Advanced Mixed Reasoning & DP',
    tasks: [
      { id: 'd19_quant_lecture', type: 'lecture', category: 'quant', title: 'Quantitative Aptitude: Number Theory', description: 'Watch Number Theory lecture from Knowledge Gate', link: PLAYLISTS.quant, target: null, mandatory: true },
      { id: 'd19_quant_practice', type: 'practice', category: 'quant', title: 'Practice: Number Theory Questions', description: 'Solve 25 Number Theory questions on IndiaBix / GFG', link: PRACTICE_LINKS.gfg, target: 25, mandatory: true },
      { id: 'd19_reasoning_lecture', type: 'lecture', category: 'reasoning', title: 'Logical Reasoning: Advanced Reasoning Mixed', description: 'Watch Advanced Reasoning Mixed lecture from Knowledge Gate', link: PLAYLISTS.reasoning, target: null, mandatory: true },
      { id: 'd19_reasoning_practice', type: 'practice', category: 'reasoning', title: 'Practice: Advanced Reasoning Mixed Questions', description: 'Solve 20 Advanced Reasoning Mixed questions on PrepInsta', link: PRACTICE_LINKS.prepinsta, target: 20, mandatory: true },
      { id: 'd19_english_lecture', type: 'lecture', category: 'english', title: 'Verbal Ability: Inference Questions', description: 'Watch Inference Questions lecture from Knowledge Gate', link: PLAYLISTS.verbal, target: null, mandatory: true },
      { id: 'd19_english_practice', type: 'practice', category: 'english', title: 'Practice: Inference Questions', description: 'Solve 10 Inference questions on IndiaBix', link: PRACTICE_LINKS.indiabix, target: 10, mandatory: true },
      { id: 'd19_coding_practice', type: 'coding', category: 'coding', title: 'Coding: Dynamic Programming - Solve 4 Problems', description: 'Solve 4 DP problems on LeetCode / TakeUForward', link: PRACTICE_LINKS.takeuforward, target: 4, mandatory: true },
      { id: 'd19_general_revision', type: 'revision', category: 'general', title: 'Daily Revision', description: 'Revise all topics covered today and make short notes', link: null, target: null, mandatory: true }
    ]
  },

  // --- DAY 20 ---
  {
    day: 20,
    phase: 'advanced',
    phaseLabel: 'Advanced',
    title: 'Mixed Advanced Quant, LR Mixed & Graphs',
    tasks: [
      { id: 'd20_quant_lecture', type: 'lecture', category: 'quant', title: 'Quantitative Aptitude: Mixed Advanced Quant', description: 'Watch Mixed Advanced Quant lecture from Knowledge Gate', link: PLAYLISTS.quant, target: null, mandatory: true },
      { id: 'd20_quant_practice', type: 'practice', category: 'quant', title: 'Practice: Mixed Advanced Quant Questions', description: 'Solve 25 Mixed Advanced Quant questions on IndiaBix / GFG', link: PRACTICE_LINKS.gfg, target: 25, mandatory: true },
      { id: 'd20_reasoning_lecture', type: 'lecture', category: 'reasoning', title: 'Logical Reasoning: Logical Reasoning Mixed', description: 'Watch Logical Reasoning Mixed lecture from Knowledge Gate', link: PLAYLISTS.reasoning, target: null, mandatory: true },
      { id: 'd20_reasoning_practice', type: 'practice', category: 'reasoning', title: 'Practice: Logical Reasoning Mixed Questions', description: 'Solve 20 Logical Reasoning Mixed questions on PrepInsta', link: PRACTICE_LINKS.prepinsta, target: 20, mandatory: true },
      { id: 'd20_english_lecture', type: 'lecture', category: 'english', title: 'Verbal Ability: Comprehensive English', description: 'Watch Comprehensive English lecture from Knowledge Gate', link: PLAYLISTS.verbal, target: null, mandatory: true },
      { id: 'd20_english_practice', type: 'practice', category: 'english', title: 'Practice: Comprehensive English Questions', description: 'Solve 10 Comprehensive English questions on IndiaBix', link: PRACTICE_LINKS.indiabix, target: 10, mandatory: true },
      { id: 'd20_coding_practice', type: 'coding', category: 'coding', title: 'Coding: Graphs - Solve 4 Problems', description: 'Solve 4 graph problems on LeetCode / TakeUForward', link: PRACTICE_LINKS.takeuforward, target: 4, mandatory: true },
      { id: 'd20_general_revision', type: 'revision', category: 'general', title: 'Daily Revision', description: 'Revise all topics covered today and make short notes', link: null, target: null, mandatory: true }
    ]
  },

  // --- DAY 21 (REVISION) ---
  {
    day: 21,
    phase: 'advanced',
    phaseLabel: 'Advanced',
    title: 'Week 3 Revision & Full Mock + Coding Assessment',
    tasks: [
      { id: 'd21_quant_mock', type: 'mock', category: 'quant', title: 'Full Aptitude Mock Test (Advanced)', description: 'Timed mock covering all Quant topics from Days 1-20 with advanced difficulty', link: PRACTICE_LINKS.prepinsta, target: 50, mandatory: true },
      { id: 'd21_reasoning_mock', type: 'mock', category: 'reasoning', title: 'Full Reasoning Mock Test (Advanced)', description: 'Timed mock covering all Reasoning topics from Days 1-20 with advanced difficulty', link: PRACTICE_LINKS.prepinsta, target: 30, mandatory: true },
      { id: 'd21_english_mock', type: 'mock', category: 'english', title: 'Full English Mock Test (Advanced)', description: 'Timed mock covering all Verbal Ability topics from Days 1-20', link: PRACTICE_LINKS.prepinsta, target: 20, mandatory: true },
      { id: 'd21_coding_mock', type: 'mock', category: 'coding', title: 'Advanced Coding Assessment', description: 'Solve 4 timed advanced coding problems covering DP, Graphs, Greedy, Binary Search', link: PRACTICE_LINKS.hackerrank, target: 4, mandatory: true },
      { id: 'd21_quant_revision', type: 'revision', category: 'quant', title: 'Quant Revision: All Topics', description: 'Complete review of all Quant topics, focus on weak areas identified in mock', link: null, target: null, mandatory: true },
      { id: 'd21_reasoning_revision', type: 'revision', category: 'reasoning', title: 'Reasoning Revision: All Topics', description: 'Complete review of all Reasoning topics, focus on weak areas', link: null, target: null, mandatory: true },
      { id: 'd21_english_revision', type: 'revision', category: 'english', title: 'English Revision: All Topics', description: 'Complete review of all English topics, focus on weak areas', link: null, target: null, mandatory: true },
      { id: 'd21_general_revision', type: 'revision', category: 'general', title: 'Full Week 3 Revision', description: 'Analyze all mock results, create final revision plan for the last stretch', link: null, target: null, mandatory: true }
    ]
  },

  // ===================== PHASE 4: FINAL (Days 22-30) =====================

  // --- DAY 22 ---
  {
    day: 22,
    phase: 'final',
    phaseLabel: 'Final',
    title: 'Quantitative Revision - All Topics',
    tasks: [
      { id: 'd22_quant_revision_1', type: 'revision', category: 'quant', title: 'Revise: Number System, LCM/HCF, Percentage', description: 'Quick formula revision and 5 questions each on Number System, LCM/HCF, Percentage', link: PLAYLISTS.quant, target: null, mandatory: true },
      { id: 'd22_quant_revision_2', type: 'revision', category: 'quant', title: 'Revise: Profit & Loss, Ratio, Average', description: 'Quick formula revision and 5 questions each on P&L, Ratio & Proportion, Average', link: PLAYLISTS.quant, target: null, mandatory: true },
      { id: 'd22_quant_revision_3', type: 'revision', category: 'quant', title: 'Revise: Time & Work, Pipes, Speed-Distance-Time', description: 'Quick formula revision and 5 questions each on Time/Work, Pipes/Cisterns, SDT', link: PLAYLISTS.quant, target: null, mandatory: true },
      { id: 'd22_quant_revision_4', type: 'revision', category: 'quant', title: 'Revise: SI, CI, P&C, Probability', description: 'Quick formula revision and 5 questions each on SI, CI, P&C, Probability', link: PLAYLISTS.quant, target: null, mandatory: true },
      { id: 'd22_quant_practice', type: 'practice', category: 'quant', title: 'Mixed Quant Practice: 30 Questions', description: 'Solve 30 mixed quantitative aptitude questions covering all topics', link: PRACTICE_LINKS.prepinsta, target: 30, mandatory: true },
      { id: 'd22_quant_mock', type: 'mock', category: 'quant', title: 'Timed Quant Mini Mock', description: 'Attempt a 30-minute timed quant test', link: PRACTICE_LINKS.indiabix, target: 30, mandatory: true },
      { id: 'd22_coding_practice', type: 'coding', category: 'coding', title: 'Coding: 2 Mixed Problems', description: 'Solve 2 coding problems on any previously covered topic', link: PRACTICE_LINKS.leetcode, target: 2, mandatory: true },
      { id: 'd22_general_revision', type: 'revision', category: 'general', title: 'Daily Revision', description: 'Review mistakes from today\'s practice and update formula sheet', link: null, target: null, mandatory: true }
    ]
  },

  // --- DAY 23 ---
  {
    day: 23,
    phase: 'final',
    phaseLabel: 'Final',
    title: 'Reasoning & Verbal Revision - All Topics',
    tasks: [
      { id: 'd23_reasoning_revision_1', type: 'revision', category: 'reasoning', title: 'Revise: Number Series, Coding-Decoding, Blood Relations', description: 'Quick revision of core reasoning topics with practice questions', link: PLAYLISTS.reasoning, target: null, mandatory: true },
      { id: 'd23_reasoning_revision_2', type: 'revision', category: 'reasoning', title: 'Revise: Direction, Syllogism, Seating, Puzzles', description: 'Quick revision of intermediate reasoning topics', link: PLAYLISTS.reasoning, target: null, mandatory: true },
      { id: 'd23_reasoning_revision_3', type: 'revision', category: 'reasoning', title: 'Revise: DI, Data Sufficiency, Logical Deduction', description: 'Quick revision of advanced reasoning topics', link: PLAYLISTS.reasoning, target: null, mandatory: true },
      { id: 'd23_reasoning_practice', type: 'practice', category: 'reasoning', title: 'Mixed Reasoning Practice: 25 Questions', description: 'Solve 25 mixed reasoning questions covering all topics', link: PRACTICE_LINKS.prepinsta, target: 25, mandatory: true },
      { id: 'd23_english_revision', type: 'revision', category: 'english', title: 'Revise: All English Topics', description: 'Revise Grammar, Articles, Prepositions, Tenses, Error Spotting, Vocabulary, RC, Para Jumbles, and more', link: PLAYLISTS.verbal, target: null, mandatory: true },
      { id: 'd23_english_practice', type: 'practice', category: 'english', title: 'Mixed English Practice: 15 Questions', description: 'Solve 15 mixed verbal ability questions covering all topics', link: PRACTICE_LINKS.indiabix, target: 15, mandatory: true },
      { id: 'd23_coding_practice', type: 'coding', category: 'coding', title: 'Coding: 2 Mixed Problems', description: 'Solve 2 coding problems on any previously covered topic', link: PRACTICE_LINKS.leetcode, target: 2, mandatory: true },
      { id: 'd23_general_revision', type: 'revision', category: 'general', title: 'Daily Revision', description: 'Review mistakes from today\'s practice and update notes', link: null, target: null, mandatory: true }
    ]
  },

  // --- DAY 24 ---
  {
    day: 24,
    phase: 'final',
    phaseLabel: 'Final',
    title: 'Advanced Coding Mock - Mixed Topics',
    tasks: [
      { id: 'd24_coding_practice_1', type: 'coding', category: 'coding', title: 'Coding Problem 1: Arrays / Strings', description: 'Solve a medium-level array or string problem', link: PRACTICE_LINKS.leetcode, target: 1, mandatory: true },
      { id: 'd24_coding_practice_2', type: 'coding', category: 'coding', title: 'Coding Problem 2: Hashing / Two Pointers', description: 'Solve a medium-level hashing or two pointer problem', link: PRACTICE_LINKS.leetcode, target: 1, mandatory: true },
      { id: 'd24_coding_practice_3', type: 'coding', category: 'coding', title: 'Coding Problem 3: Sorting / Binary Search', description: 'Solve a medium-level sorting or binary search problem', link: PRACTICE_LINKS.leetcode, target: 1, mandatory: true },
      { id: 'd24_coding_practice_4', type: 'coding', category: 'coding', title: 'Coding Problem 4: Stack / Queue / Linked List', description: 'Solve a medium-level data structure problem', link: PRACTICE_LINKS.leetcode, target: 1, mandatory: true },
      { id: 'd24_coding_practice_5', type: 'coding', category: 'coding', title: 'Coding Problem 5: Trees / Graphs', description: 'Solve a medium-level tree or graph problem', link: PRACTICE_LINKS.leetcode, target: 1, mandatory: true },
      { id: 'd24_coding_practice_6', type: 'coding', category: 'coding', title: 'Coding Problem 6: DP / Greedy', description: 'Solve a medium-level DP or greedy problem', link: PRACTICE_LINKS.leetcode, target: 1, mandatory: true },
      { id: 'd24_coding_revision', type: 'revision', category: 'coding', title: 'Coding Revision: Review All Solutions', description: 'Review and optimize all 6 solutions, note patterns and approaches', link: PRACTICE_LINKS.takeuforward, target: null, mandatory: true },
      { id: 'd24_general_revision', type: 'revision', category: 'general', title: 'Daily Revision', description: 'Review coding approaches and identify weak topics for remaining days', link: null, target: null, mandatory: true }
    ]
  },

  // --- DAY 25 ---
  {
    day: 25,
    phase: 'final',
    phaseLabel: 'Final',
    title: 'DBMS & SQL Basics',
    tasks: [
      { id: 'd25_general_lecture_1', type: 'lecture', category: 'general', title: 'DBMS: Database Concepts & Normalization', description: 'Learn database fundamentals, ACID properties, normalization forms', link: PRACTICE_LINKS.gfg, target: null, mandatory: true },
      { id: 'd25_general_lecture_2', type: 'lecture', category: 'general', title: 'DBMS: ER Diagrams & Relational Model', description: 'Learn ER diagrams, relational model, keys, and constraints', link: PRACTICE_LINKS.gfg, target: null, mandatory: true },
      { id: 'd25_general_lecture_3', type: 'lecture', category: 'general', title: 'SQL: Basic Queries', description: 'Learn SELECT, INSERT, UPDATE, DELETE, JOIN, GROUP BY, HAVING', link: PRACTICE_LINKS.gfg, target: null, mandatory: true },
      { id: 'd25_general_practice', type: 'practice', category: 'general', title: 'Practice: 15 DBMS Questions', description: 'Solve 15 DBMS MCQs covering normalization, SQL, transactions', link: PRACTICE_LINKS.gfg, target: 15, mandatory: true },
      { id: 'd25_coding_practice', type: 'coding', category: 'coding', title: 'SQL Coding: Write 5 Queries', description: 'Practice writing SQL queries on HackerRank', link: PRACTICE_LINKS.hackerrank, target: 5, mandatory: true },
      { id: 'd25_quant_practice', type: 'practice', category: 'quant', title: 'Quick Quant Practice: 10 Questions', description: 'Solve 10 quick quant questions to stay sharp', link: PRACTICE_LINKS.indiabix, target: 10, mandatory: true },
      { id: 'd25_reasoning_practice', type: 'practice', category: 'reasoning', title: 'Quick Reasoning Practice: 10 Questions', description: 'Solve 10 quick reasoning questions to stay sharp', link: PRACTICE_LINKS.prepinsta, target: 10, mandatory: true },
      { id: 'd25_general_revision', type: 'revision', category: 'general', title: 'Daily Revision', description: 'Revise DBMS concepts and SQL syntax learned today', link: null, target: null, mandatory: true }
    ]
  },

  // --- DAY 26 ---
  {
    day: 26,
    phase: 'final',
    phaseLabel: 'Final',
    title: 'Operating Systems Concepts',
    tasks: [
      { id: 'd26_general_lecture_1', type: 'lecture', category: 'general', title: 'OS: Process Management & Scheduling', description: 'Learn process states, PCB, CPU scheduling algorithms (FCFS, SJF, RR, Priority)', link: PRACTICE_LINKS.gfg, target: null, mandatory: true },
      { id: 'd26_general_lecture_2', type: 'lecture', category: 'general', title: 'OS: Memory Management & Virtual Memory', description: 'Learn paging, segmentation, page replacement algorithms, thrashing', link: PRACTICE_LINKS.gfg, target: null, mandatory: true },
      { id: 'd26_general_lecture_3', type: 'lecture', category: 'general', title: 'OS: Deadlock & Synchronization', description: 'Learn deadlock conditions, prevention, avoidance, semaphores, mutex', link: PRACTICE_LINKS.gfg, target: null, mandatory: true },
      { id: 'd26_general_practice', type: 'practice', category: 'general', title: 'Practice: 15 OS Questions', description: 'Solve 15 OS MCQs covering scheduling, memory, deadlock', link: PRACTICE_LINKS.gfg, target: 15, mandatory: true },
      { id: 'd26_quant_practice', type: 'practice', category: 'quant', title: 'Quick Quant Practice: 10 Questions', description: 'Solve 10 quick quant questions to stay sharp', link: PRACTICE_LINKS.indiabix, target: 10, mandatory: true },
      { id: 'd26_reasoning_practice', type: 'practice', category: 'reasoning', title: 'Quick Reasoning Practice: 10 Questions', description: 'Solve 10 quick reasoning questions to stay sharp', link: PRACTICE_LINKS.prepinsta, target: 10, mandatory: true },
      { id: 'd26_coding_practice', type: 'coding', category: 'coding', title: 'Coding: 2 Practice Problems', description: 'Solve 2 coding problems to stay sharp', link: PRACTICE_LINKS.leetcode, target: 2, mandatory: true },
      { id: 'd26_general_revision', type: 'revision', category: 'general', title: 'Daily Revision', description: 'Revise OS concepts learned today, make concise notes', link: null, target: null, mandatory: true }
    ]
  },

  // --- DAY 27 ---
  {
    day: 27,
    phase: 'final',
    phaseLabel: 'Final',
    title: 'Computer Networks & OOPs',
    tasks: [
      { id: 'd27_general_lecture_1', type: 'lecture', category: 'general', title: 'CN: OSI & TCP/IP Models', description: 'Learn OSI layers, TCP/IP model, protocols at each layer', link: PRACTICE_LINKS.gfg, target: null, mandatory: true },
      { id: 'd27_general_lecture_2', type: 'lecture', category: 'general', title: 'CN: IP Addressing & Subnetting', description: 'Learn IPv4, subnetting, CIDR, ARP, DNS, DHCP', link: PRACTICE_LINKS.gfg, target: null, mandatory: true },
      { id: 'd27_general_lecture_3', type: 'lecture', category: 'general', title: 'OOPs: Core Concepts', description: 'Learn Encapsulation, Abstraction, Inheritance, Polymorphism, classes, objects', link: PRACTICE_LINKS.gfg, target: null, mandatory: true },
      { id: 'd27_general_practice_1', type: 'practice', category: 'general', title: 'Practice: 10 CN Questions', description: 'Solve 10 Computer Networks MCQs', link: PRACTICE_LINKS.gfg, target: 10, mandatory: true },
      { id: 'd27_general_practice_2', type: 'practice', category: 'general', title: 'Practice: 10 OOPs Questions', description: 'Solve 10 OOPs concept MCQs', link: PRACTICE_LINKS.gfg, target: 10, mandatory: true },
      { id: 'd27_quant_practice', type: 'practice', category: 'quant', title: 'Quick Quant Practice: 10 Questions', description: 'Solve 10 quick quant questions to stay sharp', link: PRACTICE_LINKS.indiabix, target: 10, mandatory: true },
      { id: 'd27_coding_practice', type: 'coding', category: 'coding', title: 'Coding: 2 Practice Problems', description: 'Solve 2 coding problems to stay sharp', link: PRACTICE_LINKS.leetcode, target: 2, mandatory: true },
      { id: 'd27_general_revision', type: 'revision', category: 'general', title: 'Daily Revision', description: 'Revise CN and OOPs concepts, make concise notes', link: null, target: null, mandatory: true }
    ]
  },

  // --- DAY 28 ---
  {
    day: 28,
    phase: 'final',
    phaseLabel: 'Final',
    title: 'C++ STL, Projects & Interview Preparation',
    tasks: [
      { id: 'd28_general_lecture_1', type: 'lecture', category: 'general', title: 'C++ STL: Containers & Algorithms', description: 'Learn vectors, maps, sets, pairs, sorting, searching in STL', link: PRACTICE_LINKS.gfg, target: null, mandatory: true },
      { id: 'd28_general_lecture_2', type: 'lecture', category: 'general', title: 'Project Discussion: Key Points', description: 'Prepare project descriptions, tech stack used, challenges faced, role played', link: null, target: null, mandatory: true },
      { id: 'd28_general_lecture_3', type: 'lecture', category: 'general', title: 'Interview Preparation: HR Round', description: 'Prepare answers for Tell me about yourself, strengths/weaknesses, why TCS', link: null, target: null, mandatory: true },
      { id: 'd28_coding_practice_1', type: 'coding', category: 'coding', title: 'STL Practice: Problem 1', description: 'Solve a problem using STL containers (vectors, maps)', link: PRACTICE_LINKS.gfg, target: 1, mandatory: true },
      { id: 'd28_coding_practice_2', type: 'coding', category: 'coding', title: 'STL Practice: Problem 2', description: 'Solve a problem using STL algorithms (sort, binary_search)', link: PRACTICE_LINKS.gfg, target: 1, mandatory: true },
      { id: 'd28_coding_practice_3', type: 'coding', category: 'coding', title: 'STL Practice: Problem 3', description: 'Solve a problem using STL sets and iterators', link: PRACTICE_LINKS.gfg, target: 1, mandatory: true },
      { id: 'd28_coding_practice_4', type: 'coding', category: 'coding', title: 'STL Practice: Problem 4', description: 'Solve a problem using STL priority_queue or stack', link: PRACTICE_LINKS.gfg, target: 1, mandatory: true },
      { id: 'd28_coding_practice_5', type: 'coding', category: 'coding', title: 'STL Practice: Problem 5', description: 'Solve a problem using STL strings and algorithms', link: PRACTICE_LINKS.gfg, target: 1, mandatory: true },
      { id: 'd28_general_revision', type: 'revision', category: 'general', title: 'Daily Revision', description: 'Revise STL concepts and practice HR interview answers aloud', link: null, target: null, mandatory: true }
    ]
  },

  // --- DAY 29 ---
  {
    day: 29,
    phase: 'final',
    phaseLabel: 'Final',
    title: 'Complete TCS Mock Test',
    tasks: [
      { id: 'd29_quant_mock', type: 'mock', category: 'quant', title: 'TCS Mock: Quantitative Aptitude Section', description: 'Attempt full-length timed Quant section simulating actual TCS test', link: PRACTICE_LINKS.prepinsta, target: 30, mandatory: true },
      { id: 'd29_reasoning_mock', type: 'mock', category: 'reasoning', title: 'TCS Mock: Reasoning Section', description: 'Attempt full-length timed Reasoning section simulating actual TCS test', link: PRACTICE_LINKS.prepinsta, target: 25, mandatory: true },
      { id: 'd29_english_mock', type: 'mock', category: 'english', title: 'TCS Mock: Verbal Ability Section', description: 'Attempt full-length timed Verbal Ability section simulating actual TCS test', link: PRACTICE_LINKS.prepinsta, target: 20, mandatory: true },
      { id: 'd29_coding_mock', type: 'mock', category: 'coding', title: 'TCS Mock: Coding Section', description: 'Attempt full-length timed coding section with 3 problems simulating actual TCS NQT', link: PRACTICE_LINKS.hackerrank, target: 3, mandatory: true },
      { id: 'd29_quant_revision', type: 'revision', category: 'quant', title: 'Mock Analysis: Quant Mistakes', description: 'Review all wrong/skipped Quant questions, note weak topics', link: null, target: null, mandatory: true },
      { id: 'd29_reasoning_revision', type: 'revision', category: 'reasoning', title: 'Mock Analysis: Reasoning Mistakes', description: 'Review all wrong/skipped Reasoning questions, note weak topics', link: null, target: null, mandatory: true },
      { id: 'd29_english_revision', type: 'revision', category: 'english', title: 'Mock Analysis: English Mistakes', description: 'Review all wrong/skipped English questions, note weak topics', link: null, target: null, mandatory: true },
      { id: 'd29_general_revision', type: 'revision', category: 'general', title: 'Full Mock Analysis & Final Notes', description: 'Complete analysis of mock performance, identify last-minute focus areas', link: null, target: null, mandatory: true }
    ]
  },

  // --- DAY 30 ---
  {
    day: 30,
    phase: 'final',
    phaseLabel: 'Final',
    title: 'Final Revision & Full Assessment',
    tasks: [
      { id: 'd30_quant_revision', type: 'revision', category: 'quant', title: 'Final Quant Revision', description: 'Quick review of all Quant formulas, shortcuts, and weak areas', link: PLAYLISTS.pyqs, target: null, mandatory: true },
      { id: 'd30_reasoning_revision', type: 'revision', category: 'reasoning', title: 'Final Reasoning Revision', description: 'Quick review of all Reasoning techniques, patterns, and weak areas', link: PLAYLISTS.pyqs, target: null, mandatory: true },
      { id: 'd30_english_revision', type: 'revision', category: 'english', title: 'Final English Revision', description: 'Quick review of all English grammar rules, vocabulary, and weak areas', link: PLAYLISTS.pyqs, target: null, mandatory: true },
      { id: 'd30_coding_revision', type: 'revision', category: 'coding', title: 'Final Coding Revision', description: 'Review all coding patterns, key algorithms, and data structures', link: PRACTICE_LINKS.takeuforward, target: null, mandatory: true },
      { id: 'd30_general_revision_1', type: 'revision', category: 'general', title: 'Revise: DBMS, OS, CN, OOPs', description: 'Quick review of all CS fundamentals covered in Days 25-27', link: PRACTICE_LINKS.gfg, target: null, mandatory: true },
      { id: 'd30_general_mock', type: 'mock', category: 'general', title: 'Final Full-Length Mock Test', description: 'Attempt one last complete mock test covering all sections', link: PRACTICE_LINKS.prepinsta, target: null, mandatory: true },
      { id: 'd30_general_revision_2', type: 'revision', category: 'general', title: 'Final Mock Analysis', description: 'Review final mock results and note any remaining weak spots', link: null, target: null, mandatory: true },
      { id: 'd30_general_revision_3', type: 'revision', category: 'general', title: 'Exam Day Preparation', description: 'Prepare documents, check exam center, sleep early, stay confident!', link: null, target: null, mandatory: true }
    ]
  }
];

// ============================================================
// Achievements
// ============================================================

const ACHIEVEMENTS = [
  { id: 'first_task', title: 'First Step', description: 'Complete your first task', icon: 'footprints', xp: 10, condition: 'first_task' },
  { id: 'day_complete', title: 'Day Crusher', description: 'Complete all tasks in a day', icon: 'check-circle', xp: 50, condition: 'day_complete' },
  { id: 'week1', title: 'Week Warrior', description: 'Complete Week 1', icon: 'shield', xp: 150, condition: 'week_complete_1' },
  { id: 'week2', title: 'Fortnight Fighter', description: 'Complete Week 2', icon: 'sword', xp: 150, condition: 'week_complete_2' },
  { id: 'week3', title: 'Triple Threat', description: 'Complete Week 3', icon: 'trophy', xp: 150, condition: 'week_complete_3' },
  { id: 'streak_3', title: 'On Fire', description: '3-day streak', icon: 'flame', xp: 30, condition: 'streak_3' },
  { id: 'streak_7', title: 'Unstoppable', description: '7-day streak', icon: 'zap', xp: 100, condition: 'streak_7' },
  { id: 'streak_14', title: 'Relentless', description: '14-day streak', icon: 'star', xp: 200, condition: 'streak_14' },
  { id: 'streak_30', title: 'Legend', description: '30-day streak', icon: 'crown', xp: 500, condition: 'streak_30' },
  { id: 'quant_50', title: 'Math Whiz', description: 'Solve 50 quant questions', icon: 'calculator', xp: 75, condition: 'quant_50' },
  { id: 'coding_10', title: 'Code Ninja', description: 'Solve 10 coding problems', icon: 'code', xp: 75, condition: 'coding_10' },
  { id: 'coding_30', title: 'Code Master', description: 'Solve 30 coding problems', icon: 'terminal', xp: 200, condition: 'coding_30' },
  { id: 'all_done', title: 'Gold Champion', description: 'Complete all 30 days', icon: 'medal', xp: 1000, condition: 'all_complete' },
  { id: 'hours_10', title: 'Dedicated', description: 'Study 10+ hours', icon: 'clock', xp: 50, condition: 'hours_10' },
  { id: 'hours_50', title: 'Scholar', description: 'Study 50+ hours', icon: 'book-open', xp: 150, condition: 'hours_50' }
];
