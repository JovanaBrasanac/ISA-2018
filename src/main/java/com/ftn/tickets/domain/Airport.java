package com.ftn.tickets.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Airport.
 */
@Entity
@Table(name = "airport")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Airport implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(max = 100)
    @Column(name = "name", length = 100, nullable = false)
    private String name;

    @NotNull
    @Size(max = 100)
    @Column(name = "address", length = 100, nullable = false)
    private String address;

    @OneToMany(mappedBy = "airport")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Flight> flights = new HashSet<>();
    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("airports")
    private Airline airline;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Airport name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public Airport address(String address) {
        this.address = address;
        return this;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Set<Flight> getFlights() {
        return flights;
    }

    public Airport flights(Set<Flight> flights) {
        this.flights = flights;
        return this;
    }

    public Airport addFlights(Flight flight) {
        this.flights.add(flight);
        flight.setAirport(this);
        return this;
    }

    public Airport removeFlights(Flight flight) {
        this.flights.remove(flight);
        flight.setAirport(null);
        return this;
    }

    public void setFlights(Set<Flight> flights) {
        this.flights = flights;
    }

    public Airline getAirline() {
        return airline;
    }

    public Airport airline(Airline airline) {
        this.airline = airline;
        return this;
    }

    public void setAirline(Airline airline) {
        this.airline = airline;
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
        Airport airport = (Airport) o;
        if (airport.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), airport.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Airport{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", address='" + getAddress() + "'" +
            "}";
    }
}
