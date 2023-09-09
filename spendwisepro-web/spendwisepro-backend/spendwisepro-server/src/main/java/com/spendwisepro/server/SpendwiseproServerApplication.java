package com.spendwisepro.server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan("com.spendwisepro.common.entity")
public class SpendwiseproServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpendwiseproServerApplication.class, args);
    }

}
