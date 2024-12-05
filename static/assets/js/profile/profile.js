$(document).ready(function(){

    // __________ customer avatar block ______________
    let avtrUpload = document.getElementById('avtr');
    
    $('.avtrbtn').click(function(){
        avtrUpload.click();
    })

    let avtrPreview = document.getElementById('avtr-preview');
    avtrUpload.addEventListener('change', e => {
        if(e.target.files.length > 0) {
            const url = URL.createObjectURL(e.target.files[0]);
            avtrPreview.src = url;
        }
    })

    // __________ edit profile block _____________
    initintlTelInput();  // initialize customer phone number field region specific

    // __________ edit password block ___________
    let viewPass = $('.viewpassword');
    viewPass.click(function(e){
        // viewPassword definition in common.js
        viewPassword($(this));
    });

});