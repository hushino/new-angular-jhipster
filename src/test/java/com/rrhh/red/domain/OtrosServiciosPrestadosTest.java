package com.rrhh.red.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.rrhh.red.web.rest.TestUtil;

public class OtrosServiciosPrestadosTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(OtrosServiciosPrestados.class);
        OtrosServiciosPrestados otrosServiciosPrestados1 = new OtrosServiciosPrestados();
        otrosServiciosPrestados1.setId(1L);
        OtrosServiciosPrestados otrosServiciosPrestados2 = new OtrosServiciosPrestados();
        otrosServiciosPrestados2.setId(otrosServiciosPrestados1.getId());
        assertThat(otrosServiciosPrestados1).isEqualTo(otrosServiciosPrestados2);
        otrosServiciosPrestados2.setId(2L);
        assertThat(otrosServiciosPrestados1).isNotEqualTo(otrosServiciosPrestados2);
        otrosServiciosPrestados1.setId(null);
        assertThat(otrosServiciosPrestados1).isNotEqualTo(otrosServiciosPrestados2);
    }
}
