package com.spendwisepro.common;

/**
 * The Constants class contains a constant field {@code S3_BASE_URI} that represents the base URI for accessing an S3 bucket in AWS.
 * The value of this field is determined by the environment variables {@code AWS_BUCKET_NAME} and {@code AWS_REGION}.
 */
public class Constants {

    public static final String S3_BASE_URI;

    static {
        String bucketName = System.getenv("AWS_BUCKET_NAME");
        String region = System.getenv("AWS_REGION");
        String pattern = "https://%s.s3.%s.amazonaws.com";

        String uri = String.format(pattern, bucketName, region);

        S3_BASE_URI = bucketName == null ? "" : uri;
    }
}
