package com.rrhh.red.repository;
import com.rrhh.red.domain.Licencia;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Licencia entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LicenciaRepository extends JpaRepository<Licencia, Long>, JpaSpecificationExecutor<Licencia> {

}
