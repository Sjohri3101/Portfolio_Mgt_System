var country_code = document.currentScript.dataset.region

var input = document.querySelector("input[name='phone']");
if (input){
    var iti = window.intlTelInput(input, {
    initialCountry: country_code,
    formatOnDisplay: false,
    hiddenInput: "full_phone",
    // onlyCountries: ["AU", "CA", "US", "GB", "NZ"],
    preferredCountries: ["AU", "CA", "US", "GB", "NZ"],
    separateDialCode: true,
    // utilsScript: "/static/vendor/libs/intelinput/js/utils.js"
    });
    ['countrychange','keyup'].forEach( function(evt) {
        input.addEventListener(evt, function() {
            var error_field = document.querySelector("#phone_error");
            error_field.innerHTML = "";
            var number = iti.getNumber();
            if(iti.isValidNumber()){
                $("#submitBtn").prop("disabled", false);
            }else{
                const error = iti.getValidationError();
                const errorMap = ["Invalid number", "Invalid country code", "Too short", "Too long", "Invalid number"];
                error_field.innerHTML = errorMap[error]?errorMap[error]:"";
                $("#submitBtn").prop("disabled", true);
            }
            if (number != ''){
                iti.setNumber(number);
                document.querySelector("input[name='full_phone']").value = number;          
            }
        });
    });
}
function fill_full_number(){
    var input = document.querySelector("input[name='full_phone']");
    input.value = iti.getNumber();
}
function removeSpaces(string) {
    return string.split(' ').join('');
}