import axios from "axios";

const getData = (endpoint, headers, setData, errorMsg) => {
    axios.get(`http://localhost:8000/spendwisepro${endpoint}`, { headers })
        .then(response => {
            setData(response.data);
        })
        .catch(error => {
            console.error(`${errorMsg}:`, error);
        });
};

export default getData;