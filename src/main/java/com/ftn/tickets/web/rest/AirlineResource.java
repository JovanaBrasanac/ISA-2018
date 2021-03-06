package com.ftn.tickets.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.ftn.tickets.domain.Airline;
import com.ftn.tickets.repository.AirlineRepository;
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
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * REST controller for managing Airline.
 */
@RestController
@RequestMapping("/api")
public class AirlineResource {

    private final Logger log = LoggerFactory.getLogger(AirlineResource.class);

    private static final String ENTITY_NAME = "airline";

    private final AirlineRepository airlineRepository;

    public AirlineResource(AirlineRepository airlineRepository) {
        this.airlineRepository = airlineRepository;
    }

    /**
     * POST  /airlines : Create a new airline.
     *
     * @param airline the airline to create
     * @return the ResponseEntity with status 201 (Created) and with body the new airline, or with status 400 (Bad Request) if the airline has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/airlines")
    @Timed
    public ResponseEntity<Airline> createAirline(@Valid @RequestBody Airline airline) throws URISyntaxException {
        log.debug("REST request to save Airline : {}", airline);
        if (airline.getId() != null) {
            throw new BadRequestAlertException("A new airline cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Airline result = airlineRepository.save(airline);
        return ResponseEntity.created(new URI("/api/airlines/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /airlines : Updates an existing airline.
     *
     * @param airline the airline to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated airline,
     * or with status 400 (Bad Request) if the airline is not valid,
     * or with status 500 (Internal Server Error) if the airline couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/airlines")
    @Timed
    public ResponseEntity<Airline> updateAirline(@Valid @RequestBody Airline airline) throws URISyntaxException {
        log.debug("REST request to update Airline : {}", airline);
        if (airline.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Airline result = airlineRepository.save(airline);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, airline.getId().toString()))
            .body(result);
    }

    /**
     * GET  /airlines : get all the airlines.
     *
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of airlines in body
     */
    @GetMapping("/airlines")
    @Timed
    public List<Airline> getAllAirlines(@RequestParam(required = false) String filter) {
        if ("admin-is-null".equals(filter)) {
            log.debug("REST request to get all Airlines where admin is null");
            return StreamSupport
                .stream(airlineRepository.findAll().spliterator(), false)
                .filter(airline -> airline.getAdmin() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all Airlines");
        return airlineRepository.findAll();
    }

    /**
     * GET  /airlines/:id : get the "id" airline.
     *
     * @param id the id of the airline to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the airline, or with status 404 (Not Found)
     */
    @GetMapping("/airlines/{id}")
    @Timed
    public ResponseEntity<Airline> getAirline(@PathVariable Long id) {
        log.debug("REST request to get Airline : {}", id);
        Optional<Airline> airline = airlineRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(airline);
    }

    /**
     * DELETE  /airlines/:id : delete the "id" airline.
     *
     * @param id the id of the airline to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/airlines/{id}")
    @Timed
    public ResponseEntity<Void> deleteAirline(@PathVariable Long id) {
        log.debug("REST request to delete Airline : {}", id);

        airlineRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
