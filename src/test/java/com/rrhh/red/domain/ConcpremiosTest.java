package com.rrhh.red.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.rrhh.red.web.rest.TestUtil;

public class ConcpremiosTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Concpremios.class);
        Concpremios concpremios1 = new Concpremios();
        concpremios1.setId(1L);
        Concpremios concpremios2 = new Concpremios();
        concpremios2.setId(concpremios1.getId());
        assertThat(concpremios1).isEqualTo(concpremios2);
        concpremios2.setId(2L);
        assertThat(concpremios1).isNotEqualTo(concpremios2);
        concpremios1.setId(null);
        assertThat(concpremios1).isNotEqualTo(concpremios2);
    }
}
