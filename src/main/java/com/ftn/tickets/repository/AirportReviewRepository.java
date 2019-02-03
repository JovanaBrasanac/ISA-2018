package com.ftn.tickets.repository;

import com.ftn.tickets.domain.AirportReview;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the AirportReview entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AirportReviewRepository extends JpaRepository<AirportReview, Long> {

}
