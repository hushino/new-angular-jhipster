package com.rrhh.red.repository;

import com.rrhh.red.domain.Garantia;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Garantia entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GarantiaRepository extends JpaRepository<Garantia, Long>, JpaSpecificationExecutor<Garantia> {
}
