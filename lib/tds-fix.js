// Generated by CoffeeScript 1.9.3
(function() {
  var ex;

  try {
    if (require('tds/package.json').version !== '0.1.0') {
      return;
    }

    /*
    	Fixed typing error in UniqueIdentifier
     */
    require('tds/lib/tds-constants.js').TdsConstants.dataTypesByName.GUIDTYPE.sqlType = 'UniqueIdentifier';
    require('tds').Connection.prototype.setAutoCommit = function(autoCommit, autoCommitCallback) {
    if (this._autoCommit === autoCommit) {
      return autoCommitCallback(); // <- fix here
    } else {
      if (this._currentStatement != null) {
        throw new Error('Cannot change auto commit while statement is executing');
      }
      this._pendingCallback = autoCommitCallback;
      this._currentStatement = '#setAutoCommit';
      if (autoCommit) {
        return this._client.sqlBatch('SET IMPLICIT_TRANSACTIONS OFF');
      } else {
        return this._client.sqlBatch('SET IMPLICIT_TRANSACTIONS ON');
      }
    }
  };;
  } catch (_error) {
    ex = _error;
    console.log(ex);
  }

}).call(this);
