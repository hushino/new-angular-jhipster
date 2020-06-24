package com.rrhh.red.repository;
import com.rrhh.red.domain.PenasDisciplinariasSufridas;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the PenasDisciplinariasSufridas entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PenasDisciplinariasSufridasRepository extends JpaRepository<PenasDisciplinariasSufridas, Long>, JpaSpecificationExecutor<PenasDisciplinariasSufridas> {

}
