package com.rrhh.red.repository;
import com.rrhh.red.domain.Concpremios;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Concpremios entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ConcpremiosRepository extends JpaRepository<Concpremios, Long>, JpaSpecificationExecutor<Concpremios> {

}
