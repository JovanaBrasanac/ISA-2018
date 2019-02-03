package com.ftn.tickets.web.rest;

import com.ftn.tickets.TicketsApp;

import com.ftn.tickets.domain.AirportReview;
import com.ftn.tickets.domain.Ticket;
import com.ftn.tickets.repository.AirportReviewRepository;
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
 * Test class for the AirportReviewResource REST controller.
 *
 * @see AirportReviewResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TicketsApp.class)
public class AirportReviewResourceIntTest {

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final Integer DEFAULT_GRADE = 1;
    private static final Integer UPDATED_GRADE = 2;

    @Autowired
    private AirportReviewRepository airportReviewRepository;

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

    private MockMvc restAirportReviewMockMvc;

    private AirportReview airportReview;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AirportReviewResource airportReviewResource = new AirportReviewResource(airportReviewRepository);
        this.restAirportReviewMockMvc = MockMvcBuilders.standaloneSetup(airportReviewResource)
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
    public static AirportReview createEntity(EntityManager em) {
        AirportReview airportReview = new AirportReview()
            .description(DEFAULT_DESCRIPTION)
            .grade(DEFAULT_GRADE);
        // Add required entity
        Ticket ticket = TicketResourceIntTest.createEntity(em);
        em.persist(ticket);
        em.flush();
        airportReview.setTicket(ticket);
        return airportReview;
    }

    @Before
    public void initTest() {
        airportReview = createEntity(em);
    }

    @Test
    @Transactional
    public void createAirportReview() throws Exception {
        int databaseSizeBeforeCreate = airportReviewRepository.findAll().size();

        // Create the AirportReview
        restAirportReviewMockMvc.perform(post("/api/airport-reviews")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(airportReview)))
            .andExpect(status().isCreated());

        // Validate the AirportReview in the database
        List<AirportReview> airportReviewList = airportReviewRepository.findAll();
        assertThat(airportReviewList).hasSize(databaseSizeBeforeCreate + 1);
        AirportReview testAirportReview = airportReviewList.get(airportReviewList.size() - 1);
        assertThat(testAirportReview.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testAirportReview.getGrade()).isEqualTo(DEFAULT_GRADE);
    }

    @Test
    @Transactional
    public void createAirportReviewWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = airportReviewRepository.findAll().size();

        // Create the AirportReview with an existing ID
        airportReview.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAirportReviewMockMvc.perform(post("/api/airport-reviews")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(airportReview)))
            .andExpect(status().isBadRequest());

        // Validate the AirportReview in the database
        List<AirportReview> airportReviewList = airportReviewRepository.findAll();
        assertThat(airportReviewList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkGradeIsRequired() throws Exception {
        int databaseSizeBeforeTest = airportReviewRepository.findAll().size();
        // set the field null
        airportReview.setGrade(null);

        // Create the AirportReview, which fails.

        restAirportReviewMockMvc.perform(post("/api/airport-reviews")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(airportReview)))
            .andExpect(status().isBadRequest());

        List<AirportReview> airportReviewList = airportReviewRepository.findAll();
        assertThat(airportReviewList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllAirportReviews() throws Exception {
        // Initialize the database
        airportReviewRepository.saveAndFlush(airportReview);

        // Get all the airportReviewList
        restAirportReviewMockMvc.perform(get("/api/airport-reviews?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(airportReview.getId().intValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].grade").value(hasItem(DEFAULT_GRADE)));
    }
    
    @Test
    @Transactional
    public void getAirportReview() throws Exception {
        // Initialize the database
        airportReviewRepository.saveAndFlush(airportReview);

        // Get the airportReview
        restAirportReviewMockMvc.perform(get("/api/airport-reviews/{id}", airportReview.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(airportReview.getId().intValue()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.grade").value(DEFAULT_GRADE));
    }

    @Test
    @Transactional
    public void getNonExistingAirportReview() throws Exception {
        // Get the airportReview
        restAirportReviewMockMvc.perform(get("/api/airport-reviews/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAirportReview() throws Exception {
        // Initialize the database
        airportReviewRepository.saveAndFlush(airportReview);

        int databaseSizeBeforeUpdate = airportReviewRepository.findAll().size();

        // Update the airportReview
        AirportReview updatedAirportReview = airportReviewRepository.findById(airportReview.getId()).get();
        // Disconnect from session so that the updates on updatedAirportReview are not directly saved in db
        em.detach(updatedAirportReview);
        updatedAirportReview
            .description(UPDATED_DESCRIPTION)
            .grade(UPDATED_GRADE);

        restAirportReviewMockMvc.perform(put("/api/airport-reviews")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAirportReview)))
            .andExpect(status().isOk());

        // Validate the AirportReview in the database
        List<AirportReview> airportReviewList = airportReviewRepository.findAll();
        assertThat(airportReviewList).hasSize(databaseSizeBeforeUpdate);
        AirportReview testAirportReview = airportReviewList.get(airportReviewList.size() - 1);
        assertThat(testAirportReview.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testAirportReview.getGrade()).isEqualTo(UPDATED_GRADE);
    }

    @Test
    @Transactional
    public void updateNonExistingAirportReview() throws Exception {
        int databaseSizeBeforeUpdate = airportReviewRepository.findAll().size();

        // Create the AirportReview

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAirportReviewMockMvc.perform(put("/api/airport-reviews")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(airportReview)))
            .andExpect(status().isBadRequest());

        // Validate the AirportReview in the database
        List<AirportReview> airportReviewList = airportReviewRepository.findAll();
        assertThat(airportReviewList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAirportReview() throws Exception {
        // Initialize the database
        airportReviewRepository.saveAndFlush(airportReview);

        int databaseSizeBeforeDelete = airportReviewRepository.findAll().size();

        // Get the airportReview
        restAirportReviewMockMvc.perform(delete("/api/airport-reviews/{id}", airportReview.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<AirportReview> airportReviewList = airportReviewRepository.findAll();
        assertThat(airportReviewList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AirportReview.class);
        AirportReview airportReview1 = new AirportReview();
        airportReview1.setId(1L);
        AirportReview airportReview2 = new AirportReview();
        airportReview2.setId(airportReview1.getId());
        assertThat(airportReview1).isEqualTo(airportReview2);
        airportReview2.setId(2L);
        assertThat(airportReview1).isNotEqualTo(airportReview2);
        airportReview1.setId(null);
        assertThat(airportReview1).isNotEqualTo(airportReview2);
    }
}
