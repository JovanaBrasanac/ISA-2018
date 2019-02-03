package com.ftn.tickets.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.ftn.tickets.domain.AirportReview;
import com.ftn.tickets.repository.AirportReviewRepository;
import com.ftn.tickets.web.rest.errors.BadRequestAlertException;
import com.ftn.tickets.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing AirportReview.
 */
@RestController
@RequestMapping("/api")
public class AirportReviewResource {

    private final Logger log = LoggerFactory.getLogger(AirportReviewResource.class);

    private static final String ENTITY_NAME = "airportReview";

    private final AirportReviewRepository airportReviewRepository;

    public AirportReviewResource(AirportReviewRepository airportReviewRepository) {
        this.airportReviewRepository = airportReviewRepository;
    }

    /**
     * POST  /airport-reviews : Create a new airportReview.
     *
     * @param airportReview the airportReview to create
     * @return the ResponseEntity with status 201 (Created) and with body the new airportReview, or with status 400 (Bad Request) if the airportReview has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/airport-reviews")
    @Timed
    public ResponseEntity<AirportReview> createAirportReview(@Valid @RequestBody AirportReview airportReview) throws URISyntaxException {
        log.debug("REST request to save AirportReview : {}", airportReview);
        if (airportReview.getId() != null) {
            throw new BadRequestAlertException("A new airportReview cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AirportReview result = airportReviewRepository.save(airportReview);
        return ResponseEntity.created(new URI("/api/airport-reviews/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /airport-reviews : Updates an existing airportReview.
     *
     * @param airportReview the airportReview to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated airportReview,
     * or with status 400 (Bad Request) if the airportReview is not valid,
     * or with status 500 (Internal Server Error) if the airportReview couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/airport-reviews")
    @Timed
    public ResponseEntity<AirportReview> updateAirportReview(@Valid @RequestBody AirportReview airportReview) throws URISyntaxException {
        log.debug("REST request to update AirportReview : {}", airportReview);
        if (airportReview.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AirportReview result = airportReviewRepository.save(airportReview);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, airportReview.getId().toString()))
            .body(result);
    }

    /**
     * GET  /airport-reviews : get all the airportReviews.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of airportReviews in body
     */
    @GetMapping("/airport-reviews")
    @Timed
    public List<AirportReview> getAllAirportReviews() {
        log.debug("REST request to get all AirportReviews");
        return airportReviewRepository.findAll();
    }

    /**
     * GET  /airport-reviews/:id : get the "id" airportReview.
     *
     * @param id the id of the airportReview to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the airportReview, or with status 404 (Not Found)
     */
    @GetMapping("/airport-reviews/{id}")
    @Timed
    public ResponseEntity<AirportReview> getAirportReview(@PathVariable Long id) {
        log.debug("REST request to get AirportReview : {}", id);
        Optional<AirportReview> airportReview = airportReviewRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(airportReview);
    }

    /**
     * DELETE  /airport-reviews/:id : delete the "id" airportReview.
     *
     * @param id the id of the airportReview to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/airport-reviews/{id}")
    @Timed
    public ResponseEntity<Void> deleteAirportReview(@PathVariable Long id) {
        log.debug("REST request to delete AirportReview : {}", id);

        airportReviewRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
