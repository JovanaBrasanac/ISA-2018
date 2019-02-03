package com.ftn.tickets.web.rest;

import com.ftn.tickets.TicketsApp;

import com.ftn.tickets.domain.AllSeatsConfiguration;
import com.ftn.tickets.repository.AllSeatsConfigurationRepository;
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
 * Test class for the AllSeatsConfigurationResource REST controller.
 *
 * @see AllSeatsConfigurationResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TicketsApp.class)
public class AllSeatsConfigurationResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Integer DEFAULT_ROWS = 1;
    private static final Integer UPDATED_ROWS = 2;

    private static final Integer DEFAULT_COLUMNS = 1;
    private static final Integer UPDATED_COLUMNS = 2;

    @Autowired
    private AllSeatsConfigurationRepository allSeatsConfigurationRepository;

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

    private MockMvc restAllSeatsConfigurationMockMvc;

    private AllSeatsConfiguration allSeatsConfiguration;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AllSeatsConfigurationResource allSeatsConfigurationResource = new AllSeatsConfigurationResource(allSeatsConfigurationRepository);
        this.restAllSeatsConfigurationMockMvc = MockMvcBuilders.standaloneSetup(allSeatsConfigurationResource)
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
    public static AllSeatsConfiguration createEntity(EntityManager em) {
        AllSeatsConfiguration allSeatsConfiguration = new AllSeatsConfiguration()
            .name(DEFAULT_NAME)
            .rows(DEFAULT_ROWS)
            .columns(DEFAULT_COLUMNS);
        return allSeatsConfiguration;
    }

    @Before
    public void initTest() {
        allSeatsConfiguration = createEntity(em);
    }

    @Test
    @Transactional
    public void createAllSeatsConfiguration() throws Exception {
        int databaseSizeBeforeCreate = allSeatsConfigurationRepository.findAll().size();

        // Create the AllSeatsConfiguration
        restAllSeatsConfigurationMockMvc.perform(post("/api/all-seats-configurations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(allSeatsConfiguration)))
            .andExpect(status().isCreated());

        // Validate the AllSeatsConfiguration in the database
        List<AllSeatsConfiguration> allSeatsConfigurationList = allSeatsConfigurationRepository.findAll();
        assertThat(allSeatsConfigurationList).hasSize(databaseSizeBeforeCreate + 1);
        AllSeatsConfiguration testAllSeatsConfiguration = allSeatsConfigurationList.get(allSeatsConfigurationList.size() - 1);
        assertThat(testAllSeatsConfiguration.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testAllSeatsConfiguration.getRows()).isEqualTo(DEFAULT_ROWS);
        assertThat(testAllSeatsConfiguration.getColumns()).isEqualTo(DEFAULT_COLUMNS);
    }

    @Test
    @Transactional
    public void createAllSeatsConfigurationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = allSeatsConfigurationRepository.findAll().size();

        // Create the AllSeatsConfiguration with an existing ID
        allSeatsConfiguration.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAllSeatsConfigurationMockMvc.perform(post("/api/all-seats-configurations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(allSeatsConfiguration)))
            .andExpect(status().isBadRequest());

        // Validate the AllSeatsConfiguration in the database
        List<AllSeatsConfiguration> allSeatsConfigurationList = allSeatsConfigurationRepository.findAll();
        assertThat(allSeatsConfigurationList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = allSeatsConfigurationRepository.findAll().size();
        // set the field null
        allSeatsConfiguration.setName(null);

        // Create the AllSeatsConfiguration, which fails.

        restAllSeatsConfigurationMockMvc.perform(post("/api/all-seats-configurations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(allSeatsConfiguration)))
            .andExpect(status().isBadRequest());

        List<AllSeatsConfiguration> allSeatsConfigurationList = allSeatsConfigurationRepository.findAll();
        assertThat(allSeatsConfigurationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkRowsIsRequired() throws Exception {
        int databaseSizeBeforeTest = allSeatsConfigurationRepository.findAll().size();
        // set the field null
        allSeatsConfiguration.setRows(null);

        // Create the AllSeatsConfiguration, which fails.

        restAllSeatsConfigurationMockMvc.perform(post("/api/all-seats-configurations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(allSeatsConfiguration)))
            .andExpect(status().isBadRequest());

        List<AllSeatsConfiguration> allSeatsConfigurationList = allSeatsConfigurationRepository.findAll();
        assertThat(allSeatsConfigurationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkColumnsIsRequired() throws Exception {
        int databaseSizeBeforeTest = allSeatsConfigurationRepository.findAll().size();
        // set the field null
        allSeatsConfiguration.setColumns(null);

        // Create the AllSeatsConfiguration, which fails.

        restAllSeatsConfigurationMockMvc.perform(post("/api/all-seats-configurations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(allSeatsConfiguration)))
            .andExpect(status().isBadRequest());

        List<AllSeatsConfiguration> allSeatsConfigurationList = allSeatsConfigurationRepository.findAll();
        assertThat(allSeatsConfigurationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllAllSeatsConfigurations() throws Exception {
        // Initialize the database
        allSeatsConfigurationRepository.saveAndFlush(allSeatsConfiguration);

        // Get all the allSeatsConfigurationList
        restAllSeatsConfigurationMockMvc.perform(get("/api/all-seats-configurations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(allSeatsConfiguration.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].rows").value(hasItem(DEFAULT_ROWS)))
            .andExpect(jsonPath("$.[*].columns").value(hasItem(DEFAULT_COLUMNS)));
    }
    
    @Test
    @Transactional
    public void getAllSeatsConfiguration() throws Exception {
        // Initialize the database
        allSeatsConfigurationRepository.saveAndFlush(allSeatsConfiguration);

        // Get the allSeatsConfiguration
        restAllSeatsConfigurationMockMvc.perform(get("/api/all-seats-configurations/{id}", allSeatsConfiguration.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(allSeatsConfiguration.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.rows").value(DEFAULT_ROWS))
            .andExpect(jsonPath("$.columns").value(DEFAULT_COLUMNS));
    }

    @Test
    @Transactional
    public void getNonExistingAllSeatsConfiguration() throws Exception {
        // Get the allSeatsConfiguration
        restAllSeatsConfigurationMockMvc.perform(get("/api/all-seats-configurations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAllSeatsConfiguration() throws Exception {
        // Initialize the database
        allSeatsConfigurationRepository.saveAndFlush(allSeatsConfiguration);

        int databaseSizeBeforeUpdate = allSeatsConfigurationRepository.findAll().size();

        // Update the allSeatsConfiguration
        AllSeatsConfiguration updatedAllSeatsConfiguration = allSeatsConfigurationRepository.findById(allSeatsConfiguration.getId()).get();
        // Disconnect from session so that the updates on updatedAllSeatsConfiguration are not directly saved in db
        em.detach(updatedAllSeatsConfiguration);
        updatedAllSeatsConfiguration
            .name(UPDATED_NAME)
            .rows(UPDATED_ROWS)
            .columns(UPDATED_COLUMNS);

        restAllSeatsConfigurationMockMvc.perform(put("/api/all-seats-configurations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAllSeatsConfiguration)))
            .andExpect(status().isOk());

        // Validate the AllSeatsConfiguration in the database
        List<AllSeatsConfiguration> allSeatsConfigurationList = allSeatsConfigurationRepository.findAll();
        assertThat(allSeatsConfigurationList).hasSize(databaseSizeBeforeUpdate);
        AllSeatsConfiguration testAllSeatsConfiguration = allSeatsConfigurationList.get(allSeatsConfigurationList.size() - 1);
        assertThat(testAllSeatsConfiguration.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testAllSeatsConfiguration.getRows()).isEqualTo(UPDATED_ROWS);
        assertThat(testAllSeatsConfiguration.getColumns()).isEqualTo(UPDATED_COLUMNS);
    }

    @Test
    @Transactional
    public void updateNonExistingAllSeatsConfiguration() throws Exception {
        int databaseSizeBeforeUpdate = allSeatsConfigurationRepository.findAll().size();

        // Create the AllSeatsConfiguration

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAllSeatsConfigurationMockMvc.perform(put("/api/all-seats-configurations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(allSeatsConfiguration)))
            .andExpect(status().isBadRequest());

        // Validate the AllSeatsConfiguration in the database
        List<AllSeatsConfiguration> allSeatsConfigurationList = allSeatsConfigurationRepository.findAll();
        assertThat(allSeatsConfigurationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAllSeatsConfiguration() throws Exception {
        // Initialize the database
        allSeatsConfigurationRepository.saveAndFlush(allSeatsConfiguration);

        int databaseSizeBeforeDelete = allSeatsConfigurationRepository.findAll().size();

        // Get the allSeatsConfiguration
        restAllSeatsConfigurationMockMvc.perform(delete("/api/all-seats-configurations/{id}", allSeatsConfiguration.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<AllSeatsConfiguration> allSeatsConfigurationList = allSeatsConfigurationRepository.findAll();
        assertThat(allSeatsConfigurationList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AllSeatsConfiguration.class);
        AllSeatsConfiguration allSeatsConfiguration1 = new AllSeatsConfiguration();
        allSeatsConfiguration1.setId(1L);
        AllSeatsConfiguration allSeatsConfiguration2 = new AllSeatsConfiguration();
        allSeatsConfiguration2.setId(allSeatsConfiguration1.getId());
        assertThat(allSeatsConfiguration1).isEqualTo(allSeatsConfiguration2);
        allSeatsConfiguration2.setId(2L);
        assertThat(allSeatsConfiguration1).isNotEqualTo(allSeatsConfiguration2);
        allSeatsConfiguration1.setId(null);
        assertThat(allSeatsConfiguration1).isNotEqualTo(allSeatsConfiguration2);
    }
}
