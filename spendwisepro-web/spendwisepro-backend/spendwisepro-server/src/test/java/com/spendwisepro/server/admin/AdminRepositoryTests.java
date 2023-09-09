package com.spendwisepro.server.admin;

import com.spendwisepro.common.entity.Admin;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Rollback(value = false)
public class AdminRepositoryTests {

    @Autowired
    private AdminRepository adminRepository;


    @Test
    @Disabled
    public void testCreateAdmin() {
        Admin admin = new Admin("admin@gmail.com", "admin123", "Admin123");
        Admin savedAdmin = adminRepository.save(admin);

        assertThat(savedAdmin.getAdminId()).isGreaterThan(0);
    }

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
    public void testUpdateAdminDetails() {
        Admin admin = adminRepository.findById(1L).get();
        admin.setEnabled(true);
        adminRepository.save(admin);

        assertThat(admin.isEnabled()).isTrue();
    }

    @Test
    @Disabled
    public void testGetAdminByEmailAddress() {
        String emailAddress = "admin@gmail.com";
        Admin admin = adminRepository.getAdminByEmailAddress(emailAddress);
        System.out.println(admin);

        assertThat(admin).isNotNull();
    }

    @Test
    @Disabled
    public void testGetAdminByUsername() {
        String username = "Admin123";
        Admin admin = adminRepository.getAdminByUsername(username);
        System.out.println(admin);

        assertThat(admin).isNotNull();
    }

    @Test
    @Disabled
    public void testDisableAdmin() {
        Long adminId = 1L;
        adminRepository.updateEnabledStatus(adminId, false);
    }

    @Test
    @Disabled
    public void testEnableAdmin() {
        Long adminId = 1L;
        adminRepository.updateEnabledStatus(adminId, true);
    }

    @Test
    public void testExistsAdminByUsername() {
        String username = "Admin123";
        boolean doesExist = adminRepository.existsAdminByUsername(username);

        assertThat(doesExist).isTrue();
    }

    @Test
    public void testExistsAdminByEmailAddress() {
        String emailAddress = "admin@gmail.com";
        boolean doesExist = adminRepository.existsAdminByEmailAddress(emailAddress);

        assertThat(doesExist).isTrue();
    }
}
