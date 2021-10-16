// const fetch = require('node-fetch');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

function manejaErros(erro) {
    throw new Error(erro.message);
}

async function checaStatus(arrayURLs) {
    try {
        const arrayDeStatus = await Promise
            .all(arrayURLs
                .map(async url => {
                    const res = await fetch(url);
                    if(res.status === 404) {
                        return `${res.status} - Error`;
                    } else {
                        return `${res.status} - ${res.statusText}`;
                    }
                }))
        return arrayDeStatus;
    } catch (erro) {
        manejaErros(erro)
    }
}

function geraArrayDeURLs(arrayLinks) {
    return arrayLinks
        .map(objetoLink => Object
            .values(objetoLink).join())
}

async function validaURLs(arrayLinks) {
    const links = geraArrayDeURLs(arrayLinks);
    const statusLinks = await checaStatus(links);
    const resultados = arrayLinks
        .map((objeto, indice) => ({
            ...objeto,
            Status: statusLinks[indice]
        }))
    return resultados
}

module.exports = validaURLs;