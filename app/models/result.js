function Result (opts) {
  if(!opts) opts = {};
  this.title = opts.title || '';
  this.failures = opts.failures || '';
  this.passes = opts.passes || '';
  this.url = opts.url || '';
}

module.exports = Result;

