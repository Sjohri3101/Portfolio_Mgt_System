// this file includes common js functionalities used throughout stocknextt project
let commonDataSet = document.currentScript.dataset;
$(document).ready(function() {
    $("#id_country").on('change', function () {
        let region = $(this).find(":selected").val();
        $('#id_state').html('<option value="">----</option>');
        if (region !== '') {
            loadState(region);
        }
    });

    $('#id_country').ready(function () {
        let region = $(this).find(":selected").val();
        if (region !== '') {
            $('#id_state').html('<option value="">----</option>');
            loadState(region);
        }
    });
});

function loadState(region) {
    $.ajax({
        url: commonDataSet.getstate,
        data: {region},
        dataType: 'JSON',
        success: (data) => {
            data.states.forEach(element => {
                let opt = $("<option></option>");
                opt.attr("value", element.state_code);
                if (element.state_code === data.selected)
                    opt.attr("selected", true);
                opt.text(element.title);
                $('#id_state').append(opt); 
            });
        }
    });
}

function toggleMenu() {
    if (window.innerWidth < 992) {
        const menu = document.querySelector('.headermenu');
        menu.style.left = menu.style.left === '0px' ? '-250px' : '0px';
    }
}
function toggleDropdown() {
    var dropdown = document.getElementById("myDropdown");
    var dropdownButton = document.getElementById("dropdownButton");
    dropdown.classList.toggle("show");
    dropdownButton.classList.toggle("show-dropdown");
}

//_____________ show password / hide password toggle block __________________
function viewPassword(pass) {
    //find the closest child class to hide show passowrd fields by Rahul kumar
        let hidePass = pass.children('.fa-eye-slash');
        let showPass = pass.children('.fa-eye');
        let pswd = pass.closest('.formfield').find('.pswd');
    
    if (hidePass.css('display') == 'block'){
        hidePass.css('display', 'none');
        showPass.css('display', 'block');
        pswd.prop('type', 'text');
    } else {
        showPass.css('display', 'none');
        hidePass.css('display', 'block');
        pswd.prop('type', 'password');
    }
}

// _______________ intltelinput js block ______________________
function initintlTelInput() {
    // initialize phone field with initlTelInput library
    let input = document.querySelector("#phone");
    if (input) {
        let iti = window.intlTelInput(input, {
            preferredCountries: ['au', 'gb', 'ca', 'nz', 'us'],
            initialCountry: (commonDataSet.region) ? commonDataSet.region : 'ca',
            hiddenInput: function(telInputName) {
                return {
                    phone: 'geo_phone'
                };
            },
            utilsScript: commonDataSet.utilsscript,
        });
        let submitBtn = $('#submitBtn');
        let phoneError = document.getElementById('phone-error');
        ['countrychange', 'keyup'].forEach(function(evt) {
            input.addEventListener(evt, function() {
                phoneError.innerHTML = '';
                if(iti.isValidNumber()){
                    submitBtn.prop('disabled', false);
                } else {
                    let error = iti.getValidationError();
                    const errorMap = ['Invalid number', 'Invalid country code', 'Too short', 'Too long', 'Invalid number'];
                    phoneError.innerHTML = errorMap[error]?errorMap[error]:"";
                    submitBtn.prop('disabled', true);
                }
            });
        });
    } else {
        console.log('intl-tel-input initialization failed');
    }
}








// $('.digit-group').find('input').each(function() {
//     $(this).attr('maxlength', 1);
//     $(this).on('keydown', function(e) {
//         var key = e.which || e.keyCode;
//         var shift = e.shiftKey;
//         if (!((key >= 48 && key <= 57) || // Numeric keys
//               (key >= 96 && key <= 105) || // Numeric keypad keys
//               key === 8 || // Backspace
//               key === 9 || // Tab
//               key === 37 || // Left arrow
//               key === 39 || // Right arrow
//               (!shift && (key === 190 || key === 110)))) { // Period (.)
//             e.preventDefault();
//         }
//     });

//     $(this).on('keyup', function(e) {
//         var parent = $($(this).parent());

//         if (e.keyCode === 8 || e.keyCode === 37) {
//             var prev = parent.find('input#' + $(this).data('previous'));

//             if (prev.length) {
//                 $(prev).select();
//             }
//         } else if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105) || e.keyCode === 39) {
//             var next = parent.find('input#' + $(this).data('next'));

//             if (next.length) {
//                 $(next).select();
//             } else {
//                 if (parent.data('autosubmit')) {
//                     parent.submit();
//                 }
//             }
//         }
//     });
// });