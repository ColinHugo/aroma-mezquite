const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_LIMIT = 10;

function getPagination( query ) {

    let page = Number( query.page ) <= 0 ? DEFAULT_PAGE_NUMBER : Number( query.page );
    let limit = Number( query.limit ) <= 0 ? DEFAULT_PAGE_LIMIT : Number( query.limit );

    isNaN( page ) ? page = DEFAULT_PAGE_NUMBER : page;
    isNaN( limit ) ? limit = DEFAULT_PAGE_LIMIT : limit;

    const skip = ( page - 1 ) * limit;

    return { skip, limit };
}

module.exports = getPagination;