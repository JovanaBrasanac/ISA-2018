package com.ftn.tickets.web.rest;

import com.ftn.tickets.TicketsApp;

import com.ftn.tickets.domain.Flight;
import com.ftn.tickets.domain.AllSeatsConfiguration;
import com.ftn.tickets.domain.Airport;
import com.ftn.tickets.repository.FlightRepository;
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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;


import static com.ftn.tickets.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the FlightResource REST controller.
 *
 * @see FlightResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TicketsApp.class)
public class FlightResourceIntTest {

    private static final String DEFAULT_START_LOCATION = "AAAAAAAAAA";
    private static final String UPDATED_START_LOCATION = "BBBBBBBBBB";

    private static final String DEFAULT_END_LOCATION = "AAAAAAAAAA";
    private static final String UPDATED_END_LOCATION = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_START_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_START_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_END_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_END_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_START_TIME = "AAAAAAAAAA";
    private static final String UPDATED_START_TIME = "BBBBBBBBBB";

    private static final String DEFAULT_END_TIME = "AAAAAAAAAA";
    private static final String UPDATED_END_TIME = "BBBBBBBBBB";

    private static final String DEFAULT_TIME_OF_FLIGHT = "AAAAAAAAAA";
    private static final String UPDATED_TIME_OF_FLIGHT = "BBBBBBBBBB";

    private static final String DEFAULT_LENGTH = "AAAAAAAAAA";
    private static final String UPDATED_LENGTH = "BBBBBBBBBB";

    private static final Integer DEFAULT_NUMBER_OF_CHANGES = 1;
    private static final Integer UPDATED_NUMBER_OF_CHANGES = 2;

    private static final String DEFAULT_LOCATION_OF_CHANGES = "AAAAAAAAAA";
    private static final String UPDATED_LOCATION_OF_CHANGES = "BBBBBBBBBB";

    private static final String DEFAULT_FLIGHT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_FLIGHT_CODE = "BBBBBBBBBB";

    @Autowired
    private FlightRepository flightRepository;

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

    private MockMvc restFlightMockMvc;

    private Flight flight;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FlightResource flightResource = new FlightResource(flightRepository);
        this.restFlightMockMvc = MockMvcBuilders.standaloneSetup(flightResource)
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
    public static Flight createEntity(EntityManager em) {
        Flight flight = new Flight()
            .startLocation(DEFAULT_START_LOCATION)
            .endLocation(DEFAULT_END_LOCATION)
            .startDate(DEFAULT_START_DATE)
            .endDate(DEFAULT_END_DATE)
            .startTime(DEFAULT_START_TIME)
            .endTime(DEFAULT_END_TIME)
            .timeOfFlight(DEFAULT_TIME_OF_FLIGHT)
            .length(DEFAULT_LENGTH)
            .numberOfChanges(DEFAULT_NUMBER_OF_CHANGES)
            .locationOfChanges(DEFAULT_LOCATION_OF_CHANGES)
            .flightCode(DEFAULT_FLIGHT_CODE);
        // Add required entity
        AllSeatsConfiguration allSeatsConfiguration = AllSeatsConfigurationResourceIntTest.createEntity(em);
        em.persist(allSeatsConfiguration);
        em.flush();
        flight.setAllSeats(allSeatsConfiguration);
        // Add required entity
        Airport airport = AirportResourceIntTest.createEntity(em);
        em.persist(airport);
        em.flush();
        flight.setAirport(airport);
        return flight;
    }

    @Before
    public void initTest() {
        flight = createEntity(em);
    }

    @Test
    @Transactional
    public void createFlight() throws Exception {
        int databaseSizeBeforeCreate = flightRepository.findAll().size();

        // Create the Flight
        restFlightMockMvc.perform(post("/api/flights")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(flight)))
            .andExpect(status().isCreated());

