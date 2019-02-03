package com.ftn.tickets.web.rest;

import com.ftn.tickets.TicketsApp;

import com.ftn.tickets.domain.FlightReview;
import com.ftn.tickets.domain.Ticket;
import com.ftn.tickets.repository.FlightReviewRepository;
import com.ftn.tickets.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;


import static com.ftn.tickets.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the FlightReviewResource REST controller.
 *
 * @see FlightReviewResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TicketsApp.class)
public class FlightReviewResourceIntTest {

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final Integer DEFAULT_GRADE = 1;
    private static final Integer UPDATED_GRADE = 2;

    @Autowired
    private FlightReviewRepository flightReviewRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restFlightReviewMockMvc;

    private FlightReview flightReview;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FlightReviewResource flightReviewResource = new FlightReviewResource(flightReviewRepository);
        this.restFlightReviewMockMvc = MockMvcBuilders.standaloneSetup(flightReviewResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static FlightReview createEntity(EntityManager em) {
        FlightReview flightReview = new FlightReview()
            .description(DEFAULT_DESCRIPTION)
            .grade(DEFAULT_GRADE);
        // Add required entity
        Ticket ticket = TicketResourceIntTest.createEntity(em);
        em.persist(ticket);
        em.flush();
        flightReview.setTicket(ticket);
        return flightReview;
    }

    @Before
    public void initTest() {
        flightReview = createEntity(em);
    }

    @Test
    @Transactional
    public void createFlightReview() throws Exception {
        int databaseSizeBeforeCreate = flightReviewRepository.findAll().size();

        // Create the FlightReview
        restFlightReviewMockMvc.perform(post("/api/flight-reviews")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(flightReview)))
            .andExpect(status().isCreated());

        // Validate the FlightReview in the database
        List<FlightReview> flightReviewList = flightReviewRepository.findAll();
        assertThat(flightReviewList).hasSize(databaseSizeBeforeCreate + 1);
        FlightReview testFlightReview = flightReviewList.get(flightReviewList.size() - 1);
        assertThat(testFlightReview.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testFlightReview.getGrade()).isEqualTo(DEFAULT_GRADE);
    }

    @Test
    @Transactional
    public void createFlightReviewWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = flightReviewRepository.findAll().size();

        // Create the FlightReview with an existing ID
        flightReview.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFlightReviewMockMvc.perform(post("/api/flight-reviews")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(flightReview)))
            .andExpect(status().isBadRequest());

        // Validate the FlightReview in the database
        List<FlightReview> flightReviewList = flightReviewRepository.findAll();
        assertThat(flightReviewList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkGradeIsRequired() throws Exception {
        int databaseSizeBeforeTest = flightReviewRepository.findAll().size();
        // set the field null
        flightReview.setGrade(null);

        // Create the FlightReview, which fails.

        restFlightReviewMockMvc.perform(post("/api/flight-reviews")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(flightReview)))
            .andExpect(status().isBadRequest());

        List<FlightReview> flightReviewList = flightReviewRepository.findAll();
        assertThat(flightReviewList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllFlightReviews() throws Exception {
        // Initialize the database
        flightReviewRepository.saveAndFlush(flightReview);

        // Get all the flightReviewList
        restFlightReviewMockMvc.perform(get("/api/flight-reviews?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(flightReview.getId().intValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].grade").value(hasItem(DEFAULT_GRADE)));
    }
    
    @Test
    @Transactional
    public void getFlightReview() throws Exception {
        // Initialize the database
        flightReviewRepository.saveAndFlush(flightReview);

        // Get the flightReview
        restFlightReviewMockMvc.perform(get("/api/flight-reviews/{id}", flightReview.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(flightReview.getId().intValue()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.grade").value(DEFAULT_GRADE));
    }

    @Test
    @Transactional
    public void getNonExistingFlightReview() throws Exception {
        // Get the flightReview
        restFlightReviewMockMvc.perform(get("/api/flight-reviews/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFlightReview() throws Exception {
        // Initialize the database
        flightReviewRepository.saveAndFlush(flightReview);

        int databaseSizeBeforeUpdate = flightReviewRepository.findAll().size();

        // Update the flightReview
        FlightReview updatedFlightReview = flightReviewRepository.findById(flightReview.getId()).get();
        // Disconnect from session so that the updates on updatedFlightReview are not directly saved in db
        em.detach(updatedFlightReview);
        updatedFlightReview
            .description(UPDATED_DESCRIPTION)
            .grade(UPDATED_GRADE);

        restFlightReviewMockMvc.perform(put("/api/flight-reviews")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedFlightReview)))
            .andExpect(status().isOk());

        // Validate the FlightReview in the database
        List<FlightReview> flightReviewList = flightReviewRepository.findAll();
        assertThat(flightReviewList).hasSize(databaseSizeBeforeUpdate);
        FlightReview testFlightReview = flightReviewList.get(flightReviewList.size() - 1);
        assertThat(testFlightReview.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testFlightReview.getGrade()).isEqualTo(UPDATED_GRADE);
    }

    @Test
    @Transactional
    public void updateNonExistingFlightReview() throws Exception {
        int databaseSizeBeforeUpdate = flightReviewRepository.findAll().size();

        // Create the FlightReview

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFlightReviewMockMvc.perform(put("/api/flight-reviews")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(flightReview)))
            .andExpect(status().isBadRequest());

        // Validate the FlightReview in the database
        List<FlightReview> flightReviewList = flightReviewRepository.findAll();
        assertThat(flightReviewList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteFlightReview() throws Exception {
        // Initialize the database
        flightReviewRepository.saveAndFlush(flightReview);

        int databaseSizeBeforeDelete = flightReviewRepository.findAll().size();

        // Get the flightReview
        restFlightReviewMockMvc.perform(delete("/api/flight-reviews/{id}", flightReview.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<FlightReview> flightReviewList = flightReviewRepository.findAll();
        assertThat(flightReviewList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(FlightReview.class);
        FlightReview flightReview1 = new FlightReview();
        flightReview1.setId(1L);
        FlightReview flightReview2 = new FlightReview();
        flightReview2.setId(flightReview1.getId());
        assertThat(flightReview1).isEqualTo(flightReview2);
        flightReview2.setId(2L);
        assertThat(flightReview1).isNotEqualTo(flightReview2);
        flightReview1.setId(null);
        assertThat(flightReview1).isNotEqualTo(flightReview2);
    }
}
