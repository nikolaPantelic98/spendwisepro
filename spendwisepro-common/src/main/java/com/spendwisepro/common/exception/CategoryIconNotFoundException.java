package com.spendwisepro.common.exception;

/**
 * The CategoryIconNotFoundException class is a custom exception class that extends the {@link Exception} class.
 * It is used to handle situations where a category icon is not found.
 */
public class CategoryIconNotFoundException extends Exception{

    public CategoryIconNotFoundException(String message) {
        super(message);
    }
}
