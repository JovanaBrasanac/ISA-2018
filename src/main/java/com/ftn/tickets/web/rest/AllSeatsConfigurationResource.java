package com.ftn.tickets.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.ftn.tickets.domain.AllSeatsConfiguration;
import com.ftn.tickets.repository.AllSeatsConfigurationRepository;
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
 * REST controller for managing AllSeatsConfiguration.
 */
@RestController
@RequestMapping("/api")
public class AllSeatsConfigurationResource {

    private final Logger log = LoggerFactory.getLogger(AllSeatsConfigurationResource.class);

    private static final String ENTITY_NAME = "allSeatsConfiguration";

    private final AllSeatsConfigurationRepository allSeatsConfigurationRepository;

    public AllSeatsConfigurationResource(AllSeatsConfigurationRepository allSeatsConfigurationRepository) {
        this.allSeatsConfigurationRepository = allSeatsConfigurationRepository;
    }

    /**
     * POST  /all-seats-configurations : Create a new allSeatsConfiguration.
     *
     * @param allSeatsConfiguration the allSeatsConfiguration to create
     * @return the ResponseEntity with status 201 (Created) and with body the new allSeatsConfiguration, or with status 400 (Bad Request) if the allSeatsConfiguration has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/all-seats-configurations")
    @Timed
    public ResponseEntity<AllSeatsConfiguration> createAllSeatsConfiguration(@Valid @RequestBody AllSeatsConfiguration allSeatsConfiguration) throws URISyntaxException {
        log.debug("REST request to save AllSeatsConfiguration : {}", allSeatsConfiguration);
        if (allSeatsConfiguration.getId() != null) {
            throw new BadRequestAlertException("A new allSeatsConfiguration cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AllSeatsConfiguration result = allSeatsConfigurationRepository.save(allSeatsConfiguration);
        return ResponseEntity.created(new URI("/api/all-seats-configurations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /all-seats-configurations : Updates an existing allSeatsConfiguration.
     *
     * @param allSeatsConfiguration the allSeatsConfiguration to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated allSeatsConfiguration,
     * or with status 400 (Bad Request) if the allSeatsConfiguration is not valid,
     * or with status 500 (Internal Server Error) if the allSeatsConfiguration couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/all-seats-configurations")
    @Timed
    public ResponseEntity<AllSeatsConfiguration> updateAllSeatsConfiguration(@Valid @RequestBody AllSeatsConfiguration allSeatsConfiguration) throws URISyntaxException {
        log.debug("REST request to update AllSeatsConfiguration : {}", allSeatsConfiguration);
        if (allSeatsConfiguration.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AllSeatsConfiguration result = allSeatsConfigurationRepository.save(allSeatsConfiguration);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, allSeatsConfiguration.getId().toString()))
            .body(result);
    }

    /**
     * GET  /all-seats-configurations : get all the allSeatsConfigurations.
     *
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of allSeatsConfigurations in body
     */
    @GetMapping("/all-seats-configurations")
    @Timed
    public List<AllSeatsConfiguration> getAllAllSeatsConfigurations(@RequestParam(required = false) String filter) {
        if ("flight-is-null".equals(filter)) {
            log.debug("REST request to get all AllSeatsConfigurations where flight is null");
            return StreamSupport
                .stream(allSeatsConfigurationRepository.findAll().spliterator(), false)
                .filter(allSeatsConfiguration -> allSeatsConfiguration.getFlight() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all AllSeatsConfigurations");
        return allSeatsConfigurationRepository.findAll();
    }

    /**
     * GET  /all-seats-configurations/:id : get the "id" allSeatsConfiguration.
     *
     * @param id the id of the allSeatsConfiguration to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the allSeatsConfiguration, or with status 404 (Not Found)
     */
    @GetMapping("/all-seats-configurations/{id}")
    @Timed
    public ResponseEntity<AllSeatsConfiguration> getAllSeatsConfiguration(@PathVariable Long id) {
        log.debug("REST request to get AllSeatsConfiguration : {}", id);
        Optional<AllSeatsConfiguration> allSeatsConfiguration = allSeatsConfigurationRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(allSeatsConfiguration);
    }

    /**
     * DELETE  /all-seats-configurations/:id : delete the "id" allSeatsConfiguration.
     *
     * @param id the id of the allSeatsConfiguration to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/all-seats-configurations/{id}")
    @Timed
    public ResponseEntity<Void> deleteAllSeatsConfiguration(@PathVariable Long id) {
        log.debug("REST request to delete AllSeatsConfiguration : {}", id);

        allSeatsConfigurationRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
