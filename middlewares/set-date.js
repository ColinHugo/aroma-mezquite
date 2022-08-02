function setDates( req, res, next ) {

    let { desde, hasta } = req.params;

    desde = new Date( desde ).getTime()
    hasta = new Date( hasta ).getTime() + 86399999;
    
    if ( desde > hasta ) {

        return res.json( {
            value: 0,
            msg: 'Fechas incorrectas, favor de verificarlas.'
        } );
    }

    req.params.desde = desde;
    req.params.hasta = hasta;

    next();
}

module.exports = setDates;