const crypto = require('crypto');
const {default: axios} = require('axios');

let sortObject = (object) => {
    if (object instanceof Array) {
        var sortedObj = [],
            keys = Object.keys(object);
    }
    else {
        sortedObj = {},
            keys = Object.keys(object);
    }

    keys.sort(function (key1, key2) {
        if (key1 < key2) return -1;
        if (key1 > key2) return 1;
        return 0;
    });

    for (var index in keys) {
        var key = keys[index];
        if (typeof object[key] == 'object') {
            if ((object[key] instanceof Array)) {
                sortedObj[key] = sortObject(object[key]);
            }
            sortedObj[key] = sortObject(object[key]);
        } else {
            sortedObj[key] = object[key];
        }
    }
    return sortedObj;
}

let sortQueryParams = (absApiUrl) => {
    var url = absApiUrl.split('?'),
        baseUrl = url[0],
        queryParam = url[1].split('&');

    absApiUrl = baseUrl + '?' + queryParam.sort().join('&');

    return fixedEncodeURIComponent(absApiUrl);
}

let getConcatenateBaseString = (method, url, body = false) => {
    var baseArray = [];
    baseArray.push(method.toUpperCase());
    if (url.indexOf('?') >= 0) {
        baseArray.push(sortQueryParams(url));
    } else {
        baseArray.push(fixedEncodeURIComponent(url));
    }
    if (body !== false) {
        baseArray.push(fixedEncodeURIComponent(JSON.stringify(sortObject(body))));
    }
    return baseArray.join('&');
}

let fixedEncodeURIComponent = (str) => {
    return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
        return '%' + c.charCodeAt(0).toString(16);
    });
}

const getSignatures = (method, url, body = false) => {
    const signingKey = '6fd59feb7effbde5d3c1fba488db6e1a';
    const signature = crypto.createHmac('sha512', signingKey)
        .update(getConcatenateBaseString(
            method, url, body
        )).digest('hex').toString();

    return signature;
}

const getToken = async () => {
    var username = "techtreeapisandboxb2b@woohoo.in";
    var password = "techtreeapisandboxb2b@123";

    var clientId = "d70aad72e6ca71e7d2114a38bfd4630a";
    var clientSecret = "6fd59feb7effbde5d3c1fba488db6e1a";

    const authData = {
        clientId,
        username,
        password,
    };

    const check = await axios.post("https://sandbox.woohoo.in/oauth2/verify", authData)
    
    const tokenData = {
        clientId,
        clientSecret,
        authorizationCode: check.data.authorizationCode,
    };
    
    const token = await axios.post("https://sandbox.woohoo.in/oauth2/token", tokenData)
    return token.data.token;
}

module.exports = {
    getSignatures,
    getToken
}
