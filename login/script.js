let form = document.querySelector('form');

form.addEventListener('submit', e=>{
    e.preventDefault();
    let email = document.querySelector('#email').value;
    let password = document.querySelector('#password').value;
    dataObj = {}

    dataObj['email'] = email;
    dataObj['password'] = password;
    console.log(dataObj);
    fetch("https://whitefieldmissions.org/backends/api/post/login.php", {
        method: 'post',
        body: JSON.stringify(dataObj),
        headers: {
            'Content-Type': 'application/json'
        } 
    }).then(function (response){
        return response.json();
    }).then(function (responseData){
        console.log(responseData);
        let status = responseData.status;
        let _token = responseData._token;
        let start_time = responseData.start_time;
        let expiration = responseData.expiration;
        if (responseData.status === 'success') {
          form.submit();
        }
        sessionStorage.setItem('_token', _token);
        sessionStorage.setItem('start_time', start_time);
        sessionStorage.setItem('expiration', expiration);
        console.log(status);
        console.log(_token);
    }).catch(function (error){
        console.log(error);
    })
})