        // Validate the Flight in the database
        List<Flight> flightList = flightRepository.findAll();
        assertThat(flightList).hasSize(databaseSizeBeforeCreate + 1);
        Flight testFlight = flightList.get(flightList.size() - 1);
        assertThat(testFlight.getStartLocation()).isEqualTo(DEFAULT_START_LOCATION);
        assertThat(testFlight.getEndLocation()).isEqualTo(DEFAULT_END_LOCATION);
        assertThat(testFlight.getStartDate()).isEqualTo(DEFAULT_START_DATE);
        assertThat(testFlight.getEndDate()).isEqualTo(DEFAULT_END_DATE);
        assertThat(testFlight.getStartTime()).isEqualTo(DEFAULT_START_TIME);
        assertThat(testFlight.getEndTime()).isEqualTo(DEFAULT_END_TIME);
        assertThat(testFlight.getTimeOfFlight()).isEqualTo(DEFAULT_TIME_OF_FLIGHT);
        assertThat(testFlight.getLength()).isEqualTo(DEFAULT_LENGTH);
        assertThat(testFlight.getNumberOfChanges()).isEqualTo(DEFAULT_NUMBER_OF_CHANGES);
        assertThat(testFlight.getLocationOfChanges()).isEqualTo(DEFAULT_LOCATION_OF_CHANGES);
        assertThat(testFlight.getFlightCode()).isEqualTo(DEFAULT_FLIGHT_CODE);
    }

    @Test
    @Transactional
    public void createFlightWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = flightRepository.findAll().size();

        // Create the Flight with an existing ID
        flight.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFlightMockMvc.perform(post("/api/flights")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(flight)))
            .andExpect(status().isBadRequest());

        // Validate the Flight in the database
        List<Flight> flightList = flightRepository.findAll();
        assertThat(flightList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkStartLocationIsRequired() throws Exception {
        int databaseSizeBeforeTest = flightRepository.findAll().size();
        // set the field null
        flight.setStartLocation(null);

        // Create the Flight, which fails.

        restFlightMockMvc.perform(post("/api/flights")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(flight)))
            .andExpect(status().isBadRequest());

        List<Flight> flightList = flightRepository.findAll();
        assertThat(flightList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEndLocationIsRequired() throws Exception {
        int databaseSizeBeforeTest = flightRepository.findAll().size();
        // set the field null
        flight.setEndLocation(null);

        // Create the Flight, which fails.

        restFlightMockMvc.perform(post("/api/flights")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(flight)))
            .andExpect(status().isBadRequest());

        List<Flight> flightList = flightRepository.findAll();
        assertThat(flightList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStartDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = flightRepository.findAll().size();
        // set the field null
        flight.setStartDate(null);

        // Create the Flight, which fails.

        restFlightMockMvc.perform(post("/api/flights")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(flight)))
            .andExpect(status().isBadRequest());

        List<Flight> flightList = flightRepository.findAll();
        assertThat(flightList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEndDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = flightRepository.findAll().size();
        // set the field null
        flight.setEndDate(null);

        // Create the Flight, which fails.

        restFlightMockMvc.perform(post("/api/flights")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(flight)))
            .andExpect(status().isBadRequest());

        List<Flight> flightList = flightRepository.findAll();
        assertThat(flightList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStartTimeIsRequired() throws Exception {
        int databaseSizeBeforeTest = flightRepository.findAll().size();
        // set the field null
        flight.setStartTime(null);

        // Create the Flight, which fails.

        restFlightMockMvc.perform(post("/api/flights")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(flight)))
            .andExpect(status().isBadRequest());

        List<Flight> flightList = flightRepository.findAll();
        assertThat(flightList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEndTimeIsRequired() throws Exception {
        int databaseSizeBeforeTest = flightRepository.findAll().size();
        // set the field null
        flight.setEndTime(null);

        // Create the Flight, which fails.

        restFlightMockMvc.perform(post("/api/flights")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(flight)))
            .andExpect(status().isBadRequest());

        List<Flight> flightList = flightRepository.findAll();
        assertThat(flightList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTimeOfFlightIsRequired() throws Exception {
        int databaseSizeBeforeTest = flightRepository.findAll().size();
        // set the field null
        flight.setTimeOfFlight(null);

        // Create the Flight, which fails.

        restFlightMockMvc.perform(post("/api/flights")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(flight)))
            .andExpect(status().isBadRequest());

        List<Flight> flightList = flightRepository.findAll();
        assertThat(flightList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNumberOfChangesIsRequired() throws Exception {
        int databaseSizeBeforeTest = flightRepository.findAll().size();
        // set the field null
        flight.setNumberOfChanges(null);

        // Create the Flight, which fails.

        restFlightMockMvc.perform(post("/api/flights")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(flight)))
            .andExpect(status().isBadRequest());

        List<Flight> flightList = flightRepository.findAll();
        assertThat(flightList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkLocationOfChangesIsRequired() throws Exception {
        int databaseSizeBeforeTest = flightRepository.findAll().size();
        // set the field null
        flight.setLocationOfChanges(null);

        // Create the Flight, which fails.

        restFlightMockMvc.perform(post("/api/flights")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(flight)))
            .andExpect(status().isBadRequest());

        List<Flight> flightList = flightRepository.findAll();
        assertThat(flightList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkFlightCodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = flightRepository.findAll().size();
        // set the field null
        flight.setFlightCode(null);

        // Create the Flight, which fails.

        restFlightMockMvc.perform(post("/api/flights")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(flight)))
            .andExpect(status().isBadRequest());

        List<Flight> flightList = flightRepository.findAll();
        assertThat(flightList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllFlights() throws Exception {
        // Initialize the database
        flightRepository.saveAndFlush(flight);

        // Get all the flightList
        restFlightMockMvc.perform(get("/api/flights?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(flight.getId().intValue())))
            .andExpect(jsonPath("$.[*].startLocation").value(hasItem(DEFAULT_START_LOCATION.toString())))
            .andExpect(jsonPath("$.[*].endLocation").value(hasItem(DEFAULT_END_LOCATION.toString())))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(DEFAULT_START_DATE.toString())))
            .andExpect(jsonPath("$.[*].endDate").value(hasItem(DEFAULT_END_DATE.toString())))
            .andExpect(jsonPath("$.[*].startTime").value(hasItem(DEFAULT_START_TIME.toString())))
            .andExpect(jsonPath("$.[*].endTime").value(hasItem(DEFAULT_END_TIME.toString())))
            .andExpect(jsonPath("$.[*].timeOfFlight").value(hasItem(DEFAULT_TIME_OF_FLIGHT.toString())))
            .andExpect(jsonPath("$.[*].length").value(hasItem(DEFAULT_LENGTH.toString())))
            .andExpect(jsonPath("$.[*].numberOfChanges").value(hasItem(DEFAULT_NUMBER_OF_CHANGES)))
            .andExpect(jsonPath("$.[*].locationOfChanges").value(hasItem(DEFAULT_LOCATION_OF_CHANGES.toString())))
            .andExpect(jsonPath("$.[*].flightCode").value(hasItem(DEFAULT_FLIGHT_CODE.toString())));
    }
    
    @Test
    @Transactional
    public void getFlight() throws Exception {
        // Initialize the database
        flightRepository.saveAndFlush(flight);

        // Get the flight
        restFlightMockMvc.perform(get("/api/flights/{id}", flight.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(flight.getId().intValue()))
            .andExpect(jsonPath("$.startLocation").value(DEFAULT_START_LOCATION.toString()))
            .andExpect(jsonPath("$.endLocation").value(DEFAULT_END_LOCATION.toString()))
            .andExpect(jsonPath("$.startDate").value(DEFAULT_START_DATE.toString()))
            .andExpect(jsonPath("$.endDate").value(DEFAULT_END_DATE.toString()))
            .andExpect(jsonPath("$.startTime").value(DEFAULT_START_TIME.toString()))
            .andExpect(jsonPath("$.endTime").value(DEFAULT_END_TIME.toString()))
            .andExpect(jsonPath("$.timeOfFlight").value(DEFAULT_TIME_OF_FLIGHT.toString()))
            .andExpect(jsonPath("$.length").value(DEFAULT_LENGTH.toString()))
            .andExpect(jsonPath("$.numberOfChanges").value(DEFAULT_NUMBER_OF_CHANGES))
            .andExpect(jsonPath("$.locationOfChanges").value(DEFAULT_LOCATION_OF_CHANGES.toString()))
            .andExpect(jsonPath("$.flightCode").value(DEFAULT_FLIGHT_CODE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingFlight() throws Exception {
        // Get the flight
        restFlightMockMvc.perform(get("/api/flights/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFlight() throws Exception {
        // Initialize the database
        flightRepository.saveAndFlush(flight);

        int databaseSizeBeforeUpdate = flightRepository.findAll().size();

        // Update the flight
        Flight updatedFlight = flightRepository.findById(flight.getId()).get();
        // Disconnect from session so that the updates on updatedFlight are not directly saved in db
        em.detach(updatedFlight);
        updatedFlight
            .startLocation(UPDATED_START_LOCATION)
            .endLocation(UPDATED_END_LOCATION)
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE)
            .startTime(UPDATED_START_TIME)
            .endTime(UPDATED_END_TIME)
            .timeOfFlight(UPDATED_TIME_OF_FLIGHT)
            .length(UPDATED_LENGTH)
            .numberOfChanges(UPDATED_NUMBER_OF_CHANGES)
            .locationOfChanges(UPDATED_LOCATION_OF_CHANGES)
            .flightCode(UPDATED_FLIGHT_CODE);

        restFlightMockMvc.perform(put("/api/flights")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedFlight)))
            .andExpect(status().isOk());

        // Validate the Flight in the database
        List<Flight> flightList = flightRepository.findAll();
        assertThat(flightList).hasSize(databaseSizeBeforeUpdate);
        Flight testFlight = flightList.get(flightList.size() - 1);
        assertThat(testFlight.getStartLocation()).isEqualTo(UPDATED_START_LOCATION);
        assertThat(testFlight.getEndLocation()).isEqualTo(UPDATED_END_LOCATION);
        assertThat(testFlight.getStartDate()).isEqualTo(UPDATED_START_DATE);
        assertThat(testFlight.getEndDate()).isEqualTo(UPDATED_END_DATE);
        assertThat(testFlight.getStartTime()).isEqualTo(UPDATED_START_TIME);
        assertThat(testFlight.getEndTime()).isEqualTo(UPDATED_END_TIME);
        assertThat(testFlight.getTimeOfFlight()).isEqualTo(UPDATED_TIME_OF_FLIGHT);
        assertThat(testFlight.getLength()).isEqualTo(UPDATED_LENGTH);
        assertThat(testFlight.getNumberOfChanges()).isEqualTo(UPDATED_NUMBER_OF_CHANGES);
        assertThat(testFlight.getLocationOfChanges()).isEqualTo(UPDATED_LOCATION_OF_CHANGES);
        assertThat(testFlight.getFlightCode()).isEqualTo(UPDATED_FLIGHT_CODE);
    }

    @Test
    @Transactional
    public void updateNonExistingFlight() throws Exception {
        int databaseSizeBeforeUpdate = flightRepository.findAll().size();

        // Create the Flight

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFlightMockMvc.perform(put("/api/flights")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(flight)))
            .andExpect(status().isBadRequest());

        // Validate the Flight in the database
        List<Flight> flightList = flightRepository.findAll();
        assertThat(flightList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteFlight() throws Exception {
        // Initialize the database
        flightRepository.saveAndFlush(flight);

        int databaseSizeBeforeDelete = flightRepository.findAll().size();

        // Get the flight
        restFlightMockMvc.perform(delete("/api/flights/{id}", flight.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Flight> flightList = flightRepository.findAll();
        assertThat(flightList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Flight.class);
        Flight flight1 = new Flight();
        flight1.setId(1L);
        Flight flight2 = new Flight();
        flight2.setId(flight1.getId());
        assertThat(flight1).isEqualTo(flight2);
        flight2.setId(2L);
        assertThat(flight1).isNotEqualTo(flight2);
        flight1.setId(null);
        assertThat(flight1).isNotEqualTo(flight2);
    }
}
