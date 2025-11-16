// JavaScript Learning Checklist Data for Learning Checkpoint

export const javascriptLearningPlan = [
  {
    day: 1,
    title: "Scopes, Hoisting, TDZ, Execution Context",
    topics: [
      "Global, function, block scope",
      "var vs let vs const",
      "TDZ, creation phase, execution phase",
      "Predict hoisting outputs"
    ]
  },
  {
    day: 2,
    title: "Closures (Deep Dive)",
    topics: [
      "Closure mechanism",
      "Private variables, currying, factories",
      "Implement debounce, throttle, memoize"
    ]
  },
  {
    day: 3,
    title: "Prototypes & Classes",
    topics: [
      "prototype vs __proto__",
      "Constructor functions vs ES6 classes",
      "Implement custom .map()"
    ]
  },
  {
    day: 4,
    title: "this Binding",
    topics: [
      "Global/strict/function mode",
      "Arrow functions",
      "call/apply/bind"
    ]
  },
  {
    day: 5,
    title: "Async JS",
    topics: [
      "Event loop, call stack, micro/macro tasks",
      "Promises, async/await",
      "Custom Promise implementation"
    ]
  },
  {
    day: 6,
    title: "Event Loop Tricky Practice",
    topics: [
      "Promise inside timeout",
      "Await inside loops",
      "Output prediction"
    ]
  },
  {
    day: 7,
    title: "Objects, Copying, Memory",
    topics: [
      "Shallow vs deep copy",
      "StructuredClone",
      "Memory leaks"
    ]
  },
  {
    day: 8,
    title: "Functional JS",
    topics: [
      "Currying, composition",
      "Higher-order functions"
    ]
  },
  {
    day: 9,
    title: "Modules & Bundling",
    topics: [
      "ESM vs CommonJS",
      "Tree shaking",
      "Live bindings"
    ]
  },
  {
    day: 10,
    title: "Browser Concepts",
    topics: [
      "Event propagation",
      "Event delegation",
      "Reflow vs repaint"
    ]
  },
  {
    day: 11,
    title: "Algorithms in JS",
    topics: [
      "Write your own map/filter/reduce",
      "Polifeel",
      "Two pointers, sliding window",
      "Recursion patterns"
    ]
  },
  {
    day: 12,
    title: "JS Design Patterns",
    topics: [
      "Pub/sub, observer, factory, singleton",
      "Redux-like store"
    ]
  },
  {
    day: 13,
    title: "System Design (Frontend JS)",
    topics: [
      "Performance optimization",
      "Bundling strategy",
      "Caching strategy"
    ]
  },
  {
    day: 14,
    title: "Full Mock + Revision",
    topics: [
      "40–50 JS questions",
      "Review closures, async, prototype chain"
    ]
  }
];

export const getTotalTopics = () => {
  return javascriptLearningPlan.reduce((total, day) => total + day.topics.length, 0);
};

export const getDayProgress = (dayNumber, completedTopics) => {
  const day = javascriptLearningPlan.find(d => d.day === dayNumber);
  if (!day) return { completed: 0, total: 0, percentage: 0 };

  const dayTopics = day.topics.length;
  const dayCompleted = day.topics.filter((_, index) => {
    const topicId = `day${dayNumber}_topic${index}`;
    return completedTopics[topicId];
  }).length;

  return {
    completed: dayCompleted,
    total: dayTopics,
    percentage: dayTopics === 0 ? 0 : Math.round((dayCompleted / dayTopics) * 100)
  };
};

export const getOverallProgress = (completedTopics) => {
  const totalTopics = getTotalTopics();
  const completedCount = Object.keys(completedTopics).filter(key => completedTopics[key]).length;

  return {
    completed: completedCount,
    total: totalTopics,
    percentage: totalTopics === 0 ? 0 : Math.round((completedCount / totalTopics) * 100)
  };
};
