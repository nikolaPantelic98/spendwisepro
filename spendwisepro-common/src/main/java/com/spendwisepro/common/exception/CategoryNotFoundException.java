package com.spendwisepro.common.exception;

/**
 * The CategoryNotFoundException class is a custom exception class that extends the {@link Exception} class.
 * It is used to handle exceptions related to categories that are not found.
 */
public class CategoryNotFoundException extends Exception{

    public CategoryNotFoundException(String message) {
        super(message);
    }
}
