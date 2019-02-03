package com.ftn.tickets.web.rest;

import com.ftn.tickets.TicketsApp;

import com.ftn.tickets.domain.Airline;
import com.ftn.tickets.repository.AirlineRepository;
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
 * Test class for the AirlineResource REST controller.
 *
 * @see AirlineResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TicketsApp.class)
public class AirlineResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_ADDRESS = "AAAAAAAAAA";
    private static final String UPDATED_ADDRESS = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final Float DEFAULT_LATITUDE = 1F;
    private static final Float UPDATED_LATITUDE = 2F;

    private static final Float DEFAULT_LONGITUDE = 1F;
    private static final Float UPDATED_LONGITUDE = 2F;

    @Autowired
    private AirlineRepository airlineRepository;

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

    private MockMvc restAirlineMockMvc;

    private Airline airline;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AirlineResource airlineResource = new AirlineResource(airlineRepository);
        this.restAirlineMockMvc = MockMvcBuilders.standaloneSetup(airlineResource)
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
    public static Airline createEntity(EntityManager em) {
        Airline airline = new Airline()
            .name(DEFAULT_NAME)
            .address(DEFAULT_ADDRESS)
            .description(DEFAULT_DESCRIPTION)
            .latitude(DEFAULT_LATITUDE)
            .longitude(DEFAULT_LONGITUDE);
        return airline;
    }

    @Before
    public void initTest() {
        airline = createEntity(em);
    }

    @Test
    @Transactional
    public void createAirline() throws Exception {
        int databaseSizeBeforeCreate = airlineRepository.findAll().size();

        // Create the Airline
        restAirlineMockMvc.perform(post("/api/airlines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(airline)))
            .andExpect(status().isCreated());

        // Validate the Airline in the database
        List<Airline> airlineList = airlineRepository.findAll();
        assertThat(airlineList).hasSize(databaseSizeBeforeCreate + 1);
        Airline testAirline = airlineList.get(airlineList.size() - 1);
        assertThat(testAirline.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testAirline.getAddress()).isEqualTo(DEFAULT_ADDRESS);
        assertThat(testAirline.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testAirline.getLatitude()).isEqualTo(DEFAULT_LATITUDE);
        assertThat(testAirline.getLongitude()).isEqualTo(DEFAULT_LONGITUDE);
    }

    @Test
    @Transactional
    public void createAirlineWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = airlineRepository.findAll().size();

        // Create the Airline with an existing ID
        airline.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAirlineMockMvc.perform(post("/api/airlines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(airline)))
            .andExpect(status().isBadRequest());

        // Validate the Airline in the database
        List<Airline> airlineList = airlineRepository.findAll();
        assertThat(airlineList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = airlineRepository.findAll().size();
        // set the field null
        airline.setName(null);

        // Create the Airline, which fails.

        restAirlineMockMvc.perform(post("/api/airlines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(airline)))
            .andExpect(status().isBadRequest());

        List<Airline> airlineList = airlineRepository.findAll();
        assertThat(airlineList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAddressIsRequired() throws Exception {
        int databaseSizeBeforeTest = airlineRepository.findAll().size();
        // set the field null
        airline.setAddress(null);

        // Create the Airline, which fails.

        restAirlineMockMvc.perform(post("/api/airlines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(airline)))
            .andExpect(status().isBadRequest());

        List<Airline> airlineList = airlineRepository.findAll();
        assertThat(airlineList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDescriptionIsRequired() throws Exception {
        int databaseSizeBeforeTest = airlineRepository.findAll().size();
        // set the field null
        airline.setDescription(null);

        // Create the Airline, which fails.

        restAirlineMockMvc.perform(post("/api/airlines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(airline)))
            .andExpect(status().isBadRequest());

        List<Airline> airlineList = airlineRepository.findAll();
        assertThat(airlineList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllAirlines() throws Exception {
        // Initialize the database
        airlineRepository.saveAndFlush(airline);

        // Get all the airlineList
        restAirlineMockMvc.perform(get("/api/airlines?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(airline.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].address").value(hasItem(DEFAULT_ADDRESS.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].latitude").value(hasItem(DEFAULT_LATITUDE.doubleValue())))
            .andExpect(jsonPath("$.[*].longitude").value(hasItem(DEFAULT_LONGITUDE.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getAirline() throws Exception {
        // Initialize the database
        airlineRepository.saveAndFlush(airline);

        // Get the airline
        restAirlineMockMvc.perform(get("/api/airlines/{id}", airline.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(airline.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.address").value(DEFAULT_ADDRESS.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.latitude").value(DEFAULT_LATITUDE.doubleValue()))
            .andExpect(jsonPath("$.longitude").value(DEFAULT_LONGITUDE.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingAirline() throws Exception {
        // Get the airline
        restAirlineMockMvc.perform(get("/api/airlines/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAirline() throws Exception {
        // Initialize the database
        airlineRepository.saveAndFlush(airline);

        int databaseSizeBeforeUpdate = airlineRepository.findAll().size();

        // Update the airline
        Airline updatedAirline = airlineRepository.findById(airline.getId()).get();
        // Disconnect from session so that the updates on updatedAirline are not directly saved in db
        em.detach(updatedAirline);
        updatedAirline
            .name(UPDATED_NAME)
            .address(UPDATED_ADDRESS)
            .description(UPDATED_DESCRIPTION)
            .latitude(UPDATED_LATITUDE)
            .longitude(UPDATED_LONGITUDE);

        restAirlineMockMvc.perform(put("/api/airlines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAirline)))
            .andExpect(status().isOk());

        // Validate the Airline in the database
        List<Airline> airlineList = airlineRepository.findAll();
        assertThat(airlineList).hasSize(databaseSizeBeforeUpdate);
        Airline testAirline = airlineList.get(airlineList.size() - 1);
        assertThat(testAirline.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testAirline.getAddress()).isEqualTo(UPDATED_ADDRESS);
        assertThat(testAirline.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testAirline.getLatitude()).isEqualTo(UPDATED_LATITUDE);
        assertThat(testAirline.getLongitude()).isEqualTo(UPDATED_LONGITUDE);
    }

    @Test
    @Transactional
    public void updateNonExistingAirline() throws Exception {
        int databaseSizeBeforeUpdate = airlineRepository.findAll().size();

        // Create the Airline

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAirlineMockMvc.perform(put("/api/airlines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(airline)))
            .andExpect(status().isBadRequest());

        // Validate the Airline in the database
        List<Airline> airlineList = airlineRepository.findAll();
        assertThat(airlineList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAirline() throws Exception {
        // Initialize the database
        airlineRepository.saveAndFlush(airline);

        int databaseSizeBeforeDelete = airlineRepository.findAll().size();

        // Get the airline
        restAirlineMockMvc.perform(delete("/api/airlines/{id}", airline.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Airline> airlineList = airlineRepository.findAll();
        assertThat(airlineList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Airline.class);
        Airline airline1 = new Airline();
        airline1.setId(1L);
        Airline airline2 = new Airline();
        airline2.setId(airline1.getId());
        assertThat(airline1).isEqualTo(airline2);
        airline2.setId(2L);
        assertThat(airline1).isNotEqualTo(airline2);
        airline1.setId(null);
        assertThat(airline1).isNotEqualTo(airline2);
    }
}
