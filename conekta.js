// Conekta.js Simplified Version for Development
// This is a mock version for testing purposes

(function(window) {
    'use strict';
    
    var Conekta = {
        setPublicKey: function(key) {
            this.publicKey = key;
            console.log('Conekta public key set:', key);
        },
        
        Token: {
            create: function(data, successCallback, errorCallback) {
                console.log('Creating token with data:', data);
                
                // Simulate token creation
                setTimeout(function() {
                    if (data && data.card && data.card.number) {
                        // Generate a mock token ID
                        var tokenId = 'tok_' + Math.random().toString(36).substr(2, 9);
                        
                        var token = {
                            id: tokenId,
                            object: 'token',
                            type: 'card',
                            card: {
                                name: data.card.name,
                                last4: data.card.number.slice(-4),
                                brand: 'visa',
                                exp_month: data.card.exp_month,
                                exp_year: data.card.exp_year
                            }
                        };
                        
                        console.log('Token created successfully:', token);
                        successCallback(token);
                    } else {
                        var error = {
                            message: 'Invalid card data',
                            type: 'parameter_validation_error'
                        };
                        errorCallback(error);
                    }
                }, 1000);
            }
        }
    };
    
    // Expose Conekta globally
    window.Conekta = Conekta;
    
    console.log('Conekta.js loaded successfully');
    
})(window); 