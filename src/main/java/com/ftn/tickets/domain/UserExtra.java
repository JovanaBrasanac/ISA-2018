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
 * A UserExtra.
 */
@Entity
@Table(name = "user_extra")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class UserExtra implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    //@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 5, max = 20)
    @Column(name = "phone", length = 20, nullable = false)
    private String phone;

    @NotNull
    @Size(max = 50)
    @Column(name = "city", length = 50, nullable = false)
    private String city;

    @OneToOne    @JoinColumn(unique = true)
    private User user;

    @OneToOne    @JoinColumn(unique = true)
    private Airline airlineAdmin;

    @OneToMany(mappedBy = "reservingUser")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Reservation> reservations = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPhone() {
        return phone;
    }

    public UserExtra phone(String phone) {
        this.phone = phone;
        return this;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getCity() {
        return city;
    }

    public UserExtra city(String city) {
        this.city = city;
        return this;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public User getUser() {
        return user;
    }

    public UserExtra user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Airline getAirlineAdmin() {
        return airlineAdmin;
    }

    public UserExtra airlineAdmin(Airline airline) {
        this.airlineAdmin = airline;
        return this;
    }

    public void setAirlineAdmin(Airline airline) {
        this.airlineAdmin = airline;
    }

    public Set<Reservation> getReservations() {
        return reservations;
    }

    public UserExtra reservations(Set<Reservation> reservations) {
        this.reservations = reservations;
        return this;
    }

    public UserExtra addReservations(Reservation reservation) {
        this.reservations.add(reservation);
        reservation.setReservingUser(this);
        return this;
    }

    public UserExtra removeReservations(Reservation reservation) {
        this.reservations.remove(reservation);
        reservation.setReservingUser(null);
        return this;
    }

    public void setReservations(Set<Reservation> reservations) {
        this.reservations = reservations;
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
        UserExtra userExtra = (UserExtra) o;
        if (userExtra.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), userExtra.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "UserExtra{" +
            "id=" + getId() +
            ", phone='" + getPhone() + "'" +
            ", city='" + getCity() + "'" +
            "}";
    }
}
