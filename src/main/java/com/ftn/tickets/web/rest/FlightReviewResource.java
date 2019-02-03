package com.ftn.tickets.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.ftn.tickets.domain.FlightReview;
import com.ftn.tickets.repository.FlightReviewRepository;
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
 * REST controller for managing FlightReview.
 */
@RestController
@RequestMapping("/api")
public class FlightReviewResource {

    private final Logger log = LoggerFactory.getLogger(FlightReviewResource.class);

    private static final String ENTITY_NAME = "flightReview";

    private final FlightReviewRepository flightReviewRepository;

    public FlightReviewResource(FlightReviewRepository flightReviewRepository) {
        this.flightReviewRepository = flightReviewRepository;
    }

    /**
     * POST  /flight-reviews : Create a new flightReview.
     *
     * @param flightReview the flightReview to create
     * @return the ResponseEntity with status 201 (Created) and with body the new flightReview, or with status 400 (Bad Request) if the flightReview has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/flight-reviews")
    @Timed
    public ResponseEntity<FlightReview> createFlightReview(@Valid @RequestBody FlightReview flightReview) throws URISyntaxException {
        log.debug("REST request to save FlightReview : {}", flightReview);
        if (flightReview.getId() != null) {
            throw new BadRequestAlertException("A new flightReview cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FlightReview result = flightReviewRepository.save(flightReview);
        return ResponseEntity.created(new URI("/api/flight-reviews/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /flight-reviews : Updates an existing flightReview.
     *
     * @param flightReview the flightReview to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated flightReview,
     * or with status 400 (Bad Request) if the flightReview is not valid,
     * or with status 500 (Internal Server Error) if the flightReview couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/flight-reviews")
    @Timed
    public ResponseEntity<FlightReview> updateFlightReview(@Valid @RequestBody FlightReview flightReview) throws URISyntaxException {
        log.debug("REST request to update FlightReview : {}", flightReview);
        if (flightReview.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        FlightReview result = flightReviewRepository.save(flightReview);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, flightReview.getId().toString()))
            .body(result);
    }

    /**
     * GET  /flight-reviews : get all the flightReviews.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of flightReviews in body
     */
    @GetMapping("/flight-reviews")
    @Timed
    public List<FlightReview> getAllFlightReviews() {
        log.debug("REST request to get all FlightReviews");
        return flightReviewRepository.findAll();
    }

    /**
     * GET  /flight-reviews/:id : get the "id" flightReview.
     *
     * @param id the id of the flightReview to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the flightReview, or with status 404 (Not Found)
     */
    @GetMapping("/flight-reviews/{id}")
    @Timed
    public ResponseEntity<FlightReview> getFlightReview(@PathVariable Long id) {
        log.debug("REST request to get FlightReview : {}", id);
        Optional<FlightReview> flightReview = flightReviewRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(flightReview);
    }

    /**
     * DELETE  /flight-reviews/:id : delete the "id" flightReview.
     *
     * @param id the id of the flightReview to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/flight-reviews/{id}")
    @Timed
    public ResponseEntity<Void> deleteFlightReview(@PathVariable Long id) {
        log.debug("REST request to delete FlightReview : {}", id);

        flightReviewRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
