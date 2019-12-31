import axios from 'axios';

export const addAvis = data => {
    return axios
        .post('api/user/avis', {
            rate: data.rate,
            avis: data.avis,
            title: data.title,
            numCommande: data.numCommande,
            isPublic: data.isPublic,
            selectedDate: data.selectedDate
        }, {
                headers: { 'Content-Type': 'application/json' }
            })
        .then(response => {
            return  response;
        })
        .catch(err => {
            console.log(err.response);
        });
}