package com.rrhh.red.web.rest;

import com.rrhh.red.Rrhh2App;
import com.rrhh.red.domain.Garantia;
import com.rrhh.red.domain.Persona;
import com.rrhh.red.repository.GarantiaRepository;
import com.rrhh.red.service.GarantiaService;
import com.rrhh.red.service.dto.GarantiaCriteria;
import com.rrhh.red.service.GarantiaQueryService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link GarantiaResource} REST controller.
 */
@SpringBootTest(classes = Rrhh2App.class)
@AutoConfigureMockMvc
@WithMockUser
public class GarantiaResourceIT {

    private static final LocalDate DEFAULT_PRESENTADA_FECHA = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_PRESENTADA_FECHA = LocalDate.now(ZoneId.systemDefault());
    private static final LocalDate SMALLER_PRESENTADA_FECHA = LocalDate.ofEpochDay(-1L);

    private static final String DEFAULT_GARANTIA = "AAAAAAAAAA";
    private static final String UPDATED_GARANTIA = "BBBBBBBBBB";

    private static final String DEFAULT_OBSERVACIONES = "AAAAAAAAAA";
    private static final String UPDATED_OBSERVACIONES = "BBBBBBBBBB";

    @Autowired
    private GarantiaRepository garantiaRepository;

    @Autowired
    private GarantiaService garantiaService;

    @Autowired
    private GarantiaQueryService garantiaQueryService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restGarantiaMockMvc;

    private Garantia garantia;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Garantia createEntity(EntityManager em) {
        Garantia garantia = new Garantia()
            .presentadaFecha(DEFAULT_PRESENTADA_FECHA)
            .garantia(DEFAULT_GARANTIA)
            .observaciones(DEFAULT_OBSERVACIONES);
        return garantia;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Garantia createUpdatedEntity(EntityManager em) {
        Garantia garantia = new Garantia()
            .presentadaFecha(UPDATED_PRESENTADA_FECHA)
            .garantia(UPDATED_GARANTIA)
            .observaciones(UPDATED_OBSERVACIONES);
        return garantia;
    }

    @BeforeEach
    public void initTest() {
        garantia = createEntity(em);
    }

    @Test
    @Transactional
    public void createGarantia() throws Exception {
        int databaseSizeBeforeCreate = garantiaRepository.findAll().size();
        // Create the Garantia
        restGarantiaMockMvc.perform(post("/api/garantias").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(garantia)))
            .andExpect(status().isCreated());

        // Validate the Garantia in the database
        List<Garantia> garantiaList = garantiaRepository.findAll();
        assertThat(garantiaList).hasSize(databaseSizeBeforeCreate + 1);
        Garantia testGarantia = garantiaList.get(garantiaList.size() - 1);
        assertThat(testGarantia.getPresentadaFecha()).isEqualTo(DEFAULT_PRESENTADA_FECHA);
        assertThat(testGarantia.getGarantia()).isEqualTo(DEFAULT_GARANTIA);
        assertThat(testGarantia.getObservaciones()).isEqualTo(DEFAULT_OBSERVACIONES);
    }

    @Test
    @Transactional
    public void createGarantiaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = garantiaRepository.findAll().size();

