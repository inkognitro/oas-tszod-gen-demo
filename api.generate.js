const {generateOas3ToTs} = require('oas-tszod-gen');
const oas3Specification = require('./api.specs.json');

generateOas3ToTs({
  getSpecification: () => {
    return new Promise(resolve => {
      resolve(oas3Specification);
    });
  },

  outputFolderPath: './src/generated-api',

  logger: {
    log: content => {
      console.log(content);
    },
  },

  withZod: true,

  templates: [
    'AxiosRequestHandler',
    'ResponseExtractors',
    'ZodValidationRequestHandler',
  ],
});
