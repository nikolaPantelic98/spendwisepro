package com.spendwisepro.server.admin;

import com.spendwisepro.common.entity.Admin;
import com.spendwisepro.common.entity.Role;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.annotation.Rollback;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Rollback(value = false)
public class AdminRepositoryTests {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private TestEntityManager entityManager;


    @Test
    @Disabled
    public void testCreateAdminWithOneRole() {
        Role roleAdmin = entityManager.find(Role.class, 3);
        Admin admin = new Admin("admin12345@gmail.com", "admin12345", "admin12345");
        admin.addRole(roleAdmin);
        Admin savedAdmin = adminRepository.save(admin);

        assertThat(savedAdmin.getId()).isGreaterThan(0);
    }

    @Test
    @Disabled
    public void testCreateNewUserWithTwoRoles() {
        Role roleUser = entityManager.find(Role.class, 1);
        Role roleModerator = entityManager.find(Role.class, 2);
        Admin moderatorJohn = new Admin("john@gmail.com", "john123@gmail.com", "john123");
        moderatorJohn.addRole(roleUser);
        moderatorJohn.addRole(roleModerator);

        Admin savedAdmin = adminRepository.save(moderatorJohn);
        assertThat(savedAdmin.getId()).isGreaterThan(0);
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
