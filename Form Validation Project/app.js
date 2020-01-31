document.getElementById('name').addEventListener('blur', validadeName);
document.getElementById('zip').addEventListener('blur', validadeZip);
document.getElementById('email').addEventListener('blur', validadeEmail);
document.getElementById('phone').addEventListener('blur', validadePhone);

function validadeName(){
    const name = document.getElementById('name');
    const re = /ˆ[a-zA-Z]{2,10}$/;
    
    if(!re.test(name.value)){
        console.log(name.value)
        name.classList.add('is-invalid');
        console.log("Invalid Name");
    } else{
        name.classList.remove('is-invalid');
        console.log("Valid Name");
    }
}

function validadeZip(){
    const zip = document.getElementById('zip');
    const re = /ˆ[0-9]{5}(-[0-9]{3})$/;
    
    if(!re.test(zip.value)){
        zip.classList.add('is-invalid');
        console.log("Invalid Zipcode");
    } else{
        zip.classList.remove('is-invalid');
        console.log("Valid Zipcode");
    }
}

function validadeEmail(){
    const email = document.getElementById('email');
    const re = /ˆ([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    
    if(!re.test(email.value)){
        email.classList.add('is-invalid');
        console.log("Invalid Email");
    } else{
        email.classList.remove('is-invalid');
        console.log("Valid Email");
    }
}

function validadePhone(){
    const phone = document.getElementById('phone');
    const re = /ˆ\(?\d{3}\)?[-. ]?\d{3}[-. ]\d{4}$/;

    if(!re.test(phone.value)){
        email.classList.add('is-invalid');
        console.log("Invalid Email");
    } else{
        email.classList.remove('is-invalid');
        console.log("Valid Email");
    }
}
