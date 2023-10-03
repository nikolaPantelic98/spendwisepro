package com.spendwisepro.client;

import com.spendwisepro.client.user.UserRepository;
import com.spendwisepro.common.entity.User;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;

import java.util.Date;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Rollback(value = false)
public class UserRepositoryTests {

    @Autowired
    private UserRepository userRepository;


    @Test
    @Disabled
    public void testCreateUser() {

        User user = new User();
        user.setUsername("User123");
        user.setEmail("user123@gmail.com");
        user.setPassword("user123");
        user.setDateCreated(new Date());

        User savedUser = userRepository.save(user);

        assertThat(savedUser).isNotNull();
        assertThat(savedUser.getId()).isGreaterThan(0);
    }

    @Test
    @Disabled
    public void testListAllUsers() {
        Iterable<User> listUsers = userRepository.findAll();
        listUsers.forEach(System.out::println);
    }

    @Test
    @Disabled
    public void testGetUserById() {
        User user = userRepository.findById(1L).get();
        System.out.println(user);

        assertThat(user).isNotNull();
    }

    @Test
    @Disabled
    public void testExistsUserByUsername() {
        String username = "User123";
        boolean doesExist = userRepository.existsByUsername(username);

        assertThat(doesExist).isTrue();
    }

    @Test
    @Disabled
    public void testExistsUserByEmail() {
        String email = "user123@gmail.com";
        boolean doesExist = userRepository.existsByEmail(email);

        assertThat(doesExist).isTrue();
    }

    @Test
    @Disabled
    public void testFindUserByUsername() {
        String username = "User123";
        Optional<User> user = userRepository.findByUsername(username);

        System.out.println(user);
        assertThat(user).isNotNull();
    }
}
