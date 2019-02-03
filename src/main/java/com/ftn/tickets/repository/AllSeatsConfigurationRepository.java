package com.ftn.tickets.repository;

import com.ftn.tickets.domain.AllSeatsConfiguration;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the AllSeatsConfiguration entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AllSeatsConfigurationRepository extends JpaRepository<AllSeatsConfiguration, Long> {

}
