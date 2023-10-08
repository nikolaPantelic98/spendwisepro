package com.spendwisepro.server.files;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

public class FileUploadUtil {

    /**
     * Saves the given image file to the specified upload directory.
     *
     * @param uploadDir The directory path to save the file to.
     * @param fileName The name to save the file as.
     * @param multipartFile The file to be saved.
     * @throws IOException if there is an error saving the file.
     */
    public static void saveFile(String uploadDir, String fileName, MultipartFile multipartFile) throws IOException {
        Path uploadPath = Paths.get(uploadDir);

        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        try (InputStream inputStream = multipartFile.getInputStream()) {
            Path filePath = uploadPath.resolve(fileName);
            Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException exception) {
            throw new IOException("Could not save file: " + fileName, exception);
        }
    }

    /**
     * Deletes old file after newest upload under the directory.
     *
     * @param dir The directory path to clean.
     */
    public static void cleanDir(String dir) {
        Path dirPath = Paths.get(dir);

        try {
            Files.list(dirPath).forEach(file -> {
                if (!Files.isDirectory(file)) {
                    try {
                        Files.delete(file);
                    } catch (IOException exception) {
                        System.out.println("Could not delete file: " + file);
                    }
                }
            });
        } catch (IOException exception) {
            System.out.println("Could not list directory: " + dirPath);
        }
    }

    /**
     * Removes the specified directory and all its contents.
     *
     * @param dir The directory path to remove.
     */
    public static void removeDir(String dir) {
        cleanDir(dir);

        try {
            Files.delete(Paths.get(dir));
        } catch (IOException exception) {
            System.out.println("Could not remove directory " + dir);
        }
    }
}
