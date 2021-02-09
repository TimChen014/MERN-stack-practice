const fetch = require('node-fetch');
var fs = require('fs');
let patientsData = fs.readFileSync('./patients.json');
let ordersData = fs.readFileSync('./orders.json');



function componentDidMount(url, req) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req)
    };
    fetch(url, requestOptions)
};

patientsData = JSON.parse(patientsData);
ordersData = JSON.parse(ordersData);

console.log(patientsData);

patientsData.forEach((patient) => {
    componentDidMount('http://localhost:4000/juboProject/patients', patient)
});

ordersData.forEach((order) => {
    componentDidMount('http://localhost:4000/juboProject/orders', order)
});
