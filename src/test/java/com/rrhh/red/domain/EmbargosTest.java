package com.rrhh.red.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.rrhh.red.web.rest.TestUtil;

public class EmbargosTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Embargos.class);
        Embargos embargos1 = new Embargos();
        embargos1.setId(1L);
        Embargos embargos2 = new Embargos();
        embargos2.setId(embargos1.getId());
        assertThat(embargos1).isEqualTo(embargos2);
        embargos2.setId(2L);
        assertThat(embargos1).isNotEqualTo(embargos2);
        embargos1.setId(null);
        assertThat(embargos1).isNotEqualTo(embargos2);
    }
}
