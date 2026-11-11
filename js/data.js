// ============================================================
// TCS 30-Day Preparation Tracker - Data Layer (Verified Links)
// Exact YouTube Videos, Topic-Specific IndiaBix Practice & GFG Coding Problems
// ============================================================

// 1. Verified Individual YouTube Videos (No Playlists, Direct Video URLs)
const VERIFIED_VIDEOS = {
  numberSystem: 'https://www.youtube.com/watch?v=AAEElVLEl8Y',
  percentage: 'https://www.youtube.com/watch?v=r5qJbnp620E',
  completeTcs: 'https://www.youtube.com/watch?v=xMjf7pHPlCg',
  verbal1: 'https://www.youtube.com/watch?v=CiEL4S8NhHg',
  verbal2: 'https://www.youtube.com/watch?v=qmC6b6tOicI',
  verbal4: 'https://www.youtube.com/watch?v=-kQrzVJ6Oh8',
  gfgString1: 'https://www.youtube.com/watch?v=x3_RZbzjvks',
  gfgString2: 'https://www.youtube.com/watch?v=mVzFQaBy6II'
};

// 2. Specific Practice Pages (No Generic Homepages)
const TOPIC_LINKS = {
  problemsOnNumbers: 'https://www.indiabix.com/aptitude/problems-on-numbers/',
  numbers: 'https://www.indiabix.com/aptitude/numbers/',
  percentage: 'https://www.indiabix.com/aptitude/percentage/',
  ratio: 'https://www.indiabix.com/aptitude/ratio-and-proportion/',
  average: 'https://www.indiabix.com/aptitude/average/',
  profitAndLoss: 'https://www.indiabix.com/aptitude/profit-and-loss/',
  timeAndWork: 'https://www.indiabix.com/aptitude/time-and-work/',
  pipesAndCistern: 'https://www.indiabix.com/aptitude/pipes-and-cistern/',
  trains: 'https://www.indiabix.com/aptitude/problems-on-trains/',
  simpleInterest: 'https://www.indiabix.com/aptitude/simple-interest/',
  compoundInterest: 'https://www.indiabix.com/aptitude/compound-interest/',
  permutation: 'https://www.indiabix.com/aptitude/permutation-and-combination/',
  probability: 'https://www.indiabix.com/aptitude/probability/',
  di: 'https://www.indiabix.com/data-interpretation/',
  series: 'https://www.indiabix.com/non-verbal-reasoning/series/',
  numberSeries: 'https://www.indiabix.com/logical-reasoning/number-series/',
  letterSeries: 'https://www.indiabix.com/logical-reasoning/letter-and-symbol-series/',
  syllogism: 'https://www.indiabix.com/verbal-reasoning/syllogism/',
  directionSense: 'https://www.indiabix.com/verbal-reasoning/direction-sense-test/',
  bloodRelations: 'https://www.indiabix.com/verbal-reasoning/blood-relation-test/',
  spottingErrors: 'https://www.indiabix.com/verbal-ability/spotting-errors/',
  gfgGuide: 'https://www.geeksforgeeks.org/interview-prep/tcs-nqt-preparation-guide-2026-videos-mcqs-questions-bank/',
  prepinsta: 'https://prepinsta.com/tcs/',
  takeuforward: 'https://takeuforward.org/blogs/interview-preparation/tcs-nqt-sheet'
};