        // Create the Garantia with an existing ID
        garantia.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGarantiaMockMvc.perform(post("/api/garantias").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(garantia)))
            .andExpect(status().isBadRequest());

        // Validate the Garantia in the database
        List<Garantia> garantiaList = garantiaRepository.findAll();
        assertThat(garantiaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllGarantias() throws Exception {
        // Initialize the database
        garantiaRepository.saveAndFlush(garantia);

        // Get all the garantiaList
        restGarantiaMockMvc.perform(get("/api/garantias?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(garantia.getId().intValue())))
            .andExpect(jsonPath("$.[*].presentadaFecha").value(hasItem(DEFAULT_PRESENTADA_FECHA.toString())))
            .andExpect(jsonPath("$.[*].garantia").value(hasItem(DEFAULT_GARANTIA)))
            .andExpect(jsonPath("$.[*].observaciones").value(hasItem(DEFAULT_OBSERVACIONES)));
    }
    
    @Test
    @Transactional
    public void getGarantia() throws Exception {
        // Initialize the database
        garantiaRepository.saveAndFlush(garantia);

        // Get the garantia
        restGarantiaMockMvc.perform(get("/api/garantias/{id}", garantia.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(garantia.getId().intValue()))
            .andExpect(jsonPath("$.presentadaFecha").value(DEFAULT_PRESENTADA_FECHA.toString()))
            .andExpect(jsonPath("$.garantia").value(DEFAULT_GARANTIA))
            .andExpect(jsonPath("$.observaciones").value(DEFAULT_OBSERVACIONES));
    }


    @Test
    @Transactional
    public void getGarantiasByIdFiltering() throws Exception {
        // Initialize the database
        garantiaRepository.saveAndFlush(garantia);

        Long id = garantia.getId();

        defaultGarantiaShouldBeFound("id.equals=" + id);
        defaultGarantiaShouldNotBeFound("id.notEquals=" + id);

        defaultGarantiaShouldBeFound("id.greaterThanOrEqual=" + id);
        defaultGarantiaShouldNotBeFound("id.greaterThan=" + id);

        defaultGarantiaShouldBeFound("id.lessThanOrEqual=" + id);
        defaultGarantiaShouldNotBeFound("id.lessThan=" + id);
    }


    @Test
    @Transactional
    public void getAllGarantiasByPresentadaFechaIsEqualToSomething() throws Exception {
        // Initialize the database
        garantiaRepository.saveAndFlush(garantia);

        // Get all the garantiaList where presentadaFecha equals to DEFAULT_PRESENTADA_FECHA
        defaultGarantiaShouldBeFound("presentadaFecha.equals=" + DEFAULT_PRESENTADA_FECHA);

        // Get all the garantiaList where presentadaFecha equals to UPDATED_PRESENTADA_FECHA
        defaultGarantiaShouldNotBeFound("presentadaFecha.equals=" + UPDATED_PRESENTADA_FECHA);
    }

    @Test
    @Transactional
    public void getAllGarantiasByPresentadaFechaIsNotEqualToSomething() throws Exception {
        // Initialize the database
        garantiaRepository.saveAndFlush(garantia);

        // Get all the garantiaList where presentadaFecha not equals to DEFAULT_PRESENTADA_FECHA
        defaultGarantiaShouldNotBeFound("presentadaFecha.notEquals=" + DEFAULT_PRESENTADA_FECHA);

        // Get all the garantiaList where presentadaFecha not equals to UPDATED_PRESENTADA_FECHA
        defaultGarantiaShouldBeFound("presentadaFecha.notEquals=" + UPDATED_PRESENTADA_FECHA);
    }

    @Test
    @Transactional
    public void getAllGarantiasByPresentadaFechaIsInShouldWork() throws Exception {
        // Initialize the database
        garantiaRepository.saveAndFlush(garantia);

        // Get all the garantiaList where presentadaFecha in DEFAULT_PRESENTADA_FECHA or UPDATED_PRESENTADA_FECHA
        defaultGarantiaShouldBeFound("presentadaFecha.in=" + DEFAULT_PRESENTADA_FECHA + "," + UPDATED_PRESENTADA_FECHA);

        // Get all the garantiaList where presentadaFecha equals to UPDATED_PRESENTADA_FECHA
        defaultGarantiaShouldNotBeFound("presentadaFecha.in=" + UPDATED_PRESENTADA_FECHA);
    }

    @Test
    @Transactional
    public void getAllGarantiasByPresentadaFechaIsNullOrNotNull() throws Exception {
        // Initialize the database
        garantiaRepository.saveAndFlush(garantia);

        // Get all the garantiaList where presentadaFecha is not null
        defaultGarantiaShouldBeFound("presentadaFecha.specified=true");

        // Get all the garantiaList where presentadaFecha is null
        defaultGarantiaShouldNotBeFound("presentadaFecha.specified=false");
    }

    @Test
    @Transactional
    public void getAllGarantiasByPresentadaFechaIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        garantiaRepository.saveAndFlush(garantia);

        // Get all the garantiaList where presentadaFecha is greater than or equal to DEFAULT_PRESENTADA_FECHA
        defaultGarantiaShouldBeFound("presentadaFecha.greaterThanOrEqual=" + DEFAULT_PRESENTADA_FECHA);

        // Get all the garantiaList where presentadaFecha is greater than or equal to UPDATED_PRESENTADA_FECHA
        defaultGarantiaShouldNotBeFound("presentadaFecha.greaterThanOrEqual=" + UPDATED_PRESENTADA_FECHA);
    }

    @Test
    @Transactional
    public void getAllGarantiasByPresentadaFechaIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        garantiaRepository.saveAndFlush(garantia);

        // Get all the garantiaList where presentadaFecha is less than or equal to DEFAULT_PRESENTADA_FECHA
        defaultGarantiaShouldBeFound("presentadaFecha.lessThanOrEqual=" + DEFAULT_PRESENTADA_FECHA);

        // Get all the garantiaList where presentadaFecha is less than or equal to SMALLER_PRESENTADA_FECHA
        defaultGarantiaShouldNotBeFound("presentadaFecha.lessThanOrEqual=" + SMALLER_PRESENTADA_FECHA);
    }

    @Test
    @Transactional
    public void getAllGarantiasByPresentadaFechaIsLessThanSomething() throws Exception {
        // Initialize the database
        garantiaRepository.saveAndFlush(garantia);

        // Get all the garantiaList where presentadaFecha is less than DEFAULT_PRESENTADA_FECHA
        defaultGarantiaShouldNotBeFound("presentadaFecha.lessThan=" + DEFAULT_PRESENTADA_FECHA);

        // Get all the garantiaList where presentadaFecha is less than UPDATED_PRESENTADA_FECHA
        defaultGarantiaShouldBeFound("presentadaFecha.lessThan=" + UPDATED_PRESENTADA_FECHA);
    }

    @Test
    @Transactional
    public void getAllGarantiasByPresentadaFechaIsGreaterThanSomething() throws Exception {
        // Initialize the database
        garantiaRepository.saveAndFlush(garantia);

        // Get all the garantiaList where presentadaFecha is greater than DEFAULT_PRESENTADA_FECHA
        defaultGarantiaShouldNotBeFound("presentadaFecha.greaterThan=" + DEFAULT_PRESENTADA_FECHA);

        // Get all the garantiaList where presentadaFecha is greater than SMALLER_PRESENTADA_FECHA
        defaultGarantiaShouldBeFound("presentadaFecha.greaterThan=" + SMALLER_PRESENTADA_FECHA);
    }


    @Test
    @Transactional
    public void getAllGarantiasByGarantiaIsEqualToSomething() throws Exception {
        // Initialize the database
        garantiaRepository.saveAndFlush(garantia);

        // Get all the garantiaList where garantia equals to DEFAULT_GARANTIA
        defaultGarantiaShouldBeFound("garantia.equals=" + DEFAULT_GARANTIA);

        // Get all the garantiaList where garantia equals to UPDATED_GARANTIA
        defaultGarantiaShouldNotBeFound("garantia.equals=" + UPDATED_GARANTIA);
    }

    @Test
    @Transactional
    public void getAllGarantiasByGarantiaIsNotEqualToSomething() throws Exception {
        // Initialize the database
        garantiaRepository.saveAndFlush(garantia);

        // Get all the garantiaList where garantia not equals to DEFAULT_GARANTIA
        defaultGarantiaShouldNotBeFound("garantia.notEquals=" + DEFAULT_GARANTIA);

        // Get all the garantiaList where garantia not equals to UPDATED_GARANTIA
        defaultGarantiaShouldBeFound("garantia.notEquals=" + UPDATED_GARANTIA);
    }

    @Test
    @Transactional
    public void getAllGarantiasByGarantiaIsInShouldWork() throws Exception {
        // Initialize the database
        garantiaRepository.saveAndFlush(garantia);

        // Get all the garantiaList where garantia in DEFAULT_GARANTIA or UPDATED_GARANTIA
        defaultGarantiaShouldBeFound("garantia.in=" + DEFAULT_GARANTIA + "," + UPDATED_GARANTIA);

        // Get all the garantiaList where garantia equals to UPDATED_GARANTIA
        defaultGarantiaShouldNotBeFound("garantia.in=" + UPDATED_GARANTIA);
    }

    @Test
    @Transactional
    public void getAllGarantiasByGarantiaIsNullOrNotNull() throws Exception {
        // Initialize the database
        garantiaRepository.saveAndFlush(garantia);

        // Get all the garantiaList where garantia is not null
        defaultGarantiaShouldBeFound("garantia.specified=true");

        // Get all the garantiaList where garantia is null
        defaultGarantiaShouldNotBeFound("garantia.specified=false");
    }
                @Test
    @Transactional
    public void getAllGarantiasByGarantiaContainsSomething() throws Exception {
        // Initialize the database
        garantiaRepository.saveAndFlush(garantia);

        // Get all the garantiaList where garantia contains DEFAULT_GARANTIA
        defaultGarantiaShouldBeFound("garantia.contains=" + DEFAULT_GARANTIA);

        // Get all the garantiaList where garantia contains UPDATED_GARANTIA
        defaultGarantiaShouldNotBeFound("garantia.contains=" + UPDATED_GARANTIA);
    }

    @Test
    @Transactional
    public void getAllGarantiasByGarantiaNotContainsSomething() throws Exception {
        // Initialize the database
        garantiaRepository.saveAndFlush(garantia);

        // Get all the garantiaList where garantia does not contain DEFAULT_GARANTIA
        defaultGarantiaShouldNotBeFound("garantia.doesNotContain=" + DEFAULT_GARANTIA);

        // Get all the garantiaList where garantia does not contain UPDATED_GARANTIA
        defaultGarantiaShouldBeFound("garantia.doesNotContain=" + UPDATED_GARANTIA);
    }


    @Test
    @Transactional
    public void getAllGarantiasByObservacionesIsEqualToSomething() throws Exception {
        // Initialize the database
        garantiaRepository.saveAndFlush(garantia);

        // Get all the garantiaList where observaciones equals to DEFAULT_OBSERVACIONES
        defaultGarantiaShouldBeFound("observaciones.equals=" + DEFAULT_OBSERVACIONES);

        // Get all the garantiaList where observaciones equals to UPDATED_OBSERVACIONES
        defaultGarantiaShouldNotBeFound("observaciones.equals=" + UPDATED_OBSERVACIONES);
    }

    @Test
    @Transactional
    public void getAllGarantiasByObservacionesIsNotEqualToSomething() throws Exception {
        // Initialize the database
        garantiaRepository.saveAndFlush(garantia);

        // Get all the garantiaList where observaciones not equals to DEFAULT_OBSERVACIONES
        defaultGarantiaShouldNotBeFound("observaciones.notEquals=" + DEFAULT_OBSERVACIONES);

        // Get all the garantiaList where observaciones not equals to UPDATED_OBSERVACIONES
        defaultGarantiaShouldBeFound("observaciones.notEquals=" + UPDATED_OBSERVACIONES);
    }

    @Test
    @Transactional
    public void getAllGarantiasByObservacionesIsInShouldWork() throws Exception {
        // Initialize the database
        garantiaRepository.saveAndFlush(garantia);

        // Get all the garantiaList where observaciones in DEFAULT_OBSERVACIONES or UPDATED_OBSERVACIONES
        defaultGarantiaShouldBeFound("observaciones.in=" + DEFAULT_OBSERVACIONES + "," + UPDATED_OBSERVACIONES);

        // Get all the garantiaList where observaciones equals to UPDATED_OBSERVACIONES
        defaultGarantiaShouldNotBeFound("observaciones.in=" + UPDATED_OBSERVACIONES);
    }

    @Test
    @Transactional
    public void getAllGarantiasByObservacionesIsNullOrNotNull() throws Exception {
        // Initialize the database
        garantiaRepository.saveAndFlush(garantia);

        // Get all the garantiaList where observaciones is not null
        defaultGarantiaShouldBeFound("observaciones.specified=true");

        // Get all the garantiaList where observaciones is null
        defaultGarantiaShouldNotBeFound("observaciones.specified=false");
    }
                @Test
    @Transactional
    public void getAllGarantiasByObservacionesContainsSomething() throws Exception {
        // Initialize the database
        garantiaRepository.saveAndFlush(garantia);

        // Get all the garantiaList where observaciones contains DEFAULT_OBSERVACIONES
        defaultGarantiaShouldBeFound("observaciones.contains=" + DEFAULT_OBSERVACIONES);

        // Get all the garantiaList where observaciones contains UPDATED_OBSERVACIONES
        defaultGarantiaShouldNotBeFound("observaciones.contains=" + UPDATED_OBSERVACIONES);
    }

    @Test
    @Transactional
    public void getAllGarantiasByObservacionesNotContainsSomething() throws Exception {
        // Initialize the database
        garantiaRepository.saveAndFlush(garantia);

        // Get all the garantiaList where observaciones does not contain DEFAULT_OBSERVACIONES
        defaultGarantiaShouldNotBeFound("observaciones.doesNotContain=" + DEFAULT_OBSERVACIONES);

        // Get all the garantiaList where observaciones does not contain UPDATED_OBSERVACIONES
        defaultGarantiaShouldBeFound("observaciones.doesNotContain=" + UPDATED_OBSERVACIONES);
    }


    @Test
    @Transactional
    public void getAllGarantiasByPersonaIsEqualToSomething() throws Exception {
        // Initialize the database
        garantiaRepository.saveAndFlush(garantia);
        Persona persona = PersonaResourceIT.createEntity(em);
        em.persist(persona);
        em.flush();
        garantia.setPersona(persona);
        garantiaRepository.saveAndFlush(garantia);
        Long personaId = persona.getId();

        // Get all the garantiaList where persona equals to personaId
        defaultGarantiaShouldBeFound("personaId.equals=" + personaId);

        // Get all the garantiaList where persona equals to personaId + 1
        defaultGarantiaShouldNotBeFound("personaId.equals=" + (personaId + 1));
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultGarantiaShouldBeFound(String filter) throws Exception {
        restGarantiaMockMvc.perform(get("/api/garantias?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(garantia.getId().intValue())))
            .andExpect(jsonPath("$.[*].presentadaFecha").value(hasItem(DEFAULT_PRESENTADA_FECHA.toString())))
            .andExpect(jsonPath("$.[*].garantia").value(hasItem(DEFAULT_GARANTIA)))
            .andExpect(jsonPath("$.[*].observaciones").value(hasItem(DEFAULT_OBSERVACIONES)));

        // Check, that the count call also returns 1
        restGarantiaMockMvc.perform(get("/api/garantias/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultGarantiaShouldNotBeFound(String filter) throws Exception {
        restGarantiaMockMvc.perform(get("/api/garantias?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restGarantiaMockMvc.perform(get("/api/garantias/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("0"));
    }

    @Test
    @Transactional
    public void getNonExistingGarantia() throws Exception {
        // Get the garantia
        restGarantiaMockMvc.perform(get("/api/garantias/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGarantia() throws Exception {
        // Initialize the database
        garantiaService.save(garantia);

        int databaseSizeBeforeUpdate = garantiaRepository.findAll().size();

        // Update the garantia
        Garantia updatedGarantia = garantiaRepository.findById(garantia.getId()).get();
        // Disconnect from session so that the updates on updatedGarantia are not directly saved in db
        em.detach(updatedGarantia);
        updatedGarantia
            .presentadaFecha(UPDATED_PRESENTADA_FECHA)
            .garantia(UPDATED_GARANTIA)
            .observaciones(UPDATED_OBSERVACIONES);

        restGarantiaMockMvc.perform(put("/api/garantias").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedGarantia)))
            .andExpect(status().isOk());

        // Validate the Garantia in the database
        List<Garantia> garantiaList = garantiaRepository.findAll();
        assertThat(garantiaList).hasSize(databaseSizeBeforeUpdate);
        Garantia testGarantia = garantiaList.get(garantiaList.size() - 1);
        assertThat(testGarantia.getPresentadaFecha()).isEqualTo(UPDATED_PRESENTADA_FECHA);
        assertThat(testGarantia.getGarantia()).isEqualTo(UPDATED_GARANTIA);
        assertThat(testGarantia.getObservaciones()).isEqualTo(UPDATED_OBSERVACIONES);
    }

    @Test
    @Transactional
    public void updateNonExistingGarantia() throws Exception {
        int databaseSizeBeforeUpdate = garantiaRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGarantiaMockMvc.perform(put("/api/garantias").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(garantia)))
            .andExpect(status().isBadRequest());

        // Validate the Garantia in the database
        List<Garantia> garantiaList = garantiaRepository.findAll();
        assertThat(garantiaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteGarantia() throws Exception {
        // Initialize the database
        garantiaService.save(garantia);

        int databaseSizeBeforeDelete = garantiaRepository.findAll().size();

        // Delete the garantia
        restGarantiaMockMvc.perform(delete("/api/garantias/{id}", garantia.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Garantia> garantiaList = garantiaRepository.findAll();
        assertThat(garantiaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
