package com.rrhh.red.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.rrhh.red.web.rest.TestUtil;

public class AltasAscensosBajasTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AltasAscensosBajas.class);
        AltasAscensosBajas altasAscensosBajas1 = new AltasAscensosBajas();
        altasAscensosBajas1.setId(1L);
        AltasAscensosBajas altasAscensosBajas2 = new AltasAscensosBajas();
        altasAscensosBajas2.setId(altasAscensosBajas1.getId());
        assertThat(altasAscensosBajas1).isEqualTo(altasAscensosBajas2);
        altasAscensosBajas2.setId(2L);
        assertThat(altasAscensosBajas1).isNotEqualTo(altasAscensosBajas2);
        altasAscensosBajas1.setId(null);
        assertThat(altasAscensosBajas1).isNotEqualTo(altasAscensosBajas2);
    }
}
