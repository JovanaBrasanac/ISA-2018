package com.ftn.tickets.web.rest;

import com.ftn.tickets.TicketsApp;

import com.ftn.tickets.domain.Seat;
import com.ftn.tickets.domain.AllSeatsConfiguration;
import com.ftn.tickets.repository.SeatRepository;
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

import com.ftn.tickets.domain.enumeration.SeatType;
/**
 * Test class for the SeatResource REST controller.
 *
 * @see SeatResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TicketsApp.class)
public class SeatResourceIntTest {

    private static final SeatType DEFAULT_SEAT_TYPE = SeatType.BUSINESS;
    private static final SeatType UPDATED_SEAT_TYPE = SeatType.REGULAR;

    private static final Integer DEFAULT_ROW = 1;
    private static final Integer UPDATED_ROW = 2;

    private static final Integer DEFAULT_COLUMN = 1;
    private static final Integer UPDATED_COLUMN = 2;

    private static final Float DEFAULT_PRICE = 1F;
    private static final Float UPDATED_PRICE = 2F;

    private static final Boolean DEFAULT_RESERVED = false;
    private static final Boolean UPDATED_RESERVED = true;

    private static final LocalDate DEFAULT_DATE_OF_SALE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_OF_SALE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_TIME_OF_SALE = "AAAAAAAAAA";
    private static final String UPDATED_TIME_OF_SALE = "BBBBBBBBBB";

    @Autowired
    private SeatRepository seatRepository;

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

    private MockMvc restSeatMockMvc;

    private Seat seat;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SeatResource seatResource = new SeatResource(seatRepository);
        this.restSeatMockMvc = MockMvcBuilders.standaloneSetup(seatResource)
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
    public static Seat createEntity(EntityManager em) {
        Seat seat = new Seat()
            .seatType(DEFAULT_SEAT_TYPE)
            .row(DEFAULT_ROW)
            .column(DEFAULT_COLUMN)
            .price(DEFAULT_PRICE)
            .reserved(DEFAULT_RESERVED)
            .dateOfSale(DEFAULT_DATE_OF_SALE)
            .timeOfSale(DEFAULT_TIME_OF_SALE);
        // Add required entity
        AllSeatsConfiguration allSeatsConfiguration = AllSeatsConfigurationResourceIntTest.createEntity(em);
        em.persist(allSeatsConfiguration);
        em.flush();
        seat.setAllSeats(allSeatsConfiguration);
        return seat;
    }

    @Before
    public void initTest() {
        seat = createEntity(em);
    }

    @Test
    @Transactional
    public void createSeat() throws Exception {
        int databaseSizeBeforeCreate = seatRepository.findAll().size();

        // Create the Seat
        restSeatMockMvc.perform(post("/api/seats")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(seat)))
            .andExpect(status().isCreated());

        // Validate the Seat in the database
        List<Seat> seatList = seatRepository.findAll();
        assertThat(seatList).hasSize(databaseSizeBeforeCreate + 1);
        Seat testSeat = seatList.get(seatList.size() - 1);
        assertThat(testSeat.getSeatType()).isEqualTo(DEFAULT_SEAT_TYPE);
        assertThat(testSeat.getRow()).isEqualTo(DEFAULT_ROW);
        assertThat(testSeat.getColumn()).isEqualTo(DEFAULT_COLUMN);
        assertThat(testSeat.getPrice()).isEqualTo(DEFAULT_PRICE);
        assertThat(testSeat.isReserved()).isEqualTo(DEFAULT_RESERVED);
        assertThat(testSeat.getDateOfSale()).isEqualTo(DEFAULT_DATE_OF_SALE);
        assertThat(testSeat.getTimeOfSale()).isEqualTo(DEFAULT_TIME_OF_SALE);
    }

    @Test
    @Transactional
    public void createSeatWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = seatRepository.findAll().size();

        // Create the Seat with an existing ID
        seat.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSeatMockMvc.perform(post("/api/seats")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(seat)))
            .andExpect(status().isBadRequest());

        // Validate the Seat in the database
        List<Seat> seatList = seatRepository.findAll();
        assertThat(seatList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkSeatTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = seatRepository.findAll().size();
        // set the field null
        seat.setSeatType(null);

        // Create the Seat, which fails.

        restSeatMockMvc.perform(post("/api/seats")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(seat)))
            .andExpect(status().isBadRequest());

        List<Seat> seatList = seatRepository.findAll();
        assertThat(seatList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkRowIsRequired() throws Exception {
        int databaseSizeBeforeTest = seatRepository.findAll().size();
        // set the field null
        seat.setRow(null);

        // Create the Seat, which fails.

        restSeatMockMvc.perform(post("/api/seats")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(seat)))
            .andExpect(status().isBadRequest());

        List<Seat> seatList = seatRepository.findAll();
        assertThat(seatList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkColumnIsRequired() throws Exception {
        int databaseSizeBeforeTest = seatRepository.findAll().size();
        // set the field null
        seat.setColumn(null);

        // Create the Seat, which fails.

        restSeatMockMvc.perform(post("/api/seats")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(seat)))
            .andExpect(status().isBadRequest());

        List<Seat> seatList = seatRepository.findAll();
        assertThat(seatList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPriceIsRequired() throws Exception {
        int databaseSizeBeforeTest = seatRepository.findAll().size();
        // set the field null
        seat.setPrice(null);

        // Create the Seat, which fails.

        restSeatMockMvc.perform(post("/api/seats")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(seat)))
            .andExpect(status().isBadRequest());

        List<Seat> seatList = seatRepository.findAll();
        assertThat(seatList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkReservedIsRequired() throws Exception {
        int databaseSizeBeforeTest = seatRepository.findAll().size();
        // set the field null
        seat.setReserved(null);

        // Create the Seat, which fails.

        restSeatMockMvc.perform(post("/api/seats")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(seat)))
            .andExpect(status().isBadRequest());

        List<Seat> seatList = seatRepository.findAll();
        assertThat(seatList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSeats() throws Exception {
        // Initialize the database
        seatRepository.saveAndFlush(seat);

        // Get all the seatList
        restSeatMockMvc.perform(get("/api/seats?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(seat.getId().intValue())))
            .andExpect(jsonPath("$.[*].seatType").value(hasItem(DEFAULT_SEAT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].row").value(hasItem(DEFAULT_ROW)))
            .andExpect(jsonPath("$.[*].column").value(hasItem(DEFAULT_COLUMN)))
            .andExpect(jsonPath("$.[*].price").value(hasItem(DEFAULT_PRICE.doubleValue())))
            .andExpect(jsonPath("$.[*].reserved").value(hasItem(DEFAULT_RESERVED.booleanValue())))
            .andExpect(jsonPath("$.[*].dateOfSale").value(hasItem(DEFAULT_DATE_OF_SALE.toString())))
            .andExpect(jsonPath("$.[*].timeOfSale").value(hasItem(DEFAULT_TIME_OF_SALE.toString())));
    }
    
    @Test
    @Transactional
    public void getSeat() throws Exception {
        // Initialize the database
        seatRepository.saveAndFlush(seat);

        // Get the seat
        restSeatMockMvc.perform(get("/api/seats/{id}", seat.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(seat.getId().intValue()))
            .andExpect(jsonPath("$.seatType").value(DEFAULT_SEAT_TYPE.toString()))
            .andExpect(jsonPath("$.row").value(DEFAULT_ROW))
            .andExpect(jsonPath("$.column").value(DEFAULT_COLUMN))
            .andExpect(jsonPath("$.price").value(DEFAULT_PRICE.doubleValue()))
            .andExpect(jsonPath("$.reserved").value(DEFAULT_RESERVED.booleanValue()))
            .andExpect(jsonPath("$.dateOfSale").value(DEFAULT_DATE_OF_SALE.toString()))
            .andExpect(jsonPath("$.timeOfSale").value(DEFAULT_TIME_OF_SALE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingSeat() throws Exception {
        // Get the seat
        restSeatMockMvc.perform(get("/api/seats/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSeat() throws Exception {
        // Initialize the database
        seatRepository.saveAndFlush(seat);

        int databaseSizeBeforeUpdate = seatRepository.findAll().size();

        // Update the seat
        Seat updatedSeat = seatRepository.findById(seat.getId()).get();
        // Disconnect from session so that the updates on updatedSeat are not directly saved in db
        em.detach(updatedSeat);
        updatedSeat
            .seatType(UPDATED_SEAT_TYPE)
            .row(UPDATED_ROW)
            .column(UPDATED_COLUMN)
            .price(UPDATED_PRICE)
            .reserved(UPDATED_RESERVED)
            .dateOfSale(UPDATED_DATE_OF_SALE)
            .timeOfSale(UPDATED_TIME_OF_SALE);

        restSeatMockMvc.perform(put("/api/seats")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSeat)))
            .andExpect(status().isOk());

        // Validate the Seat in the database
        List<Seat> seatList = seatRepository.findAll();
        assertThat(seatList).hasSize(databaseSizeBeforeUpdate);
        Seat testSeat = seatList.get(seatList.size() - 1);
        assertThat(testSeat.getSeatType()).isEqualTo(UPDATED_SEAT_TYPE);
        assertThat(testSeat.getRow()).isEqualTo(UPDATED_ROW);
        assertThat(testSeat.getColumn()).isEqualTo(UPDATED_COLUMN);
        assertThat(testSeat.getPrice()).isEqualTo(UPDATED_PRICE);
        assertThat(testSeat.isReserved()).isEqualTo(UPDATED_RESERVED);
        assertThat(testSeat.getDateOfSale()).isEqualTo(UPDATED_DATE_OF_SALE);
        assertThat(testSeat.getTimeOfSale()).isEqualTo(UPDATED_TIME_OF_SALE);
    }

    @Test
    @Transactional
    public void updateNonExistingSeat() throws Exception {
        int databaseSizeBeforeUpdate = seatRepository.findAll().size();

        // Create the Seat

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSeatMockMvc.perform(put("/api/seats")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(seat)))
            .andExpect(status().isBadRequest());

        // Validate the Seat in the database
        List<Seat> seatList = seatRepository.findAll();
        assertThat(seatList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSeat() throws Exception {
        // Initialize the database
        seatRepository.saveAndFlush(seat);

        int databaseSizeBeforeDelete = seatRepository.findAll().size();

        // Get the seat
        restSeatMockMvc.perform(delete("/api/seats/{id}", seat.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Seat> seatList = seatRepository.findAll();
        assertThat(seatList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Seat.class);
        Seat seat1 = new Seat();
        seat1.setId(1L);
        Seat seat2 = new Seat();
        seat2.setId(seat1.getId());
        assertThat(seat1).isEqualTo(seat2);
        seat2.setId(2L);
        assertThat(seat1).isNotEqualTo(seat2);
        seat1.setId(null);
        assertThat(seat1).isNotEqualTo(seat2);
    }
}
