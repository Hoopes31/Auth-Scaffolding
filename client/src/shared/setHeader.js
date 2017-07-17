
//Create a bit of logic that takes headers and sets them

//Grab Method and set token

export default function setHeader (method, token, body) {
    return {
        method: `${method}`,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                },
                mode: 'cors',
                body: body
    }
} 