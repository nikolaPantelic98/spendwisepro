package com.spendwisepro.common.exception;

/**
 * The CreditCardIconNotFoundException class is a custom exception class that extends the {@link Exception} class.
 * It is used to handle the scenario when a credit card icon is not found.
 */
public class CreditCardIconNotFoundException extends Exception{

    public CreditCardIconNotFoundException(String message) {
        super(message);
    }
}
