module.exports = {
    extends: [
        "next/core-web-vitals",
   
    ],
    plugins: ['@typescript-eslint'],
    rules: {
      'no-multiple-empty-lines': ['error', { max: 1 }],
    },
  };