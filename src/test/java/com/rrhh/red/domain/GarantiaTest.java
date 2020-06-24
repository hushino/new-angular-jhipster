package com.rrhh.red.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.rrhh.red.web.rest.TestUtil;

public class GarantiaTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Garantia.class);
        Garantia garantia1 = new Garantia();
        garantia1.setId(1L);
        Garantia garantia2 = new Garantia();
        garantia2.setId(garantia1.getId());
        assertThat(garantia1).isEqualTo(garantia2);
        garantia2.setId(2L);
        assertThat(garantia1).isNotEqualTo(garantia2);
        garantia1.setId(null);
        assertThat(garantia1).isNotEqualTo(garantia2);
    }
}
