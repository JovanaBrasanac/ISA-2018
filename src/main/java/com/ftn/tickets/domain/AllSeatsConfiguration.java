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
 * A AllSeatsConfiguration.
 */
@Entity
@Table(name = "all_seats_configuration")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class AllSeatsConfiguration implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Column(name = "jhi_rows", nullable = false)
    private Integer rows;

    @NotNull
    @Column(name = "jhi_columns", nullable = false)
    private Integer columns;

    @OneToMany(mappedBy = "allSeats")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Seat> setas = new HashSet<>();
    @OneToOne(mappedBy = "allSeats")
    @JsonIgnore
    private Flight flight;

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

    public AllSeatsConfiguration name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getRows() {
        return rows;
    }

    public AllSeatsConfiguration rows(Integer rows) {
        this.rows = rows;
        return this;
    }

    public void setRows(Integer rows) {
        this.rows = rows;
    }

    public Integer getColumns() {
        return columns;
    }

    public AllSeatsConfiguration columns(Integer columns) {
        this.columns = columns;
        return this;
    }

    public void setColumns(Integer columns) {
        this.columns = columns;
    }

    public Set<Seat> getSetas() {
        return setas;
    }

    public AllSeatsConfiguration setas(Set<Seat> seats) {
        this.setas = seats;
        return this;
    }

    public AllSeatsConfiguration addSetas(Seat seat) {
        this.setas.add(seat);
        seat.setAllSeats(this);
        return this;
    }

    public AllSeatsConfiguration removeSetas(Seat seat) {
        this.setas.remove(seat);
        seat.setAllSeats(null);
        return this;
    }

    public void setSetas(Set<Seat> seats) {
        this.setas = seats;
    }

    public Flight getFlight() {
        return flight;
    }

    public AllSeatsConfiguration flight(Flight flight) {
        this.flight = flight;
        return this;
    }

    public void setFlight(Flight flight) {
        this.flight = flight;
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
        AllSeatsConfiguration allSeatsConfiguration = (AllSeatsConfiguration) o;
        if (allSeatsConfiguration.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), allSeatsConfiguration.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AllSeatsConfiguration{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", rows=" + getRows() +
            ", columns=" + getColumns() +
            "}";
    }
}
