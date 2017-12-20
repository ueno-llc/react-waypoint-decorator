const defineTransform = (lasso) => {
  lasso.addTransform({
    contentType: 'js',
    name: 'defineTransform',
    stream: false,
    transform: code => code.replace(/process\.env\.NODE_ENV/g, '"production"'),
  });
};

module.exports = {
  lassoConfig: {
    plugins: [
      defineTransform,
    ],
    require: {
      transforms: [
        'lasso-babel-transform',
      ],
    },
  },
};
