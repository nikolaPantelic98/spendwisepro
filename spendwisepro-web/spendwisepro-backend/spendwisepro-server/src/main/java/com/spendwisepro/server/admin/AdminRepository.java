package com.spendwisepro.server.admin;

import com.spendwisepro.common.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdminRepository extends JpaRepository<Admin, Long> {

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);

    Optional<Admin> findByUsername(String username);
}
