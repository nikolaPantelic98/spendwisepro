package com.spendwisepro.common.exception;

/**
 * The RecordNotFoundException class is a custom exception class that extends the {@link Exception} class.
 * It is used to handle situations where a record is not found.
 */
public class RecordNotFoundException extends Exception{

    public RecordNotFoundException(String message) {
        super(message);
    }
}
