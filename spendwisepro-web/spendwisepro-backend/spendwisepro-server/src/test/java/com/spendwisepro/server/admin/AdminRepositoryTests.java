package com.spendwisepro.server.admin;

import com.spendwisepro.common.entity.Admin;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Rollback(value = false)
public class AdminRepositoryTests {

    @Autowired
    private AdminRepository adminRepository;

    @Test
    @Disabled
    public void testListAllAdmins() {
        Iterable<Admin> listAdmins = adminRepository.findAll();
        listAdmins.forEach(System.out::println);
    }

    @Test
    @Disabled
    public void testGetAdminById() {
        Admin admin = adminRepository.findById(1L).get();
        System.out.println(admin);

        assertThat(admin).isNotNull();
    }

    @Test
    @Disabled
    public void testExistsAdminByUsername() {
        String username = "Admin123";
        boolean doesExist = adminRepository.existsByUsername(username);

        assertThat(doesExist).isTrue();
    }

    @Test
    @Disabled
    public void testExistsAdminByEmailAddress() {
        String email = "admin@gmail.com";
        boolean doesExist = adminRepository.existsByEmail(email);

        assertThat(doesExist).isTrue();
    }

    @Test
    @Disabled
    public void testFindAdminByUsername() {
        String username = "admin123";
        Optional<Admin> admin = adminRepository.findByUsername(username);

        System.out.println(admin);
        assertThat(admin).isNotNull();
    }
}
