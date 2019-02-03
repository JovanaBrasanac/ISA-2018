package com.ftn.tickets.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.ftn.tickets.domain.Discount;
import com.ftn.tickets.repository.DiscountRepository;
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
 * REST controller for managing Discount.
 */
@RestController
@RequestMapping("/api")
public class DiscountResource {

    private final Logger log = LoggerFactory.getLogger(DiscountResource.class);

    private static final String ENTITY_NAME = "discount";

    private final DiscountRepository discountRepository;

    public DiscountResource(DiscountRepository discountRepository) {
        this.discountRepository = discountRepository;
    }

    /**
     * POST  /discounts : Create a new discount.
     *
     * @param discount the discount to create
     * @return the ResponseEntity with status 201 (Created) and with body the new discount, or with status 400 (Bad Request) if the discount has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/discounts")
    @Timed
    public ResponseEntity<Discount> createDiscount(@Valid @RequestBody Discount discount) throws URISyntaxException {
        log.debug("REST request to save Discount : {}", discount);
        if (discount.getId() != null) {
            throw new BadRequestAlertException("A new discount cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Discount result = discountRepository.save(discount);
        return ResponseEntity.created(new URI("/api/discounts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /discounts : Updates an existing discount.
     *
     * @param discount the discount to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated discount,
     * or with status 400 (Bad Request) if the discount is not valid,
     * or with status 500 (Internal Server Error) if the discount couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/discounts")
    @Timed
    public ResponseEntity<Discount> updateDiscount(@Valid @RequestBody Discount discount) throws URISyntaxException {
        log.debug("REST request to update Discount : {}", discount);
        if (discount.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Discount result = discountRepository.save(discount);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, discount.getId().toString()))
            .body(result);
    }

    /**
     * GET  /discounts : get all the discounts.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of discounts in body
     */
    @GetMapping("/discounts")
    @Timed
    public List<Discount> getAllDiscounts() {
        log.debug("REST request to get all Discounts");
        return discountRepository.findAll();
    }

    /**
     * GET  /discounts/:id : get the "id" discount.
     *
     * @param id the id of the discount to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the discount, or with status 404 (Not Found)
     */
    @GetMapping("/discounts/{id}")
    @Timed
    public ResponseEntity<Discount> getDiscount(@PathVariable Long id) {
        log.debug("REST request to get Discount : {}", id);
        Optional<Discount> discount = discountRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(discount);
    }

    /**
     * DELETE  /discounts/:id : delete the "id" discount.
     *
     * @param id the id of the discount to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/discounts/{id}")
    @Timed
    public ResponseEntity<Void> deleteDiscount(@PathVariable Long id) {
        log.debug("REST request to delete Discount : {}", id);

        discountRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
