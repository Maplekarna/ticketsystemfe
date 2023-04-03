const SERVER_ORIGIN = '';

// 1. login function
const loginUrl = `${SERVER_ORIGIN}/login`;
export const login = (credential) => {

    return fetch(loginUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(credential)
    }).then(
        (response) => {
            if (response.status !== 200) {
                throw Error('Fail to log in');
            }
            return response.json();
        }
    )

}

// 2. register function
const registerUrl = `${SERVER_ORIGIN}/register`;
export const register = (data) => {
    return fetch(registerUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
        .then((response) => {
            if (response.status !== 200) {
                throw Error('Fail to register');
            }
        });

}


// 3. logout function
const logoutUrl = `${SERVER_ORIGIN}/logout`;
export const logout = () => {
    return fetch(logoutUrl, {
        method: 'POST',
        credentials: 'include',
    }).then((response) => {
        if (response.status !== 200) {
            throw Error('Fail to log out');
        }
    })
}

// 4. show movies function
const moviesUrl = `${SERVER_ORIGIN}/movies`;
export const getMovieList = () => {
    return fetch(moviesUrl).then((response) => {
        if (response.status !== 200) {
            throw Error('Fail to get movie list');
        }

        return response.json();
    })
}


// 5. make order function
const makeOrderUrl = `${SERVER_ORIGIN}/makeOrder`;
export const makeOrder = (data) => {
    return fetch(makeOrderUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data)
    }).then((response) => {
        if (response.status !== 200) {
            throw Error('Fail to make order');
        }
    })
}


// 6. show order history function
const historyUrl = `${SERVER_ORIGIN}/orderHistory`;
export const getOrderHistory = () => {
    return fetch(historyUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    }).then((response) => {
        if (response.status !== 200) {
            if (response.status === 403) {
                throw Error('Please login');
            }
            throw Error('Fail to get order history');
        }
        return response.json();
    })
}


// 7. show statistic function
const statisticUrl = `${SERVER_ORIGIN}/statistics`;
export const getStatistic = () => {
    return fetch(statisticUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    }).then((response) => {
        if (response.status !== 200) {
            throw Error('Fail to get statistics');
        }
        return response.json();
    })
}





































