package com.spendwisepro.server.admin;

import com.spendwisepro.common.entity.ERole;
import com.spendwisepro.common.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);
}
