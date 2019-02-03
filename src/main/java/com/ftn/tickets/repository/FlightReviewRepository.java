package com.ftn.tickets.repository;

import com.ftn.tickets.domain.FlightReview;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the FlightReview entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FlightReviewRepository extends JpaRepository<FlightReview, Long> {

}
