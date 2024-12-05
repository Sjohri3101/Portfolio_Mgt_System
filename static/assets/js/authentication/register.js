let dataSet = document.currentScript.dataset;

function sendOtp(sendOtpBtn, otpSent) {
    let email = $('.validate-email').val();
    let errMsg = $('.emailsection .red');
    let infoMsg = $('.emailsection .info');
    if (!email){
        errMsg.text('* Enter a valid email address.');
    } else if (!(email.includes('@') && email.includes('.'))) {
        errMsg.text('* Enter a valid email address.');
    } else {
        errMsg.text('');
        infoMsg.text('');
        $.ajax({
            method: 'post',
            url: dataSet.verifyaccount,
            headers: {'X-CSRFToken': commonDataSet.csrf},
            data: {"email": email},
            success: function(res){
                if (res.status == 'success') {
                    infoMsg.text(res.message);
                    $('.cred-block').css('display', 'block');
                } else if (res.status == 'error') {
                    sendOtpBtn.css('display', 'block');
                    otpSent.css('display', 'none');
                    infoMsg.text('');
                    errMsg.text(res.message);
                }
            },
            error: function(err){
                console.log("sendOtp error:", err);
            }
        });
        sendOtpBtn.css('display', 'none');
        otpSent.css('display', 'block');
        infoMsg.text('Sending OTP...');
        setTimeout(function() {
            sendOtpBtn.css('display', 'block');
            otpSent.css('display', 'none');
            infoMsg.text('');
        }, 200000);
    }
}

$(document).ready(function(){

    // ___________ OTP block _____________
    let sendOtpBtn = $('.sendotpemail');
    let otpSent = $('.otpsent');
    sendOtpBtn.click(function(e){
        sendOtp(sendOtpBtn, otpSent);
    });
    let otpInput = $('.otp-input');
    // move focus on the next input when a digit is entered
    otpInput.on('input', function(){
        let index = otpInput.index(this);
        if ($(this).val().length === 1) {
            if (index < otpInput.length - 1) {
                otpInput.eq(index + 1).focus();
            }
        }
    });
    // move focus to previous input when backspace is pressed
    otpInput.on('keydown', function(event){
        let index = otpInput.index(this);
        if (event.key === 'Backspace' && $(this).val().length === 0) {
            if (index > 0) {
                otpInput.eq(index - 1).focus();
            }
        }
    });

    // __________ region specific phone number block _____________
    initintlTelInput();

    // __________ view password toggle block ___________
    let viewPass = $('.viewpassword');
    viewPass.click(function(e){
        // viewPassword definition in common.js
        viewPassword($(this));
    });
    
    let focusOtp = $('.otpf');
    if (focusOtp.length) {
        $('#submitBtn').click(function(e){
            if (sendOtpBtn.css('display') == 'block') {
                // shake send otp button
                sendOtpBtn.addClass('shake');
                setTimeout(function() {
                    sendOtpBtn.removeClass('shake');
                }, 500);
            }
        });
    }
});