// 3. Exact Coding Problem URLs on GeeksforGeeks
const CODING_PROBLEMS = {
  gcd: 'https://www.geeksforgeeks.org/problems/gcd-of-two-numbers3459/1',
  prime: 'https://www.geeksforgeeks.org/problems/prime-number2314/1',
  lcm: 'https://www.geeksforgeeks.org/problems/lcm-of-two-numbers/1',
  fibonacci: 'https://www.geeksforgeeks.org/problems/nth-fibonacci-number1335/1',
  sumArray: 'https://www.geeksforgeeks.org/problems/sum-all-array-elements/1',
  largestElement: 'https://www.geeksforgeeks.org/problems/largest-element-in-array4009/1',
  reverseArray: 'https://www.geeksforgeeks.org/problems/reverse-an-array/1',
  secondLargest: 'https://www.geeksforgeeks.org/problems/second-largest3735/1',
  checkSorted: 'https://www.geeksforgeeks.org/problems/check-if-an-array-is-sorted0701/1',
  frequency: 'https://www.geeksforgeeks.org/problems/frequency-of-array-elements-1587115620/1',
  palindrome: 'https://www.geeksforgeeks.org/problems/palindrome-string0817/1',
  anagram: 'https://www.geeksforgeeks.org/problems/anagram-1587115620/1',
  stockBuySell: 'https://www.geeksforgeeks.org/problems/stock-buy-and-sell-1587115621/1',
  rotateArray: 'https://www.geeksforgeeks.org/problems/rotate-array-by-n-elements-1587115621/1',
  missingNumber: 'https://www.geeksforgeeks.org/problems/missing-number-in-array1416/1',
  tripletsZeroSum: 'https://www.geeksforgeeks.org/problems/find-triplets-with-zero-sum/1',
  matrixSnake: 'https://www.geeksforgeeks.org/problems/print-matrix-in-snake-pattern-1587115621/1',
  kadane: 'https://www.geeksforgeeks.org/problems/kadanes-algorithm-1587115620/1',
  sort012: 'https://www.geeksforgeeks.org/problems/sort-an-array-of-0s-1s-and-2s4231/1',
  atoi: 'https://www.geeksforgeeks.org/problems/implement-atoi/1'
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

// 4. Exact 20 Question-Wise Number System Practice Questions (IndiaBix)
const NUMBER_SYSTEM_20_QUESTIONS = [
  { id: 'd1_q1', num: 1, difficulty: 'Easy', text: 'Which one of the following is not a prime number?', url: 'https://www.indiabix.com/aptitude/problems-on-numbers/001001' },
  { id: 'd1_q2', num: 2, difficulty: 'Easy', text: 'How many of the following numbers are divisible by 132 ? 264, 396, 462, 792, 968, 2178, 5184, 6336', url: 'https://www.indiabix.com/aptitude/problems-on-numbers/001002' },
  { id: 'd1_q3', num: 3, difficulty: 'Easy', text: 'Product calculation: 5358 x 51 = ?', url: 'https://www.indiabix.com/aptitude/problems-on-numbers/001003' },
  { id: 'd1_q4', num: 4, difficulty: 'Easy', text: 'If the number 517*324 is completely divisible by 3, find smallest whole number in place of *', url: 'https://www.indiabix.com/aptitude/problems-on-numbers/001004' },
  { id: 'd1_q5', num: 5, difficulty: 'Easy', text: 'Which of the following numbers is divisible by 24 ?', url: 'https://www.indiabix.com/aptitude/problems-on-numbers/001005' },
  { id: 'd1_q6', num: 6, difficulty: 'Easy', text: 'The difference between a positive proper fraction and its reciprocal is 9/20. Find the fraction.', url: 'https://www.indiabix.com/aptitude/problems-on-numbers/001006' },
  { id: 'd1_q7', num: 7, difficulty: 'Easy', text: 'On dividing a number by 5, remainder is 3. What is the remainder when the square of this number is divided by 5 ?', url: 'https://www.indiabix.com/aptitude/problems-on-numbers/001007' },
  { id: 'd1_q8', num: 8, difficulty: 'Medium', text: 'How many 3-digit numbers are divisible by 6 in all ?', url: 'https://www.indiabix.com/aptitude/problems-on-numbers/001008' },
  { id: 'd1_q9', num: 9, difficulty: 'Medium', text: 'On dividing a number by 357, remainder is 39. Dividing the same number by 17, remainder will be?', url: 'https://www.indiabix.com/aptitude/problems-on-numbers/001009' },
  { id: 'd1_q10', num: 10, difficulty: 'Medium', text: 'Successive short division by 5, 9, 13 gives remainders 4, 8, 12. If divided by 585, remainder would be?', url: 'https://www.indiabix.com/aptitude/problems-on-numbers/001010' },
  { id: 'd1_q11', num: 11, difficulty: 'Medium', text: '476**0 is divisible by both 3 and 11. Find the non-zero digits in hundred\'s and ten\'s places.', url: 'https://www.indiabix.com/aptitude/problems-on-numbers/001011' },
  { id: 'd1_q12', num: 12, difficulty: 'Medium', text: 'Fraction expression simplification: 9/4 + 3/17 + 7/15 - 9/4 + 1/17 = ?', url: 'https://www.indiabix.com/aptitude/problems-on-numbers/001012' },
  { id: 'd1_q13', num: 13, difficulty: 'Medium', text: 'When a number is divided by 13, remainder is 11. When divided by 17, remainder is 9. What is the number?', url: 'https://www.indiabix.com/aptitude/problems-on-numbers/001013' },
  { id: 'd1_q14', num: 14, difficulty: 'Medium', text: 'Which of the following numbers is divisible by each one of 3, 7, 9 and 11 ?', url: 'https://www.indiabix.com/aptitude/problems-on-numbers/001014' },
  { id: 'd1_q15', num: 15, difficulty: 'Hard', text: 'Algebraic formula calculation: 397 x 397 + 104 x 104 + 2 x 397 x 104 = ?', url: 'https://www.indiabix.com/aptitude/problems-on-numbers/001015' },
  { id: 'd1_q16', num: 16, difficulty: 'Hard', text: 'A number divided by 6 leaves remainder 3. When the square is divided by 6, the remainder is:', url: 'https://www.indiabix.com/aptitude/problems-on-numbers/001016' },
  { id: 'd1_q17', num: 17, difficulty: 'Hard', text: 'The difference of squares of two consecutive even integers is divisible by which integer?', url: 'https://www.indiabix.com/aptitude/problems-on-numbers/001017' },
  { id: 'd1_q18', num: 18, difficulty: 'Hard', text: 'Which one of the following numbers is completely divisible by 99 ?', url: 'https://www.indiabix.com/aptitude/problems-on-numbers/001018' },
  { id: 'd1_q19', num: 19, difficulty: 'Hard', text: 'Which one of the following is a prime number? (Check 115, 119, 127, etc.)', url: 'https://www.indiabix.com/aptitude/problems-on-numbers/001019' },
  { id: 'd1_q20', num: 20, difficulty: 'Hard', text: 'How many terms are there in the G.P. 3, 6, 12, 24, ... , 384 ?', url: 'https://www.indiabix.com/aptitude/problems-on-numbers/001020' }
];

// Helper to construct Day 1 question tasks
const day1QuestionTasks = NUMBER_SYSTEM_20_QUESTIONS.map(q => ({
  id: q.id,
  type: 'practice',
  category: 'quant',
  title: 'Q' + q.num + ': ' + q.text,
  description: 'Individual IndiaBix Question #' + q.num + ' (Problems on Numbers)',
  link: q.url,
  difficulty: q.difficulty,
  target: 1,
  mandatory: true
}));

// ============================================================
// 30-Day Study Plan with Verified Direct Links
// ============================================================

const STUDY_PLAN = [

  // ===================== PHASE 1: FOUNDATION (Days 1-7) =====================

  // --- DAY 1 ---
  {
    day: 1,
    phase: 'foundation',
    phaseLabel: 'Foundation',
    title: 'Number System, Divisibility & Unit Digit',
    tasks: [
      {
        id: 'd1_quant_lecture',
        type: 'lecture',
        category: 'quant',
        title: 'Quantitative Aptitude: Number System Masterclass',
        description: 'Watch complete Number System lecture by Yash Jain Sir (Knowledge Gate) covering divisibility, unit digit, and prime concepts',
        link: VERIFIED_VIDEOS.numberSystem,
        duration: '1h 45m',
        mandatory: true
      },
      {
        id: 'd1_coding_gcd',
        type: 'coding',
        category: 'coding',
        title: 'Coding: GCD of Two Numbers',
        description: 'Solve GCD of two numbers on GeeksforGeeks',
        link: CODING_PROBLEMS.gcd,
        difficulty: 'Easy',
        target: 1,
        mandatory: true
      },
      {
        id: 'd1_coding_prime',
        type: 'coding',
        category: 'coding',
        title: 'Coding: Prime Number Check',
        description: 'Solve Prime Number verification on GeeksforGeeks',
        link: CODING_PROBLEMS.prime,
        difficulty: 'Easy',
        target: 1,
        mandatory: true
      },
      // 20 Exact IndiaBix Number System Practice Questions
      ...day1QuestionTasks,
      {
        id: 'd1_general_revision',
        type: 'revision',
        category: 'general',
        title: 'Daily Revision & Error Notebook',
        description: 'Review wrong attempts from Q1–20 and record shortcuts & formulas in your error notebook',
        link: null,
        target: null,
        mandatory: true
      }
    ]
  },

  // --- DAY 2 ---
  {
    day: 2,
    phase: 'foundation',
    phaseLabel: 'Foundation',
    title: 'Factors, Multiples, HCF & LCM',
    tasks: [
      {
        id: 'd2_quant_lecture',
        type: 'lecture',
        category: 'quant',
        title: 'Quantitative Aptitude: HCF and LCM Mastery',
        description: 'Watch HCF/LCM lecture section by Yash Jain Sir (Knowledge Gate)',
        link: VERIFIED_VIDEOS.completeTcs,
        duration: '1h 30m',
        mandatory: true
      },
      {
        id: 'd2_quant_practice',
        type: 'practice',
        category: 'quant',
        title: 'Practice: 15 Questions on HCF and LCM',
        description: 'Solve 15 HCF and LCM questions on IndiaBix Numbers section',
        link: TOPIC_LINKS.numbers,
        difficulty: 'Medium',
        target: 15,
        mandatory: true
      },
      {
        id: 'd2_coding_lcm',
        type: 'coding',
        category: 'coding',
        title: 'Coding: LCM of Two Numbers',
        description: 'Solve LCM of two numbers on GeeksforGeeks',
        link: CODING_PROBLEMS.lcm,
        difficulty: 'Easy',
        target: 1,
        mandatory: true
      },
      {
        id: 'd2_coding_gcd_rev',
        type: 'coding',
        category: 'coding',
        title: 'Coding: GCD Revision (Without looking at solution)',
        description: 'Re-implement GCD using Euclidean algorithm on GeeksforGeeks',
        link: CODING_PROBLEMS.gcd,
        difficulty: 'Easy',
        target: 1,
        mandatory: true
      },
      {
        id: 'd2_reasoning_lecture',
        type: 'lecture',
        category: 'reasoning',
        title: 'Logical Reasoning: Coding-Decoding & Pattern Logic',
        description: 'Watch Coding-Decoding reasoning lecture by Yash Jain Sir',
        link: VERIFIED_VIDEOS.completeTcs,
        target: null,
        mandatory: true
      },
      {
        id: 'd2_reasoning_practice',
        type: 'practice',
        category: 'reasoning',
        title: 'Practice: Letter & Symbol Series (15 Questions)',
        description: 'Solve 15 series questions on IndiaBix',
        link: TOPIC_LINKS.letterSeries,
        target: 15,
        mandatory: true
      },
      {
        id: 'd2_english_lecture',
        type: 'lecture',
        category: 'english',
        title: 'Verbal Ability: Articles & Determiners',
        description: 'Watch Articles lecture by Yash Jain Sir (Knowledge Gate)',
        link: VERIFIED_VIDEOS.verbal1,
        target: null,
        mandatory: true
      },
      {
        id: 'd2_english_practice',
        type: 'practice',
        category: 'english',
        title: 'Practice: Spotting Errors on Articles (10 Questions)',
        description: 'Solve 10 error spotting questions on IndiaBix',
        link: TOPIC_LINKS.spottingErrors,
        target: 10,
        mandatory: true
      },
      {
        id: 'd2_general_revision',
        type: 'revision',
        category: 'general',
        title: 'Daily Revision & Error Notebook',
        description: 'Revise HCF/LCM formulas and note tricky question patterns',
        link: null,
        target: null,
        mandatory: true
      }
    ]
  },

  // --- DAY 3 ---
  {
    day: 3,
    phase: 'foundation',
    phaseLabel: 'Foundation',
    title: 'Remainders, Cyclicity & Blood Relations',
    tasks: [
      {
        id: 'd3_quant_lecture',
        type: 'lecture',
        category: 'quant',
        title: 'Quantitative Aptitude: Remainders & Unit Digit Cyclicity',
        description: 'Watch Remainder theorem and cyclicity lecture by Yash Jain Sir (Knowledge Gate)',
        link: VERIFIED_VIDEOS.numberSystem,
        duration: '1h 15m',
        mandatory: true
      },
      {
        id: 'd3_quant_practice',
        type: 'practice',
        category: 'quant',
        title: 'Practice: Problems on Numbers (Q11–20)',
        description: 'Solve questions 11 to 20 on IndiaBix Problems on Numbers',
        link: TOPIC_LINKS.problemsOnNumbers,
        difficulty: 'Hard',
        target: 10,
        mandatory: true
      },
      {
        id: 'd3_coding_fibo',
        type: 'coding',
        category: 'coding',
        title: 'Coding: Nth Fibonacci Number',
        description: 'Solve Nth Fibonacci Number problem on GeeksforGeeks',
        link: CODING_PROBLEMS.fibonacci,
        difficulty: 'Easy',
        target: 1,
        mandatory: true
      },
      {
        id: 'd3_coding_prime_rev',
        type: 'coding',
        category: 'coding',
        title: 'Coding: Prime Number Revision (O(sqrt(N)) logic)',
        description: 'Optimize prime checking logic on GeeksforGeeks',
        link: CODING_PROBLEMS.prime,
        difficulty: 'Easy',
        target: 1,
        mandatory: true
      },
      {
        id: 'd3_reasoning_lecture',
        type: 'lecture',
        category: 'reasoning',
        title: 'Logical Reasoning: Blood Relations Concepts',
        description: 'Watch Blood Relations lecture section by Yash Jain Sir',
        link: VERIFIED_VIDEOS.completeTcs,
        target: null,
        mandatory: true
      },
      {
        id: 'd3_reasoning_practice',
        type: 'practice',
        category: 'reasoning',
        title: 'Practice: Blood Relations (15 Questions)',
        description: 'Solve 15 family tree questions on IndiaBix',
        link: TOPIC_LINKS.bloodRelations,
        target: 15,
        mandatory: true
      },
      {
        id: 'd3_english_lecture',
        type: 'lecture',
        category: 'english',
        title: 'Verbal Ability: Prepositions',
        description: 'Watch Prepositions lecture by Yash Jain Sir (Knowledge Gate)',
        link: VERIFIED_VIDEOS.verbal1,
        target: null,
        mandatory: true
      },
      {
        id: 'd3_english_practice',
        type: 'practice',
        category: 'english',
        title: 'Practice: Spotting Errors on Prepositions (10 Questions)',
        description: 'Solve 10 preposition error questions on IndiaBix',
        link: TOPIC_LINKS.spottingErrors,
        target: 10,
        mandatory: true
      },
      {
        id: 'd3_general_revision',
        type: 'revision',
        category: 'general',
        title: 'Daily Revision & Error Notebook',
        description: 'Revise cyclicity charts (powers of 2, 3, 7, 8) and family tree representations',
        link: null,
        target: null,
        mandatory: true
      }
    ]
  },

  // --- DAY 4 ---
  {
    day: 4,
    phase: 'foundation',
    phaseLabel: 'Foundation',
    title: 'Percentage, Direction Sense & Array Coding',
    tasks: [
      {
        id: 'd4_quant_lecture',
        type: 'lecture',
        category: 'quant',
        title: 'Quantitative Aptitude: Percentage Masterclass',
        description: 'Watch Percentage lecture for TCS NQT 2027 by Yash Jain Sir (Knowledge Gate)',
        link: VERIFIED_VIDEOS.percentage,
        duration: '1h 30m',
        mandatory: true
      },
      {
        id: 'd4_quant_practice',
        type: 'practice',
        category: 'quant',
        title: 'Practice: Percentage Questions (Q1–15)',
        description: 'Solve first 15 questions on IndiaBix Percentage section',
        link: TOPIC_LINKS.percentage,
        difficulty: 'Medium',
        target: 15,
        mandatory: true
      },
      {
        id: 'd4_coding_sum',
        type: 'coding',
        category: 'coding',
        title: 'Coding: Sum of Array',
        description: 'Solve Sum of Array elements on GeeksforGeeks',
        link: CODING_PROBLEMS.sumArray,
        difficulty: 'Easy',
        target: 1,
        mandatory: true
      },
      {
        id: 'd4_coding_largest',
        type: 'coding',
        category: 'coding',
        title: 'Coding: Largest Element in Array',
        description: 'Solve Largest Element in Array on GeeksforGeeks',
        link: CODING_PROBLEMS.largestElement,
        difficulty: 'Easy',
        target: 1,
        mandatory: true
      },
      {
        id: 'd4_reasoning_lecture',
        type: 'lecture',
        category: 'reasoning',
        title: 'Logical Reasoning: Direction Sense',
        description: 'Watch Direction Sense lecture section by Yash Jain Sir',
        link: VERIFIED_VIDEOS.completeTcs,
        target: null,
        mandatory: true
      },
      {
        id: 'd4_reasoning_practice',
        type: 'practice',
        category: 'reasoning',
        title: 'Practice: Direction Sense Test (15 Questions)',
        description: 'Solve 15 direction test problems on IndiaBix',
        link: TOPIC_LINKS.directionSense,
        target: 15,
        mandatory: true
      },
      {
        id: 'd4_english_lecture',
        type: 'lecture',
        category: 'english',
        title: 'Verbal Ability: Tenses',
        description: 'Watch Tenses lecture by Yash Jain Sir (Knowledge Gate)',
        link: VERIFIED_VIDEOS.verbal1,
        target: null,
        mandatory: true
      },
      {
        id: 'd4_english_practice',
        type: 'practice',
        category: 'english',
        title: 'Practice: Spotting Errors on Tenses (10 Questions)',
        description: 'Solve 10 tense-related error spotting questions on IndiaBix',
        link: TOPIC_LINKS.spottingErrors,
        target: 10,
        mandatory: true
      },
      {
        id: 'd4_general_revision',
        type: 'revision',
        category: 'general',
        title: 'Daily Revision & Error Notebook',
        description: 'Revise percentage to fraction conversions (1/2 to 1/16)',
        link: null,
        target: null,
        mandatory: true
      }
    ]
  },

  // --- DAY 5 ---
  {
    day: 5,
    phase: 'foundation',
    phaseLabel: 'Foundation',
    title: 'Ratio & Proportion, Syllogisms & Array Manipulation',
    tasks: [
      {
        id: 'd5_quant_lecture',
        type: 'lecture',
        category: 'quant',
        title: 'Quantitative Aptitude: Ratio and Proportion',
        description: 'Watch Ratio and Proportion lecture section by Yash Jain Sir',
        link: VERIFIED_VIDEOS.completeTcs,
        duration: '1h 15m',
        mandatory: true
      },
      {
        id: 'd5_quant_practice',
        type: 'practice',
        category: 'quant',
        title: 'Practice: Ratio and Proportion (Q1–15)',
        description: 'Solve first 15 ratio questions on IndiaBix',
        link: TOPIC_LINKS.ratio,
        difficulty: 'Medium',
        target: 15,
        mandatory: true
      },
      {
        id: 'd5_coding_rev',
        type: 'coding',
        category: 'coding',
        title: 'Coding: Reverse an Array',
        description: 'Solve Reverse an Array on GeeksforGeeks',
        link: CODING_PROBLEMS.reverseArray,
        difficulty: 'Easy',
        target: 1,
        mandatory: true
      },
      {
        id: 'd5_coding_second_largest',
        type: 'coding',
        category: 'coding',
        title: 'Coding: Second Largest in Array',
        description: 'Solve Second Largest in Array without full sorting on GeeksforGeeks',
        link: CODING_PROBLEMS.secondLargest,
        difficulty: 'Easy',
        target: 1,
        mandatory: true
      },
      {
        id: 'd5_reasoning_lecture',
        type: 'lecture',
        category: 'reasoning',
        title: 'Logical Reasoning: Syllogism Fundamentals',
        description: 'Watch Syllogism lecture section by Yash Jain Sir',
        link: VERIFIED_VIDEOS.completeTcs,
        target: null,
        mandatory: true
      },
      {
        id: 'd5_reasoning_practice',
        type: 'practice',
        category: 'reasoning',
        title: 'Practice: Syllogism (15 Questions)',
        description: 'Solve 15 Venn Diagram & Syllogism questions on IndiaBix',
        link: TOPIC_LINKS.syllogism,
        target: 15,
        mandatory: true
      },
      {
        id: 'd5_english_lecture',
        type: 'lecture',
        category: 'english',
        title: 'Verbal Ability: Error Spotting Techniques',
        description: 'Watch Error Spotting lecture by Yash Jain Sir (Knowledge Gate)',
        link: VERIFIED_VIDEOS.verbal1,
        target: null,
        mandatory: true
      },
      {
        id: 'd5_english_practice',
        type: 'practice',
        category: 'english',
        title: 'Practice: Spotting Errors (10 Questions)',
        description: 'Solve 10 general error questions on IndiaBix',
        link: TOPIC_LINKS.spottingErrors,
        target: 10,
        mandatory: true
      },
      {
        id: 'd5_general_revision',
        type: 'revision',
        category: 'general',
        title: 'Daily Revision & Error Notebook',
        description: 'Revise ratio compounding and syllogism conclusion rules',
        link: null,
        target: null,
        mandatory: true
      }
    ]
  },

  // --- DAY 6 ---
  {
    day: 6,
    phase: 'foundation',
    phaseLabel: 'Foundation',
    title: 'Average, Weighted Average & Array Frequency',
    tasks: [
      {
        id: 'd6_quant_lecture',
        type: 'lecture',
        category: 'quant',
        title: 'Quantitative Aptitude: Average & Weighted Average',
        description: 'Watch Average lecture section by Yash Jain Sir',
        link: VERIFIED_VIDEOS.completeTcs,
        duration: '1h 15m',
        mandatory: true
      },
      {
        id: 'd6_quant_practice',
        type: 'practice',
        category: 'quant',
        title: 'Practice: Average (First 15 Questions)',
        description: 'Solve first 15 questions on IndiaBix Average section',
        link: TOPIC_LINKS.average,
        difficulty: 'Medium',
        target: 15,
        mandatory: true
      },
      {
        id: 'd6_coding_sorted',
        type: 'coding',
        category: 'coding',
        title: 'Coding: Check if Array is Sorted',
        description: 'Solve Check if Array is Sorted on GeeksforGeeks',
        link: CODING_PROBLEMS.checkSorted,
        difficulty: 'Easy',
        target: 1,
        mandatory: true
      },
      {
        id: 'd6_coding_freq',
        type: 'coding',
        category: 'coding',
        title: 'Coding: Frequency of Array Elements',
        description: 'Solve Frequency of Array Elements on GeeksforGeeks',
        link: CODING_PROBLEMS.frequency,
        difficulty: 'Easy',
        target: 1,
        mandatory: true
      },
      {
        id: 'd6_reasoning_lecture',
        type: 'lecture',
        category: 'reasoning',
        title: 'Logical Reasoning: Seating Arrangement & Puzzles',
        description: 'Watch Seating Arrangement lecture section by Yash Jain Sir',
        link: VERIFIED_VIDEOS.completeTcs,
        target: null,
        mandatory: true
      },
      {
        id: 'd6_reasoning_practice',
        type: 'practice',
        category: 'reasoning',
        title: 'Practice: Logical Deduction (15 Questions)',
        description: 'Solve 15 deductive logic questions on IndiaBix',
        link: 'https://www.indiabix.com/logical-reasoning/logical-deduction/',
        target: 15,
        mandatory: true
      },
      {
        id: 'd6_english_lecture',
        type: 'lecture',
        category: 'english',
        title: 'Verbal Ability: Vocabulary & Synonyms',
        description: 'Watch Vocabulary lecture by Yash Jain Sir (Knowledge Gate)',
        link: VERIFIED_VIDEOS.verbal2,
        target: null,
        mandatory: true
      },
      {
        id: 'd6_english_practice',
        type: 'practice',
        category: 'english',
        title: 'Practice: Vocabulary MCQs on GFG TCS Guide',
        description: 'Solve vocabulary questions on GeeksforGeeks TCS NQT Guide',
        link: TOPIC_LINKS.gfgGuide,
        target: 15,
        mandatory: true
      },
      {
        id: 'd6_general_revision',
        type: 'revision',
        category: 'general',
        title: 'Daily Revision & Error Notebook',
        description: 'Revise deviation method for calculating averages quickly',
        link: null,
        target: null,
        mandatory: true
      }
    ]
  },

  // --- DAY 7 ---
  {
    day: 7,
    phase: 'foundation',
    phaseLabel: 'Foundation',
    title: 'Profit & Loss, String Coding & Week 1 Mock',
    tasks: [
      {
        id: 'd7_quant_lecture',
        type: 'lecture',
        category: 'quant',
        title: 'Quantitative Aptitude: Profit, Loss & Discount',
        description: 'Watch Profit & Loss lecture section by Yash Jain Sir',
        link: VERIFIED_VIDEOS.completeTcs,
        duration: '1h 30m',
        mandatory: true
      },
      {
        id: 'd7_quant_practice',
        type: 'practice',
        category: 'quant',
        title: 'Practice: Profit and Loss (Q1–15)',
        description: 'Solve first 15 questions on IndiaBix Profit and Loss',
        link: TOPIC_LINKS.profitAndLoss,
        difficulty: 'Medium',
        target: 15,
        mandatory: true
      },
      {
        id: 'd7_coding_palin',
        type: 'coding',
        category: 'coding',
        title: 'Coding: Palindrome String',
        description: 'Solve Palindrome String on GeeksforGeeks',
        link: CODING_PROBLEMS.palindrome,
        difficulty: 'Easy',
        target: 1,
        mandatory: true
      },
      {
        id: 'd7_coding_anagram',
        type: 'coding',
        category: 'coding',
        title: 'Coding: Anagram Check',
        description: 'Solve Anagram problem on GeeksforGeeks',
        link: CODING_PROBLEMS.anagram,
        difficulty: 'Easy',
        target: 1,
        mandatory: true
      },
      {
        id: 'd7_reasoning_mock',
        type: 'mock',
        category: 'reasoning',
        title: 'Reasoning Section Mini Mock (20 Questions)',
        description: 'Take timed reasoning quiz on IndiaBix',
        link: 'https://www.indiabix.com/logical-reasoning/questions-and-answers/',
        target: 20,
        mandatory: true
      },
      {
        id: 'd7_quant_mock',
        type: 'mock',
        category: 'quant',
        title: 'Weekly Aptitude Mini Mock (25 Questions)',
        description: 'Take timed section mock test on PrepInsta TCS',
        link: TOPIC_LINKS.prepinsta,
        target: 25,
        mandatory: true
      },
      {
        id: 'd7_general_revision',
        type: 'revision',
        category: 'general',
        title: 'Week 1 Foundation Comprehensive Review',
        description: 'Complete analysis of Week 1 mock test results and revise all weak topics',
        link: null,
        target: null,
        mandatory: true
      }
    ]
  },

  // ===================== PHASE 2: INTERMEDIATE (Days 8-14) =====================

  // --- DAY 8 ---
  {
    day: 8,
    phase: 'intermediate',
    phaseLabel: 'Intermediate',
    title: 'Revision & Timed Aptitude Checkpoint',
    tasks: [
      {
        id: 'd8_quant_lecture',
        type: 'lecture',
        category: 'quant',
        title: 'Revision: Quantitative & Reasoning Weak Topics',
        description: 'Review difficult concepts in Yash Jain Sir\'s Complete TCS marathon video',
        link: VERIFIED_VIDEOS.completeTcs,
        target: null,
        mandatory: true
      },
      {
        id: 'd8_quant_practice',
        type: 'practice',
        category: 'quant',
        title: 'Practice: Mixed 30 Questions (10 Number System + 10 % + 10 Ratio)',
        description: 'Solve 30 mixed practice questions on IndiaBix under 40 minutes',
        link: TOPIC_LINKS.problemsOnNumbers,
        difficulty: 'Medium',
        target: 30,
        mandatory: true
      },
      {
        id: 'd8_coding_timed',
        type: 'coding',
        category: 'coding',
        title: 'Coding: Timed Practice (GCD, LCM, Prime & Fibonacci without notes)',
        description: 'Code solutions from scratch on GeeksforGeeks under timed conditions',
        link: CODING_PROBLEMS.gcd,
        difficulty: 'Easy',
        target: 4,
        mandatory: true
      },
      {
        id: 'd8_general_revision',
        type: 'revision',
        category: 'general',
        title: 'Error Notebook Deep Dive',
        description: 'Re-solve every problem flagged as incorrect during Week 1',
        link: null,
        target: null,
        mandatory: true
      }
    ]
  },

  // --- DAY 9 ---
  {
    day: 9,
    phase: 'intermediate',
    phaseLabel: 'Intermediate',
    title: 'Time & Work, Array Rotation & Stock Trading',
    tasks: [
      {
        id: 'd9_quant_lecture',
        type: 'lecture',
        category: 'quant',
        title: 'Quantitative Aptitude: Time & Work (Efficiency & LCM Method)',
        description: 'Watch Time & Work lecture section by Yash Jain Sir',
        link: VERIFIED_VIDEOS.completeTcs,
        duration: '1h 30m',
        mandatory: true
      },
      {
        id: 'd9_quant_practice',
        type: 'practice',
        category: 'quant',
        title: 'Practice: Time and Work (Q1–15)',
        description: 'Solve first 15 questions on IndiaBix Time and Work',
        link: TOPIC_LINKS.timeAndWork,
        difficulty: 'Medium',
        target: 15,
        mandatory: true
      },
      {
        id: 'd9_coding_stock',
        type: 'coding',
        category: 'coding',
        title: 'Coding: Stock Buy and Sell',
        description: 'Solve Stock Buy and Sell problem on GeeksforGeeks',
        link: CODING_PROBLEMS.stockBuySell,
        difficulty: 'Medium',
        target: 1,
        mandatory: true
      },
      {
        id: 'd9_coding_rotate',
        type: 'coding',
        category: 'coding',
        title: 'Coding: Rotate Array by N Elements',
        description: 'Solve Rotate Array by N elements on GeeksforGeeks',
        link: CODING_PROBLEMS.rotateArray,
        difficulty: 'Medium',
        target: 1,
        mandatory: true
      },
      {
        id: 'd9_reasoning_lecture',
        type: 'lecture',
        category: 'reasoning',
        title: 'Logical Reasoning: Logical Deduction',
        description: 'Watch Logical Deduction lecture section by Yash Jain Sir',
        link: VERIFIED_VIDEOS.completeTcs,
        target: null,
        mandatory: true
      },
      {
        id: 'd9_english_lecture',
        type: 'lecture',
        category: 'english',
        title: 'Verbal Ability: Para Jumbles & Sentence Sequencing',
        description: 'Watch Sentence Arrangement lecture by Yash Jain Sir (Knowledge Gate)',
        link: VERIFIED_VIDEOS.verbal4,
        target: null,
        mandatory: true
      },
      {
        id: 'd9_english_practice',
        type: 'practice',
        category: 'english',
        title: 'Practice: Sentence Arrangement on GFG Guide',
        description: 'Practice para jumbles on GeeksforGeeks TCS Guide',
        link: TOPIC_LINKS.gfgGuide,
        target: 10,
        mandatory: true
      },
      {
        id: 'd9_general_revision',
        type: 'revision',
        category: 'general',
        title: 'Daily Revision & Error Notebook',
        description: 'Revise unit work per day formulas and array reversal rotation algorithm',
        link: null,
        target: null,
        mandatory: true
      }
    ]
  },

  // --- DAY 10 ---
  {
    day: 10,
    phase: 'intermediate',
    phaseLabel: 'Intermediate',
    title: 'Pipes & Cisterns, Statement & Conclusion & Day 10 Audit',
    tasks: [
      {
        id: 'd10_quant_lecture',
        type: 'lecture',
        category: 'quant',
        title: 'Quantitative Aptitude: Pipes and Cisterns',
        description: 'Watch Pipes & Cisterns lecture section by Yash Jain Sir',
        link: VERIFIED_VIDEOS.completeTcs,
        duration: '1h 15m',
        mandatory: true
      },
      {
        id: 'd10_quant_practice',
        type: 'practice',
        category: 'quant',
        title: 'Practice: Pipes and Cistern (Q1–15)',
        description: 'Solve first 15 questions on IndiaBix Pipes and Cistern',
        link: TOPIC_LINKS.pipesAndCistern,
        difficulty: 'Medium',
        target: 15,
        mandatory: true
      },
      {
        id: 'd10_coding_reattempt',
        type: 'coding',
        category: 'coding',
        title: 'Coding: Timed Reattempt (Sum of Array + Second Largest)',
        description: 'Re-solve Sum of Array and Second Largest under 15 minutes without looking at solutions',
        link: CODING_PROBLEMS.secondLargest,
        difficulty: 'Easy',
        target: 2,
        mandatory: true
      },
      {
        id: 'd10_reasoning_lecture',
        type: 'lecture',
        category: 'reasoning',
        title: 'Logical Reasoning: Statement and Conclusion',
        description: 'Watch Statement & Conclusion lecture section by Yash Jain Sir',
        link: VERIFIED_VIDEOS.completeTcs,
        target: null,
        mandatory: true
      },
      {
        id: 'd10_english_lecture',
        type: 'lecture',
        category: 'english',
        title: 'Verbal Ability: Reading Comprehension Strategy',
        description: 'Read passage analysis techniques on GeeksforGeeks TCS Guide',
        link: TOPIC_LINKS.gfgGuide,
        target: null,
        mandatory: true
      },
      {
        id: 'd10_english_practice',
        type: 'practice',
        category: 'english',
        title: 'Practice: 2 Reading Comprehension Passages + 10 Questions',
        description: 'Complete 2 full RC passages on GeeksforGeeks Guide',
        link: TOPIC_LINKS.gfgGuide,
        target: 10,
        mandatory: true
      },
      {
        id: 'd10_general_revision',
        type: 'revision',
        category: 'general',
        title: 'Day 10 Milestone Progress Audit',
        description: 'Assess total solved questions: target is 130–150 Aptitude, 18–20 Coding problems',
        link: null,
        target: null,
        mandatory: true
      }
    ]
  },

  // --- DAY 11 ---
  {
    day: 11,
    phase: 'intermediate',
    phaseLabel: 'Intermediate',
    title: 'Time, Speed & Distance, Trains & Missing Number',
    tasks: [
      {
        id: 'd11_quant_lecture',
        type: 'lecture',
        category: 'quant',
        title: 'Quantitative Aptitude: Time, Speed, Distance & Trains',
        description: 'Watch Time & Distance lecture section by Yash Jain Sir',
        link: VERIFIED_VIDEOS.completeTcs,
        duration: '1h 30m',
        mandatory: true
      },
      {
        id: 'd11_quant_practice',
        type: 'practice',
        category: 'quant',
        title: 'Practice: Problems on Trains (15 Questions)',
        description: 'Solve 15 relative speed and train problems on IndiaBix',
        link: TOPIC_LINKS.trains,
        difficulty: 'Medium',
        target: 15,
        mandatory: true
      },
      {
        id: 'd11_coding_missing',
        type: 'coding',
        category: 'coding',
        title: 'Coding: Missing Number in Array',
        description: 'Solve Missing Number in Array on GeeksforGeeks',
        link: CODING_PROBLEMS.missingNumber,
        difficulty: 'Easy',
        target: 1,
        mandatory: true
      },
      {
        id: 'd11_coding_sorted_rev',
        type: 'coding',
        category: 'coding',
        title: 'Coding: Check if Array is Sorted (Timed)',
        description: 'Re-implement sorted array check on GeeksforGeeks',
        link: CODING_PROBLEMS.checkSorted,
        difficulty: 'Easy',
        target: 1,
        mandatory: true
      },
      {
        id: 'd11_reasoning_practice',
        type: 'practice',
        category: 'reasoning',
        title: 'Practice: Puzzles and Logical Deduction (15 Questions)',
        description: 'Solve 15 reasoning puzzle questions on IndiaBix',
        link: 'https://www.indiabix.com/logical-reasoning/logical-deduction/',
        target: 15,
        mandatory: true
      },
      {
        id: 'd11_english_practice',
        type: 'practice',
        category: 'english',
        title: 'Practice: Synonyms & Antonyms (15 Questions)',
        description: 'Solve 15 vocabulary questions on GFG Guide',
        link: TOPIC_LINKS.gfgGuide,
        target: 15,
        mandatory: true
      },
      {
        id: 'd11_general_revision',
        type: 'revision',
        category: 'general',
        title: 'Daily Revision & Error Notebook',
        description: 'Revise relative speed formula (same direction vs opposite direction)',
        link: null,
        target: null,
        mandatory: true
      }
    ]
  },

  // --- DAY 12 ---
  {
    day: 12,
    phase: 'intermediate',
    phaseLabel: 'Intermediate',
    title: 'Simple & Compound Interest & Coding Math',
    tasks: [
      {
        id: 'd12_quant_lecture',
        type: 'lecture',
        category: 'quant',
        title: 'Quantitative Aptitude: Simple & Compound Interest',
        description: 'Watch SI and CI lecture section by Yash Jain Sir',
        link: VERIFIED_VIDEOS.completeTcs,
        duration: '1h 30m',
        mandatory: true
      },
      {
        id: 'd12_quant_practice_si',
        type: 'practice',
        category: 'quant',
        title: 'Practice: Simple Interest (10 Questions)',
        description: 'Solve 10 Simple Interest questions on IndiaBix',
        link: TOPIC_LINKS.simpleInterest,
        difficulty: 'Medium',
        target: 10,
        mandatory: true
      },
      {
        id: 'd12_quant_practice_ci',
        type: 'practice',
        category: 'quant',
        title: 'Practice: Compound Interest (10 Questions)',
        description: 'Solve 10 Compound Interest questions on IndiaBix',
        link: TOPIC_LINKS.compoundInterest,
        difficulty: 'Medium',
        target: 10,
        mandatory: true
      },
      {
        id: 'd12_coding_gcd',
        type: 'coding',
        category: 'coding',
        title: 'Coding: GCD of Two Numbers',
        description: 'Solve GCD on GeeksforGeeks',
        link: CODING_PROBLEMS.gcd,
        difficulty: 'Easy',
        target: 1,
        mandatory: true
      },
      {
        id: 'd12_coding_lcm',
        type: 'coding',
        category: 'coding',
        title: 'Coding: LCM of Two Numbers',
        description: 'Solve LCM on GeeksforGeeks',
        link: CODING_PROBLEMS.lcm,
        difficulty: 'Easy',
        target: 1,
        mandatory: true
      },
      {
        id: 'd12_reasoning_practice',
        type: 'practice',
        category: 'reasoning',
        title: 'Practice: Data Interpretation Basics (1 Set)',
        description: 'Solve 1 complete DI table set on IndiaBix',
        link: TOPIC_LINKS.di,
        target: 5,
        mandatory: true
      },
      {
        id: 'd12_general_revision',
        type: 'revision',
        category: 'general',
        title: 'Daily Revision & Error Notebook',
        description: 'Revise 2-year and 3-year difference formulas between CI and SI',
        link: null,
        target: null,
        mandatory: true
      }
    ]
  },

  // --- DAY 13 ---
  {
    day: 13,
    phase: 'intermediate',
    phaseLabel: 'Intermediate',
    title: 'Permutation & Combination & Triplet Algorithms',
    tasks: [
      {
        id: 'd13_quant_lecture',
        type: 'lecture',
        category: 'quant',
        title: 'Quantitative Aptitude: Permutation & Combination',
        description: 'Watch P&C lecture section by Yash Jain Sir',
        link: VERIFIED_VIDEOS.completeTcs,
        duration: '1h 30m',
        mandatory: true
      },
      {
        id: 'd13_quant_practice',
        type: 'practice',
        category: 'quant',
        title: 'Practice: Permutations and Combinations (12 Questions)',
        description: 'Solve 12 questions on IndiaBix Permutation and Combination',
        link: TOPIC_LINKS.permutation,
        difficulty: 'Hard',
        target: 12,
        mandatory: true
      },
      {
        id: 'd13_coding_triplets',
        type: 'coding',
        category: 'coding',
        title: 'Coding: Find Triplets with Zero Sum',
        description: 'Solve Triplets with Zero Sum on GeeksforGeeks',
        link: CODING_PROBLEMS.tripletsZeroSum,
        difficulty: 'Medium',
        target: 1,
        mandatory: true
      },
      {
        id: 'd13_reasoning_practice',
        type: 'practice',
        category: 'reasoning',
        title: 'Practice: Advanced Reasoning (15 Questions)',
        description: 'Solve 15 questions on IndiaBix Logical Reasoning',
        link: 'https://www.indiabix.com/logical-reasoning/',
        target: 15,
        mandatory: true
      },
      {
        id: 'd13_english_practice',
        type: 'practice',
        category: 'english',
        title: 'Practice: Sentence Completion (15 Questions)',
        description: 'Complete sentence completion questions on GFG Guide',
        link: TOPIC_LINKS.gfgGuide,
        target: 15,
        mandatory: true
      },
      {
        id: 'd13_general_revision',
        type: 'revision',
        category: 'general',
        title: 'Daily Revision & Error Notebook',
        description: 'Revise fundamental principles of counting and circular arrangement rules',
        link: null,
        target: null,
        mandatory: true
      }
    ]
  },

  // --- DAY 14 ---
  {
    day: 14,
    phase: 'intermediate',
    phaseLabel: 'Intermediate',
    title: 'Probability & Full Intermediate Assessment',
    tasks: [
      {
        id: 'd14_quant_lecture',
        type: 'lecture',
        category: 'quant',
        title: 'Quantitative Aptitude: Probability',
        description: 'Watch Probability lecture section by Yash Jain Sir',
        link: VERIFIED_VIDEOS.completeTcs,
        duration: '1h 15m',
        mandatory: true
      },
      {
        id: 'd14_quant_practice',
        type: 'practice',
        category: 'quant',
        title: 'Practice: Probability (15 Questions)',
        description: 'Solve 15 probability questions on IndiaBix',
        link: TOPIC_LINKS.probability,
        difficulty: 'Medium',
        target: 15,
        mandatory: true
      },
      {
        id: 'd14_coding_freq',
        type: 'coding',
        category: 'coding',
        title: 'Coding: Frequencies of Array Elements',
        description: 'Solve Frequency problem on GeeksforGeeks',
        link: CODING_PROBLEMS.frequency,
        difficulty: 'Easy',
        target: 1,
        mandatory: true
      },
      {
        id: 'd14_coding_fibo',
        type: 'coding',
        category: 'coding',
        title: 'Coding: Nth Fibonacci Number',
        description: 'Solve Nth Fibonacci problem on GeeksforGeeks',
        link: CODING_PROBLEMS.fibonacci,
        difficulty: 'Easy',
        target: 1,
        mandatory: true
      },
      {
        id: 'd14_full_mock',
        type: 'mock',
        category: 'general',
        title: 'Intermediate Full Mock Test',
        description: 'Take full-length practice assessment on PrepInsta TCS',
        link: TOPIC_LINKS.prepinsta,
        target: 40,
        mandatory: true
      },
      {
        id: 'd14_general_revision',
        type: 'revision',
        category: 'general',
        title: 'Week 2 Intermediate Review',
        description: 'Log and analyze intermediate assessment scores in your preparation journal',
        link: null,
        target: null,
        mandatory: true
      }
    ]
  },

  // ===================== PHASE 3: ADVANCED (Days 15-21) =====================

  // --- DAY 15 ---
  {
    day: 15,
    phase: 'advanced',
    phaseLabel: 'Advanced',
    title: 'Data Interpretation & Matrix Algorithms',
    tasks: [
      {
        id: 'd15_quant_lecture',
        type: 'lecture',
        category: 'quant',
        title: 'Quantitative Aptitude: Data Interpretation (Tables, Bar & Pie Charts)',
        description: 'Watch DI section by Yash Jain Sir',
        link: VERIFIED_VIDEOS.completeTcs,
        duration: '1h 30m',
        mandatory: true
      },
      {
        id: 'd15_quant_practice',
        type: 'practice',
        category: 'quant',
        title: 'Practice: Data Interpretation (2 Full Sets)',
        description: 'Solve 2 full DI graph sets on IndiaBix',
        link: TOPIC_LINKS.di,
        difficulty: 'Hard',
        target: 10,
        mandatory: true
      },
      {
        id: 'd15_coding_snake',
        type: 'coding',
        category: 'coding',
        title: 'Coding: Print Matrix in Snake Pattern',
        description: 'Solve Matrix Snake Pattern on GeeksforGeeks',
        link: CODING_PROBLEMS.matrixSnake,
        difficulty: 'Easy',
        target: 1,
        mandatory: true
      },
      {
        id: 'd15_coding_sum',
        type: 'coding',
        category: 'coding',
        title: 'Coding: Sum of Array Elements',
        description: 'Solve Sum of Array on GeeksforGeeks',
        link: CODING_PROBLEMS.sumArray,
        difficulty: 'Easy',
        target: 1,
        mandatory: true
      },
      {
        id: 'd15_reasoning_practice',
        type: 'practice',
        category: 'reasoning',
        title: 'Practice: Complex Puzzles (15 Questions)',
        description: 'Solve 15 puzzle problems on IndiaBix',
        link: 'https://www.indiabix.com/logical-reasoning/',
        target: 15,
        mandatory: true
      },
      {
        id: 'd15_english_practice',
        type: 'practice',
        category: 'english',
        title: 'Practice: Advanced Grammar Spotting (15 Questions)',
        description: 'Solve 15 spotting error questions on IndiaBix',
        link: TOPIC_LINKS.spottingErrors,
        target: 15,
        mandatory: true
      },
      {
        id: 'd15_general_revision',
        type: 'revision',
        category: 'general',
        title: 'Daily Revision & Error Notebook',
        description: 'Review calculations shortcuts for percentages in DI sets',
        link: null,
        target: null,
        mandatory: true
      }
    ]
  },

  // --- DAY 16 ---
  {
    day: 16,
    phase: 'advanced',
    phaseLabel: 'Advanced',
    title: 'Series Reasoning & Array Mathematics',
    tasks: [
      {
        id: 'd16_reasoning_lecture',
        type: 'lecture',
        category: 'reasoning',
        title: 'Logical Reasoning: Number & Letter Series Patterns',
        description: 'Study series logic on takeUforward TCS NQT Guide',
        link: TOPIC_LINKS.takeuforward,
        target: null,
        mandatory: true
      },
      {
        id: 'd16_reasoning_practice',
        type: 'practice',
        category: 'reasoning',
        title: 'Practice: Non-Verbal Series (15 Questions)',
        description: 'Solve 15 series pattern questions on IndiaBix',
        link: TOPIC_LINKS.series,
        difficulty: 'Medium',
        target: 15,
        mandatory: true
      },
      {
        id: 'd16_coding_missing',
        type: 'coding',
        category: 'coding',
        title: 'Coding: Missing Number in Array',
        description: 'Solve Missing Number problem on GeeksforGeeks',
        link: CODING_PROBLEMS.missingNumber,
        difficulty: 'Easy',
        target: 1,
        mandatory: true
      },
      {
        id: 'd16_coding_fibo',
        type: 'coding',
        category: 'coding',
        title: 'Coding: Nth Fibonacci Number',
        description: 'Solve Fibonacci on GeeksforGeeks',
        link: CODING_PROBLEMS.fibonacci,
        difficulty: 'Easy',
        target: 1,
        mandatory: true
      },
      {
        id: 'd16_quant_practice',
        type: 'practice',
        category: 'quant',
        title: 'Practice: Data Sufficiency (15 Questions)',
        description: 'Solve 15 Data Sufficiency questions on IndiaBix',
        link: 'https://www.indiabix.com/aptitude/data-sufficiency/',
        target: 15,
        mandatory: true
      },
      {
        id: 'd16_general_revision',
        type: 'revision',
        category: 'general',
        title: 'Daily Revision & Error Notebook',
        description: 'Review common prime, square, and cube differences in series problems',
        link: null,
        target: null,
        mandatory: true
      }
    ]
  },

  // --- DAY 17 ---
  {
    day: 17,
    phase: 'advanced',
    phaseLabel: 'Advanced',
    title: 'Syllogism, Venn Diagrams & Array Logic',
    tasks: [
      {
        id: 'd17_reasoning_lecture',
        type: 'lecture',
        category: 'reasoning',
        title: 'Logical Reasoning: Syllogism & Venn Diagram Mastery',
        description: 'Watch Syllogisms section by Yash Jain Sir',
        link: VERIFIED_VIDEOS.completeTcs,
        target: null,
        mandatory: true
      },
      {
        id: 'd17_reasoning_practice',
        type: 'practice',
        category: 'reasoning',
        title: 'Practice: Syllogism (15 Questions)',
        description: 'Solve 15 Venn Diagram & Syllogism questions on IndiaBix',
        link: TOPIC_LINKS.syllogism,
        difficulty: 'Medium',
        target: 15,
        mandatory: true
      },
      {
        id: 'd17_coding_second',
        type: 'coding',
        category: 'coding',
        title: 'Coding: Second Largest in Array',
        description: 'Solve Second Largest on GeeksforGeeks',
        link: CODING_PROBLEMS.secondLargest,
        difficulty: 'Easy',
        target: 1,
        mandatory: true
      },
      {
        id: 'd17_coding_sorted',
        type: 'coding',
        category: 'coding',
        title: 'Coding: Check if Array is Sorted',
        description: 'Solve Check Sorted Array on GeeksforGeeks',
        link: CODING_PROBLEMS.checkSorted,
        difficulty: 'Easy',
        target: 1,
        mandatory: true
      },
      {
        id: 'd17_quant_practice',
        type: 'practice',
        category: 'quant',
        title: 'Practice: Probability Advanced (15 Questions)',
        description: 'Solve 15 advanced probability questions on IndiaBix',
        link: TOPIC_LINKS.probability,
        target: 15,
        mandatory: true
      },
      {
        id: 'd17_general_revision',
        type: 'revision',
        category: 'general',
        title: 'Daily Revision & Error Notebook',
        description: 'Review "Either-Or" conditions in Syllogisms',
        link: null,
        target: null,
        mandatory: true
      }
    ]
  },

  // --- DAY 18 ---
  {
    day: 18,
    phase: 'advanced',
    phaseLabel: 'Advanced',
    title: 'Alphabet Coding, String Anagrams & Palindromes',
    tasks: [
      {
        id: 'd18_reasoning_lecture',
        type: 'lecture',
        category: 'reasoning',
        title: 'Logical Reasoning: Coding-Decoding & Alphabet Patterns',
        description: 'Study coding & decoding patterns on takeUforward TCS NQT Sheet',
        link: TOPIC_LINKS.takeuforward,
        target: null,
        mandatory: true
      },
      {
        id: 'd18_reasoning_practice',
        type: 'practice',
        category: 'reasoning',
        title: 'Practice: Letter & Symbol Series (15 Questions)',
        description: 'Solve 15 questions on IndiaBix',
        link: TOPIC_LINKS.letterSeries,
        difficulty: 'Medium',
        target: 15,
        mandatory: true
      },
      {
        id: 'd18_coding_palin',
        type: 'coding',
        category: 'coding',
        title: 'Coding: Palindrome String',
        description: 'Solve Palindrome String on GeeksforGeeks',
        link: CODING_PROBLEMS.palindrome,
        difficulty: 'Easy',
        target: 1,
        mandatory: true
      },
      {
        id: 'd18_coding_anagram',
        type: 'coding',
        category: 'coding',
        title: 'Coding: Anagram Check',
        description: 'Solve Anagram problem on GeeksforGeeks',
        link: CODING_PROBLEMS.anagram,
        difficulty: 'Easy',
        target: 1,
        mandatory: true
      },
      {
        id: 'd18_quant_practice',
        type: 'practice',
        category: 'quant',
        title: 'Practice: Permutations & Combinations (15 Questions)',
        description: 'Solve 15 P&C questions on IndiaBix',
        link: TOPIC_LINKS.permutation,
        target: 15,
        mandatory: true
      },
      {
        id: 'd18_general_revision',
        type: 'revision',
        category: 'general',
        title: 'Daily Revision & Error Notebook',
        description: 'Review forward and backward alphabet position values (A=1/Z=26 vs A=26/Z=1)',
        link: null,
        target: null,
        mandatory: true
      }
    ]
  },

  // --- DAY 19 ---
  {
    day: 19,
    phase: 'advanced',
    phaseLabel: 'Advanced',
    title: 'Direction Sense, Blood Relations & Matrix Logic',
    tasks: [
      {
        id: 'd19_reasoning_lecture',
        type: 'lecture',
        category: 'reasoning',
        title: 'Logical Reasoning: Direction Sense & Blood Relations Combined',
        description: 'Watch Direction & Blood Relations section by Yash Jain Sir',
        link: VERIFIED_VIDEOS.completeTcs,
        target: null,
        mandatory: true
      },
      {
        id: 'd19_reasoning_practice_dir',
        type: 'practice',
        category: 'reasoning',
        title: 'Practice: Direction Sense (10 Questions)',
        description: 'Solve 10 direction questions on IndiaBix',
        link: TOPIC_LINKS.directionSense,
        target: 10,
        mandatory: true
      },
      {
        id: 'd19_reasoning_practice_br',
        type: 'practice',
        category: 'reasoning',
        title: 'Practice: Blood Relations (10 Questions)',
        description: 'Solve 10 blood relation questions on IndiaBix',
        link: TOPIC_LINKS.bloodRelations,
        target: 10,
        mandatory: true
      },
      {
        id: 'd19_coding_reverse',
        type: 'coding',
        category: 'coding',
        title: 'Coding: Reverse an Array',
        description: 'Solve Reverse an Array on GeeksforGeeks',
        link: CODING_PROBLEMS.reverseArray,
        difficulty: 'Easy',
        target: 1,
        mandatory: true
      },
      {
        id: 'd19_coding_matrix',
        type: 'coding',
        category: 'coding',
        title: 'Coding: Print Matrix in Snake Pattern',
        description: 'Solve Matrix Snake Pattern on GeeksforGeeks',
        link: CODING_PROBLEMS.matrixSnake,
        difficulty: 'Easy',
        target: 1,
        mandatory: true
      },
      {
        id: 'd19_quant_practice',
        type: 'practice',
        category: 'quant',
        title: 'Practice: Number Theory (15 Questions)',
        description: 'Solve 15 Number Theory questions on IndiaBix',
        link: TOPIC_LINKS.problemsOnNumbers,
        target: 15,
        mandatory: true
      },
      {
        id: 'd19_general_revision',
        type: 'revision',
        category: 'general',
        title: 'Daily Revision & Error Notebook',
        description: 'Review shadow directions at sunrise/sunset and coded relationship symbols',
        link: null,
        target: null,
        mandatory: true
      }
    ]
  },

  // --- DAY 20 ---
  {
    day: 20,
    phase: 'advanced',
    phaseLabel: 'Advanced',
    title: 'Kadane’s Algorithm, Sort 0-1-2 & Day 20 Checkpoint',
    tasks: [
      {
        id: 'd20_reasoning_lecture',
        type: 'lecture',
        category: 'reasoning',
        title: 'Revision: Mixed Logical Reasoning Topics',
        description: 'Review difficult reasoning questions from past TCS papers',
        link: VERIFIED_VIDEOS.completeTcs,
        target: null,
        mandatory: true
      },
      {
        id: 'd20_reasoning_practice',
        type: 'practice',
        category: 'reasoning',
        title: 'Practice: 25 Mixed Reasoning Questions',
        description: 'Solve 25 mixed reasoning questions on IndiaBix',
        link: 'https://www.indiabix.com/logical-reasoning/',
        difficulty: 'Hard',
        target: 25,
        mandatory: true
      },
      {
        id: 'd20_coding_kadane',
        type: 'coding',
        category: 'coding',
        title: 'Coding: Kadane\'s Algorithm (Maximum Subarray Sum)',
        description: 'Solve Kadane\'s Algorithm on GeeksforGeeks',
        link: CODING_PROBLEMS.kadane,
        difficulty: 'Medium',
        target: 1,
        mandatory: true
      },
      {
        id: 'd20_coding_sort012',
        type: 'coding',
        category: 'coding',
        title: 'Coding: Sort an Array of 0s, 1s and 2s (Dutch National Flag)',
        description: 'Solve Sort 0s, 1s and 2s on GeeksforGeeks',
        link: CODING_PROBLEMS.sort012,
        difficulty: 'Medium',
        target: 1,
        mandatory: true
      },
      {
        id: 'd20_checkpoint_mock',
        type: 'mock',
        category: 'general',
        title: 'Day 20 Performance Checkpoint Test',
        description: 'Quant 20Q (25m) + Reasoning 20Q (25m) + Coding 2 problems (60m) on PrepInsta',
        link: TOPIC_LINKS.prepinsta,
        target: 40,
        mandatory: true
      },
      {
        id: 'd20_general_revision',
        type: 'revision',
        category: 'general',
        title: 'Day 20 Audit: 200+ Quant, 100+ Reasoning, 35+ Coding Target Check',
        description: 'Review cumulative preparation metrics and update error notebook',
        link: null,
        target: null,
        mandatory: true
      }
    ]
  },

  // --- DAY 21 ---
  {
    day: 21,
    phase: 'advanced',
    phaseLabel: 'Advanced',
    title: 'Verbal Grammar, Error Spotting & Coding Review',
    tasks: [
      {
        id: 'd21_verbal_lecture',
        type: 'lecture',
        category: 'english',
        title: 'Verbal Ability: Lecture 1 – Grammar, Nouns, Pronouns, Verbs & Error Spotting',
        description: 'Watch Verbal Lecture 1 by Yash Jain Sir (Knowledge Gate)',
        link: VERIFIED_VIDEOS.verbal1,
        duration: '1h 30m',
        mandatory: true
      },
      {
        id: 'd21_verbal_practice',
        type: 'practice',
        category: 'english',
        title: 'Practice: Spotting Errors (Q1–20)',
        description: 'Solve 20 error spotting questions on IndiaBix',
        link: TOPIC_LINKS.spottingErrors,
        difficulty: 'Medium',
        target: 20,
        mandatory: true
      },
      {
        id: 'd21_coding_review',
        type: 'coding',
        category: 'coding',
        title: 'Coding: Array & String Problem Review',
        description: 'Review top 10 TCS coding problems on takeUforward TCS NQT Sheet',
        link: TOPIC_LINKS.takeuforward,
        difficulty: 'Medium',
        target: 2,
        mandatory: true
      },
      {
        id: 'd21_mock_test',
        type: 'mock',
        category: 'general',
        title: 'Full Sectional Mock Test',
        description: 'Take timed verbal + aptitude sectional test on PrepInsta',
        link: TOPIC_LINKS.prepinsta,
        target: 30,
        mandatory: true
      },
      {
        id: 'd21_general_revision',
        type: 'revision',
        category: 'general',
        title: 'Week 3 Advanced Review',
        description: 'Review all grammar rules (Subject-Verb agreement, pronoun case, modifiers)',
        link: null,
        target: null,
        mandatory: true
      }
    ]
  },

  // ===================== PHASE 4: FINAL PREPARATION (Days 22-30) =====================

  // --- DAY 22 ---
  {
    day: 22,
    phase: 'final',
    phaseLabel: 'Final',
    title: 'Vocabulary, Synonyms, Antonyms & Quant Revision',
    tasks: [
      {
        id: 'd22_verbal_lecture',
        type: 'lecture',
        category: 'english',
        title: 'Verbal Ability: Lecture 2 – Vocabulary, Synonyms & Antonyms',
        description: 'Watch Verbal Lecture 2 by Yash Jain Sir (Knowledge Gate)',
        link: VERIFIED_VIDEOS.verbal2,
        duration: '1h 20m',
        mandatory: true
      },
      {
        id: 'd22_verbal_practice',
        type: 'practice',
        category: 'english',
        title: 'Practice: GFG TCS NQT Guide – Vocabulary Practice',
        description: 'Complete vocabulary MCQs on GeeksforGeeks TCS Guide',
        link: TOPIC_LINKS.gfgGuide,
        difficulty: 'Medium',
        target: 20,
        mandatory: true
      },
      {
        id: 'd22_quant_revision',
        type: 'practice',
        category: 'quant',
        title: 'Quantitative Aptitude Revision (30 Mixed Questions)',
        description: 'Solve 30 mixed quantitative aptitude questions on IndiaBix',
        link: 'https://www.indiabix.com/aptitude/questions-and-answers/',
        target: 30,
        mandatory: true
      },
      {
        id: 'd22_coding_practice',
        type: 'coding',
        category: 'coding',
        title: 'Coding: 2 Timed TCS Coding Problems',
        description: 'Solve 2 problems under 45 minutes on takeUforward TCS NQT Sheet',
        link: TOPIC_LINKS.takeuforward,
        difficulty: 'Medium',
        target: 2,
        mandatory: true
      },
      {
        id: 'd22_general_revision',
        type: 'revision',
        category: 'general',
        title: 'Daily Revision & Error Notebook',
        description: 'Review high-frequency root words, prefixes, and suffixes',
        link: null,
        target: null,
        mandatory: true
      }
    ]
  },

  // --- DAY 23 ---
  {
    day: 23,
    phase: 'final',
    phaseLabel: 'Final',
    title: 'Sentence Arrangement, Para Jumbles & Reasoning Drill',
    tasks: [
      {
        id: 'd23_verbal_lecture',
        type: 'lecture',
        category: 'english',
        title: 'Verbal Ability: Lecture 4 – Sentence Arrangement & Correction',
        description: 'Watch Verbal Lecture 4 by Yash Jain Sir (Knowledge Gate)',
        link: VERIFIED_VIDEOS.verbal4,
        duration: '1h 25m',
        mandatory: true
      },
      {
        id: 'd23_verbal_practice',
        type: 'practice',
        category: 'english',
        title: 'Practice: GFG TCS Guide – Sentence and Grammar Practice',
        description: 'Solve sentence correction and grammar MCQs on GeeksforGeeks',
        link: TOPIC_LINKS.gfgGuide,
        difficulty: 'Medium',
        target: 20,
        mandatory: true
      },
      {
        id: 'd23_reasoning_revision',
        type: 'practice',
        category: 'reasoning',
        title: 'Reasoning Revision: 25 Mixed Reasoning Questions',
        description: 'Solve 25 mixed reasoning questions on IndiaBix',
        link: 'https://www.indiabix.com/logical-reasoning/',
        target: 25,
        mandatory: true
      },
      {
        id: 'd23_coding_practice',
        type: 'coding',
        category: 'coding',
        title: 'Coding: String Algorithm Problems',
        description: 'Practice string manipulation problems on takeUforward TCS NQT Sheet',
        link: TOPIC_LINKS.takeuforward,
        difficulty: 'Medium',
        target: 2,
        mandatory: true
      },
      {
        id: 'd23_general_revision',
        type: 'revision',
        category: 'general',
        title: 'Daily Revision & Error Notebook',
        description: 'Review opening sentences, mandatory pairs, and transition words for para jumbles',
        link: null,
        target: null,
        mandatory: true
      }
    ]
  },

  // --- DAY 24 ---
  {
    day: 24,
    phase: 'final',
    phaseLabel: 'Final',
    title: 'Reading Comprehension & Advanced Coding Mock',
    tasks: [
      {
        id: 'd24_verbal_lecture',
        type: 'lecture',
        category: 'english',
        title: 'Reading Comprehension: GFG Passage Analysis & Strategies',
        description: 'Study RC strategies on GeeksforGeeks TCS NQT Guide',
        link: TOPIC_LINKS.gfgGuide,
        target: null,
        mandatory: true
      },
      {
        id: 'd24_verbal_practice',
        type: 'practice',
        category: 'english',
        title: 'Practice: 2 Reading Passages + 20 Questions',
        description: 'Solve 2 complete RC passages on GeeksforGeeks Guide',
        link: TOPIC_LINKS.gfgGuide,
        difficulty: 'Hard',
        target: 20,
        mandatory: true
      },
      {
        id: 'd24_coding_mock',
        type: 'mock',
        category: 'coding',
        title: 'Advanced Coding Mock: 3 Problems under 60 minutes',
        description: 'Complete 3 timed coding problems on takeUforward TCS Sheet',
        link: TOPIC_LINKS.takeuforward,
        difficulty: 'Hard',
        target: 3,
        mandatory: true
      },
      {
        id: 'd24_general_revision',
        type: 'revision',
        category: 'general',
        title: 'Daily Revision: Verbal & Coding Error Log',
        description: 'Record any recurring coding logic traps or tricky RC question types',
        link: null,
        target: null,
        mandatory: true
      }
    ]
  },

  // --- DAY 25 ---
  {
    day: 25,
    phase: 'final',
    phaseLabel: 'Final',
    title: 'GFG String & Array Programming + Core Array Solves',
    tasks: [
      {
        id: 'd25_coding_lecture',
        type: 'lecture',
        category: 'coding',
        title: 'GFG TCS NQT String & Array Programming Masterclass',
        description: 'Watch Programming 05: String 01 by GeeksforGeeks',
        link: VERIFIED_VIDEOS.gfgString1,
        duration: '1h 10m',
        mandatory: true
      },
      {
        id: 'd25_coding_sum',
        type: 'coding',
        category: 'coding',
        title: 'Coding: Sum of Array',
        description: 'Solve Sum of Array on GeeksforGeeks',
        link: CODING_PROBLEMS.sumArray,
        difficulty: 'Easy',
        target: 1,
        mandatory: true
      },
      {
        id: 'd25_coding_largest',
        type: 'coding',
        category: 'coding',
        title: 'Coding: Largest Element in Array',
        description: 'Solve Largest Element in Array on GeeksforGeeks',
        link: CODING_PROBLEMS.largestElement,
        difficulty: 'Easy',
        target: 1,
        mandatory: true
      },
      {
        id: 'd25_coding_second_largest',
        type: 'coding',
        category: 'coding',
        title: 'Coding: Second Largest in Array',
        description: 'Solve Second Largest in Array on GeeksforGeeks',
        link: CODING_PROBLEMS.secondLargest,
        difficulty: 'Easy',
        target: 1,
        mandatory: true
      },
      {
        id: 'd25_coding_reverse',
        type: 'coding',
        category: 'coding',
        title: 'Coding: Reverse an Array',
        description: 'Solve Reverse an Array on GeeksforGeeks',
        link: CODING_PROBLEMS.reverseArray,
        difficulty: 'Easy',
        target: 1,
        mandatory: true
      },
      {
        id: 'd25_cs_dbms',
        type: 'lecture',
        category: 'general',
        title: 'CS Fundamentals: DBMS & SQL Basics',
        description: 'Review SQL queries (JOINs, GROUP BY, HAVING) and normalization on GFG',
        link: TOPIC_LINKS.gfgGuide,
        target: null,
        mandatory: true
      },
      {
        id: 'd25_general_revision',
        type: 'revision',
        category: 'general',
        title: 'Daily Revision & Error Notebook',
        description: 'Review two-pointer array reversal and single-pass second largest logic',
        link: null,
        target: null,
        mandatory: true
      }
    ]
  },

  // --- DAY 26 ---
  {
    day: 26,
    phase: 'final',
    phaseLabel: 'Final',
    title: 'Array Rotations, Stock Buy/Sell & Kadane Algorithm',
    tasks: [
      {
        id: 'd26_coding_lecture',
        type: 'lecture',
        category: 'coding',
        title: 'GFG TCS NQT Preparation Guide: Array 02 & 03',
        description: 'Review Array rotation, Stock Trading & Kadane on GFG Guide',
        link: TOPIC_LINKS.gfgGuide,
        target: null,
        mandatory: true
      },
      {
        id: 'd26_coding_rotate',
        type: 'coding',
        category: 'coding',
        title: 'Coding: Rotate Array by N Elements',
        description: 'Solve Rotate Array on GeeksforGeeks',
        link: CODING_PROBLEMS.rotateArray,
        difficulty: 'Medium',
        target: 1,
        mandatory: true
      },
      {
        id: 'd26_coding_stock',
        type: 'coding',
        category: 'coding',
        title: 'Coding: Stock Buy and Sell',
        description: 'Solve Stock Buy & Sell on GeeksforGeeks',
        link: CODING_PROBLEMS.stockBuySell,
        difficulty: 'Medium',
        target: 1,
        mandatory: true
      },
      {
        id: 'd26_coding_kadane',
        type: 'coding',
        category: 'coding',
        title: 'Coding: Kadane\'s Algorithm (Maximum Subarray Sum)',
        description: 'Solve Kadane\'s Algorithm on GeeksforGeeks',
        link: CODING_PROBLEMS.kadane,
        difficulty: 'Medium',
        target: 1,
        mandatory: true
      },
      {
        id: 'd26_cs_os',
        type: 'lecture',
        category: 'general',
        title: 'CS Fundamentals: Operating Systems Concepts',
        description: 'Review processes, threads, deadlock conditions, and paging on GFG',
        link: TOPIC_LINKS.gfgGuide,
        target: null,
        mandatory: true
      },
      {
        id: 'd26_general_revision',
        type: 'revision',
        category: 'general',
        title: 'Daily Revision & Error Notebook',
        description: 'Review Kadane dynamic programming formulation and array block swap logic',
        link: null,
        target: null,
        mandatory: true
      }
    ]
  },

  // --- DAY 27 ---
  {
    day: 27,
    phase: 'final',
    phaseLabel: 'Final',
    title: 'Strings: Palindrome, Anagram, Atoi & GFG Programming',
    tasks: [
      {
        id: 'd27_coding_lecture_1',
        type: 'lecture',
        category: 'coding',
        title: 'GFG TCS NQT Programming 05: String 01',
        description: 'Watch String 01 lecture by GeeksforGeeks',
        link: VERIFIED_VIDEOS.gfgString1,
        duration: '1h 10m',
        mandatory: true
      },
      {
        id: 'd27_coding_lecture_2',
        type: 'lecture',
        category: 'coding',
        title: 'GFG TCS NQT Programming 06: String 02',
        description: 'Watch String 02 lecture by GeeksforGeeks',
        link: VERIFIED_VIDEOS.gfgString2,
        duration: '1h 05m',
        mandatory: true
      },
      {
        id: 'd27_coding_palin',
        type: 'coding',
        category: 'coding',
        title: 'Coding: Palindrome String',
        description: 'Solve Palindrome String on GeeksforGeeks',
        link: CODING_PROBLEMS.palindrome,
        difficulty: 'Easy',
        target: 1,
        mandatory: true
      },
      {
        id: 'd27_coding_anagram',
        type: 'coding',
        category: 'coding',
        title: 'Coding: Anagram Check',
        description: 'Solve Anagram problem on GeeksforGeeks',
        link: CODING_PROBLEMS.anagram,
        difficulty: 'Easy',
        target: 1,
        mandatory: true
      },
      {
        id: 'd27_coding_atoi',
        type: 'coding',
        category: 'coding',
        title: 'Coding: Implement Atoi',
        description: 'Solve String to Integer (atoi) on GeeksforGeeks',
        link: CODING_PROBLEMS.atoi,
        difficulty: 'Medium',
        target: 1,
        mandatory: true
      },
      {
        id: 'd27_cs_cn_oops',
        type: 'lecture',
        category: 'general',
        title: 'CS Fundamentals: Computer Networks + OOPs',
        description: 'Review OSI layers, TCP/UDP, 4 pillars of OOPs on GFG Guide',
        link: TOPIC_LINKS.gfgGuide,
        target: null,
        mandatory: true
      },
      {
        id: 'd27_general_revision',
        type: 'revision',
        category: 'general',
        title: 'Daily Revision & Error Notebook',
        description: 'Review character frequency array mapping for anagrams and ascii conversions',
        link: null,
        target: null,
        mandatory: true
      }
    ]
  },

  // --- DAY 28 ---
  {
    day: 28,
    phase: 'final',
    phaseLabel: 'Final',
    title: 'Number Theory, Matrix, C++ STL & Interview Prep',
    tasks: [
      {
        id: 'd28_cs_lecture',
        type: 'lecture',
        category: 'general',
        title: 'GFG TCS Guide: Number Theory & Matrix Concepts',
        description: 'Study Number Theory & Matrix sections on GeeksforGeeks TCS Guide',
        link: TOPIC_LINKS.gfgGuide,
        target: null,
        mandatory: true
      },
      {
        id: 'd28_coding_gcd',
        type: 'coding',
        category: 'coding',
        title: 'Coding: GCD of Two Numbers',
        description: 'Solve GCD on GeeksforGeeks',
        link: CODING_PROBLEMS.gcd,
        difficulty: 'Easy',
        target: 1,
        mandatory: true
      },
      {
        id: 'd28_coding_prime',
        type: 'coding',
        category: 'coding',
        title: 'Coding: Prime Number',
        description: 'Solve Prime Number on GeeksforGeeks',
        link: CODING_PROBLEMS.prime,
        difficulty: 'Easy',
        target: 1,
        mandatory: true
      },
      {
        id: 'd28_coding_matrix',
        type: 'coding',
        category: 'coding',
        title: 'Coding: Matrix Snake Pattern',
        description: 'Solve Matrix Snake Pattern on GeeksforGeeks',
        link: CODING_PROBLEMS.matrixSnake,
        difficulty: 'Easy',
        target: 1,
        mandatory: true
      },
      {
        id: 'd28_hr_prep',
        type: 'revision',
        category: 'general',
        title: 'Interview Preparation: HR Round & Project Overview',
        description: 'Practice "Tell me about yourself", project technical hurdles, and why TCS',
        link: null,
        target: null,
        mandatory: true
      },
      {
        id: 'd28_general_revision',
        type: 'revision',
        category: 'general',
        title: 'Final 3-Day Countdown: Error Notebook Full Review',
        description: 'Review every error entry from Day 1 to 27',
        link: null,
        target: null,
        mandatory: true
      }
    ]
  },

  // --- DAY 29 ---
  {
    day: 29,
    phase: 'final',
    phaseLabel: 'Final',
    title: 'Full-Length TCS Mock Assessment (Timed)',
    tasks: [
      {
        id: 'd29_quant_mock',
        type: 'mock',
        category: 'quant',
        title: 'TCS Mock: Quantitative Aptitude (25 Questions)',
        description: 'Attempt full-length timed Quant section on PrepInsta TCS',
        link: TOPIC_LINKS.prepinsta,
        target: 25,
        mandatory: true
      },
      {
        id: 'd29_reasoning_mock',
        type: 'mock',
        category: 'reasoning',
        title: 'TCS Mock: Reasoning Section (25 Questions)',
        description: 'Attempt full-length timed Reasoning section on PrepInsta TCS',
        link: TOPIC_LINKS.prepinsta,
        target: 25,
        mandatory: true
      },
      {
        id: 'd29_english_mock',
        type: 'mock',
        category: 'english',
        title: 'TCS Mock: Verbal Ability Section (25 Questions)',
        description: 'Attempt full-length timed Verbal Ability section on PrepInsta TCS',
        link: TOPIC_LINKS.prepinsta,
        target: 25,
        mandatory: true
      },
      {
        id: 'd29_coding_mock',
        type: 'mock',
        category: 'coding',
        title: 'TCS Mock: 2 Timed Coding Problems',
        description: 'Attempt 2 timed coding problems under 60 minutes on takeUforward TCS Sheet',
        link: TOPIC_LINKS.takeuforward,
        target: 2,
        mandatory: true
      },
      {
        id: 'd29_general_revision',
        type: 'revision',
        category: 'general',
        title: 'Full Mock Test Analysis & Weak Area Fixes',
        description: 'Complete analysis of mock results, diagnose wrong answers, and prepare for Day 30',
        link: null,
        target: null,
        mandatory: true
      }
    ]
  },

  // --- DAY 30 ---
  {
    day: 30,
    phase: 'final',
    phaseLabel: 'Final',
    title: 'Final Revision, Error Correction & Exam Readiness',
    tasks: [
      {
        id: 'd30_quant_revision',
        type: 'revision',
        category: 'quant',
        title: 'Final Quant Revision: Weak Topics & Formula Sheet',
        description: 'Quick re-solve of all questions that were missed during mocks',
        link: TOPIC_LINKS.problemsOnNumbers,
        target: null,
        mandatory: true
      },
      {
        id: 'd30_reasoning_revision',
        type: 'revision',
        category: 'reasoning',
        title: 'Final Reasoning Revision: Puzzles & Patterns',
        description: 'Quick review of tricky syllogisms, blood relation codes, and direction tricks',
        link: 'https://www.indiabix.com/logical-reasoning/',
        target: null,
        mandatory: true
      },
      {
        id: 'd30_english_revision',
        type: 'revision',
        category: 'english',
        title: 'Final Verbal Revision: Grammar Rules & High-Frequency Vocab',
        description: 'Quick scan of grammar error notes and synonym/antonym pairs',
        link: TOPIC_LINKS.spottingErrors,
        target: null,
        mandatory: true
      },
      {
        id: 'd30_coding_revision',
        type: 'coding',
        category: 'coding',
        title: 'Final Coding Reattempt: 2 Problems from takeUforward Sheet',
        description: 'Reattempt 2 problems from takeUforward TCS NQT Sheet with full confidence',
        link: TOPIC_LINKS.takeuforward,
        target: 2,
        mandatory: true
      },
      {
        id: 'd30_general_exam_prep',
        type: 'revision',
        category: 'general',
        title: 'Exam Day Readiness Checklist',
        description: 'Verify admit card, valid photo ID, exam center route, get good sleep, stay calm and confident!',
        link: null,
        target: null,
        mandatory: true
      }
    ]
  }
];

// ============================================================
// Achievements System
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

// Attach to window object for global browser access across modules
if (typeof window !== 'undefined') {
  window.VERIFIED_VIDEOS = VERIFIED_VIDEOS;
  window.TOPIC_LINKS = TOPIC_LINKS;
  window.CODING_PROBLEMS = CODING_PROBLEMS;
  window.NUMBER_SYSTEM_20_QUESTIONS = NUMBER_SYSTEM_20_QUESTIONS;
  window.MOTIVATIONAL_QUOTES = MOTIVATIONAL_QUOTES;
  window.STUDY_PLAN = STUDY_PLAN;
  window.ACHIEVEMENTS = ACHIEVEMENTS;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    VERIFIED_VIDEOS: VERIFIED_VIDEOS,
    TOPIC_LINKS: TOPIC_LINKS,
    CODING_PROBLEMS: CODING_PROBLEMS,
    NUMBER_SYSTEM_20_QUESTIONS: NUMBER_SYSTEM_20_QUESTIONS,
    MOTIVATIONAL_QUOTES: MOTIVATIONAL_QUOTES,
    STUDY_PLAN: STUDY_PLAN,
    ACHIEVEMENTS: ACHIEVEMENTS
  };
}
