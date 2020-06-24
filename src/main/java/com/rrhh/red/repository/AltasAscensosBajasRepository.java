package com.rrhh.red.repository;

import com.rrhh.red.domain.AltasAscensosBajas;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the AltasAscensosBajas entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AltasAscensosBajasRepository extends JpaRepository<AltasAscensosBajas, Long>, JpaSpecificationExecutor<AltasAscensosBajas> {
}
