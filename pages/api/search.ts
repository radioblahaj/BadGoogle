const { GoogleSearch } = require("google-search-results-nodejs");
const search = new GoogleSearch(process.env.api);

// Workaround to make it work with Promises
// https://github.com/serpapi/google-search-results-nodejs/issues/4
function promisifiedGetJson(params) {
  return new Promise((resolve, reject) => {
    try {
      search.json(params, resolve);
    } catch (e) {
      reject(e);
    }
  });
}




let countries = [
    {
        engine: "google",
        location: "Mexico",
        google_domain: "google.com.mx",
        gl: "mx",
        hl: "es",
        num: "5",
        safe: "active"
    },
    {
        engine: "google",
        location: "Japan",
        google_domain: "google.co.jp",
        gl: "jp",
        hl: "ja",
        num: "5",
        safe: "active"
    },
    {
        engine: "google",
        location: "France",
        google_domain: "google.fr",
        gl: "fr",
        hl: "fr",
        num: "5",
        safe: "active"
    },
    {
        engine: "google",
        location: "Ukraine",
        google_domain: "google.com.ua",
        gl: "ua",
        hl: "uk",
        num: "5",
        safe: "active"
    }
]

const buildParams = (q: string) => {
    return { ...countries[Math.floor(Math.random() * countries.length)], q }
}

// export function getSearchResults(queries) {
//   const promises = queries.map((q) => {
//     const params = {
//         ...buildParams(q),
//       q
//     };

//     return promisifiedGetJson(params);
//   });

//   return Promise.all(promises);
// }


export function getSearchResult(q) {
  const params = {
        ...buildParams(q),
      q
    };

    return promisifiedGetJson(params);

}


export default async function handler(req, res) {
  // const queries = decodeURIComponent(req.query.q).split(",");
  const queries = decodeURIComponent(req.query.q);
  // const searchResults = await getSearchResults(queries);
    // console.log(queries)
    const searchResults = await getSearchResult(queries);
    
    console.log(searchResults)
  res.status(200).json(searchResults);
  res.end();
}