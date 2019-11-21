function getTruckIdsCallback(callback) {
    setTimeout(() => {
        callback([1, 2, 5, 9, 67]);
    }, 10)
}

function getTruckIds() {
    return new Promise((resolve => {
        getTruckIdsCallback(result => resolve(result));
    }));
}

function getTruckByIdCallback(id, callback) {
    setTimeout(() => {
        const isError = Math.ceil(Math.random() * 1000) < 500;
        if (isError) {
            return callback(undefined, "Internal error");
        }
        callback({
            id: id,
            model: `truck ${id}`
        });
    })
}

function getTruckById(id) {
    //Please implemented this method use getTruckByIdCallback
    return new Promise(function (resolve, reject) {
        getTruckByIdCallback(id, function (obj, error) {
            if (obj) {
                resolve(obj);
            } else if (error) {
                reject(error);
            }
        })
    })
}

// callback(list, err)
// list - list of trucks
function getTruckListCallback(callback) {
    const truckList = [];
    let idList = callback();
    idList.then(
        result => {
            return result.forEach(el => {
                return getTruckByIdCallback(el, function (obj, error) {
                    if (obj) {
                        truckList.push(obj);
                    } else if (error) {
                        getTruckByIdCallback(el, function (obj, error) {
                            if (obj) {
                                truckList.push(obj);
                            } else {
                                truckList.push(error);
                            }
                        })
                    }
                })
            })
        }
    )
    return truckList;
}

// test the function
console.log(`%c getTruckListCallback: `, 'color:purple;font-size:14px');
console.log(getTruckListCallback(getTruckIds));


function getTruckListPromise() {
    return new Promise(((resolve, reject) => {
        var listOfTrucks = [];
        getTruckIds()
            .then(
                listOfId => listOfId.forEach(id => {
                    getTruckById(id)
                        .then(x => (listOfTrucks.push(x)))
                        .catch(() => {
                            getTruckById(id)
                                .then(x => listOfTrucks.push(x))
                                .catch(y => y)
                            // .catch(y => console.log(y, `Truck with id: ${id} is not available`))
                        })
                })
            );

        resolve(listOfTrucks);
    }))
}

// test the function
console.log(`%c getTruckListPromise: `, 'color:Magenta;font-size:14px');
getTruckListPromise()
    .then(x => console.log(x))
    .catch(y => console.log(`%c ${y}`, 'color:crimson'));


async function getTruckListAsyncAwait() {

    const idList = await getTruckIds();
    const result = [];

    idList.forEach(id => {
            getTruckById(id)
                .then(x => result.push(x))
                .catch(() => getTruckById(id)
                    .then(y => result.push(y))
                    .catch(() => result.push(`Truck with id: ${id} is not available`))
                )
        }
    )
    return result;
}

// test the function
getTruckListAsyncAwait()
    .then(x => {
        console.log(`%c getTruckListAsyncAwait: `, 'color:MediumAquamarine;font-size:14px');
        console.log(x);
    })
    .catch(console.log);