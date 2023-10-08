package com.spendwisepro.server.files;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Path;
import java.nio.file.Paths;

/**
 * The MvcConfig class is responsible for configuring the Spring MVC resources such category icons
 */
@Configuration
public class MvcConfig implements WebMvcConfigurer {

    /**
     * Registers resource handlers for resources like category icons.
     *
     * @param registry ResourceHandlerRegistry object that contains the resource mappings
     */
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        String categoryIconsDirName = "../category-icons";
        Path categoryIconsDir = Paths.get(categoryIconsDirName);
        String categoryIconsPath = categoryIconsDir.toFile().getAbsolutePath();
        registry.addResourceHandler("/category-icons/**").addResourceLocations("file:/" + categoryIconsPath + "/");
    }
}
