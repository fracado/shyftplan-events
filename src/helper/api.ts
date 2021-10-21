export default function doApiCall(path: string) {
    const url = `https://fyx8bq1lpa.execute-api.eu-central-1.amazonaws.com/Prod/${path}`;
    const username = process.env.REACT_APP_SHYFTPLAN_LOGIN;
    const password = process.env.REACT_APP_SHYFTPLAN_PASSWORD;

    let headers = new Headers();
    headers.set('Authorization', 'Basic ' + Buffer.from(username + ":" + password).toString('base64'));

    return fetch(url, {method:'GET',
        headers: headers,
    })
        .then((response) => response.json())
        .catch((err) => console.log(err));
}
