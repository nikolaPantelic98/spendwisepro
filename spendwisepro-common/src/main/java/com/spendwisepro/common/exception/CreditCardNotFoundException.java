package com.spendwisepro.common.exception;

/**
 * The CreditCardNotFoundException class is a custom exception class that extends the {@link Exception} class.
 * It is used to handle situations where a credit card is not found.
 */
public class CreditCardNotFoundException extends Exception{

    public CreditCardNotFoundException(String message) {
        super(message);
    }
}
