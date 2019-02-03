package com.ftn.tickets.repository;

import com.ftn.tickets.domain.Airport;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Airport entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AirportRepository extends JpaRepository<Airport, Long> {

}
