$(document).ready(function() {
    $('#password').keyup(function() {
    $('#result').html(checkStrength($('#password').val()))
    })

    function checkStrength(password) {
        var strength = 0
        if (password.length < 6) {
            $('#result').removeClass()
            $('#result').addClass('short')
            return 'Terlalu Pendek'
        }
        if (password.length > 7) strength += 1
        // Jika kata sandi berisi karakter huruf besar dan kecil, tingkatkan nilai kekuatannya.
        if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) strength += 1
        // Jika memiliki angka dan karakter, tingkatkan nilai kekuatan.
        if (password.match(/([a-zA-Z])/) && password.match(/([0-9])/)) strength += 1
        // Jika memiliki satu karakter khusus, tingkatkan nilai kekuatan.
        if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) strength += 1
        // Jika memiliki dua karakter khusus, tingkatkan nilai kekuatan
        if (password.match(/(.*[!,%,&,@,#,$,^,*,?,_,~].*[!,%,&,@,#,$,^,*,?,_,~])/)) strength += 1
        // Cek nilai kekuatan, kita dapat memberikan pesan
        // Jika nilainya kurang dari 2
        if (strength < 2) {
            $('#result').removeClass()
            $('#result').addClass('weak')
            return 'Lemah'
        } else if (strength == 2) {
            $('#result').removeClass()
            $('#result').addClass('good')
            return 'Bagus'
        } else {
            $('#result').removeClass()
            $('#result').addClass('strong')
            return 'Kuat'
        }
    }
    });