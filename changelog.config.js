const config = require('conventional-changelog-conventionalcommits');

module.exports = config({
  issuePrefixes: ['#'],
  issueUrlFormat: 'https://jira.cms.gov/browse/{{prefix}}{{id}}',
});
