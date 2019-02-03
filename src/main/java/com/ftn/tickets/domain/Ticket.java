package com.ftn.tickets.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Ticket.
 */
@Entity
@Table(name = "ticket")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Ticket implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "accepted")
    private Boolean accepted;

    @OneToOne(optional = false)    @NotNull
    @JoinColumn(unique = true)
    private Seat seat;

    @OneToOne(mappedBy = "ticket")
    @JsonIgnore
    private AirportReview airportReview;

    @OneToOne(mappedBy = "ticket")
    @JsonIgnore
    private FlightReview flightReview;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("tickets")
    private Reservation reservation;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean isAccepted() {
        return accepted;
    }

    public Ticket accepted(Boolean accepted) {
        this.accepted = accepted;
        return this;
    }

    public void setAccepted(Boolean accepted) {
        this.accepted = accepted;
    }

    public Seat getSeat() {
        return seat;
    }

    public Ticket seat(Seat seat) {
        this.seat = seat;
        return this;
    }

    public void setSeat(Seat seat) {
        this.seat = seat;
    }

    public AirportReview getAirportReview() {
        return airportReview;
    }

    public Ticket airportReview(AirportReview airportReview) {
        this.airportReview = airportReview;
        return this;
    }

    public void setAirportReview(AirportReview airportReview) {
        this.airportReview = airportReview;
    }

    public FlightReview getFlightReview() {
        return flightReview;
    }

    public Ticket flightReview(FlightReview flightReview) {
        this.flightReview = flightReview;
        return this;
    }

    public void setFlightReview(FlightReview flightReview) {
        this.flightReview = flightReview;
    }

    public Reservation getReservation() {
        return reservation;
    }

    public Ticket reservation(Reservation reservation) {
        this.reservation = reservation;
        return this;
    }

    public void setReservation(Reservation reservation) {
        this.reservation = reservation;
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
        Ticket ticket = (Ticket) o;
        if (ticket.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), ticket.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Ticket{" +
            "id=" + getId() +
            ", accepted='" + isAccepted() + "'" +
            "}";
    }
}
