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
 * A Reservation.
 */
@Entity
@Table(name = "reservation")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Reservation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "number_of_seats")
    private Integer numberOfSeats;

    @OneToMany(mappedBy = "reservation")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Ticket> tickets = new HashSet<>();
    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("reservations")
    private UserExtra reservingUser;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getNumberOfSeats() {
        return numberOfSeats;
    }

    public Reservation numberOfSeats(Integer numberOfSeats) {
        this.numberOfSeats = numberOfSeats;
        return this;
    }

    public void setNumberOfSeats(Integer numberOfSeats) {
        this.numberOfSeats = numberOfSeats;
    }

    public Set<Ticket> getTickets() {
        return tickets;
    }

    public Reservation tickets(Set<Ticket> tickets) {
        this.tickets = tickets;
        return this;
    }

    public Reservation addTickets(Ticket ticket) {
        this.tickets.add(ticket);
        ticket.setReservation(this);
        return this;
    }

    public Reservation removeTickets(Ticket ticket) {
        this.tickets.remove(ticket);
        ticket.setReservation(null);
        return this;
    }

    public void setTickets(Set<Ticket> tickets) {
        this.tickets = tickets;
    }

    public UserExtra getReservingUser() {
        return reservingUser;
    }

    public Reservation reservingUser(UserExtra userExtra) {
        this.reservingUser = userExtra;
        return this;
    }

    public void setReservingUser(UserExtra userExtra) {
        this.reservingUser = userExtra;
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
        Reservation reservation = (Reservation) o;
        if (reservation.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), reservation.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Reservation{" +
            "id=" + getId() +
            ", numberOfSeats=" + getNumberOfSeats() +
            "}";
    }
}
