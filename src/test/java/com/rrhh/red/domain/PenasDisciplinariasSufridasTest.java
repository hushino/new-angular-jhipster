package com.rrhh.red.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.rrhh.red.web.rest.TestUtil;

public class PenasDisciplinariasSufridasTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PenasDisciplinariasSufridas.class);
        PenasDisciplinariasSufridas penasDisciplinariasSufridas1 = new PenasDisciplinariasSufridas();
        penasDisciplinariasSufridas1.setId(1L);
        PenasDisciplinariasSufridas penasDisciplinariasSufridas2 = new PenasDisciplinariasSufridas();
        penasDisciplinariasSufridas2.setId(penasDisciplinariasSufridas1.getId());
        assertThat(penasDisciplinariasSufridas1).isEqualTo(penasDisciplinariasSufridas2);
        penasDisciplinariasSufridas2.setId(2L);
        assertThat(penasDisciplinariasSufridas1).isNotEqualTo(penasDisciplinariasSufridas2);
        penasDisciplinariasSufridas1.setId(null);
        assertThat(penasDisciplinariasSufridas1).isNotEqualTo(penasDisciplinariasSufridas2);
    }
}
