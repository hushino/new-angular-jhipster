package com.rrhh.red.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.rrhh.red.web.rest.TestUtil;

public class LicenciaTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Licencia.class);
        Licencia licencia1 = new Licencia();
        licencia1.setId(1L);
        Licencia licencia2 = new Licencia();
        licencia2.setId(licencia1.getId());
        assertThat(licencia1).isEqualTo(licencia2);
        licencia2.setId(2L);
        assertThat(licencia1).isNotEqualTo(licencia2);
        licencia1.setId(null);
        assertThat(licencia1).isNotEqualTo(licencia2);
    }
}
