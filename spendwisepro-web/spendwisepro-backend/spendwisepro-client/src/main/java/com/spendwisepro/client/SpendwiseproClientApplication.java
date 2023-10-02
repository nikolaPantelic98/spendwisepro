package com.spendwisepro.client;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan("com.spendwisepro.common.entity")
public class SpendwiseproClientApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpendwiseproClientApplication.class, args);
    }

}
