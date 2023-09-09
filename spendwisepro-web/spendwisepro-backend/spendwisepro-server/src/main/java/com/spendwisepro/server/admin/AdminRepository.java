package com.spendwisepro.server.admin;

import com.spendwisepro.common.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface AdminRepository extends JpaRepository<Admin, Long> {

    @Query("SELECT a FROM Admin a WHERE a.emailAddress = :emailAddress")
    Admin getAdminByEmailAddress(@Param("emailAddress") String emailAddress);

    @Query("UPDATE Admin a SET a.enabled = ?2 WHERE a.adminId = ?1")
    @Modifying
    void updateEnabledStatus(Long adminId, boolean enabled);

    Boolean existsAdminByUsername(String username);

    Boolean existsAdminByEmailAddress(String emailAddress);
}
