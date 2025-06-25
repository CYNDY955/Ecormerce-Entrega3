function isAdmin(req, res, next) {
    if (req.user?.role === "ADMIN_ROLE") {
        next();
    } else {
        return res.status(403).send({
            ok: false,
            message: "No tiene permiso para acceder a este recurso"
        });
    }
}

module.exports = isAdmin;
