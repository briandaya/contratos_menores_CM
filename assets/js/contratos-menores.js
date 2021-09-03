function ValidateFormMecenas() {
    var numerr = 0;

    var doc_id = document.getElementById("doc_id");
    var doc_id_error = document.getElementById("doc_id_error");
    var errDoc_Id = validateDoc_Id(doc_id);
    // Formato del error y mensaje
    if (errDoc_Id == 1) {
        doc_id.style.border = '1px solid var(--bs-red)';
        doc_id_error.style.display = "block";
        doc_id_error.innerHTML = "Introduzca un DNI/NIE/NIF válido"
    } else {
        doc_id.style.border = '1px solid #ced4da';
        doc_id_error.style.display = "none";

    }
    
    numerr += errDoc_Id;
    
    if (numerr > 0) {
        return false;
    }
    return false;
}


function validateDisclaimer(disclaimer) {
    var error = "";

    if (document.getElementById("disclaimer").checked === false) {
        document.getElementById('disclaimer-error').innerHTML = "Required";
        var error = "4";
    } else {
        document.getElementById('disclaimer-error').innerHTML = '';
    }
    return error;
}

/**
 * Validación de DNI/NIF/NIE
 * Adaptación de https://gist.github.com/afgomez/5691823
 */

function validateDoc_Id(doc_id) {
    'use strict';
  
    var DNI_REGEX = /^(\d{8})([A-Z])$/;
    var CIF_REGEX = /^([ABCDEFGHJKLMNPQRSUVW])(\d{7})([0-9A-J])$/;
    var NIE_REGEX = /^[XYZ]\d{7,8}[A-Z]$/;
    
    // Mayúsculas y espacios en blanco
    var str = doc_id.value.replace(/\s/, '').toUpperCase();

    var valid = false;

    if ( str.match( DNI_REGEX ) || str.match( NIE_REGEX ) ) {
        // Si es un NIE (XYZ) se convierte a formato DNI y se valida
        var nie_prefix = str.charAt( 0 );
        switch (nie_prefix) {
          case 'X': str = 0 + str.substr(1); break;
          case 'Y': str = 1 + str.substr(1); break;
          case 'Z': str = 2 + str.substr(1); break;
        }
        // Validación DNI
        var dni_letters = "TRWAGMYFPDXBNJZSQVHLCKE";
        var letter = dni_letters.charAt( parseInt( str, 10 ) % 23 );
        
        valid = (letter == str.charAt(8));
    }
    
    if ( str.match( CIF_REGEX ) ) {
        var match = cif.match( CIF_REGEX );
        var letter  = match[1],
            number  = match[2],
            control = match[3];
        
        var even_sum = 0;
        var odd_sum = 0;
        var n;
    
        for ( var i = 0; i < number.length; i++) {
            n = parseInt( number[i], 10 );
            // Odd positions (Even index equals to odd position. i=0 equals first position)
            if ( i % 2 === 0 ) {
                n *= 2;
                odd_sum += n < 10 ? n : n - 9;
            } else {
                even_sum += n;
            }
        }

        var control_digit = (10 - (even_sum + odd_sum).toString().substr(-1) );
        var control_letter = 'JABCDEFGHI'.substr( control_digit, 1 );

        // Control must be a digit
        if ( letter.match( /[ABEH]/ ) ) {
          valid = (control == control_digit);

        // Control must be a letter
        } else if ( letter.match( /[KPQS]/ ) ) {
          valid = (control == control_letter);

        // Can be either
        } else {
          valid = (control == control_digit || control == control_letter);
        }
        
    }
    
    if (valid) {
        return 0;
    } else {
        return 1;
    }

}


