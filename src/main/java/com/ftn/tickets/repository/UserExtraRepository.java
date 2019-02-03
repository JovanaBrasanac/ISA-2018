package com.ftn.tickets.repository;

import com.ftn.tickets.domain.User;
import com.ftn.tickets.domain.UserExtra;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.Optional;


/**
 * Spring Data  repository for the UserExtra entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserExtraRepository extends JpaRepository<UserExtra, Long> {
    Optional<UserExtra> findOneByUser_Id(Long id);
}
