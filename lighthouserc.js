module.exports = {
  ci: {
    collect: {
      staticDistDir: './dist',
    },
    assert: {
      assertions: {
        'categories:seo': ['warn', { minScore: 0.8 }],
        'categories:accessibility': ['error', { minScore: 0.8 }]
      }
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};