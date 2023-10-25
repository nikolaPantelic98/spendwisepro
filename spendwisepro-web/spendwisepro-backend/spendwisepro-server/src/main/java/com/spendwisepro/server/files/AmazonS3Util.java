package com.spendwisepro.server.files;

import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.ListIterator;

public class AmazonS3Util {

    private static final String BUCKET_NAME;

    static {
        BUCKET_NAME = System.getenv("AWS_BUCKET_NAME");
    }

    /**
     * Lists all keys (file names) in a specific folder of the S3 bucket.
     *
     * @param folderName The name of the folder in the S3 bucket.
     * @return A list of file names in the specified folder.
     */
    public static List<String> listFolder(String folderName) {
        S3Client client = S3Client.builder().build();
        ListObjectsRequest listRequest = ListObjectsRequest.builder()
                .bucket(BUCKET_NAME).prefix(folderName).build();

        ListObjectsResponse response = client.listObjects(listRequest);

        List<S3Object> contents = response.contents();

        ListIterator<S3Object> listIterator = contents.listIterator();

        List<String> listKeys = new ArrayList<>();

        while (listIterator.hasNext()) {
            S3Object object = listIterator.next();
            listKeys.add(object.key());
        }

        return listKeys;
    }

    /**
     * Uploads a file to the specified folder in the S3 bucket.
     *
     * @param folderName   The name of the folder in the S3 bucket.
     * @param fileName     The name of the file to be uploaded.
     * @param inputStream The input stream of the file to be uploaded.
     * @throws IOException If an I/O error occurs during the upload process.
     */
    public static void uploadFile(String folderName, String fileName, InputStream inputStream) throws IOException {
        S3Client client = S3Client.builder().build();

        PutObjectRequest request = PutObjectRequest.builder().bucket(BUCKET_NAME)
                .key(folderName + "/" + fileName).acl("public-read").build();
        try (inputStream) {
            int contentLength = inputStream.available();
            client.putObject(request, RequestBody.fromInputStream(inputStream, contentLength));
        } catch (IOException exception) {
            throw new IOException("Could not upload file to Amazon S3: " + fileName, exception);
        }
    }

    /**
     * Deletes a file from the S3 bucket.
     *
     * @param fileName The name of the file to be deleted.
     */
    public static void deleteFile(String fileName) {
        S3Client client = S3Client.builder().build();

        DeleteObjectRequest request = DeleteObjectRequest.builder().bucket(BUCKET_NAME)
                .key(fileName).build();
        client.deleteObject(request);
    }

    /**
     * Removes a folder and all its contents from the S3 bucket.
     * This method deletes all files within the specified folder.
     *
     * @param folderName The name of the folder to be removed.
     */
    public static void removeFolder(String folderName) {
        S3Client client = S3Client.builder().build();
        ListObjectsRequest listRequest = ListObjectsRequest.builder()
                .bucket(BUCKET_NAME).prefix(folderName + "/").build();

        ListObjectsResponse response = client.listObjects(listRequest);

        List<S3Object> contents = response.contents();

        ListIterator<S3Object> listIterator = contents.listIterator();

        while (listIterator.hasNext()) {
            S3Object object = listIterator.next();
            DeleteObjectRequest request = DeleteObjectRequest.builder().bucket(BUCKET_NAME)
                    .key(object.key()).build();
            client.deleteObject(request);
            System.out.println("Deleted " + object.key());
        }
    }
}
