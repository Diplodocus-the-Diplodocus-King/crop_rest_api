const sowingMonthRange = (parameter, key) => {
    const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

    const parameterPos = months.indexOf(parameter.toLowerCase());
    const parseVal = key === 'before' ? -1 : 1;
    let parameterStr = parameter;

    for(let i=parameterPos+parseVal; i < months.length && i >= 0; i+=parseVal){
        parameterStr += `|${months[i]}`;
    }

    const queryStr = new RegExp(parameterStr, 'i');

    return queryStr;
}

const generateDbQuery = (parameter, query, dbQuery) => {
    const primaryQuery = Object.keys(dbQuery);

    if(Object.keys(query).length){
        Object.keys(query).forEach(key => {
            if(key === 'range'){
                const queryStr = sowingMonthRange(parameter, query[`${key}`]);
                dbQuery[`${primaryQuery[0]}`] = queryStr;
            } else {
                const queryItem = new RegExp(query[`${key}`], 'i');
                dbQuery = {...dbQuery, [`${key}`]: queryItem}
            }
        });        
    }

    return dbQuery;
}

exports.generateDbQuery = generateDbQuery;
