
module.exports = {
    error: function (req) {
        var err = req.flash('error');
        return err.length ? err : null;
    },
    success: function (req) {
        var succ = req.flash('success');
        return succ.length ? succ : null;
    }
};