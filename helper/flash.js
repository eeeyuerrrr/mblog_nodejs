
module.exports = {
    getErrorInfo: function (req) {
        var err = req.flash('error');
        return err.length ? err : null;
    },
    setErrorInfo: function(req,errorInfo){
        req.flash('error',errorInfo);
    },
    getSuccessInfo: function (req) {
        var succ = req.flash('success');
        return succ.length ? succ : null;
    },
    setSuccessInfo: function (req,successInfo) {
        req.flash('success',successInfo);
    }
};