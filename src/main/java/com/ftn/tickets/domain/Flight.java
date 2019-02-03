package com.ftn.tickets.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A Flight.
 */
@Entity
@Table(name = "flight")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Flight implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(max = 100)
    @Column(name = "start_location", length = 100, nullable = false)
    private String startLocation;

    @NotNull
    @Size(max = 100)
    @Column(name = "end_location", length = 100, nullable = false)
    private String endLocation;

    @NotNull
    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @NotNull
    @Column(name = "end_date", nullable = false)
    private LocalDate endDate;

    @NotNull
    @Column(name = "start_time", nullable = false)
    private String startTime;

    @NotNull
    @Column(name = "end_time", nullable = false)
    private String endTime;

    @NotNull
    @Column(name = "time_of_flight", nullable = false)
    private String timeOfFlight;

    @Column(name = "length")
    private String length;

    @NotNull
    @Column(name = "number_of_changes", nullable = false)
    private Integer numberOfChanges;

    @NotNull
    @Column(name = "location_of_changes", nullable = false)
    private String locationOfChanges;

    @NotNull
    @Column(name = "flight_code", nullable = false)
    private String flightCode;

    @OneToOne(optional = false)    @NotNull
    @JoinColumn(unique = true)
    private AllSeatsConfiguration allSeats;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("flights")
    private Airport airport;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStartLocation() {
        return startLocation;
    }

    public Flight startLocation(String startLocation) {
        this.startLocation = startLocation;
        return this;
    }

    public void setStartLocation(String startLocation) {
        this.startLocation = startLocation;
    }

    public String getEndLocation() {
        return endLocation;
    }

    public Flight endLocation(String endLocation) {
        this.endLocation = endLocation;
        return this;
    }

    public void setEndLocation(String endLocation) {
        this.endLocation = endLocation;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public Flight startDate(LocalDate startDate) {
        this.startDate = startDate;
        return this;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public Flight endDate(LocalDate endDate) {
        this.endDate = endDate;
        return this;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public String getStartTime() {
        return startTime;
    }

    public Flight startTime(String startTime) {
        this.startTime = startTime;
        return this;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public Flight endTime(String endTime) {
        this.endTime = endTime;
        return this;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public String getTimeOfFlight() {
        return timeOfFlight;
    }

    public Flight timeOfFlight(String timeOfFlight) {
        this.timeOfFlight = timeOfFlight;
        return this;
    }

    public void setTimeOfFlight(String timeOfFlight) {
        this.timeOfFlight = timeOfFlight;
    }

    public String getLength() {
        return length;
    }

    public Flight length(String length) {
        this.length = length;
        return this;
    }

    public void setLength(String length) {
        this.length = length;
    }

    public Integer getNumberOfChanges() {
        return numberOfChanges;
    }

    public Flight numberOfChanges(Integer numberOfChanges) {
        this.numberOfChanges = numberOfChanges;
        return this;
    }

    public void setNumberOfChanges(Integer numberOfChanges) {
        this.numberOfChanges = numberOfChanges;
    }

    public String getLocationOfChanges() {
        return locationOfChanges;
    }

    public Flight locationOfChanges(String locationOfChanges) {
        this.locationOfChanges = locationOfChanges;
        return this;
    }

    public void setLocationOfChanges(String locationOfChanges) {
        this.locationOfChanges = locationOfChanges;
    }

    public String getFlightCode() {
        return flightCode;
    }

    public Flight flightCode(String flightCode) {
        this.flightCode = flightCode;
        return this;
    }

    public void setFlightCode(String flightCode) {
        this.flightCode = flightCode;
    }

    public AllSeatsConfiguration getAllSeats() {
        return allSeats;
    }

    public Flight allSeats(AllSeatsConfiguration allSeatsConfiguration) {
        this.allSeats = allSeatsConfiguration;
        return this;
    }

    public void setAllSeats(AllSeatsConfiguration allSeatsConfiguration) {
        this.allSeats = allSeatsConfiguration;
    }

    public Airport getAirport() {
        return airport;
    }

    public Flight airport(Airport airport) {
        this.airport = airport;
        return this;
    }

    public void setAirport(Airport airport) {
        this.airport = airport;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Flight flight = (Flight) o;
        if (flight.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), flight.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Flight{" +
            "id=" + getId() +
            ", startLocation='" + getStartLocation() + "'" +
            ", endLocation='" + getEndLocation() + "'" +
            ", startDate='" + getStartDate() + "'" +
            ", endDate='" + getEndDate() + "'" +
            ", startTime='" + getStartTime() + "'" +
            ", endTime='" + getEndTime() + "'" +
            ", timeOfFlight='" + getTimeOfFlight() + "'" +
            ", length='" + getLength() + "'" +
            ", numberOfChanges=" + getNumberOfChanges() +
            ", locationOfChanges='" + getLocationOfChanges() + "'" +
            ", flightCode='" + getFlightCode() + "'" +
            "}";
    }
}
