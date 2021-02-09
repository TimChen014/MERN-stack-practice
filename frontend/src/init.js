// import React, { useEffect } from "react";
// import patientsData from "./patients.json";
// import ordersData from "./orders.json";

const fetch = require('node-fetch');
var fs = require('fs');
let patientsData = fs.readFileSync('./patients.json');
let ordersData = fs.readFileSync('./orders.json');



function componentDidMount(url, req) {
    // Simple POST request with a JSON body using fetch
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req)
    };
    fetch(url, requestOptions)
        // .then(response => response.json())
        // .then(data => this.setState({ postId: data.id }));
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
