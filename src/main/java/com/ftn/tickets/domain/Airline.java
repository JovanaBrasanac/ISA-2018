package com.ftn.tickets.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Airline.
 */
@Entity
@Table(name = "airline")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Airline implements Serializable {

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

    @NotNull
    @Size(max = 1000)
    @Column(name = "description", length = 1000, nullable = false)
    private String description;

    @Column(name = "latitude")
    private Float latitude;

    @Column(name = "longitude")
    private Float longitude;

    @OneToMany(mappedBy = "airline")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Airport> airports = new HashSet<>();
    @OneToOne(mappedBy = "airlineAdmin")
    @JsonIgnore
    private UserExtra admin;

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

    public Airline name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public Airline address(String address) {
        this.address = address;
        return this;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getDescription() {
        return description;
    }

    public Airline description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Float getLatitude() {
        return latitude;
    }

    public Airline latitude(Float latitude) {
        this.latitude = latitude;
        return this;
    }

    public void setLatitude(Float latitude) {
        this.latitude = latitude;
    }

    public Float getLongitude() {
        return longitude;
    }

    public Airline longitude(Float longitude) {
        this.longitude = longitude;
        return this;
    }

    public void setLongitude(Float longitude) {
        this.longitude = longitude;
    }

    public Set<Airport> getAirports() {
        return airports;
    }

    public Airline airports(Set<Airport> airports) {
        this.airports = airports;
        return this;
    }

    public Airline addAirports(Airport airport) {
        this.airports.add(airport);
        airport.setAirline(this);
        return this;
    }

    public Airline removeAirports(Airport airport) {
        this.airports.remove(airport);
        airport.setAirline(null);
        return this;
    }

    public void setAirports(Set<Airport> airports) {
        this.airports = airports;
    }

    public UserExtra getAdmin() {
        return admin;
    }

    public Airline admin(UserExtra userExtra) {
        this.admin = userExtra;
        return this;
    }

    public void setAdmin(UserExtra userExtra) {
        this.admin = userExtra;
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
        Airline airline = (Airline) o;
        if (airline.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), airline.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Airline{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", address='" + getAddress() + "'" +
            ", description='" + getDescription() + "'" +
            ", latitude=" + getLatitude() +
            ", longitude=" + getLongitude() +
            "}";
    }
}
