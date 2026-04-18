package com.backend.WheaterWise.repository;

import com.backend.WheaterWise.model.User;
import com.backend.WheaterWise.model.UserPreference;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PreferenceRepository extends JpaRepository<UserPreference, Long> {
    Optional<UserPreference> findByUser(User user);
    List<UserPreference> findByAlertsEnabled(boolean enabled);
}
